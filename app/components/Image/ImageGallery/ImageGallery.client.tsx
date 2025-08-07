"use client";
import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";

export default function ImageGalleryClient({
  items,
  onVariantNavigation,
  hasVariants = false,
}: {
  items: { src: string; alt?: string }[];
  onVariantNavigation?: (direction: 'up' | 'down') => void;
  hasVariants?: boolean;
}) {
  // Create expanded items array with room wall versions
  const expandedItems: ({ src: string; alt?: string; isRoomWall?: boolean; roomWallImage?: string })[] = items.flatMap((item) => [
    item, // Original image
    { src: item.src, alt: `${item.alt || "Product"} in room setting 1`, isRoomWall: true, roomWallImage: "/images/room-wall-3.png" }, // Room wall version 1
    { src: item.src, alt: `${item.alt || "Product"} in room setting 2`, isRoomWall: true, roomWallImage: "/images/room-wall-2.png" }, // Room wall version 2
    { src: item.src, alt: `${item.alt || "Product"} in room setting 3`, isRoomWall: true, roomWallImage: "/images/room-wall.png" }, // Room wall version 3
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset to first image when items change (variant changes)
  useEffect(() => {
    setCurrentIndex(0);
  }, [items]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? expandedItems.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === expandedItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleVariantNavigation = (direction: 'up' | 'down') => {
    if (onVariantNavigation) {
      onVariantNavigation(direction);
      // Reset to first image when variant changes
      setCurrentIndex(0);
    }
  };

  if (items.length === 0) {
    return <div className="h-56 sm:h-96 max-h-96 max-w-xl mx-auto bg-gray-200"></div>;
  }

  const currentItem = expandedItems[currentIndex];

  return (
    <div className="h-56 sm:h-96 max-h-96 mx-auto relative bg-gray-100 shadow-xl">
      {/* Current image with optional room wall overlay */}
      {currentItem.isRoomWall ? (
        <div className="w-full h-full relative">
          {/* Background image from backend */}
          <img
            src={currentItem.src}
            alt={currentItem.alt ?? ""}
            className="w-full h-full object-cover absolute inset-0"
          />
          {/* Room wall overlay */}
          <img
            src={currentItem.roomWallImage}
            alt="Room wall frame"
            className="w-full h-full object-cover absolute inset-0"
          />
        </div>
      ) : (
        <img
          src={currentItem.src}
          alt={currentItem.alt ?? ""}
          className="w-full h-full object-cover"
        />
      )}

      {/* Navigation buttons - only show if more than 1 item */}
      {expandedItems.length > 1 && (
        <>
          <Button
            size="icon"
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2  opacity-50 bg-black rounded-full hover:opacity-75 transition-opacity border-none scale-75"
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 320 512"
              fill="currentColor"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
          </Button>
          <Button
            size="icon"
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2  opacity-50 bg-black rounded-full hover:opacity-75 transition-opacity border-none scale-75"
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 320 512"
              fill="currentColor"
            >
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
          </Button>

          {/* Variant navigation buttons - only show if has variants */}
          {hasVariants && onVariantNavigation && (
            <>
              <Button
                size="icon"
                onClick={() => handleVariantNavigation('up')}
                className="absolute left-1/2 top-2 transform -translate-x-1/2 opacity-50 bg-black rounded-full hover:opacity-75 transition-opacity border-none scale-75"
                aria-label="Previous variant"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 384 512"
                  fill="currentColor"
                >
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
              </Button>
              <Button
                size="icon"
                onClick={() => handleVariantNavigation('down')}
                className="absolute left-1/2 bottom-8 transform -translate-x-1/2 opacity-50 bg-black rounded-full hover:opacity-75 transition-opacity border-none scale-75"
                aria-label="Next variant"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 384 512"
                  fill="currentColor"
                >
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7 54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </Button>
            </>
          )}

          {/* Dots indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {expandedItems.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors p-0 ${index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
