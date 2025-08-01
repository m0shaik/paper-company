import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  width?: string;
  height?: string;
}

export function ImageSkeleton({ width = "10", height = "10" }: Props) {
  return (
    <Skeleton className={`w-${width} h-${height} rounded-md flex items-center justify-center`}>
      <svg
        className="w-8 h-8 text-base-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 18"
      >
        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
      </svg>
    </Skeleton>
  );
}

export function TextSkeleton() {
  return (
    <>
      <Skeleton className="h-2.5 w-48 mb-4" />
      <Skeleton className="h-2 max-w-md mb-2.5" />
      <Skeleton className="h-2 mb-2.5" />
      <Skeleton className="h-2 max-w-sm mb-2.5" />
      <Skeleton className="h-2 max-w-md mb-2.5" />
      <Skeleton className="h-2 max-w-xs" />
    </>
  );
}

export function CardSkeleton({ height = "10" }: Props) {
  return (
    <>
      <div className="flex flex-col h-full">
        <Skeleton className={`flex items-center justify-center h-${height} mb-4 rounded-md`}>
          <ImageSkeleton />
        </Skeleton>
        <TextSkeleton />
      </div>
    </>
  );
}

export function ListSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <div key={index} className={`flex items-center justify-between ${index > 0 ? 'pt-4' : ''}`}>
          <div>
            <Skeleton className="h-2.5 w-24 mb-2.5" />
            <Skeleton className="w-32 h-2" />
          </div>
          <Skeleton className="h-2.5 w-12" />
        </div>
      ))}
    </>
  );
}
