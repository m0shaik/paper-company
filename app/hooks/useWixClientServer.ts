import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';

import { cookies } from 'next/headers';
import { WIX_REFRESH_TOKEN } from '@/app/constants';

export const getWixClient = async () => {
  let refreshToken;
  try {
    const cookieStore = cookies();
    refreshToken = JSON.parse(
      cookieStore.get(WIX_REFRESH_TOKEN)?.value || '{}'
    );
  } catch (e) {}
  const wixClient = createClient({
    modules: {
      items,
    },
    auth: OAuthStrategy({
      clientId: process.env.WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken: { value: '', expiresAt: 0 },
      },
    }),
  });
  return wixClient;
};
