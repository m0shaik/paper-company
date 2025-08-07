'use client';
import React from 'react';
import { ProductSidebar } from '@/app/components/Product/ProductSidebar/ProductSidebar';
import ImageGalleryClient from '@/app/components/Image/ImageGallery/ImageGallery.client';
import { VariantGrid } from '@/app/components/Product/VariantGrid/VariantGrid';
import { useProductOptions } from '@/app/hooks/useProductOptions';
import { ImageSkeleton, ProductSidebarSkeleton, VariantGridSkeleton } from '@/app/components/Skeletons/Skeletons';

interface ProductPageClientProps {
    product: any;
}

// Helper function to parse and style product description
function parseProductDescription(htmlDescription: string) {
    // Remove HTML tags but preserve structure with line breaks
    const withLineBreaks = htmlDescription
        .replace(/<\/p>/gi, '\n\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/div>/gi, '\n')
        .replace(/<\/h[1-6]>/gi, '\n\n');

    // Remove remaining HTML tags
    const textOnly = withLineBreaks.replace(/<[^>]*>/g, '');

    // Clean up extra whitespace and normalize line breaks
    const cleaned = textOnly
        .replace(/\n\s*\n\s*\n/g, '\n\n') // Replace multiple line breaks with double
        .replace(/^\s+|\s+$/g, '') // Trim start and end
        .split('\n\n'); // Split into paragraphs

    return cleaned.map((paragraph, index) => (
        paragraph.trim() && (
            <p key={index} className="voice-base text-ink mb-4 last:mb-0">
                {paragraph.trim()}
            </p>
        )
    )).filter(Boolean);
}

export const ProductPageClient: React.FC<ProductPageClientProps> = ({ product }) => {
    const {
        selectedOptions,
        selectedVariant,
        availableVariantChoices,
        selectVariant,
        navigateVariant,
        getVariantImages,
        updateOptions,
        isReady
    } = useProductOptions({ product, syncWithURL: true });

    // Show skeletons while loading URL parameters
    if (!isReady) {
        return (
            <div className="full-w">
                <div className="flex flex-col sm:flex-row gap-20">
                    <div className="box-border flex flex-col basis-2/3">
                        <div>
                            {/* Image Gallery Skeleton */}
                            <ImageSkeleton className="w-full h-96" />

                            {/* Variant Grid Skeleton */}
                            <div className="mt-4">
                                <VariantGridSkeleton />
                            </div>

                            {/* Product Description Skeleton */}
                            <div className="glass-card rounded-lg p-6 shadow-lg w-full mt-6">
                                <div className="space-y-4">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full basis-1/3 text-left">
                        <ProductSidebarSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="full-w">
            <div className="flex flex-col sm:flex-row gap-20">
                <div className="box-border flex flex-col basis-2/3">
                    <div>
                        {/* Image Gallery with variant navigation */}
                        <ImageGalleryClient
                            items={getVariantImages()}
                            onVariantNavigation={navigateVariant}
                            hasVariants={availableVariantChoices.length > 0}
                        />

                        {/* Variant Grid below image gallery */}
                        {availableVariantChoices.length > 0 && (
                            <div className="mt-4">
                                <VariantGrid
                                    variants={product.variants || []}
                                    product={product}
                                    selectedVariant={selectedVariant}
                                    onVariantSelect={selectVariant}
                                />
                            </div>
                        )}

                        <div className="glass-card rounded-lg p-6 shadow-lg w-full mt-6">
                            {parseProductDescription(product.description ?? '')}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full h-full basis-1/3 text-left">
                    <ProductSidebar
                        key={product._id}
                        product={product}
                        externalSelectedOptions={selectedOptions}
                        onOptionsChange={updateOptions}
                    />
                </div>
            </div>
        </div>
    );
};
