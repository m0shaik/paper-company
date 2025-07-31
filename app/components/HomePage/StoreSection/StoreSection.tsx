import React from "react";
import Link from "next/link";
import Image from 'next/image';
import { STORE_CATEGORY_ROUTE, STORE_ROUTE } from "@/app/routes";
import { Collection, queryCollections } from '@/app/model/store/store-api';

async function Collections() {
  const items = await queryCollections({
    limit: 3,
    exclude: "All Products",
  });

  return (
    <div className="grid gap-8 lg:grid-cols-3 w-full">
      {items.map((item: any, index: any) => (
        <CollectionCard item={item} key={item._id} index={index} />
      ))}
    </div>
  );
}

const CollectionCard: React.FC<{
  item: Collection;
  index: number;
}> = ({ item, index }) => {
  return (
    <Link
      href={`${STORE_CATEGORY_ROUTE}/${item.slug}`}
      className="relative group block h-[600px] overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          alt={item.media?.mainMedia?.image?.altText!}
          src={item.media?.mainMedia?.image?.url!}
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={index != -1 && index < 3}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="relative h-full flex flex-col justify-end p-8">
        <h1 className="font-serif font-bold text-3xl leading-tight text-white mb-4">
          {item.name}
        </h1>
        <span className="text-white text-lg capitalize">
          Explore Collection
        </span>
      </div>
    </Link>
  );
};

export const StoreSection = () => {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-serif font-bold text-4xl md:text-5xl">
            Our Collections
          </h2>
          <Link
            href={STORE_ROUTE}
            className="hidden md:block text-lg capitalize hover:opacity-70 transition-opacity"
          >
            View All Collections
          </Link>
        </div>
        <Collections />
        <Link
          href={STORE_ROUTE}
          className="md:hidden block mt-8 text-center text-lg capitalize"
        >
          View All Collections
        </Link>
      </div>
    </section>
  );
};
