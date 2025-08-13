import { MetadataRoute } from 'next';
import { queryProducts, queryCollections } from '@/app/model/store/store-api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yoursite.com';

    const staticRoutes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/store`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
    ];

    try {
        // Get all products
        const products = await queryProducts({ limit: 1000 });
        const productRoutes = products.map(product => ({
            url: `${baseUrl}/product-page/${product.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));

        // Get all collections/categories
        const collections = await queryCollections({ limit: 100 });
        const categoryRoutes = collections.map(collection => ({
            url: `${baseUrl}/store/category/${collection.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }));

        return [...staticRoutes, ...productRoutes, ...categoryRoutes];
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return staticRoutes;
    }
}
