'use client';
import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { SelectedOptions } from '@/app/hooks/useProductOptions';
import { generateProductURL, generateShareURL } from '@/app/utils/product-url-utils';
import { Share, Copy, Check } from 'lucide-react';

interface ShareProductProps {
    productSlug: string;
    productName: string;
    selectedOptions: SelectedOptions;
    className?: string;
}

export const ShareProduct: React.FC<ShareProductProps> = ({
    productSlug,
    productName,
    selectedOptions,
    className = ''
}) => {
    const [copied, setCopied] = useState(false);

    const shareableURL = generateProductURL(`/product-page/${productSlug}`, selectedOptions);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareableURL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
            // Fallback for browsers that don't support clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = shareableURL;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleShare = (platform: 'twitter' | 'facebook' | 'whatsapp') => {
        const shareURL = generateShareURL(shareableURL, productName, platform);
        window.open(shareURL, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="flex items-center gap-2"
            >
                {copied ? (
                    <>
                        <Check className="w-4 h-4" />
                        Copied!
                    </>
                ) : (
                    <>
                        <Copy className="w-4 h-4" />
                        Copy Link
                    </>
                )}
            </Button>

            {/* Share dropdown or buttons */}
            <div className="flex items-center gap-1">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('whatsapp')}
                    className="px-2"
                    title="Share on WhatsApp"
                >
                    <Share className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};
