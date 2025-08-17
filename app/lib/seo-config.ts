import { Metadata } from 'next';

// Central SEO Configuration
export const SEO_CONFIG = {
  // Site-wide defaults
  site: {
    name: 'The Paper Company',
    shortName: 'Paper Co',
    description:
      'Leading provider of The Paper products with custom dimensions and sustainable materials',
    url: 'https://the.papercompany.ca',
    email: 'info@papercompany.com',
    phone: '+1-555-PAPER-CO',
    logo: '/images/logo.png',
    favicon: '/favicon.ico',
    defaultImage: '/images/hero-background.avif',
    themeColor: '#ffffff',
    backgroundColor: '#ffffff',
    language: 'en',
    locale: 'en_US',
    country: 'US',
    twitterHandle: '@papercompany', // Update with actual handle
  },

  // Social media profiles
  social: {
    facebook: 'https://www.facebook.com/papercompany',
    twitter: 'https://www.twitter.com/papercompany',
    linkedin: 'https://www.linkedin.com/company/papercompany',
    instagram: 'https://www.instagram.com/papercompany',
  },

  // Default keywords that appear on every page
  defaultKeywords: [
    'paper company',
    'The Paper products',
    'custom paper solutions',
    'sustainable paper',
    'paper materials',
    'eco-friendly paper',
    'business paper supplies',
    'custom dimensions paper',
    'quality paper products',
  ],

  // Page-specific SEO configurations
  pages: {
    home: {
      title: 'The Paper Company - Custom Dimensions & Sustainable Materials',
      description:
        'Discover The Paper products with custom dimensions and sustainable materials. Professional quality solutions for all your business needs with exceptional service.',
      keywords: [
        'The Paper products',
        'custom dimensions paper',
        'sustainable paper materials',
        'eco-friendly paper',
        'business paper supplies',
        'paper company homepage',
      ],
      url: '/',
      image: '/images/hero-background.avif',
    },

    store: {
      title: 'Store - The Paper Products Collection',
      description:
        'Browse our complete collection of The Paper products. Custom dimensions available for all products. Sustainable materials and professional quality guaranteed.',
      keywords: [
        'paper products store',
        'The Paper collection',
        'custom paper products',
        'sustainable paper materials',
        'business paper supplies',
      ],
      url: '/store',
      image: '/images/hero-background.avif',
    },

    cart: {
      title: 'Shopping Cart - The Paper Company',
      description:
        'Review your selected The Paper products. Secure checkout with fast shipping for all custom dimension orders.',
      keywords: [
        'paper products cart',
        'checkout',
        'custom paper order',
        'secure shopping',
      ],
      url: '/cart',
      image: '/images/hero-background.avif',
    },

    // Add more page configurations as needed
  },

  // Template configurations for dynamic pages
  templates: {
    product: {
      titleTemplate: (productName: string) =>
        `${productName} - The Paper Products`,
      descriptionTemplate: (product: any) => {
        if (product.description) {
          return product.description.replace(/<[^>]*>/g, '').substring(0, 160);
        }
        return `High-quality ${product.name} with custom dimensions. The Paper products for your business needs.`;
      },
      keywordsTemplate: (product: any) => {
        const keywords = [
          product.name,
          'custom paper',
          'premium quality',
          'sustainable materials',
        ];

        // Add product options as keywords
        if (product.productOptions) {
          product.productOptions.forEach((option: any) => {
            if (option.choices) {
              option.choices.forEach((choice: any) => {
                keywords.push(choice.description);
              });
            }
          });
        }

        return keywords;
      },
      urlTemplate: (slug: string) => `/product-page/${slug}`,
      imageTemplate: (product: any) =>
        product.media?.mainMedia?.image?.url || '/images/hero-background.avif',
    },

    category: {
      titleTemplate: (categoryName: string) =>
        `${categoryName} - Paper Products Collection`,
      descriptionTemplate: (category: any, productCount: number) =>
        category.description ||
        `Explore our ${category.name} collection featuring ${productCount} The Paper products. Custom dimensions available for all products.`,
      keywordsTemplate: (categoryName: string) => [
        categoryName,
        'paper collection',
        'custom paper products',
      ],
      urlTemplate: (slug: string) => `/store/category/${slug}`,
      imageTemplate: (category: any) =>
        category.media?.mainMedia?.image?.url || '/images/hero-background.avif',
    },
  },

  // Google Analytics and other tracking
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID,
    facebookPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
  },

  // Structured data defaults
  structuredData: {
    organization: {
      name: 'The Paper Company',
      legalName: 'The Paper Company LLC',
      description:
        'Leading provider of The Paper products with custom dimensions and sustainable materials',
      foundingDate: '2020-01-01', // Update with actual date
      contactPoint: {
        telephone: '+1-555-PAPER-CO',
        contactType: 'customer service',
        availableLanguage: 'English',
      },
    },
  },
} as const;

// Enhanced SEO metadata generator using centralized config
export interface SEOOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  keywords?: string[];
  noIndex?: boolean;
  canonical?: string;
  ogType?:
  | 'website'
  | 'article'
  | 'book'
  | 'profile'
  | 'music.song'
  | 'music.album'
  | 'music.playlist'
  | 'music.radio_station'
  | 'video.movie'
  | 'video.episode'
  | 'video.tv_show'
  | 'video.other';
}

export function generateSEOMetadata(options: SEOOptions = {}): Metadata {
  const {
    title = SEO_CONFIG.site.name,
    description = SEO_CONFIG.site.description,
    image = SEO_CONFIG.site.defaultImage,
    url = '',
    type = 'website',
    keywords = [],
    noIndex = false,
    canonical,
    ogType,
  } = options;

  const fullUrl = url ? `${SEO_CONFIG.site.url}${url}` : SEO_CONFIG.site.url;
  const fullImageUrl = image.startsWith('http')
    ? image
    : `${SEO_CONFIG.site.url}${image}`;
  const allKeywords = [...SEO_CONFIG.defaultKeywords, ...keywords].join(', ');

  return {
    title: {
      default: title,
      template: `%s | ${SEO_CONFIG.site.name}`,
    },
    description,
    keywords: allKeywords,
    authors: [{ name: SEO_CONFIG.site.name }],
    creator: SEO_CONFIG.site.name,
    publisher: SEO_CONFIG.site.name,
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      type: (ogType || (type === 'product' ? 'website' : type)) as any,
      title,
      description,
      url: fullUrl,
      siteName: SEO_CONFIG.site.name,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: SEO_CONFIG.site.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
      creator: SEO_CONFIG.site.twitterHandle,
    },
    alternates: {
      canonical: canonical || fullUrl,
    },
    other: {
      'theme-color': SEO_CONFIG.site.themeColor,
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
    },
  };
}

// Quick page metadata generators using predefined configurations
export function getPageSEO(pageKey: keyof typeof SEO_CONFIG.pages): Metadata {
  const pageConfig = SEO_CONFIG.pages[pageKey];
  if (!pageConfig) {
    throw new Error(`Page configuration not found for: ${pageKey}`);
  }

  return generateSEOMetadata({
    title: pageConfig.title,
    description: pageConfig.description,
    image: pageConfig.image,
    url: pageConfig.url,
    keywords: [...pageConfig.keywords],
  });
}

// Product SEO generator using template
export function generateProductSEO(product: any): Metadata {
  const template = SEO_CONFIG.templates.product;

  return generateSEOMetadata({
    title: template.titleTemplate(product.name),
    description: template.descriptionTemplate(product),
    image: template.imageTemplate(product),
    url: template.urlTemplate(product.slug),
    type: 'product',
    keywords: template.keywordsTemplate(product),
  });
}

// Category SEO generator using template
export function generateCategorySEO(
  category: any,
  productCount: number
): Metadata {
  const template = SEO_CONFIG.templates.category;

  return generateSEOMetadata({
    title: template.titleTemplate(category.name),
    description: template.descriptionTemplate(category, productCount),
    image: template.imageTemplate(category),
    url: template.urlTemplate(category.slug),
    keywords: template.keywordsTemplate(category.name),
  });
}

// Helper to get structured data for organization
export function getOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_CONFIG.structuredData.organization.name,
    legalName: SEO_CONFIG.structuredData.organization.legalName,
    description: SEO_CONFIG.structuredData.organization.description,
    url: SEO_CONFIG.site.url,
    logo: `${SEO_CONFIG.site.url}${SEO_CONFIG.site.logo}`,
    foundingDate: SEO_CONFIG.structuredData.organization.foundingDate,
    contactPoint: {
      '@type': 'ContactPoint',
      ...SEO_CONFIG.structuredData.organization.contactPoint,
    },
    sameAs: Object.values(SEO_CONFIG.social),
  };
}

// Helper to get website structured data
export function getWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_CONFIG.site.name,
    description: SEO_CONFIG.site.description,
    url: SEO_CONFIG.site.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SEO_CONFIG.site.url}/store?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
