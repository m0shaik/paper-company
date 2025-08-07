'use client';
import React, { useState, useEffect } from 'react';
import { ProductSidebar } from '@/app/components/Product/ProductSidebar/ProductSidebar';
import ImageGalleryClient from '@/app/components/Image/ImageGallery/ImageGallery.client';
import { VariantGrid } from '@/app/components/Product/VariantGrid/VariantGrid';
import { Variant } from '@/app/model/store/store-api';

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
    const [selectedVariantChoice, setSelectedVariantChoice] = useState<string | null>(null);
    const [availableChoices, setAvailableChoices] = useState<any[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<any>({});

    useEffect(() => {
        // Find the "Variant" option and get its available choices
        const variantOption = product?.productOptions?.find((option: any) => option.name === 'Variant');

        if (variantOption?.choices) {
            const choices = variantOption.choices.filter((choice: any) => choice.visible && choice.inStock);
            setAvailableChoices(choices);

            // Set first choice as selected if available
            if (choices.length > 0 && !selectedVariantChoice) {
                const firstChoice = choices[0].value;
                setSelectedVariantChoice(firstChoice);

                // Update selectedOptions to include the Variant choice
                setSelectedOptions((prev: any) => ({
                    ...prev,
                    'Variant': firstChoice
                }));
            }
        }
    }, [product]);

    // Watch for changes in selectedOptions and sync with selectedVariantChoice
    useEffect(() => {
        if (selectedOptions['Variant'] && selectedOptions['Variant'] !== selectedVariantChoice) {
            setSelectedVariantChoice(selectedOptions['Variant']);
        }
    }, [selectedOptions]);

    const handleVariantSelect = (variant: Variant) => {
        // Extract the variant choice value from the selected variant
        const choiceValue = variant.choices?.['Variant'];
        if (choiceValue) {
            setSelectedVariantChoice(choiceValue);

            // Also update selectedOptions to keep them in sync
            setSelectedOptions((prev: any) => ({
                ...prev,
                'Variant': choiceValue
            }));
        }
    };

    const handleVariantNavigation = (direction: 'up' | 'down') => {
        if (availableChoices.length === 0) return;

        const currentIndex = selectedVariantChoice
            ? availableChoices.findIndex(choice => choice.value === selectedVariantChoice)
            : 0;

        let newIndex: number;
        if (direction === 'up') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : availableChoices.length - 1;
        } else {
            newIndex = currentIndex < availableChoices.length - 1 ? currentIndex + 1 : 0;
        }

        const newChoice = availableChoices[newIndex].value;
        setSelectedVariantChoice(newChoice);

        // Also update selectedOptions to keep them in sync
        setSelectedOptions((prev: any) => ({
            ...prev,
            'Variant': newChoice
        }));
    };

    const handleOptionsChange = (options: any) => {
        setSelectedOptions(options);

        // If the Variant option changed, update our selectedVariantChoice
        if (options['Variant'] && options['Variant'] !== selectedVariantChoice) {
            setSelectedVariantChoice(options['Variant']);
        }
    };

    // Get images for the current selected choice
    const getDisplayImages = () => {
        if (selectedVariantChoice && availableChoices.length > 0) {
            // Find the choice that matches the selected value
            const choice = availableChoices.find(choice => choice.value === selectedVariantChoice);

            if (choice?.media?.mainMedia?.image?.url) {
                return [{ src: choice.media.mainMedia.image.url }];
            } else if (choice?.media?.items?.[0]?.image?.url) {
                return [{ src: choice.media.items[0].image.url }];
            }
        }

        // Fallback: show main product image
        if (product.media?.mainMedia?.image?.url) {
            return [{ src: product.media.mainMedia.image.url }];
        }

        return [];
    };

    // Find the variant that corresponds to the selected choice (for the VariantGrid)
    const getSelectedVariant = () => {
        if (!selectedVariantChoice) return null;

        return product.variants?.find((variant: Variant) =>
            variant.choices?.['Variant'] === selectedVariantChoice
        ) || null;
    };

    return (
        <div className="full-w">
            <div className="flex flex-col sm:flex-row gap-20">
                <div className="box-border flex flex-col basis-2/3">
                    <div>
                        {/* Image Gallery with variant navigation */}
                        <ImageGalleryClient
                            items={getDisplayImages()}
                            onVariantNavigation={handleVariantNavigation}
                            hasVariants={availableChoices.length > 0}
                        />

                        {/* Variant Grid below image gallery */}
                        {availableChoices.length > 0 && (
                            <div className="mt-4">
                                <VariantGrid
                                    variants={product.variants || []}
                                    product={product}
                                    selectedVariant={getSelectedVariant()}
                                    onVariantSelect={handleVariantSelect}
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
                        onOptionsChange={handleOptionsChange}
                    />
                </div>
            </div>
        </div>
    );
};
