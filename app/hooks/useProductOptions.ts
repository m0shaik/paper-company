'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Product, Variant, ProductOption } from '@/app/model/store/types';

export type SelectedOptions = Record<string, string>;

interface UseProductOptionsProps {
    product: Product;
    initialOptions?: SelectedOptions;
    syncWithURL?: boolean;
}

interface UseProductOptionsReturn {
    selectedOptions: SelectedOptions;
    selectedVariant: Variant | null;
    availableVariantChoices: any[];
    updateOption: (optionName: string, value: string) => void;
    updateOptions: (options: SelectedOptions) => void;
    selectVariant: (variant: Variant) => void;
    navigateVariant: (direction: 'up' | 'down') => void;
    isAllOptionsSelected: boolean;
    getVariantImages: () => { src: string }[];
    resetToDefaults: () => void;
    isReady: boolean;
}

export const useProductOptions = ({
    product,
    initialOptions,
    syncWithURL = false
}: UseProductOptionsProps): UseProductOptionsReturn => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
    const [isReady, setIsReady] = useState(false);

    // Parse options from URL if syncWithURL is enabled
    const getOptionsFromURL = useCallback((): SelectedOptions => {
        if (!syncWithURL) return {};

        const optionsFromURL: SelectedOptions = {};
        searchParams.forEach((value, key) => {
            // Skip non-option params
            if (!['page', 'sort', 'order', 'limit'].includes(key.toLowerCase())) {
                optionsFromURL[key] = decodeURIComponent(value);
            }
        });
        return optionsFromURL;
    }, [searchParams, syncWithURL]);

    // Update URL with current options
    const updateURL = useCallback((options: SelectedOptions) => {
        if (!syncWithURL) return;

        const params = new URLSearchParams(searchParams.toString());

        // Remove existing option params (keep other params)
        const paramsToKeep = ['page', 'sort', 'order', 'limit'];
        const currentParams = Array.from(params.keys());

        currentParams.forEach(key => {
            if (!paramsToKeep.includes(key.toLowerCase())) {
                params.delete(key);
            }
        });

        // Add new options to URL
        Object.entries(options).forEach(([key, value]) => {
            if (value && value.trim()) {
                params.set(key, encodeURIComponent(value));
            }
        });

        const newURL = `${pathname}${params.toString() ? `?${params.toString()}` : ''}`;
        router.replace(newURL, { scroll: false });
    }, [router, pathname, searchParams, syncWithURL]);

    // Get available variant choices
    const availableVariantChoices = useMemo(() => {
        const variantOption = product?.productOptions?.find(
            (option: ProductOption) => option.name === 'Variant'
        );

        if (variantOption?.choices) {
            return variantOption.choices.filter((choice: any) =>
                choice.visible && choice.inStock
            );
        }
        return [];
    }, [product]);

    // Get default options
    const getDefaultOptions = useCallback((): SelectedOptions => {
        const defaults: SelectedOptions = {};

        product.productOptions?.forEach((option) => {
            if (option.choices && option.choices.length > 0 && option.name) {
                // For variant options, use the first available choice
                if (option.name === 'Variant' && availableVariantChoices.length > 0) {
                    const firstChoice = availableVariantChoices[0];
                    if (firstChoice?.value) {
                        defaults[option.name] = firstChoice.value;
                    }
                } else if (option.choices[0]?.description) {
                    defaults[option.name] = option.choices[0].description;
                }
            }
        });

        return defaults;
    }, [product, availableVariantChoices]);

    // Initialize options (from URL, initialOptions, or defaults)
    useEffect(() => {
        if (syncWithURL) {
            const urlOptions = getOptionsFromURL();
            if (Object.keys(urlOptions).length > 0) {
                setSelectedOptions(urlOptions);
            } else if (initialOptions) {
                setSelectedOptions(initialOptions);
                updateURL(initialOptions);
            } else {
                const defaults = getDefaultOptions();
                setSelectedOptions(defaults);
                updateURL(defaults);
            }
        } else {
            setSelectedOptions(initialOptions || getDefaultOptions());
        }
        setIsReady(true);
    }, [syncWithURL, initialOptions, getDefaultOptions, getOptionsFromURL, updateURL]);

    // Find selected variant based on current options
    const selectedVariant = useMemo((): Variant | null => {
        if (!product.manageVariants || !product.variants) {
            return null;
        }

        // Check if all required options are selected
        const requiredOptionsCount = product.productOptions?.length || 0;
        const selectedOptionsCount = Object.keys(selectedOptions).length;

        if (selectedOptionsCount < requiredOptionsCount) {
            return null;
        }

        // Find matching variant
        return product.variants.find((variant: Variant) =>
            Object.keys(variant.choices || {}).every(
                (choiceKey) => selectedOptions[choiceKey] === variant.choices![choiceKey]
            )
        ) || null;
    }, [selectedOptions, product]);

    // Check if all options are selected
    const isAllOptionsSelected = useMemo(() => {
        if (!product.productOptions) return true;

        return product.productOptions.every(option =>
            selectedOptions[option.name!] !== undefined
        );
    }, [selectedOptions, product.productOptions]);

    // Update a single option
    const updateOption = useCallback((optionName: string, value: string) => {
        const newOptions = { ...selectedOptions, [optionName]: value };
        setSelectedOptions(newOptions);
        if (syncWithURL) {
            updateURL(newOptions);
        }
    }, [selectedOptions, syncWithURL, updateURL]);

    // Update multiple options
    const updateOptions = useCallback((options: SelectedOptions) => {
        setSelectedOptions(options);
        if (syncWithURL) {
            updateURL(options);
        }
    }, [syncWithURL, updateURL]);

    // Select a variant and update options accordingly
    const selectVariant = useCallback((variant: Variant) => {
        if (variant.choices) {
            const newOptions = { ...selectedOptions, ...variant.choices };
            setSelectedOptions(newOptions);
            if (syncWithURL) {
                updateURL(newOptions);
            }
        }
    }, [selectedOptions, syncWithURL, updateURL]);

    // Navigate through variants
    const navigateVariant = useCallback((direction: 'up' | 'down') => {
        if (availableVariantChoices.length === 0) return;

        const currentVariantChoice = selectedOptions['Variant'];
        const currentIndex = currentVariantChoice
            ? availableVariantChoices.findIndex(choice => choice.value === currentVariantChoice)
            : 0;

        let newIndex: number;
        if (direction === 'up') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : availableVariantChoices.length - 1;
        } else {
            newIndex = currentIndex < availableVariantChoices.length - 1 ? currentIndex + 1 : 0;
        }

        const newChoice = availableVariantChoices[newIndex];
        if (newChoice?.value) {
            updateOption('Variant', newChoice.value);
        }
    }, [availableVariantChoices, selectedOptions, updateOption]);

    // Get images for current selection
    const getVariantImages = useCallback((): { src: string }[] => {
        const currentVariantChoice = selectedOptions['Variant'];

        if (currentVariantChoice && availableVariantChoices.length > 0) {
            const choice = availableVariantChoices.find(choice => choice.value === currentVariantChoice);

            if (choice?.media?.mainMedia?.image?.url) {
                return [{ src: choice.media.mainMedia.image.url }];
            } else if (choice?.media?.items?.[0]?.image?.url) {
                return [{ src: choice.media.items[0].image.url }];
            }
        }

        // Fallback to main product image
        if (product.media?.mainMedia?.image?.url) {
            return [{ src: product.media.mainMedia.image.url }];
        }

        return [];
    }, [selectedOptions, availableVariantChoices, product]);

    // Reset to default options
    const resetToDefaults = useCallback(() => {
        const defaults = getDefaultOptions();
        setSelectedOptions(defaults);
        if (syncWithURL) {
            updateURL(defaults);
        }
    }, [getDefaultOptions, syncWithURL, updateURL]);

    return {
        selectedOptions,
        selectedVariant,
        availableVariantChoices,
        updateOption,
        updateOptions,
        selectVariant,
        navigateVariant,
        isAllOptionsSelected,
        getVariantImages,
        resetToDefaults,
        isReady,
    };
};
