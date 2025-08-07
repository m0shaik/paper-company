'use client';
import { Button } from '@/app/components/ui/button';
import { Variant, Product } from '@/app/model/store/store-api';
import { ArrowLeft, Check } from 'lucide-react';

interface VariantGridProps {
    variants: Variant[];
    product: Product;
    selectedVariant: Variant | null;
    onVariantSelect: (variant: Variant) => void;
    onBackToGrid?: () => void;
    showBackButton?: boolean;
}

export const VariantGrid: React.FC<VariantGridProps> = ({
    variants,
    product,
    selectedVariant,
    onVariantSelect,
    onBackToGrid,
    showBackButton = false,
}) => {
    // Find the "Variant" option in productOptions
    const variantOption = product.productOptions?.find(option => option.name === 'Variant');

    if (!variantOption || !variantOption.choices) {
        return null;
    }

    // Get the available choices from the Variant option (filter out invisible/out-of-stock)
    const availableChoices = variantOption.choices.filter(choice =>
        choice.visible && choice.inStock
    );

    if (availableChoices.length === 0) {
        return null;
    }

    // Get currently selected variant choice value
    const selectedVariantChoice = selectedVariant?.choices?.['Variant'];

    return (
        <div className="w-full glass-card rounded-lg p-6 shadow-lg">
            {showBackButton && onBackToGrid && (
                <div className="mb-4">
                    <Button
                        variant="ghost"
                        onClick={onBackToGrid}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Options
                    </Button>
                </div>
            )}

            <div className="grid grid-cols-4 gap-4">
                {availableChoices.map((choice) => {
                    // Get the image from the choice's media
                    const imageUrl = choice.media?.mainMedia?.image?.url ||
                        choice.media?.items?.[0]?.image?.url;

                    const correspondingVariant = variants.find(variant =>
                        variant.choices?.['Variant'] === choice.value
                    );

                    const isSelected = selectedVariantChoice === choice.value;

                    return (
                        <div
                            key={choice.value}
                            className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${isSelected
                                ? 'border-primary-500 ring-2 ring-primary-200'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                            onClick={() => {
                                if (correspondingVariant) {
                                    onVariantSelect(correspondingVariant);
                                }
                            }}
                        >
                            <div className="aspect-square bg-gray-100">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={`${choice.description} variant`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                                        <div className="text-center">
                                            <div className="text-2xl mb-2">📦</div>
                                            <span className="text-sm">{choice.description}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Variant info overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                                <div className="text-white text-sm font-medium">
                                    {choice.description}
                                </div>
                            </div>

                            {/* Selection indicator */}
                            {isSelected && (
                                <div className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
