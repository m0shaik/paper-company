import { Metadata } from 'next';

export interface SEOConfig {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: 'website' | 'product' | 'article';
    keywords?: string[];
    noIndex?: boolean;
}

export function generateSEOMetadata({
    title,
    description,
    image = '/images/hero-background.avif',
    url,
    type = 'website',
    keywords = [],
    noIndex = false
}: SEOConfig): Metadata {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yoursite.com';
    const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
    const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

    const defaultKeywords = [
        'paper company',
        'premium paper products',
        'custom paper solutions',
        'sustainable paper',
        'paper materials',
        'eco-friendly paper',
        'business paper supplies',
        'custom dimensions paper',
        'quality paper products'
    ];

    const allKeywords = [...defaultKeywords, ...keywords].join(', ');

    return {
        title: {
            default: title,
            template: `%s | Premium Paper Company`
        },
        description,
        keywords: allKeywords,
        authors: [{ name: 'Premium Paper Company' }],
        creator: 'Premium Paper Company',
        publisher: 'Premium Paper Company',
        robots: noIndex ? 'noindex, nofollow' : 'index, follow',
        openGraph: {
            type: type === 'product' ? 'website' : type,
            title,
            description,
            url: fullUrl,
            siteName: 'Premium Paper Company',
            images: [
                {
                    url: fullImageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                }
            ],
            locale: 'en_US',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [fullImageUrl],
            creator: '@papercompany', // Update with your actual Twitter handle
        },
        alternates: {
            canonical: fullUrl,
        },
        other: {
            'theme-color': '#ffffff',
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-status-bar-style': 'default',
        }
    };
}

export function generateProductSEO(product: any): SEOConfig {
    const productKeywords = [
        product.name,
        'custom paper',
        'premium quality',
        'sustainable materials'
    ];

    if (product.productOptions) {
        product.productOptions.forEach((option: any) => {
            if (option.choices) {
                option.choices.forEach((choice: any) => {
                    productKeywords.push(choice.description);
                });
            }
        });
    }

    return {
        title: `${product.name} - Premium Paper Products`,
        description: product.description
            ? product.description.replace(/<[^>]*>/g, '').substring(0, 160)
            : `High-quality ${product.name} with custom dimensions. Premium paper products for your business needs.`,
        image: product.media?.mainMedia?.image?.url || '/images/hero-background.avif',
        url: `/product-page/${product.slug}`,
        type: 'product',
        keywords: productKeywords
    };
}

export function generateCategorySEO(category: any, productCount: number): SEOConfig {
    return {
        title: `${category.name} - Paper Products Collection`,
        description: category.description ||
            `Explore our ${category.name} collection featuring ${productCount} premium paper products. Custom dimensions available for all products.`,
        image: category.media?.mainMedia?.image?.url || '/images/hero-background.avif',
        url: `/store/category/${category.slug}`,
        type: 'website',
        keywords: [category.name, 'paper collection', 'custom paper products']
    };
}
