import { Metadata } from 'next';
import {
  generateSEOMetadata as generateSEOMetadataFromConfig,
  generateProductSEO as generateProductSEOFromConfig,
  generateCategorySEO as generateCategorySEOFromConfig,
  getPageSEO,
  SEO_CONFIG,
  type SEOOptions,
} from './seo-config';

// Re-export the main functions for backward compatibility
export const generateSEOMetadata = generateSEOMetadataFromConfig;
export const generateProductSEO = generateProductSEOFromConfig;
export const generateCategorySEO = generateCategorySEOFromConfig;
export { getPageSEO, SEO_CONFIG, type SEOOptions };

// Legacy interface for backward compatibility
export interface SEOConfig extends SEOOptions {}

// Legacy function signatures for backward compatibility
export function generateProductSEO_Legacy(product: any): SEOConfig {
  const template = SEO_CONFIG.templates.product;

  return {
    title: template.titleTemplate(product.name),
    description: template.descriptionTemplate(product),
    image: template.imageTemplate(product),
    url: template.urlTemplate(product.slug),
    type: 'product',
    keywords: template.keywordsTemplate(product),
  };
}

export function generateCategorySEO_Legacy(
  category: any,
  productCount: number
): SEOConfig {
  const template = SEO_CONFIG.templates.category;

  return {
    title: template.titleTemplate(category.name),
    description: template.descriptionTemplate(category, productCount),
    image: template.imageTemplate(category),
    url: template.urlTemplate(category.slug),
    keywords: template.keywordsTemplate(category.name),
  };
}
