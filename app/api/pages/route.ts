import { NextResponse } from 'next/server';

// Force Node.js runtime to ensure fetch compatibility
export const runtime = 'nodejs';

interface WixRawItem {
  id: string;
  dataCollectionId: string;
  data: {
    _id: string;
    _owner?: string;
    _createdDate?: { $date: string };
    _updatedDate?: { $date: string };
    [key: string]: any;
  };
}

interface WixQueryResponse {
  dataItems?: WixRawItem[];
  pagingMetadata?: {
    count: number;
    hasNext: boolean;
  };
}

export async function GET() {
  const required = ['WIX_API_KEY', 'WIX_SITE_ID', 'WIX_ACCOUNT_ID'];
  const missing = required.filter((k) => !process.env[k]);

  if (missing.length) {
    console.error('Missing environment variables:', missing);
    return NextResponse.json(
      { error: `Missing env vars: ${missing.join(', ')}` },
      { status: 500 }
    );
  }

  // Log environment check for debugging
  console.log('Environment variables check:', {
    hasApiKey: !!process.env.WIX_API_KEY,
    hasSiteId: !!process.env.WIX_SITE_ID,
    hasAccountId: !!process.env.WIX_ACCOUNT_ID,
    nodeEnv: process.env.NODE_ENV,
  });

  try {
    const requestBody = { dataCollectionId: 'Pages' };
    const headers = {
      'Content-Type': 'application/json',
      Authorization: process.env.WIX_API_KEY as string,
      'wix-site-id': process.env.WIX_SITE_ID as string,
      'wix-account-id': process.env.WIX_ACCOUNT_ID as string,
    };

    console.log('Making request to Wix API with headers:', {
      ...headers,
      Authorization: '***REDACTED***', // Don't log the actual API key
    });

    const res = await fetch('https://www.wixapis.com/wix-data/v2/items/query', {
      method: 'POST',
      cache: 'no-store',
      headers,
      body: JSON.stringify(requestBody),
      // Add timeout for better error handling
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Wix API error:', {
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        body: errorText,
      });

      return NextResponse.json(
        {
          error: `Wix API error: ${res.status} ${res.statusText}`,
          details: errorText,
        },
        { status: res.status }
      );
    }

    const json = (await res.json()) as WixQueryResponse;

    console.log('Wix API response received:', {
      itemCount: json.dataItems?.length || 0,
      hasNext: json.pagingMetadata?.hasNext,
    });

    const items = (json.dataItems || []).map((r) => {
      const { _id, _owner, _createdDate, _updatedDate, ...cleanData } = r.data;

      return {
        id: r.id,
        created: _createdDate?.$date,
        updated: _updatedDate?.$date,
        // Spread all other fields, removing _fld suffix for cleaner names
        // This includes both legacy 'sections' array and new individual section fields
        // like section_text_1, section_image_1, etc.
        ...Object.fromEntries(
          Object.entries(cleanData).map(([key, value]) => [
            key.replace(/_fld$/, ''), // Remove _fld suffix
            value,
          ])
        ),
      };
    });

    return NextResponse.json({ items });
  } catch (error: any) {
    // Enhanced error logging
    console.error('API route error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    });

    // Check for specific error types
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timeout - Wix API took too long to respond' },
        { status: 504 }
      );
    }

    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return NextResponse.json(
        {
          error: 'Network error - Unable to connect to Wix API',
          details: error.message,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        error: error.message || 'Unknown error',
        type: error.name || 'UnknownError',
      },
      { status: 500 }
    );
  }
}

// Add OPTIONS handler for CORS if needed
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
