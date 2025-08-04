# Custom Dimensions Implementation Guide for Wix Headless

This guide provides two different approaches to make custom dimensions (height, width, area) visible in Wix dashboard orders.

## Overview

When customers enter custom dimensions for products, we need to ensure this information is visible in the Wix dashboard orders. The standard `descriptionLines` property may not reliably show in the dashboard, so we have two alternative approaches.

## Option 1: Custom Line Items (Recommended)

### What is it?
Custom line items allow you to create cart items with fully custom details that persist throughout the order flow. Instead of referencing a catalog product, you provide all item details directly.

### Pros
- ✅ Guaranteed visibility in Wix dashboard
- ✅ Full control over product name and description
- ✅ Simple implementation
- ✅ No dashboard configuration required

### Cons
- ❌ Items won't link back to catalog products in analytics
- ❌ Product details are static (won't update if catalog changes)

### Implementation Steps

#### 1. Update TypeScript Types

**File: `/app/model/ecom/ecom-api.ts`**

Add custom line item support:

```typescript
import { currentCart } from '@wix/ecom';

// Add this export
export type CustomLineItem = currentCart.CustomLineItem;

// Update the addToCurrentCart function
export const addToCurrentCart = async ({ 
  lineItems, 
  customLineItems 
}: { 
  lineItems?: LineItem[]; 
  customLineItems?: CustomLineItem[];
}) => {
  const wixClient = getWixClient();
  return wixClient.currentCart.addToCurrentCart({ lineItems, customLineItems });
}
```

#### 2. Update useAddItemToCart Hook

**File: `/app/hooks/useAddItemToCart.tsx`**

Create a union type to handle both regular and custom line items:

```typescript
import { addToCurrentCart, LineItem, CustomLineItem, updateCurrentCart } from '@/app/model/ecom/ecom-api';

// Add this type
export type AddItemToCartItem = {
  type: 'lineItem';
  item: LineItem;
} | {
  type: 'customLineItem';
  item: CustomLineItem;
};

// Update the hook
export const useAddItemToCart = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (item: AddItemToCartItem) =>
      addItemFromCart(item),
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], data.cart);
    },
  });
  return mutation.mutate;
};

// Update the helper function
async function addItemFromCart(item: AddItemToCartItem) {
  const data = await addToCurrentCart(
    item.type === 'lineItem' 
      ? { lineItems: [item.item] }
      : { customLineItems: [item.item] }
  );
  
  if (!data?.cart?.overrideCheckoutUrl) {
    void updateCurrentCart({
      cartInfo: {
        overrideCheckoutUrl: `${window.location.origin}/api/redirect-to-checkout?checkoutId={checkoutId}`,
      },
    });
  }
  return data;
}
```

#### 3. Update ProductSidebar Component

**File: `/app/components/Product/ProductSidebar/ProductSidebar.tsx`**

Import the new type and modify the addToCart function:

```typescript
import { useAddItemToCart, AddItemToCartItem } from "@/app/hooks/useAddItemToCart";
// Remove STORES_APP_ID import as custom line items don't need it

// In the addToCart function, replace the regular line item with:
const addToCart = async () => {
  if (!validateDimensions()) {
    return;
  }
  
  setLoading(true);
  try {
    // Create custom line item with dimensions embedded
    const dimensionInfo = `${height} ft × ${width} ft (${squareFootage.toFixed(2)} sq ft)`;
    const customItem: AddItemToCartItem = {
      type: 'customLineItem',
      item: {
        quantity: calculatedQuantity,
        price: (selectedVariant?.variant?.priceData?.price || product.price?.price || "0").toString(),
        productName: {
          original: `${product.name} - Custom Size: ${dimensionInfo}`
        },
        descriptionLines: [
          {
            name: {
              original: `Custom Dimensions`
            },
            plainText: {
              original: `Height: ${height} ft | Width: ${width} ft | Total Area: ${squareFootage.toFixed(2)} sq ft`
            }
          },
          // Add product options if any
          ...(Object.keys(selectedOptions).length > 0 ? [{
            name: {
              original: 'Selected Options'
            },
            plainText: {
              original: Object.entries(selectedOptions).map(([key, value]) => `${key}: ${value}`).join(', ')
            }
          }] : [])
        ],
        media: product.media?.mainMedia?.image?.url,
        url: `${window.location.origin}/product-page/${product.slug}`, // MUST be absolute URL
        itemType: {
          preset: 'PHYSICAL'
        }
      }
    };

    await addItem(customItem);
    setLoading(false);
    openSidebar();
  } catch (err) {
    setLoading(false);
  }
};
```

## Option 2: Extended Fields (Official Wix Approach)

### What is it?
Extended fields use Wix's Data Extension Schema to add custom fields to checkout and order objects.

### Pros
- ✅ Official Wix approach
- ✅ Clean data separation
- ✅ Structured data format
- ✅ Works with existing catalog items

### Cons
- ❌ May require dashboard configuration
- ❌ Only available at checkout level (not cart)
- ❌ More complex implementation
- ❌ SDK type coverage incomplete

### Implementation Steps

#### 1. Add Extended Fields Types and Functions

**File: `/app/model/ecom/ecom-api.ts`**

Add these interfaces and functions:

```typescript
// Extended fields interfaces
export interface DimensionExtendedFields {
  height: number;
  width: number;
  area: number;
  unit: string;
}

export interface ExtendedFieldsData {
  namespaces?: {
    _user_fields?: {
      dimensions?: DimensionExtendedFields;
    };
    [namespace: string]: any;
  };
}

// Add extended fields support to checkout
export const createCheckoutWithExtendedFields = async ({ 
  lineItems, 
  extendedFields 
}: { 
  lineItems: LineItem[];
  extendedFields?: ExtendedFieldsData;
}) => {
  const wixClient = getWixClient();
  const checkoutData = await wixClient.checkout.createCheckout({
    lineItems,
    channelType: checkout.ChannelType.WEB,
  });
  
  // If we have extended fields, update the checkout
  if (extendedFields && checkoutData.checkout?._id) {
    const updatedCheckout = await wixClient.checkout.updateCheckout(
      checkoutData.checkout._id,
      {
        checkout: {
          ...checkoutData.checkout,
          extendedFields: extendedFields as any
        }
      } as any
    );
    return updatedCheckout;
  }
  
  return checkoutData;
};

// Alternative: Create from current cart and add extended fields
export const createCheckoutFromCurrentCartWithExtendedFields = async (extendedFields?: ExtendedFieldsData) => {
  const wixClient = getWixClient();
  const checkoutData = await wixClient.currentCart.createCheckoutFromCurrentCart({ 
    channelType: currentCart.ChannelType.WEB 
  });
  
  // Update checkout with extended fields
  if (extendedFields && checkoutData?.checkoutId) {
    const checkout = await wixClient.checkout.getCheckout(checkoutData.checkoutId);
    if (checkout) {
      await wixClient.checkout.updateCheckout(
        checkoutData.checkoutId,
        {
          checkout: {
            ...checkout,
            extendedFields: extendedFields as any
          }
        } as any
      );
    }
  }
  
  return checkoutData;
};
```

#### 2. Update Cart View for Extended Fields

**File: `/app/components/Cart/CartView.tsx`**

Modify the checkout process to include extended fields:

```typescript
import { 
  createCheckoutFromCurrentCart, 
  createCheckoutFromCurrentCartWithExtendedFields,
  ExtendedFieldsData,
  DimensionExtendedFields 
} from '@/app/model/ecom/ecom-api';

// Add function to extract dimensions from cart items
const extractDimensionsFromCart = (lineItems: any[]): DimensionExtendedFields[] => {
  const dimensions: DimensionExtendedFields[] = [];
  
  lineItems?.forEach(item => {
    if (item.descriptionLines && item.descriptionLines.length > 0) {
      item.descriptionLines.forEach((line: any) => {
        if (line.name?.original?.includes('Custom Dimensions')) {
          // Parse dimensions from the description
          const match = line.name.original.match(/(\d+\.?\d*)\s*ft\s*×\s*(\d+\.?\d*)\s*ft\s*=\s*(\d+\.?\d*)\s*sq\s*ft/);
          if (match) {
            dimensions.push({
              height: parseFloat(match[1]),
              width: parseFloat(match[2]),
              area: parseFloat(match[3]),
              unit: 'ft'
            });
          }
        }
      });
    }
  });
  
  return dimensions;
};

// Update goToCheckout function
const goToCheckout = useCallback(async () => {
  closeSidebar();
  setRedirecting(true);
  try {
    // Extract dimensions if any
    const dimensions = extractDimensionsFromCart(data?.lineItems || []);
    
    // Create extended fields if we have dimensions
    const extendedFields: ExtendedFieldsData | undefined = dimensions.length > 0 ? {
      namespaces: {
        _user_fields: {
          dimensions: dimensions[0] // Use first item's dimensions for now
        }
      }
    } : undefined;
    
    // Use extended fields version if we have dimensions
    const checkout = extendedFields 
      ? await createCheckoutFromCurrentCartWithExtendedFields(extendedFields)
      : await createCheckoutFromCurrentCart();
      
    const { redirectSession } = await createRedirectSession({
      checkoutId: checkout!.checkoutId!,
      callbacks: {
        postFlowUrl: window.location.origin,
        thankYouPageUrl: `${window.location.origin}/stores-success`,
        cartPageUrl: `${window.location.origin}/cart`,
      },
    });
    window.location.href = redirectSession!.fullUrl!;
  } catch (e: any) {
    if (
      e.details.applicationError.code ===
      "SITE_MUST_ACCEPT_PAYMENTS_TO_CREATE_CHECKOUT"
    ) {
      openModalNotPremium();
    }
    setRedirecting(false);
  }
}, [data]);
```

## Testing Instructions

### For Both Approaches:

1. **Start Development Server**
   ```bash
   bun run dev
   ```

2. **Test Flow**
   - Navigate to a product page
   - Enter custom dimensions (e.g., 10 ft × 12 ft)
   - Add to cart
   - View cart (dimensions should be visible)
   - Complete checkout
   - Check Wix dashboard orders

### What to Look For:

#### Custom Line Items Approach:
- Product name includes dimensions: "Product Name - Custom Size: 10 ft × 12 ft (120.00 sq ft)"
- Dimensions visible in cart and order

#### Extended Fields Approach:
- Dimensions stored in checkout extended fields
- May appear in a separate section in Wix dashboard
- Check order details for extended fields section

## Important Notes

1. **URL Requirements**: Custom line items MUST use absolute URLs with `window.location.origin`
2. **Dashboard Configuration**: Extended fields may require configuration in Wix dashboard
3. **Testing**: Always test both cart display and dashboard visibility
4. **Fallback**: Consider implementing both approaches with a feature flag

## Troubleshooting

### Common Issues:

1. **Invalid URL Error**
   - Ensure URLs use `${window.location.origin}/path` format
   - Don't use relative paths for custom line items

2. **Dimensions Not Showing in Dashboard**
   - For custom line items: Check product name includes dimensions
   - For extended fields: Verify dashboard configuration

3. **Cart Not Found Error**
   - Clear cookies and refresh
   - Ensure Wix client is properly initialized

## Recommendation

**Start with Custom Line Items** as it's simpler and guaranteed to work. Only use Extended Fields if you need:
- Clean data separation
- Integration with Wix analytics
- Structured dimension queries

The custom line items approach ensures dimensions are visible immediately without dashboard configuration.