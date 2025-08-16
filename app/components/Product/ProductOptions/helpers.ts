import { Product } from '@/app/model/store/types';

export type SelectedOptions = Record<string, string>;

export function selectDefaultOptionFromProduct(
  product: Product,
  updater: (options: SelectedOptions) => void
) {
  const defaults: SelectedOptions = {};

  // Selects the default option for each product option
  product.productOptions?.forEach((option) => {
    if (option.choices && option.choices.length > 0 && option.name && option.choices[0].description) {
      defaults[option.name] = option.choices[0].description;
    }
  });

  updater(defaults);
}
