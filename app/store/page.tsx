import React, { Suspense } from 'react';
import Image from 'next/image';
import { PLACEHOLDER_IMAGE } from '@/app/constants';
import { ProductCategories } from '@/app/components/ProductCategories/ProductCategories';
import Link from 'next/link';
import ActionLink from '@/app/components/ActionLink/ActionLink';
import { Metadata } from 'next';
import {
  CardSkeleton,
  ListSkeleton,
} from '@/app/components/Skeletons/Skeletons';
import { queryCollections, queryProducts } from '@/app/model/store/store-api';
import type { Product, Collection } from '@/app/model/store/store-api';
import { Button } from '@/app/components/ui/button';
import { PageWrapper } from '@/app/components/Layout/PageWrapper';
import { getPageSEO } from '@/app/lib/seo';

export const metadata: Metadata = getPageSEO('store');

const ProductCard = ({ item, index }: { item: Product; index: number }) => {
  return (
    <div className="flex flex-col h-full glass-card rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <Link
        className="relative max-w-full w-full pt-[100%] block"
        href={`/product-page/${item.slug}`}
      >
        <Image
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1535px) 33vw, 25vw"
          src={item.media?.mainMedia?.image?.url || PLACEHOLDER_IMAGE}
          alt={item.media?.mainMedia?.image?.altText || 'main image'}
          className="w-full h-auto"
          priority={index < 4}
        />
      </Link>
      <div className="p-4 flex flex-col gap-3 flex-grow glass-content">
        <Link
          className="flex align-middle items-center w-full gap-6 justify-between hover:text-gray-700 transition-colors duration-200"
          href={`/product-page/${item.slug}`}
        >
          <div className="card-title w-auto text-base flex m-0 p-0 grow font-medium text-gray-800">
            {item.name}
          </div>
          <div className="card-price w-auto text-base flex justify-end items-center align-middle font-semibold text-gray-900">
            {item.price!.formatted!.price}
          </div>
        </Link>
        {!item.manageVariants && item.stock?.inStock ? null : (
          <Button className="btn-main cursor-pointer text-lg mt-auto" disabled>
            Out of Stock
          </Button>
        )}
      </div>
    </div>
  );
};

export async function StoresCategory({ params }: any) {
  let items: Product[] = [];
  let collections: Collection[] = [];
  let collectionId;
  try {
    collections = await queryCollections();
    console.log(
      'Available collections:',
      collections.map((c) => ({ name: c.name, slug: c.slug, id: c._id }))
    );
    console.log('Looking for category:', params?.category);

    collectionId = collections.find(({ slug }) => slug === params?.category)
      ?._id!;

    console.log('Found collectionId:', collectionId);

    if (collectionId) {
      items = await queryProducts({
        limit: 10,
        collectionId,
      });
      console.log(
        `Found ${items.length} products for collection ${params?.category}`
      );
    } else {
      console.log(`No collection found for slug: ${params?.category}`);
      items = await queryProducts({
        limit: 10,
      });
      console.log(`Found ${items.length} total products`);
    }
  } catch (err) {
    console.error('Error in StoresCategory:', err);
  }

  return (
    <PageWrapper>
      <div className="flex flex-col gap-8 max-md:py-5">
        <ProductCategories
          collections={collections}
          selectedCollectionId={collectionId}
        />
        {items.length ? (
          <div className="text-center">
            <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 grid-flow-row">
              {items.map((item, index) => (
                <li key={item._id}>
                  <ProductCard item={item} index={index} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-3xl w-full text-center p-9 box-border">
            {params?.category ? (
              <>
                No products found in category "{params.category}".
                {collections.find((c) => c.slug === params.category)
                  ? ' This category exists but has no products.'
                  : ' This category does not exist.'}
                <br />
                <Link
                  href="https://manage.wix.com/account/site-selector?actionUrl=+https%3A%2F%2Fmanage.wix.com%2Fdashboard%2F%7BmetaSiteId%7D%2Fstore%2Fproducts%3FreferralInfo%3DHeadless"
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-500"
                >
                  Click here
                </Link>{' '}
                to go to the business dashboard to add products. Once added,
                they will appear here.
              </>
            ) : (
              <>
                No products found. Click{' '}
                <Link
                  href="https://manage.wix.com/account/site-selector?actionUrl=+https%3A%2F%2Fmanage.wix.com%2Fdashboard%2F%7BmetaSiteId%7D%2Fstore%2Fproducts%3FreferralInfo%3DHeadless"
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-500"
                >
                  here
                </Link>{' '}
                to go to the business dashboard to add products. Once added,
                they will appear here.
              </>
            )}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

export default async function Page({ params }: any) {
  return (
    <Suspense
      fallback={
        <PageWrapper>
          <div className="full-w overflow-hidden flex flex-col gap-8 max-md:py-5">
            <div
              role="status"
              className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
            >
              <ListSkeleton />
              <span className="sr-only">Loading...</span>
            </div>

            <div className="text-center">
              <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 grid-flow-row">
                {[...Array(8)].map((_, i) => (
                  <li
                    key={i}
                    className={
                      'flex flex-col items-center justify-center max-md:h-[55vh] md:h-96'
                    }
                  >
                    <div
                      role="status"
                      className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700 w-full h-full"
                    >
                      <CardSkeleton />
                      <span className="sr-only">Loading...</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </PageWrapper>
      }
    >
      <StoresCategory params={params} />
    </Suspense>
  );
}
