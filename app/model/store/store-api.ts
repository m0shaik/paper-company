import { PLACEHOLDER_IMAGE, ALL_ITEMS_ID } from '@/app/constants';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { collections, products } from '@wix/stores';
import Cookies from "js-cookie";
import { WIX_REFRESH_TOKEN } from '@/app/constants';
import { cookies } from 'next/headers';
import { lastDayOfQuarterWithOptions } from 'date-fns/fp';

interface CollectionFilters {
  limit?: number;
  exclude?: string;
}

interface ProductsFilters {
  limit?: number;
  slug?: string;
  collectionId?: string;
}

export type ProductOption = products.ProductOption;

export type Variant = products.Variant;

export type Product = products.Product;

export type Collection = products.Collection;

const wixClient = createClient({
  modules: {
    collections,
    products,
  },
  auth: OAuthStrategy({
    clientId: process.env.WIX_CLIENT_ID!,
    tokens: {
      refreshToken: JSON.parse(Cookies.get(WIX_REFRESH_TOKEN) || "{}"),
      accessToken: { value: "", expiresAt: 0 }
    },
  }),
});




export const getProduct = async (productId: string) => {
  console.log(productId)
  return wixClient.products.getProduct(productId);
}

export const queryCollections = async ({
  limit,
  exclude,
}: CollectionFilters = {}) => {
  let query = wixClient.collections.queryCollections();

  if (limit) {
    query = query.limit(limit);
  }

  if (exclude) {
    query = query.ne("name", [exclude]);
  }

  const { items } = await query.find();
  return items;
};

export const queryProducts = async ({
  slug,
  limit,
  collectionId,
}: ProductsFilters = {}) => {

  let query = wixClient.products.queryProducts();

  if (collectionId) {
    query = query.eq("collectionIds", collectionId);

  }

  if (slug) {

    query = query.eq("slug", slug);

  }



  const { items } = await query.find();
  return items;
}
