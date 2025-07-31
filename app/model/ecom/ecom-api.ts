import { createClient, OAuthStrategy } from "@wix/sdk";
import {
  cart,
  checkout,
  currentCart,
  orders,
} from '@wix/ecom';
import Cookies from 'js-cookie';
import { WIX_REFRESH_TOKEN } from '@/app/constants';

const getWixClient = () => {
  let refreshToken;
  try {
    // Get refresh token from cookies (for guest/visitor sessions)
    refreshToken = JSON.parse(Cookies.get(WIX_REFRESH_TOKEN) || "{}");
  } catch (e) {
    console.error("Error parsing refresh token:", e);
  }

  return createClient({
    modules: {
      cart,
      checkout,
      currentCart,
      orders,
    },
    auth: OAuthStrategy({
      clientId: process.env.WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 }
      },
    }),
  });
};

export type LineItem = cart.LineItem;
export type Cart = cart.Cart;
export type LineItemQuantityUpdate = cart.LineItemQuantityUpdate;

export const addToCurrentCart = async ({ lineItems }: { lineItems: LineItem[] }) => {
  const wixClient = getWixClient();
  return wixClient.currentCart.addToCurrentCart({ lineItems });
}

export const updateCurrentCart = async ({ cartInfo }: { cartInfo: Cart }) => {
  const wixClient = getWixClient();
  return wixClient.currentCart.updateCurrentCart({ cartInfo });
}

export const getCurrentCart = async () => {
  const wixClient = getWixClient();
  return wixClient.currentCart.getCurrentCart();
}

export const createCheckoutFromCurrentCart = async () => {
  const wixClient = getWixClient();
  return wixClient.currentCart.createCheckoutFromCurrentCart({ channelType: currentCart.ChannelType.WEB })
}

export const createCheckout = async ({ lineItems, overrideCheckoutUrl }: { lineItems: LineItem[], overrideCheckoutUrl: string }) => {
  const wixClient = getWixClient();
  return wixClient.checkout.createCheckout({
    lineItems,
    overrideCheckoutUrl,
    channelType: checkout.ChannelType.WEB,
  })
}

export const getOrder = async (orderId: string) => {
  const wixClient = getWixClient();
  return wixClient.orders.getOrder(orderId);
}

export const updateCurrentCartLineItemQuantity = async (items: LineItemQuantityUpdate[]) => {
  const wixClient = getWixClient();
  return wixClient.currentCart.updateCurrentCartLineItemQuantity(items);
}

export const removeLineItemsFromCurrentCart = async (itemIds: string[]) => {
  const wixClient = getWixClient();
  return wixClient.currentCart.removeLineItemsFromCurrentCart(itemIds);
}
