'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { SelectedOptions } from './useProductOptions';

interface UseURLOptionsProps {
    initialOptions?: SelectedOptions;
    onOptionsChange?: (options: SelectedOptions) => void;
}

interface UseURLOptionsReturn {
    urlOptions: SelectedOptions;
    updateURLOptions: (options: SelectedOptions) => void;
    updateSingleURLOption: (key: string, value: string) => void;
    clearURLOptions: () => void;
    isReady: boolean;
}

export const useURLOptions = ({
    initialOptions = {},
    onOptionsChange
}: UseURLOptionsProps = {}): UseURLOptionsReturn => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isReady, setIsReady] = useState(false);
    const [urlOptions, setUrlOptions] = useState<SelectedOptions>({});

    // Parse URL params on mount and when search params change
    useEffect(() => {
        const optionsFromURL: SelectedOptions = {};

        // Parse all search params as potential options
        searchParams.forEach((value, key) => {
            // Skip non-option params (like page, sort, etc.)
            if (!['page', 'sort', 'order', 'limit'].includes(key.toLowerCase())) {
                optionsFromURL[key] = decodeURIComponent(value);
            }
        });

        setUrlOptions(optionsFromURL);
        setIsReady(true);

        // Notify parent component about URL options
        if (onOptionsChange && Object.keys(optionsFromURL).length > 0) {
            onOptionsChange(optionsFromURL);
        }
    }, [searchParams, onOptionsChange]);

    // Update URL with new options
    const updateURL = useCallback((options: SelectedOptions) => {
        const params = new URLSearchParams(searchParams.toString());

        // Remove all existing option params (keep other params like page, sort, etc.)
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

        // Use replace to avoid adding to history for every option change
        router.replace(newURL, { scroll: false });
    }, [router, pathname, searchParams]);

    // Update all options
    const updateURLOptions = useCallback((options: SelectedOptions) => {
        setUrlOptions(options);
        updateURL(options);
    }, [updateURL]);

    // Update single option
    const updateSingleURLOption = useCallback((key: string, value: string) => {
        const newOptions = { ...urlOptions, [key]: value };
        setUrlOptions(newOptions);
        updateURL(newOptions);
    }, [urlOptions, updateURL]);

    // Clear all options
    const clearURLOptions = useCallback(() => {
        setUrlOptions({});
        updateURL({});
    }, [updateURL]);

    return {
        urlOptions,
        updateURLOptions,
        updateSingleURLOption,
        clearURLOptions,
        isReady,
    };
};
