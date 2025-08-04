interface ProductTagProps {
  name: string;
  price: string;
  sku?: string;
  priceUnit?: string;
}

export const ProductTag: React.FC<ProductTagProps> = ({ name, price, sku, priceUnit }) => {
  return (
    <>
      {sku && (
        <span className="text-xs mb-2 font-body font-normal text-base-600">SKU: {sku}</span>
      )}
      <h2 className="max-w-full w-full leading-extra-loose text-3xl tracking-wide leading-8 py-1 font-normal font-display text-ink">
        {name}
      </h2>
      <p className="text-md font-bold inline-block tracking-wide py-1 font-body text-primary-600">
        {price}{priceUnit && ` ${priceUnit}`}
      </p>
    </>
  );
};
