import StorePage from "@/app/store/page";
import { queryCollections, queryProducts } from "@/app/model/store/store-api";
import { generateCategorySEO } from "@/app/lib/seo";

export async function generateMetadata({ params }: any) {
  const collections = await queryCollections();
  const collection = collections.find(
    ({ slug }) => slug === params?.category
  );

  if (collection && collection._id) {
    // Get product count for this category
    const products = await queryProducts({
      collectionId: collection._id,
      limit: 100
    });

    const seoConfig = generateCategorySEO(collection, products.length);

    return {
      title: seoConfig.title,
      description: seoConfig.description,
      keywords: seoConfig.keywords?.join(', '),
      openGraph: {
        title: seoConfig.title,
        description: seoConfig.description,
        images: [seoConfig.image],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: seoConfig.title,
        description: seoConfig.description,
        images: [seoConfig.image],
      },
    };
  }

  return {
    title: `Store Category - Premium Paper Company`,
    description: "Browse our premium paper products organized by category. Custom dimensions available for all products.",
  };
}

export default StorePage;
