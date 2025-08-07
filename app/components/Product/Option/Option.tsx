import { ProductOption } from '@/app/model/store/store-api';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown';
import { Button } from '@/app/components/ui/button';
import { ChevronDownIcon } from '@radix-ui/react-icons';

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

  const selectedChoice = option.choices?.find(choice => choice.value === selectedOption);
  const displayValue = selectedChoice?.value || 'Select';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between glass-card glass-dropdown-trigger border-white/20 transition-colors text-gray-900"
        >
          <span className="text-left truncate text-gray-900">{displayValue}</span>
          <ChevronDownIcon className="h-4 w-4 opacity-70 text-gray-700" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[var(--radix-dropdown-menu-trigger-width)] glass-card glass-dropdown-content border-white/20 backdrop-blur-md">
        {option.choices!.map(({ value }) => {
          return (
            <DropdownMenuItem
              key={value}
              onClick={() => onSelect(value!)}
              className="glass-dropdown-item cursor-pointer transition-colors text-gray-900 font-medium"
            >
              {value}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
