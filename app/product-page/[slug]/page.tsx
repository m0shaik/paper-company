import { ProductPageClient } from '@/app/components/Product/ProductPageClient/ProductPageClient';
import { PLACEHOLDER_IMAGE } from '@/app/constants';
import { queryProducts } from '@/app/model/store/store-api';
import { PageWrapper } from '@/app/components/Layout/PageWrapper';
import { generateProductSEO } from '@/app/lib/seo';
import { StructuredDataScript } from '@/app/components/SEO/StructuredData';
import { generateProductSchema, generateBreadcrumbSchema } from '@/app/lib/structured-data';
import { Breadcrumb } from '@/app/components/SEO/Breadcrumb';

// Helper function to parse and style product description
function parseProductDescription(htmlDescription: string) {
  // Remove HTML tags and split into paragraphs
  const cleanText = htmlDescription.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').trim();
  const paragraphs = cleanText.split(/\s{2,}/).filter(p => p.trim());

  return paragraphs.map((paragraph, index) => {
    const trimmed = paragraph.trim();
    if (!trimmed) return null;

    // Check if this looks like a title (first paragraph or short bold text)
    if (index === 0 && trimmed.length < 50) {
      return (
        <h1 key={index} className="voice-3l hidden text-gray-900 mb-4">
          {trimmed}
        </h1>
      );
    }

    // Check for section headers (text that contains colons and is shorter)
    if (trimmed.includes(':') && trimmed.length < 100) {
      const [title, content] = trimmed.split(':');
      return (
        <div key={index} className="mb-4">
          <h3 className="voice-lg text-gray-800 font-semibold mb-1">
            {title.trim()}:
          </h3>
          {content && (
            <p className="voice-base text-gray-700 leading-relaxed">
              {content.trim()}
            </p>
          )}
        </div>
      );
    }

    // Regular paragraphs
    return (
      <p key={index} className="voice-base text-gray-700 leading-relaxed mb-4">
        {trimmed}
      </p>
    );
  }).filter(Boolean);
}

export async function generateMetadata({ params }: any) {
  if (params.slug) {
    const product = (
      await queryProducts({
        slug: params.slug,
        limit: 1,
      })
    )[0];

    if (product && product.name) {
      const seoConfig = generateProductSEO(product);
      return {
        title: seoConfig.title,
        description: seoConfig.description,
        keywords: seoConfig.keywords?.join(', '),
        openGraph: {
          title: seoConfig.title,
          description: seoConfig.description,
          images: [seoConfig.image],
          type: 'product',
        },
        twitter: {
          card: 'summary_large_image',
          title: seoConfig.title,
          description: seoConfig.description,
          images: [seoConfig.image],
        },
      };
    }
  }

  return {
    title: 'Product Not Found - Premium Paper Company',
    description: 'The requested product could not be found. Browse our full collection of premium paper products.',
  };
}

export default async function StoresCategoryPage({ params }: any) {
  if (!params.slug) {
    return (
      <PageWrapper className="my-20">
        <div className="text-3xl w-full text-center p-9 box-border">
          Product Not Found
        </div>
      </PageWrapper>
    );
  }

  const product = (
    await queryProducts({
      slug: params.slug,
      limit: 1,
    })
  )[0];

  if (!product) {
    return (
      <PageWrapper className="my-20">
        <div className="text-3xl w-full text-center p-9 box-border">
          Product Not Found
        </div>
      </PageWrapper>
    );
  }

  // Generate structured data
  const productSchema = generateProductSchema(product);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Store', url: '/store' },
    { name: product.name || 'Product' }
  ]);

  return (
    <>
      <StructuredDataScript data={[productSchema, breadcrumbSchema]} />
      <PageWrapper className="my-20">
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Store', href: '/store' },
              { label: product.name || 'Product' }
            ]}
          />
        </div>
        <ProductPageClient product={product} />
      </PageWrapper>
    </>
  );
}

export async function generateStaticParams(): Promise<{ slug?: string }[]> {
  return queryProducts({
    limit: 10,
  })
    .then((items) =>
      items.map((product: any) => ({
        slug: product.slug,
      }))
    )
    .catch((err) => {
      console.error(err);
      return [];
    });
}
