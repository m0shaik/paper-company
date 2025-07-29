import { redirects } from "@wix/redirects";
import Cookies from 'js-cookie';
import { WIX_REFRESH_TOKEN } from "@/app/constants";
import { createClient, OAuthStrategy } from '@wix/sdk';

const wixClient = createClient({
  modules: {
    redirects,
  },
  auth: OAuthStrategy({
    clientId: process.env.WIX_CLIENT_ID!,
    tokens: {
      refreshToken: JSON.parse(Cookies.get(WIX_REFRESH_TOKEN) || "{}"),
      accessToken: { value: "", expiresAt: 0 }
    },
  }),
});

export const createRedirectSession = async ({ callbacks, checkoutId }: {
  checkoutId: string,
  callbacks: {
    postFlowUrl: string,
    thankYouPageUrl: string,
    cartPageUrl: string,
  }
}) => {
  return wixClient.redirects.createRedirectSession({
    ecomCheckout: {
      checkoutId,
    },
    callbacks,
  });
}
