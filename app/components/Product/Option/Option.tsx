import { ProductOption } from '@/app/model/store/store-api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function Option({
                         onChange,
                         option,
                         selectedOption,
                       }: {
  onChange: Function;
  option: ProductOption;
  selectedOption: string;
}) {
  const onSelect = (optionSelected: string) => {
    onChange({ [option.name!]: optionSelected });
  };

  return (
    <Select value={selectedOption || ""} onValueChange={onSelect}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {option.choices!.map(({ value }) => {
          return (
            <SelectItem key={value} value={value!}>
              {value}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
