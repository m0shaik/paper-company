'use client';
import { FC, useEffect, useMemo, useState } from 'react';
import { ProductOptions } from '../ProductOptions/ProductOptions';
import { selectDefaultOptionFromProduct } from '../ProductOptions/helpers';
import { useUI } from '../../Provider/context';
import { useAddItemToCart } from '@/app/hooks/useAddItemToCart';
import { HiArrowDown } from 'react-icons/hi';
import { ProductTag } from '../ProductTag/ProductTag';
import { usePrice } from '@/app/hooks/usePrice';
import { Product, Variant } from '@/app/model/store/store-api';
import { STORES_APP_ID } from '@/app/constants';
import { Button } from '@/components/ui/button';

interface ProductSidebarProps {
  product: Product;
  className?: string;
}

const createProductOptions = (
  selectedOptions?: any,
  selectedVariant?: Variant,
  customDimensions?: { height: string; width: string; area: string }
) => {
  // Base options for variants and choices
  const baseOptions = Object.keys(selectedOptions ?? {}).length
    ? {
      options: selectedVariant?._id
        ? { variantId: selectedVariant!._id }
        : { options: selectedOptions },
    }
    : undefined;

  // If we have custom dimensions, add them to customTextFields
  if (customDimensions && customDimensions.height && customDimensions.width) {
    return {
      options: {
        ...baseOptions?.options,
        customTextFields: {
          Height: `${customDimensions.height} ft`,
          Width: `${customDimensions.width} ft`,
          Area: `${customDimensions.area} sq ft`,
        },
      },
    };
  }

  return baseOptions;
};

export const ProductSidebar: FC<ProductSidebarProps> = ({ product }) => {
  const addItem = useAddItemToCart();
  const { openSidebar } = useUI();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<Variant>({});
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>({});
  const [height, setHeight] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [dimensionError, setDimensionError] = useState<string>('');

  const togglePanel = (panelId: string) => {
    setOpenPanels((prev) => ({
      ...prev,
      [panelId]: !prev[panelId],
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

  const squareFootage = useMemo(() => {
    const h = parseFloat(height);
    const w = parseFloat(width);
    if (!isNaN(h) && !isNaN(w) && h > 0 && w > 0) {
      return h * w;
    }
    return 0;
  }, [height, width]);

  const calculatedQuantity = useMemo(() => {
    return Math.ceil(squareFootage);
  }, [squareFootage]);

  const validateDimensions = () => {
    if (!height || !width) {
      setDimensionError('Please enter both height and width');
      return false;
    }
    if (parseFloat(height) <= 0 || parseFloat(width) <= 0) {
      setDimensionError('Dimensions must be greater than 0');
      return false;
    }
    setDimensionError('');
    return true;
  };

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
    if (!validateDimensions()) {
      return;
    }

    setLoading(true);
    try {
      await addItem({
        quantity: calculatedQuantity,
        catalogReference: {
          catalogItemId: product._id!,
          appId: STORES_APP_ID,
          ...createProductOptions(selectedOptions, selectedVariant, {
            height,
            width,
            area: squareFootage.toFixed(2),
          }),
        },
      });
      setLoading(false);
      openSidebar();
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <>
      <ProductTag
        name={product.name!}
        price={price}
        sku={product.sku ?? undefined}
        priceUnit="per sq ft"
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
          Dimensions (in feet)
        </span>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="height"
              className="text-xs text-gray-600 mb-1 block"
            >
              Height (ft)
            </label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
                if (dimensionError) setDimensionError('');
              }}
              placeholder="Enter height"
              min="0"
              step="0.1"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${dimensionError && !height
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-primary-500'
                }`}
            />
          </div>
          <div>
            <label htmlFor="width" className="text-xs text-gray-600 mb-1 block">
              Width (ft)
            </label>
            <input
              type="number"
              id="width"
              value={width}
              onChange={(e) => {
                setWidth(e.target.value);
                if (dimensionError) setDimensionError('');
              }}
              placeholder="Enter width"
              min="0"
              step="0.1"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${dimensionError && !width
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-primary-500'
                }`}
            />
          </div>
        </div>
        {dimensionError && (
          <div className="mt-2 text-sm text-red-600">{dimensionError}</div>
        )}
        {squareFootage > 0 && (
          <div className="mt-3 p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium">
              Total: {squareFootage.toFixed(2)} sq ft
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Quantity to add: {calculatedQuantity} sq ft (rounded up)
            </p>
          </div>
        )}
      </div>
      {isAvailableForPurchase ? (
        <div>
          <Button
            aria-label="Add to Cart"
            className={`btn-main w-full my-1 font-body font-normal ${!height || !width || squareFootage === 0
              ? 'opacity-50 cursor-not-allowed'
              : ''
              }`}
            type="button"
            onClick={addToCart}
            disabled={loading || !height || !width || squareFootage === 0}
          >
            Add to Cart
          </Button>
        </div>
      ) : null}
      {!isAvailableForPurchase ? (
        <div>
          <Button
            aria-label="Not Available"
            className="btn-main w-full my-1 rounded-2xl text-2xl"
            type="button"
            disabled
          >
            No Available
          </Button>
        </div>
      ) : null}
      <div className="mt-6">
        <div className="space-y-1">
          {product.additionalInfoSections!.map((info) => (
            <div key={info.title} className="border-b border-gray-200">
              <Button
                variant="ghost"
                onClick={() => togglePanel(info.title!)}
                className="w-full flex justify-between items-center py-4 text-left hover:bg-gray-50 transition-colors h-auto"
              >
                <span className="text-sm font-medium text-black font-body">
                  {info.title}
                </span>
                <HiArrowDown
                  className={`text-black transition-transform duration-200 ${openPanels[info.title!] ? 'rotate-180' : ''
                    }`}
                />
              </Button>
              {openPanels[info.title!] && (
                <div className="bg-transparent p-5 font-body text-gray-800">
                  <span
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: info.description ?? '' }}
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
