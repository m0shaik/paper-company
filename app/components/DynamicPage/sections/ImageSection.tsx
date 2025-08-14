'use client';

import React from 'react';
import { ImageSectionData } from '../types';

interface ImageSectionProps {
  data: ImageSectionData;
  isPreview?: boolean;
  isInCombinedLayout?: boolean; // New prop to indicate if it's in a side-by-side layout
}

const ImageSection: React.FC<ImageSectionProps> = ({
  data,
  isPreview = false,
  isInCombinedLayout = false,
}) => {
  const { imageUrl, alt, caption } = data;

  // Handle Wix image URLs properly
  const processWixImageUrl = (url: string): string => {
    if (!url.includes('wix:image://')) {
      return url;
    }

    try {
      // Extract the image ID and filename from wix:image://v1/imageId~transformations/filename
      const match = url.match(/wix:image:\/\/v1\/([^\/]+)\/([^#]*)/);
      if (match) {
        const imageId = match[1];
        const filename = decodeURIComponent(match[2] || '');

        // Try different Wix CDN formats
        // Format 1: Direct media URL with image ID
        return `https://static.wixstatic.com/media/${imageId}`;
      }

      // Fallback: try to extract just the image ID part
      const simpleMatch = url.match(/wix:image:\/\/v1\/([^~#]+)/);
      if (simpleMatch) {
        return `https://static.wixstatic.com/media/${simpleMatch[1]}`;
      }
    } catch (error) {
      console.error('Error processing Wix image URL:', error);
    }

    return url; // Fallback to original URL
  };

  const processedImageUrl = processWixImageUrl(imageUrl);

  // Different layout for combined vs standalone
  if (isInCombinedLayout) {
    return (
      <div>
        <img
          src={processedImageUrl}
          alt={alt || 'Image'}
          className="w-full rounded-lg shadow-lg object-cover"
          style={{ maxHeight: '500px' }}
          onError={(e) => {
            console.error('Image failed to load:', imageUrl);
            // Try without processing first
            if (e.currentTarget.src !== imageUrl) {
              console.log('Trying original URL...');
              e.currentTarget.src = imageUrl;
            } else {
              // If original also fails, show placeholder
              console.log('Using placeholder image');
              e.currentTarget.src =
                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+PC9zdmc+';
              e.currentTarget.alt = 'Image not available';
            }
          }}
        />
        {caption && (
          <p className="text-gray-600 text-sm mt-4 italic">{caption}</p>
        )}
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="text-center">
        <img
          src={processedImageUrl}
          alt={alt || 'Image'}
          className="w-full max-w-4xl mx-auto rounded-lg shadow-lg object-cover"
          style={{ maxHeight: '600px' }}
          onError={(e) => {
            console.error('Image failed to load:', imageUrl);
            // Try without processing first
            if (e.currentTarget.src !== imageUrl) {
              console.log('Trying original URL...');
              e.currentTarget.src = imageUrl;
            } else {
              // If original also fails, show placeholder
              console.log('Using placeholder image');
              e.currentTarget.src =
                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+PC9zdmc+';
              e.currentTarget.alt = 'Image not available';
            }
          }}
        />
        {caption && (
          <p className="text-gray-600 text-sm mt-4 italic max-w-2xl mx-auto">
            {caption}
          </p>
        )}
      </div>
    </section>
  );
};

export default ImageSection;
