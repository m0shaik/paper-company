import 'server-only';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';
import { cookies } from 'next/headers';
import { WIX_REFRESH_TOKEN } from '@/app/constants';

// Server-only Wix client for Data Items
const getWixClient = () => {
  let refreshToken: any = {};
  try {
    const cookieStore = cookies();
    refreshToken = JSON.parse(
      cookieStore.get(WIX_REFRESH_TOKEN)?.value || '{}'
    );
  } catch (_) {}
  return createClient({
    modules: { items },
    auth: OAuthStrategy({
      clientId: process.env.WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken: { value: '', expiresAt: 0 },
      },
    }),
  });
};

// Query a collection; pass a builder to chain filters/sorting; returns find() result
export const queryCollection = async ({
  collectionId,
  build,
  options,
}: {
  collectionId: string;
  build?: (q: any) => any;
  options?: { consistentRead?: boolean };
}) => {
  const wixClient: any = getWixClient();
  let q = wixClient.items.query(collectionId);
  if (build) q = build(q) || q;
  return q.find(options);
};

export const buildQuery = (collectionId: string) => {
  const wixClient: any = getWixClient();
  return wixClient.items.query(collectionId);
};
