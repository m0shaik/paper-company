import { NextRequest, NextResponse } from 'next/server';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { WIX_REFRESH_TOKEN } from '@/app/constants';

// Cache for CMS redirects to avoid fetching on every request
let redirectCache: Map<string, string> | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 60 * 1000; // 1 minute cache

async function getRedirects(): Promise<Map<string, string>> {
  const now = Date.now();
  
  // Return cached redirects if still valid
  if (redirectCache && now - cacheTimestamp < CACHE_TTL) {
    return redirectCache;
  }
  
  try {
    const res = await fetch('https://the.papercompany.ca/api/pages', {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) {
      return redirectCache || new Map();
    }
    
    const data = await res.json();
    const redirects = new Map<string, string>();
    
    for (const item of data.items || []) {
      if (item.redirect && item.slug) {
        redirects.set(item.slug, item.redirect);
      }
    }
    
    redirectCache = redirects;
    cacheTimestamp = now;
    return redirects;
  } catch {
    return redirectCache || new Map();
  }
}

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const requestUrl = request.url;
  requestHeaders.set('x-middleware-request-url', requestUrl);
  const cookies = request.cookies;
  
  // Check for CMS-based redirects on dynamic pages
  const pathname = request.nextUrl.pathname;
  
  // Only check redirects for top-level dynamic pages (not /store, /cart, /api, etc.)
  if (
    pathname !== '/' &&
    !pathname.startsWith('/store') &&
    !pathname.startsWith('/cart') &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/product-page') &&
    !pathname.startsWith('/_next') &&
    !pathname.includes('.')
  ) {
    const slug = pathname.slice(1); // Remove leading slash
    const redirects = await getRedirects();
    const redirectUrl = redirects.get(slug);
    
    if (redirectUrl) {
      return NextResponse.redirect(redirectUrl);
    }
  }
  
  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  
  // Always ensure we have visitor tokens for guest checkout functionality
  if (cookies.get(WIX_REFRESH_TOKEN)) {
    return res;
  }
  
  const wixClient = createClient({
    auth: OAuthStrategy({ clientId: process.env.WIX_CLIENT_ID! }),
  });
  const tokens = await wixClient.auth.generateVisitorTokens();
  res.cookies.set(WIX_REFRESH_TOKEN, JSON.stringify(tokens.refreshToken), {
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}

export const config = {
  unstable_allowDynamic: ['/node_modules/lodash/**', './node_modules/@wix/**'],
};
