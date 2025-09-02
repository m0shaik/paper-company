'use client';
import React, { FC } from 'react';
import Link from 'next/link';
import { STORE_ROUTE } from '@/app/routes';
import { ALL_ITEMS_ID } from '@/app/constants';
import { Collection } from '@/app/model/store/types';
import { Button } from '@/app/components/ui/button';

export interface ProductCategoriesProps {
  collections: Collection[];
  selectedCollectionId?: string;
}

export const ProductCategories: FC<ProductCategoriesProps> = ({
  collections,
  selectedCollectionId = ALL_ITEMS_ID,
}) => {
  return collections.length ? (
    <div className="w-full mb-8">
      <div className=" scrollbar-hide p-2 md:p-8 glass-card rounded-full  shadow-lg">
        <div className="flex flex-wrap items-center justify-center gap-3 p-2">
          {collections.map((collection) => {
            const isSelected = selectedCollectionId === collection._id;
            return (
              <Link
                href={`${STORE_ROUTE}/category/${collection.slug}`}
                key={collection._id}
                className="flex-shrink-0"
              >
                <Button
                  variant={isSelected ? 'default' : 'outline'}
                  className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap
                      ${
                        isSelected
                          ? 'bg-base-500 text-white shadow-md'
                          : 'bg-white text-base-200 border-base-300 hover:bg-base-50 hover:border-base-400'
                      }
                    `}
                >
                  {collection.name}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
