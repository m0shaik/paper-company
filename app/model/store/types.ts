import { products } from '@wix/stores';

export type ProductOption = products.ProductOption;

export type Variant = products.Variant;

// Note: For variant-specific media support, you could also use:
// import { storeVariants } from '@wix/stores';
// export type StoreVariant = storeVariants.StoreVariant;
// And query using wixClient.storeVariants.queryStoreVariants() 
// which includes media property on each variant

export type Product = products.Product;

export type Collection = products.Collection;