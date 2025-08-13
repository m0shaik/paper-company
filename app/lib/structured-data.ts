import { Product, Collection } from '@/app/model/store/store-api';

export interface StructuredData {
    '@context': string;
    '@type': string;
    [key: string]: any;
}

export function generateOrganizationSchema(): StructuredData {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Premium Paper Company',
        description: 'Leading provider of premium paper products with custom dimensions and sustainable materials',
        url: process.env.NEXT_PUBLIC_BASE_URL || 'https://yoursite.com',
        logo: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://yoursite.com'}/images/logo.png`,
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-555-PAPER-CO', // Update with your actual phone
            contactType: 'customer service',
            availableLanguage: 'English'
        },
        sameAs: [
            // Add your social media URLs
            'https://www.facebook.com/papercompany',
            'https://www.twitter.com/papercompany',
            'https://www.linkedin.com/company/papercompany'
        ]
    };
}

export function generateWebsiteSchema(): StructuredData {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yoursite.com';

    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Premium Paper Company',
        description: 'Premium paper products with custom dimensions and sustainable materials',
        url: baseUrl,
        potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/store?search={search_term_string}`,
            'query-input': 'required name=search_term_string'
        }
    };
}

export function generateProductSchema(product: Product): StructuredData {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yoursite.com';

    const schema: StructuredData = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description?.replace(/<[^>]*>/g, '') || `Premium ${product.name} with custom dimensions available`,
        image: product.media?.mainMedia?.image?.url || `${baseUrl}/images/hero-background.avif`,
        url: `${baseUrl}/product-page/${product.slug}`,
        brand: {
            '@type': 'Brand',
            name: 'Premium Paper Company'
        },
        manufacturer: {
            '@type': 'Organization',
            name: 'Premium Paper Company'
        },
        category: 'Paper Products',
        offers: {
            '@type': 'Offer',
            price: product.price?.price || '0',
            priceCurrency: product.price?.currency || 'USD',
            availability: product.stock?.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            seller: {
                '@type': 'Organization',
                name: 'Premium Paper Company'
            },
            priceSpecification: {
                '@type': 'PriceSpecification',
                price: product.price?.price || '0',
                priceCurrency: product.price?.currency || 'USD',
                valueAddedTaxIncluded: true
            }
        }
    };

    // Add product variants if available
    if (product.variants && product.variants.length > 0) {
        schema.model = product.variants.map(variant => ({
            '@type': 'ProductModel',
            name: `${product.name} - ${Array.isArray(variant.choices) ? variant.choices.map((c: any) => c.description).join(', ') : 'Variant'}`,
            offers: {
                '@type': 'Offer',
                price: variant.variant?.priceData?.price || product.price?.price || '0',
                priceCurrency: variant.variant?.priceData?.currency || product.price?.currency || 'USD',
                availability: variant.stock?.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
            }
        }));
    }

    return schema;
}

export function generateCollectionSchema(collection: Collection, products: Product[]): StructuredData {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yoursite.com';

    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${collection.name} - Paper Products Collection`,
        description: collection.description || `Explore our ${collection.name} collection featuring premium paper products`,
        url: `${baseUrl}/store/category/${collection.slug}`,
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
                    url: `${baseUrl}/product-page/${product.slug}`,
                    image: product.media?.mainMedia?.image?.url,
                    offers: {
                        '@type': 'Offer',
                        price: product.price?.price || '0',
                        priceCurrency: product.price?.currency || 'USD'
                    }
                }
            }))
        }
    };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url?: string }>): StructuredData {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yoursite.com';

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url ? `${baseUrl}${item.url}` : undefined
        }))
    };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): StructuredData {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    };
}
