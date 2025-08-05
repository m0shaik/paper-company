"use client"

import { GridMotion } from "@/app/components/ui/grid-motion";
import { ReactNode, useEffect, useState } from "react";
import { type Product } from "@/app/model/store/store-api";
import { PLACEHOLDER_IMAGE } from "@/app/constants";

export function HomeGallery() {
  const [products, setProducts] = useState<Product[]>([]);
  const [items, setItems] = useState<(string | ReactNode)[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);

        // Create placeholder items immediately for faster perceived loading
        const placeholderItems = Array.from({ length: 28 }, (_, index) => PLACEHOLDER_IMAGE);
        setItems(placeholderItems);

        // Fetch products from API route - increased limit to get more variety
        const response = await fetch('/api/products?limit=28');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const storeProducts = await response.json();
        console.log(`Fetched ${storeProducts.length} products for gallery`);
        setProducts(storeProducts);

        // Transform products into gallery items with only images
        const galleryItems = storeProducts.map((product: Product) =>
          product.media?.mainMedia?.image?.url || PLACEHOLDER_IMAGE
        );

        // Fill remaining slots with placeholder if we don't have enough products
        const totalSlots = 28;
        while (galleryItems.length < totalSlots) {
          galleryItems.push(PLACEHOLDER_IMAGE);
        }

        setItems(galleryItems.slice(0, totalSlots));
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to placeholder items if fetching fails
        const fallbackItems = Array.from({ length: 28 }, (_, index) => PLACEHOLDER_IMAGE);
        setItems(fallbackItems);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* Product grid with animations */}
      <div className="h-screen w-full bg-gradient-to-br from-background to-muted overflow-hidden">
        <GridMotion
          items={items}
          gradientColor="hsl(var(--brand))"
          className="relative z-10 backdrop-blur-sm"
        />
      </div>
    </div>
  );
}