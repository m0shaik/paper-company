import React from "react";
import { Skeleton } from "@/app/components/ui/skeleton";

interface Props {
  className?: string;
}

export function ImageSkeleton({ className }: Props) {
  return (
    <Skeleton className={`aspect-square w-full rounded-md ${className}`} />
  );
}

export function TextSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-4/4" />

    </div>
  );
}

export function CardSkeleton({ className }: Props) {
  return (
    <div className="flex flex-col h-full">
      <Skeleton className={`h-48 mb-4 rounded-md ${className}`} />
      <TextSkeleton />
    </div>
  );
}

export function ListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-4 w-12" />
        </div>
      ))}
    </div>
  );
}

export function CartSkeleton() {
  return (
    <li className="flex flex-col py-4 border-b border-border animate-pulse">
      <div className="flex flex-row gap-4 py-4">
        <Skeleton className="w-20 h-20 rounded-base" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
          </div>
        </div>
      </div>
    </li>
  );
}

export function ProductSidebarSkeleton() {
  return (
    <div className="glass-card rounded-lg p-6 shadow-lg">
      {/* Product title and price */}
      <div className="space-y-3 mb-6">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </div>

      {/* Product options */}
      <div className="space-y-4 mb-6">
        <div>
          <Skeleton className="h-4 w-16 mb-2" />
          <div className="flex gap-2">
            <Skeleton className="w-12 h-12 rounded-md" />
            <Skeleton className="w-12 h-12 rounded-md" />
            <Skeleton className="w-12 h-12 rounded-md" />
          </div>
        </div>
      </div>

      {/* Dimensions */}
      <div className="space-y-3 mb-6">
        <Skeleton className="h-4 w-32" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-3 w-16 mb-1" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-3 w-16 mb-1" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>

      {/* Add to cart button */}
      <Skeleton className="h-12 w-full mb-6" />

      {/* Additional info sections */}
      <div className="space-y-1">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}

export function VariantGridSkeleton() {
  return (
    <div className="w-full glass-card rounded-lg p-6 shadow-lg">
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="relative">
            <Skeleton className="aspect-square w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
