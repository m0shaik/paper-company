'use client';

import React from 'react';
import { GallerySectionData } from '../types';

interface GallerySectionProps {
  data: GallerySectionData;
  isPreview?: boolean;
}

const GallerySection: React.FC<GallerySectionProps> = ({
  data,
  isPreview = false,
}) => {
  const { title, images } = data;

  // Function to process Wix image URLs
  const processImageUrl = (url: string) => {
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

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={processImageUrl(image.url)}
                  alt={image.alt || `Gallery image ${index + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    console.error('Gallery image failed to load:', image.url);
                    // Try without processing first
                    if (e.currentTarget.src !== image.url) {
                      console.log('Trying original URL...');
                      e.currentTarget.src = image.url;
                    } else {
                      // If original also fails, show placeholder
                      console.log('Using placeholder image');
                      e.currentTarget.src =
                        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+PC9zdmc+';
                      e.currentTarget.alt = 'Image not available';
                    }
                  }}
                />
              </div>
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-3">
                  <p className="text-sm">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
