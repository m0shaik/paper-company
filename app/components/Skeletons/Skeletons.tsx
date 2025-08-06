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
