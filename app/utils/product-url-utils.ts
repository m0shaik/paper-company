import { SelectedOptions } from '../hooks/useProductOptions';

/**
 * Generate a shareable URL for a product with pre-selected options
 */
export function generateProductURL(
    baseURL: string,
    options: SelectedOptions,
    additionalParams: Record<string, string> = {}
): string {
    const url = new URL(baseURL, window.location.origin);

    // Add product options to URL
    Object.entries(options).forEach(([key, value]) => {
        if (value && value.trim()) {
            url.searchParams.set(key, value);
        }
    });

    // Add any additional parameters
    Object.entries(additionalParams).forEach(([key, value]) => {
        if (value && value.trim()) {
            url.searchParams.set(key, value);
        }
    });

    return url.toString();
}

/**
 * Parse options from a URL
 */
export function parseOptionsFromURL(url: string): SelectedOptions {
    const urlObj = new URL(url);
    const options: SelectedOptions = {};

    // Skip common non-option params
    const skipParams = ['page', 'sort', 'order', 'limit'];

    urlObj.searchParams.forEach((value, key) => {
        if (!skipParams.includes(key.toLowerCase())) {
            options[key] = decodeURIComponent(value);
        }
    });

    return options;
}

/**
 * Generate a share button URL for social media or messaging
 */
export function generateShareURL(
    productURL: string,
    productName: string,
    platform: 'twitter' | 'facebook' | 'whatsapp' | 'copy' = 'copy'
): string {
    const encodedURL = encodeURIComponent(productURL);
    const encodedText = encodeURIComponent(`Check out this ${productName} configuration:`);

    switch (platform) {
        case 'twitter':
            return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedURL}`;
        case 'facebook':
            return `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`;
        case 'whatsapp':
            return `https://wa.me/?text=${encodedText}%20${encodedURL}`;
        case 'copy':
        default:
            return productURL;
    }
}
