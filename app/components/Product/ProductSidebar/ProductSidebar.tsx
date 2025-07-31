"use client";
import { FC, useEffect, useMemo, useState } from "react";
import { ProductOptions } from "../ProductOptions/ProductOptions";
import { selectDefaultOptionFromProduct } from "../ProductOptions/helpers";
import { useUI } from "../../Provider/context";
import { useAddItemToCart } from "@/app/hooks/useAddItemToCart";
import { HiArrowDown } from "react-icons/hi";
import { Quantity } from "../../Quantity/Quantity";
import { ProductTag } from "../ProductTag/ProductTag";
import { usePrice } from "@/app/hooks/usePrice";
import Link from "next/link";
import { Product, Variant } from '@/app/model/store/store-api';
import { STORES_APP_ID } from "@/app/constants";

interface ProductSidebarProps {
  product: Product;
  className?: string;
}

const createProductOptions = (
  selectedOptions?: any,
  selectedVariant?: Variant,
) =>
  Object.keys(selectedOptions ?? {}).length
    ? {
      options: selectedVariant?._id
        ? { variantId: selectedVariant!._id }
        : { options: selectedOptions },
    }
    : undefined;

export const ProductSidebar: FC<ProductSidebarProps> = ({ product }) => {
  const addItem = useAddItemToCart();
  const { openSidebar } = useUI();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<Variant>({});
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>({});

  const togglePanel = (panelId: string) => {
    setOpenPanels(prev => ({
      ...prev,
      [panelId]: !prev[panelId]
    }));
  };

  const price = usePrice({
    amount: selectedVariant?.variant?.priceData?.price || product.price!.price!,
    currencyCode: product.price!.currency!,
  });

  useEffect(() => {
    if (
      product.manageVariants &&
      Object.keys(selectedOptions).length === product.productOptions?.length
    ) {
      const variant = product.variants?.find((variant) =>
        Object.keys(variant.choices!).every(
          (choice) => selectedOptions[choice] === variant.choices![choice]
        )
      );
      setSelectedVariant(variant!);
    }
    setQuantity(1);
  }, [selectedOptions]);

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions);
  }, [product]);

  const isAvailableForPurchase = useMemo(() => {
    if (!product.manageVariants && product.stock?.inStock) {
      return true;
    }
    if (!product.manageVariants && !product.stock?.inStock) {
      return false;
    }

    return selectedVariant?.stock?.inStock;
  }, [selectedVariant, product]);

  const addToCart = async () => {
    setLoading(true);
    try {
      await addItem({
        quantity,
        catalogReference: {
          catalogItemId: product._id!,
          appId: STORES_APP_ID,
          ...createProductOptions(selectedOptions, selectedVariant),
        },
      });
      setLoading(false);
      openSidebar();
    } catch (err) {
      setLoading(false);
    }
  };

  const buyNowLink = useMemo(() => {
    const productOptions = createProductOptions(
      selectedOptions,
      selectedVariant
    );
    return `/api/quick-buy/${product._id}?quantity=${quantity}&productOptions=${productOptions
        ? decodeURIComponent(JSON.stringify(productOptions.options))
        : ""
      }`;
  }, [selectedOptions, selectedVariant, product._id, quantity]);

  return (
    <>
      <ProductTag
        name={product.name!}
        price={price}
        sku={product.sku ?? undefined}
      />
      <div className="mt-2">
        <ProductOptions
          options={product.productOptions!}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      </div>
      <div className="mb-6">
        <span className="text-xs tracking-wide font-body font-normal">
          Quantity
        </span>
        <div className="mt-2">
          <Quantity
            value={quantity}
            max={
              (selectedVariant?.stock?.trackQuantity
                ? selectedVariant?.stock?.quantity
                : product.stock?.quantity!) ?? 9999
            }
            handleChange={(e) => setQuantity(Number(e.target.value))}
            increase={() => setQuantity(1 + quantity)}
            decrease={() => setQuantity(quantity - 1)}
          />
        </div>
      </div>
      {isAvailableForPurchase ? (
        <div>
          <button
            aria-label="Add to Cart"
            className="btn-main w-full my-1 font-body font-normal"
            type="button"
            onClick={addToCart}
            disabled={loading}
          >
            Add to Cart
          </button>
          <div className="w-full pt-2">
            <Link
              className="btn-main w-full my-1 block text-center font-body font-normal"
              href={buyNowLink}
            >
              Buy Now
            </Link>
          </div>
        </div>
      ) : null}
      {!isAvailableForPurchase ? (
        <div>
          <button
            aria-label="Not Available"
            className="btn-main w-full my-1 rounded-2xl text-2xl"
            type="button"
            disabled
          >
            No Available
          </button>
        </div>
      ) : null}
      <div className="mt-6">
        <div className="space-y-1">
          {product.additionalInfoSections!.map((info) => (
            <div key={info.title} className="border-b border-gray-200">
              <button
                onClick={() => togglePanel(info.title!)}
                className="w-full flex justify-between items-center py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-black font-body">{info.title}</span>
                <HiArrowDown
                  className={`text-black transition-transform duration-200 ${
                    openPanels[info.title!] ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openPanels[info.title!] && (
                <div className="bg-transparent p-5 font-body text-gray-800">
                  <span
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: info.description ?? "" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
