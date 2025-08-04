"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import { media } from "@wix/sdk";
import { useUI } from "../Provider/context";
import { QuantityAsUnitArea } from "../QuantityAsUnitArea/QuantityAsUnitArea";
import { PLACEHOLDER_IMAGE } from '@/app/constants';
import { LineItem } from '@/app/model/ecom/ecom-api';
import { usePrice } from '@/app/hooks/usePrice';
import { useUpdateCart } from '@/app/hooks/useUpdateCart';
import { useRemoveItemFromCart } from '@/app/hooks/useRemoveItemFromCart';

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
  const [removing, setRemoving] = useState(false);
  const [quantity, setQuantity] = useState<number>(item.quantity ?? 1);
  const removeItem = useRemoveItemFromCart();
  const updateCartMutation = useUpdateCart();

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

  const handleChange = async ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(value));
    return updateCartMutation({ quantity: Number(value), _id: item._id! });
  };

  const increaseQuantity = async (n = 1) => {
    const val = Number(quantity) + n;
    setQuantity(val);
    return updateCartMutation({ quantity: val, _id: item._id! });
  };

  const handleRemove = async () => {
    setRemoving(true);
    try {
      return removeItem(item._id!);
    } catch (error) {
      setRemoving(false);
    }
  };

  useEffect(() => {
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.quantity]);

  const slug = item.url?.split("/").pop() ?? "";

  return (
    <li className="flex flex-col py-4 border-b border-border last:border-b-0" {...rest}>
      <div className="flex flex-row gap-4 py-4">
        <div className="w-20 h-20 bg-base-100 relative overflow-hidden z-0 rounded-base">
          {slug ? (
            <Link href={`/product-page/${slug}`}>
              <div onClick={() => closeSidebarIfPresent()}>
                <Image
                  alt="line item"
                  width={150} height={150}
                  src={media.getScaledToFitImageUrl(item.image!, 150, 150, {}) || PLACEHOLDER_IMAGE}
                />
              </div>
            </Link>
          ) : (
            <Image
              alt="line item"
              width={150} height={150}
              src={media.getScaledToFitImageUrl(item.image!, 150, 150, {}) || PLACEHOLDER_IMAGE}
            />
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
          {/* Product Options/Variants Display - Clean format */}
          {item.catalogReference?.options && typeof item.catalogReference.options === 'object' && 'options' in item.catalogReference.options && (
            <div className="mt-1 space-y-0.5">
              {Object.entries(item.catalogReference.options.options as Record<string, string>).map(([key, value]) => (
                <div key={key} className="text-sm text-gray-600">
                  <span className="font-medium text-gray-800">{key}:</span> <span>{value}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Dimensions from descriptionLines - only if they contain custom dimensions */}
          {item.descriptionLines && item.descriptionLines.length > 0 && (
            <div className="mt-2">
              {item.descriptionLines.map((line, index) => (
                <div key={index}>
                  {line.name?.original?.includes('Custom Dimensions') && (
                    <div className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                      <span className="font-medium text-gray-800">{line.name.original}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Clean pricing display */}
          <div className="mt-3 space-y-1 font-body">
            <div className="text-sm text-gray-600">
              <span className="font-bold text-gray-900">{perSqFtPrice}</span> <span className="text-xs">per sq ft</span>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-bold text-gray-900">{item.quantity} sq ft</span> <span className="text-xs">total area</span>
            </div>
            <div className="text-lg font-bold text-primary-600 border-t border-gray-200 pt-2 mt-2">
              {totalPrice}
            </div>
          </div>
          {!hideButtons && (
            <div className="mt-3">
              <QuantityAsUnitArea
                size="sm"
                value={quantity}
                handleChange={handleChange}
                increase={() => increaseQuantity(1)}
                decrease={() => increaseQuantity(-1)}
                unit="sq ft"
              />
            </div>
          )}
        </div>
        {!hideButtons && (
          <button className="flex text-base-500 hover:text-red-500 transition-colors" onClick={() => handleRemove()}>
            <svg
              fill="none"
              className="w-4 h-4"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        )}
      </div>
    </li>
  );
};
