import StorePage from '@/app/store/page';
import { Metadata } from 'next';
import { queryCollections, queryProducts } from '@/app/model/store/wix-server';
import { generateCategorySEO } from '@/app/lib/seo';

export async function generateMetadata({ params }: any) {
  const collections = await queryCollections();
  const collection = collections.find(({ slug }) => slug === params?.category);

  if (collection && collection._id) {
    // Get product count for this category
    const products = await queryProducts({
      collectionId: collection._id,
    });

    return generateCategorySEO(collection, products.length);
  }

  return {
    title: `Store Category - Premium Paper Company`,
    description:
      'Browse our premium paper products organized by category. Custom dimensions available for all products.',
  };
}

export default StorePage;
