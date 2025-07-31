import React from "react";
import Link from "next/link";

export default function FeaturedMenuCard() {
  return (
    <div className="border border-border bg-paper p-8 rounded-base shadow-sm hover:shadow-md transition-shadow">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-ink font-display">New Arrivals</h2>
        <h5 className="text-xl mb-6 text-base-600 font-body">Featured Collection</h5>
        <div className="border border-border h-32 bg-base-100 mb-6 flex items-center justify-center rounded-base">
          <span className="text-base-500 text-sm font-body">Featured Image</span>
        </div>
        <p className="text-base-600 mb-6 font-body">
          Discover our latest collection of premium products featuring innovative 
          designs and sustainable materials. Perfect for your most important 
          projects and everyday needs.
        </p>
        <Link
          href={`/store/featured`}
          className="border border-primary-400 px-6 py-2 text-primary-600 hover:bg-primary-50 rounded-base font-body transition-colors"
        >
          Shop Collection
        </Link>
      </div>
    </div>
  );
}
