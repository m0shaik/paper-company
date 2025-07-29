import { NextRequest, NextResponse } from "next/server";
import { getRequestUrl } from "@/app/utils/server-utils";
import { getProduct } from '@/app/model/store/store-api';
import { addToCurrentCart, createCheckout, LineItem } from '@/app/model/ecom/ecom-api';
import { createRedirectSession } from "@/app/model/redirect/redirect-api";
import { STORES_APP_ID } from "@/app/constants";

export async function GET(
  request: NextRequest,
  {
    params: { productId },
  }: {
    params: { productId: string };
  }
) {
  const requestUrl = getRequestUrl(request);
  const baseUrl = new URL("/", requestUrl).toString();
  const { searchParams } = new URL(requestUrl);
  const quantity = parseInt(searchParams.get("quantity") || "1", 10);
  const productOptions = JSON.parse(
    searchParams.get("productOptions") || "null"
  );
  const { product } = await getProduct(productId);
  if (!product) {
    return new Response("Product not found", {
      status: 404,
    });
  }
  const selectedOptions =
    productOptions ??
    (product.manageVariants
      ? { variantId: product.variants![0]._id }
      : product?.productOptions?.length
        ? {
          options:
            product?.productOptions?.reduce((acc, option) => {
              acc[option.name!] = option.choices![0].description!;
              return acc;
            }, {} as Record<string, any>) ?? {},
        }
        : undefined);
  const item: LineItem = {
    quantity,
    catalogReference: {
      catalogItemId: product._id!,
      appId: STORES_APP_ID,
      options: selectedOptions,
    },
  };
  const checkout = await createCheckout({
    lineItems: [item],
    overrideCheckoutUrl: `${baseUrl}api/redirect-to-checkout?checkoutId={checkoutId}`,
  });

  const { redirectSession } = await createRedirectSession({
    checkoutId: checkout!._id!,
    callbacks: {
      postFlowUrl: baseUrl,
      thankYouPageUrl: `${baseUrl}stores-success`,
      cartPageUrl: `${baseUrl}cart`
    },
  });

  return NextResponse.json(redirectSession!.fullUrl!);
}
