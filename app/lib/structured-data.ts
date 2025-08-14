import { Product, Collection } from '@/app/model/store/store-api';
import {
  SEO_CONFIG,
  getOrganizationStructuredData,
  getWebsiteStructuredData,
} from './seo-config';

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

// Re-export the centralized functions
export const generateOrganizationSchema = getOrganizationStructuredData;
export const generateWebsiteSchema = getWebsiteStructuredData;

export function generateProductSchema(product: Product): StructuredData {
  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description:
      product.description?.replace(/<[^>]*>/g, '') ||
      `Premium ${product.name} with custom dimensions available`,
    image:
      product.media?.mainMedia?.image?.url ||
      `${SEO_CONFIG.site.url}${SEO_CONFIG.site.defaultImage}`,
    url: `${SEO_CONFIG.site.url}/product-page/${product.slug}`,
    brand: {
      '@type': 'Brand',
      name: SEO_CONFIG.site.name,
    },
    manufacturer: {
      '@type': 'Organization',
      name: SEO_CONFIG.site.name,
    },
    category: 'Paper Products',
    offers: {
      '@type': 'Offer',
      price: product.price?.price || '0',
      priceCurrency: product.price?.currency || 'USD',
      availability: product.stock?.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: SEO_CONFIG.site.name,
      },
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: product.price?.price || '0',
        priceCurrency: product.price?.currency || 'USD',
        valueAddedTaxIncluded: true,
      },
    },
  };

  // Add product variants if available
  if (product.variants && product.variants.length > 0) {
    schema.model = product.variants.map((variant) => ({
      '@type': 'ProductModel',
      name: `${product.name} - ${
        Array.isArray(variant.choices)
          ? variant.choices.map((c: any) => c.description).join(', ')
          : 'Variant'
      }`,
      offers: {
        '@type': 'Offer',
        price: variant.variant?.priceData?.price || product.price?.price || '0',
        priceCurrency:
          variant.variant?.priceData?.currency ||
          product.price?.currency ||
          'USD',
        availability: variant.stock?.inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      },
    }));
  }

  return schema;
}

export function generateCollectionSchema(
  collection: Collection,
  products: Product[]
): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${collection.name} - Paper Products Collection`,
    description:
      collection.description ||
      `Explore our ${collection.name} collection featuring premium paper products`,
    url: `${SEO_CONFIG.site.url}/store/category/${collection.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      name: collection.name,
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          url: `${SEO_CONFIG.site.url}/product-page/${product.slug}`,
          image: product.media?.mainMedia?.image?.url,
          offers: {
            '@type': 'Offer',
            price: product.price?.price || '0',
            priceCurrency: product.price?.currency || 'USD',
          },
        },
      })),
    },
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${SEO_CONFIG.site.url}${item.url}` : undefined,
    })),
  };
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
