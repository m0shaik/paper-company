import { ProductSidebar } from '@/app/components/Product/ProductSidebar/ProductSidebar';
import ImageGalleryClient from '@/app/components/Image/ImageGallery/ImageGallery.client';
import { PLACEHOLDER_IMAGE } from '@/app/constants';
import { queryProducts } from '@/app/model/store/store-api';
import { PageWrapper } from '@/app/components/Layout/PageWrapper';

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
      return {
        title: product.name,
      };
    }
  }

  return {
    title: 'Unavailable Product',
  };
}

export default async function StoresCategoryPage({ params }: any) {
  if (!params.slug) {
    return;
  }

  const product = (
    await queryProducts({
      slug: params.slug,
      limit: 1,
    })
  )[0];

  if (!product) {
    return;
  }
  return (
    <PageWrapper className="my-20">
      {product ? (
        <div className="full-w">
          <div className="flex flex-col sm:flex-row gap-20">
            <div className="box-border flex flex-col basis-2/3">
              <div>
                <ImageGalleryClient
                  items={product.media!.items!.map(({ image }) => ({
                    src: image!.url!,
                  }))}
                />
                <div className="pb-4 w-full mt-6">
                  {parseProductDescription(product.description ?? '')}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full h-full basis-1/3 text-left">
              <ProductSidebar key={product._id} product={product} />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-3xl w-full text-center p-9 box-border">
          Product Not Found
        </div>
      )}
    </PageWrapper>
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
