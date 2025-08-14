# Centralized SEO Management Guide

This guide explains how to use the centralized SEO configuration system that was implemented to manage all SEO settings from one place.

## Overview

The new SEO system centralizes all SEO-related configurations in `/app/lib/seo-config.ts`, eliminating the need to duplicate SEO settings across multiple files.

## File Structure

```
app/lib/
├── seo-config.ts      # Central SEO configuration (NEW)
├── seo.ts             # Backward compatibility layer
└── structured-data.ts # Updated to use centralized config
```

## Central Configuration (`seo-config.ts`)

The `SEO_CONFIG` object contains all site-wide SEO settings:

### Site-wide Settings

```typescript
SEO_CONFIG.site = {
  name: 'Premium Paper Company',
  description: 'Leading provider of premium paper products...',
  url: process.env.NEXT_PUBLIC_BASE_URL,
  defaultImage: '/images/hero-background.avif',
  // ... more settings
};
```

### Social Media Links

```typescript
SEO_CONFIG.social = {
  facebook: 'https://www.facebook.com/papercompany',
  twitter: 'https://www.twitter.com/papercompany',
  // ... more platforms
};
```

### Page-specific Configurations

```typescript
SEO_CONFIG.pages = {
  home: {
    title: 'Premium Paper Company - Custom Dimensions...',
    description: 'Discover premium paper products...',
    keywords: ['premium paper products', '...'],
    url: '/',
  },
  store: {
    /* ... */
  },
  cart: {
    /* ... */
  },
};
```

### Template Configurations

For dynamic pages (products, categories), templates define how SEO is generated:

```typescript
SEO_CONFIG.templates = {
  product: {
    titleTemplate: (productName) => `${productName} - Premium Paper Products`,
    descriptionTemplate: (product) => {
      /* logic */
    },
    keywordsTemplate: (product) => {
      /* logic */
    },
    // ...
  },
  category: {
    /* ... */
  },
};
```

## How to Use

### 1. Static Pages

For pages with fixed content, use the predefined page configurations:

```tsx
import { getPageSEO } from '@/app/lib/seo';

export const metadata: Metadata = getPageSEO('home');
// Available keys: 'home', 'store', 'cart'
```

### 2. Dynamic Pages

#### Products

```tsx
import { generateProductSEO } from '@/app/lib/seo';

export async function generateMetadata({ params }: any) {
  const product = await getProduct(params.slug);
  return generateProductSEO(product);
}
```

#### Categories

```tsx
import { generateCategorySEO } from '@/app/lib/seo';

export async function generateMetadata({ params }: any) {
  const category = await getCategory(params.category);
  const productCount = await getProductCount(category.id);
  return generateCategorySEO(category, productCount);
}
```

### 3. Custom SEO

For pages needing custom SEO that's not predefined:

```tsx
import { generateSEOMetadata } from '@/app/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Custom Page Title',
  description: 'Custom description',
  keywords: ['custom', 'keywords'],
  url: '/custom-page',
});
```

## Adding New Pages

### 1. Add to Page Configurations

Edit `/app/lib/seo-config.ts` and add your page to `SEO_CONFIG.pages`:

```typescript
SEO_CONFIG.pages = {
  // ... existing pages
  about: {
    title: 'About Us - Premium Paper Company',
    description: 'Learn about our commitment to quality...',
    keywords: ['about us', 'company history', 'paper expertise'],
    url: '/about',
    image: '/images/about-hero.avif',
  },
};
```

### 2. Use in Your Page Component

```tsx
import { getPageSEO } from '@/app/lib/seo';

export const metadata: Metadata = getPageSEO('about');
```

## Adding New Dynamic Page Types

### 1. Add Template Configuration

```typescript
SEO_CONFIG.templates = {
  // ... existing templates
  blog: {
    titleTemplate: (post) => `${post.title} - Paper Company Blog`,
    descriptionTemplate: (post) => post.excerpt || `Read about ${post.title}`,
    keywordsTemplate: (post) => [...post.tags, 'blog', 'paper industry'],
    urlTemplate: (slug) => `/blog/${slug}`,
    imageTemplate: (post) => post.featured_image || '/images/blog-default.avif',
  },
};
```

### 2. Create Generator Function

```typescript
export function generateBlogSEO(post: any): Metadata {
  const template = SEO_CONFIG.templates.blog;

  return generateSEOMetadata({
    title: template.titleTemplate(post),
    description: template.descriptionTemplate(post),
    image: template.imageTemplate(post),
    url: template.urlTemplate(post.slug),
    type: 'article',
    keywords: template.keywordsTemplate(post),
  });
}
```

## Updating Site-wide Settings

All site-wide changes are made in one place. For example, to update the company name:

1. Edit `SEO_CONFIG.site.name` in `/app/lib/seo-config.ts`
2. The change applies automatically to all pages

## Structured Data Integration

The structured data system also uses the centralized configuration:

```typescript
import {
  getOrganizationStructuredData,
  getWebsiteStructuredData,
} from '@/app/lib/seo-config';

// These now use the centralized config
const organizationSchema = getOrganizationStructuredData();
const websiteSchema = getWebsiteStructuredData();
```

## Benefits

1. **Single Source of Truth**: All SEO settings in one file
2. **Consistency**: Ensures consistent SEO across the site
3. **Maintainability**: Easy to update site-wide SEO settings
4. **Scalability**: Easy to add new pages and page types
5. **Type Safety**: TypeScript ensures correct usage
6. **Backward Compatibility**: Existing code continues to work

## Migration from Old System

The old SEO functions are still available for backward compatibility:

- `generateSEOMetadata()` - still works but now uses centralized config
- `generateProductSEO()` - still works with improved templates
- `generateCategorySEO()` - still works with improved templates

New code should prefer:

- `getPageSEO()` for static pages
- Template-based generators for dynamic pages

## Environment Variables

Make sure these are set:

- `NEXT_PUBLIC_BASE_URL` - Your site's base URL
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics ID (optional)
- `NEXT_PUBLIC_GTM_ID` - Google Tag Manager ID (optional)
- `NEXT_PUBLIC_FB_PIXEL_ID` - Facebook Pixel ID (optional)

## Troubleshooting

### Page Configuration Not Found

If you get an error about page configuration not found:

1. Check that the page key exists in `SEO_CONFIG.pages`
2. Ensure you're using the correct key name
3. Add the page configuration if it doesn't exist

### TypeScript Errors

If you see TypeScript errors:

1. Ensure you're importing the correct functions
2. Check that your data matches the expected types
3. Use `any` type temporarily if needed for complex data structures

### Missing SEO Data

If SEO data appears incorrect:

1. Check the centralized configuration
2. Verify environment variables are set
3. Clear Next.js cache: `rm -rf .next`
