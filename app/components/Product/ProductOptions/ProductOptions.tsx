'use client';
import Swatch from '../Swatch/Swatch';
import { Option } from '../Option/Option';
import { ProductOption } from '@/app/model/store/store-api';

interface ProductOptionsProps {
  options: ProductOption[];
  selectedOptions: any;
  setSelectedOptions: React.Dispatch<React.SetStateAction<any>>;
}

export const ProductOptions: React.FC<ProductOptionsProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const setSelected = (newOption: Record<string, string>) => {
    setSelectedOptions((selectedOptions: any) => {
      return {
        ...selectedOptions,
        ...newOption,
      };
    });
  };
  return (
    <>
      {options.map((opt) => (
        <div className="mb-4" key={opt.name}>
          <span className="text-xs tracking-wide text-base-700 font-body font-medium">{opt.name}</span>
          <div role="listbox" className="flex flex-row gap-2 my-2 relative">
            {opt.optionType === 'color' &&
              opt.choices!.map((v, i: number) => {
                const active = selectedOptions[opt.name!];
                return (
                  <Swatch
                    key={`${v}-${i}`}
                    active={v.description === active}
                    variant={v.description}
                    color={v.value}
                    label={v.description}
                    onClick={() => setSelected({ [opt.name!]: v.description! })}
                  />
                );
              })}
            {opt.optionType !== 'color' && (
              <Option
                option={opt}
                onChange={setSelected}
                selectedOption={selectedOptions[opt.name!]}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
};
