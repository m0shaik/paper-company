import { PLACEHOLDER_IMAGE, ALL_ITEMS_ID } from '@/app/constants';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { collections, products } from '@wix/stores';
import { cookies } from 'next/headers';
import { WIX_REFRESH_TOKEN } from '@/app/constants';
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

const getWixClient = () => {
  let refreshToken;
  try {
    const cookieStore = cookies();
    refreshToken = JSON.parse(
      cookieStore.get(WIX_REFRESH_TOKEN)?.value || "{}"
    );
  } catch (e) {
    console.error("Error parsing refresh token:", e);
  }
  
  return createClient({
    modules: {
      collections,
      products,
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

export const getProduct = async (productId: string) => {
  console.log(productId)
  const wixClient = getWixClient();
  return wixClient.products.getProduct(productId);
}

export const queryCollections = async ({
  limit,
  exclude,
}: CollectionFilters = {}) => {
  const wixClient = getWixClient();
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
  const wixClient = getWixClient();
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
