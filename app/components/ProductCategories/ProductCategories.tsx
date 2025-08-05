"use client";
import React, { FC } from "react";
import Link from "next/link";
import { STORE_ROUTE } from "@/app/routes";
import { ALL_ITEMS_ID } from '@/app/constants';
import { Collection } from '@/app/model/store/store-api';
import { Button } from "@/components/ui/button";

export interface ProductCategoriesProps {
  collections: Collection[];
  selectedCollectionId?: string;
}


export const ProductCategories: FC<ProductCategoriesProps> = ({
  collections,
  selectedCollectionId = ALL_ITEMS_ID,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };
  return collections.length ? (
    <>
      <fieldset className="hidden md:flex flex-col w-64 md:justify-start md:text-start">
        <legend className="text-2xl pb-2 border-b border-gray-900 w-full font-libre">
          Filter by
        </legend>
        <div className="flex flex-col mt-5 gap-3">
          {collections
            .map((collection) => {
              const checked = selectedCollectionId === collection._id;
              return (
                <Link
                  href={`${STORE_ROUTE}/category/${collection.slug}`}
                  key={collection._id}
                >
                  <input
                    type="radio"
                    id={collection._id!}
                    value={collection.slug!}
                    checked={checked}
                    data-checked={checked}
                    defaultChecked={false}
                    className="hidden"
                    onChange={(e) => { }}
                  />
                  <label
                    className={`cursor-pointer w-full ${checked ? "text-base-500" : " hover:text-base-500"
                      } font-madefor`}
                    htmlFor={collection._id!}
                  >
                    {collection.name}
                  </label>
                </Link>
              );
            })}
        </div>
      </fieldset>

      <div className="md:hidden mx-auto">
        <div className="relative">
          <Button
            variant="outline"
            type="button"
            className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-base
                              font-medium rounded-md text-white bg-base-200 focus:outline-none"
            onClick={toggleDropdown}
          >
            Filter by{" "}
            <span className="inline-flex items-center justify-center pl-2 text-sm font-bold">
              {!isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  fill={"white"}
                  viewBox="0 0 448 512"
                >
                  <path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                  fill={"white"}
                >
                  <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />
                </svg>
              )}
            </span>
          </Button>
          {isOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200">
              {collections.map((collection) => {
                const checked = selectedCollectionId === collection._id;
                return (
                  <Link
                    key={collection._id}
                    href={`${STORE_ROUTE}/category/${collection.slug}`}
                    className={`block px-4 py-2 text-sm hover:bg-gray-100 ${checked ? "text-base-500 bg-gray-50" : "text-gray-700"
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {collection.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};
