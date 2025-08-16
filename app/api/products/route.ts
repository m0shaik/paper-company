import { NextRequest, NextResponse } from 'next/server';
import { queryProducts, queryCollections } from '@/app/model/store/wix-server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit');
        const collectionId = searchParams.get('collectionId');

        // If no specific collection is requested, fetch from multiple categories
        if (!collectionId) {
            // First get all collections
            const collections = await queryCollections();
            console.log('Available collections:', collections.map(c => ({ name: c.name, slug: c.slug, id: c._id })));

            // Fetch products from each collection in parallel for better performance
            const productsPerCategory = Math.ceil(parseInt(limit || '28') / Math.max(collections.length, 1));

            const productPromises = collections
                .filter(collection => collection._id)
                .map(async (collection) => {
                    try {
                        const categoryProducts = await queryProducts({
                            limit: productsPerCategory,
                            collectionId: collection._id!,
                        });
                        console.log(`Found ${categoryProducts.length} products in category: ${collection.name}`);
                        return categoryProducts;
                    } catch (error) {
                        console.error(`Error fetching products from collection ${collection.name}:`, error);
                        return [];
                    }
                });

            // Wait for all requests to complete in parallel
            const allProductArrays = await Promise.all(productPromises);
            const allProducts = allProductArrays.flat();

            // Shuffle the products to mix categories
            const shuffledProducts = allProducts.sort(() => Math.random() - 0.5);

            // Return the requested limit
            const finalProducts = shuffledProducts.slice(0, parseInt(limit || '28'));
            console.log(`Returning ${finalProducts.length} products from ${collections.length} categories`);

            const response = NextResponse.json(finalProducts);
            // Add caching headers for better performance
            response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
            return response;
        } else {
            // Fetch from specific collection
            const products = await queryProducts({
                limit: limit ? parseInt(limit) : undefined,
                collectionId: collectionId,
            });

            const response = NextResponse.json(products);
            // Add caching headers for better performance
            response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
            return response;
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json([], { status: 500 });
    }
}