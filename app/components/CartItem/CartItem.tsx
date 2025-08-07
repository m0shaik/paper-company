'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { media } from '@wix/sdk';
import { useUI } from '../Provider/context';
import { PLACEHOLDER_IMAGE } from '@/app/constants';
import { LineItem } from '@/app/model/ecom/ecom-api';
import { usePrice } from '@/app/hooks/usePrice';
import { Button } from "@/app/components/ui/button";
import { useRemoveItemFromCart } from '@/app/hooks/useRemoveItemFromCart';
import { useUpdateCartItemDimensions } from '@/app/hooks/useUpdateCartItemDimensions';

export const CartItem = ({
  item,
  hideButtons,
  currencyCode,
  ...rest
}: {
  item: LineItem;
  hideButtons?: boolean;
  currencyCode: string;
}) => {
  const { closeSidebarIfPresent } = useUI();
  const [quantity, setQuantity] = useState<number>(item.quantity ?? 1);
  const removeItem = useRemoveItemFromCart();
  const { updateDimensions } = useUpdateCartItemDimensions();

  // Extract current dimensions from customTextFields
  const currentWidth = parseFloat(
    item.catalogReference?.options?.customTextFields?.Width?.replace(
      ' ft',
      ''
    ) || '0'
  );
  const currentHeight = parseFloat(
    item.catalogReference?.options?.customTextFields?.Height?.replace(
      ' ft',
      ''
    ) || '0'
  );

  // State for dimension adjustments
  const [width, setWidth] = useState<number>(currentWidth);
  const [height, setHeight] = useState<number>(currentHeight);

  const totalPrice = usePrice({
    amount: Number.parseFloat(item.price?.amount!) * item.quantity!,
    baseAmount: Number.parseFloat(item.price?.amount!) * item.quantity!,
    currencyCode,
  });

  const perSqFtPrice = usePrice({
    amount: Number.parseFloat(item.price?.amount!),
    baseAmount: Number.parseFloat(item.price?.amount!),
    currencyCode,
  });

  const handleRemove = async () => {
    return removeItem(item._id!);
  };

  useEffect(() => {
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.quantity]);

  const adjustWidth = async (delta: number) => {
    const newWidth = Math.max(0.5, width + delta);
    setWidth(newWidth);

    try {
      const result = await updateDimensions(item, newWidth, height);
      if (result.success) {
        setQuantity(result.newQuantity!);
      } else {
        setWidth(currentWidth);
      }
    } catch (error) {
      setWidth(currentWidth);
    }
  };

  const adjustHeight = async (delta: number) => {
    const newHeight = Math.max(0.5, height + delta);
    setHeight(newHeight);

    try {
      const result = await updateDimensions(item, width, newHeight);
      if (result.success) {
        setQuantity(result.newQuantity!);
      } else {
        setHeight(currentHeight);
      }
    } catch (error) {
      setHeight(currentHeight);
    }
  };

  const slug = item.url?.split('/').pop() ?? '';

  return (
    <li
      className="flex flex-col py-4 border-b border-border last:border-b-0"
      {...rest}
    >
      <div className="flex flex-row gap-4 py-4">
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 bg-base-100 relative overflow-hidden z-0 rounded-base">
            {slug ? (
              <Link href={`/product-page/${slug}`}>
                <div onClick={() => closeSidebarIfPresent()}>
                  <Image
                    alt="line item"
                    width={150}
                    height={150}
                    src={
                      media.getScaledToFitImageUrl(item.image!, 150, 150, {}) ||
                      PLACEHOLDER_IMAGE
                    }
                  />
                </div>
              </Link>
            ) : (
              <Image
                alt="line item"
                width={150}
                height={150}
                src={
                  media.getScaledToFitImageUrl(item.image!, 150, 150, {}) ||
                  PLACEHOLDER_IMAGE
                }
              />
            )}
          </div>
          {!hideButtons && (
            <Button
              variant="ghost"
              size="icon"
              className="flex-shrink-0 text-base-500 hover:text-red-500 hover:bg-red-50 transition-colors w-6 h-6 rounded-full p-0 flex items-center justify-center"
              onClick={() => handleRemove()}
            >
              <svg
                fill="none"
                className="w-3 h-3"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                ></path>
              </svg>
            </Button>
          )}
        </div>
        <div className="flex-1">
          <div className="flex-1 flex flex-col text-base font-body">
            {slug ? (
              <Link href={`/product-page/${slug}`}>
                <span className="cursor-pointer pb-1 text-base-600 hover:text-ink font-body">
                  {item.productName?.original}
                </span>
              </Link>
            ) : (
              <span className="pb-1 text-base-600 font-body">
                {item.productName?.original}
              </span>
            )}
          </div>

          {/* Product Options and Dimensions */}
          <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {/* Product Options/Variants */}
            {item.descriptionLines
              ?.filter(
                (line) =>
                  line.name?.original &&
                  line.plainText?.original &&
                  line.plainText.original.trim() !== '' &&
                  !['Height', 'Width', 'Area', 'Total Area', 'Note'].includes(
                    line.name.original
                  )
              )
              .map((line, index) => (
                <React.Fragment key={`desc-${index}`}>
                  <div className="font-medium text-gray-800">
                    {line.name!.original}:
                  </div>
                  <div className="text-gray-600">
                    {line.plainText!.original}
                  </div>
                </React.Fragment>
              ))}

            <div></div>
            <div></div>

            {/* Width Control */}
            <div className="font-medium text-gray-800">Width (ft):</div>
            <div className="flex items-center">
              <button
                className="px-2 py-1 text-gray-600 border rounded-l hover:bg-gray-100"
                onClick={() => adjustWidth(-0.5)}
              >
                -
              </button>
              <span className="px-3 py-1 text-sm font-medium min-w-12 text-center border-t border-b">
                {width}
              </span>
              <button
                className="px-2 py-1 text-gray-600 border rounded-r hover:bg-gray-100"
                onClick={() => adjustWidth(0.5)}
              >
                +
              </button>
            </div>

            {/* Height Control */}
            <div className="font-medium text-gray-800">Height (ft):</div>
            <div className="flex items-center">
              <button
                className="px-2 py-1 text-gray-600 border rounded-l hover:bg-gray-100"
                onClick={() => adjustHeight(-0.5)}
              >
                -
              </button>
              <span className="px-3 py-1 text-sm font-medium min-w-12 text-center border-t border-b">
                {height}
              </span>
              <button
                className="px-2 py-1 text-gray-600 border rounded-r hover:bg-gray-100"
                onClick={() => adjustHeight(0.5)}
              >
                +
              </button>
            </div>

            {/* Area Display */}
            <div className="font-medium text-gray-800">Area (sq ft):</div>
            <div className="text-gray-600">{(width * height).toFixed(2)}</div>

            {/* Pricing */}
            <div className="font-medium text-gray-800 border-t border-gray-200 pt-1">
              Price (per sq ft):
            </div>
            <div className="text-gray-600 font-bold border-t border-gray-200 pt-1">
              {perSqFtPrice}
            </div>

            <div className="font-medium text-gray-800">Total:</div>
            <div className="text-primary-600 font-bold">{totalPrice}</div>
          </div>
        </div>
      </div>
    </li>
  );
};
