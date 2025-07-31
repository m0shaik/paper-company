import React from "react";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  children?: React.ReactNode;
}

export default function ProductCard({
  title,
  description,
  image,
  children,
}: ProductCardProps) {
  return (
    <div className="border border-border bg-paper p-6 rounded-base shadow-sm hover:shadow-md transition-shadow">
      <div className="border border-border h-32 bg-base-100 mb-4 flex items-center justify-center rounded-base">
        <span className="text-base-500 text-sm font-body">Image</span>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2 text-ink font-display">{title}</h3>
        <p className="text-base-600 text-sm mb-4 font-body">{description}</p>
        {children}
      </div>
    </div>
  );
}
