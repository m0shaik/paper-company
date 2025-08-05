"use client"

import { GridMotion } from "@/app/components/ui/grid-motion";
import { ReactNode, useEffect, useState } from "react";
import { type Product } from "@/app/model/store/store-api";
import { PLACEHOLDER_IMAGE } from "@/app/constants";
import { useRouter } from "next/navigation";

interface GalleryItem {
  imageUrl: string;
  productSlug?: string;
}

export function HomeGallery() {
  const [products, setProducts] = useState<Product[]>([]);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Shuffle array function for randomizing product order
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);

        // Create placeholder items immediately for faster perceived loading
        const placeholderItems: GalleryItem[] = Array.from({ length: 28 }, (_, index) => ({
          imageUrl: PLACEHOLDER_IMAGE
        }));
        setItems(placeholderItems);

        // Fetch products from API route - increased limit to get more variety
        const response = await fetch('/api/products?limit=50');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const storeProducts = await response.json();
        console.log(`Fetched ${storeProducts.length} products for gallery`);
        setProducts(storeProducts);

        // Transform products into gallery items with image and slug
        const galleryItems: GalleryItem[] = storeProducts
          .filter((product: Product) => product.media?.mainMedia?.image?.url) // Only products with images
          .map((product: Product) => ({
            imageUrl: product.media?.mainMedia?.image?.url!,
            productSlug: product.slug
          }));

        // Fill remaining slots - repeat products if we don't have enough unique ones
        const totalSlots = 28;
        const finalItems: GalleryItem[] = [];

        if (galleryItems.length > 0) {
          // Shuffle the products for more variety
          const shuffledProducts = shuffleArray(galleryItems);

          // Fill slots by cycling through shuffled products
          for (let i = 0; i < totalSlots; i++) {
            finalItems.push(shuffledProducts[i % shuffledProducts.length]);
          }

          // Shuffle the final array again for even more randomness
          setItems(shuffleArray(finalItems));
        } else {
          // Fallback to placeholder if no products
          for (let i = 0; i < totalSlots; i++) {
            finalItems.push({ imageUrl: PLACEHOLDER_IMAGE });
          }
          setItems(finalItems);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to placeholder items if fetching fails
        const fallbackItems: GalleryItem[] = Array.from({ length: 28 }, (_, index) => ({
          imageUrl: PLACEHOLDER_IMAGE
        }));
        setItems(fallbackItems);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleItemClick = (item: GalleryItem) => {
    if (item.productSlug) {
      router.push(`/product-page/${item.productSlug}`);
    }
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Product grid with animations */}
      <div className="h-screen w-full bg-gradient-to-br from-background to-muted overflow-hidden">
        <GridMotion
          items={items}
          onItemClick={handleItemClick}
          gradientColor="hsl(var(--brand))"
          className="relative z-10 backdrop-blur-sm"
        />
      </div>
    </div>
  );
}