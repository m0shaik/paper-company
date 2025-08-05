"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

export function Counter({
  onChange,
  ticketId,
  optionId,
  price,
  initialCount = 0,
  limit,
}: {
  onChange: Function;
  ticketId: string;
  optionId?: string;
  price: number;
  initialCount: number;
  limit: number;
}) {
  const onSelect = (value: string) => {
    const count = parseInt(value);
    if (count === 0) return;
    onChange({
      [`${ticketId}${optionId ? `|${optionId}` : ""}`]: {
        quantity: count,
        price,
      },
    });
  };

  return (
    <div className="w-full sm:w-24">
      <Select onValueChange={onSelect} defaultValue={initialCount.toString()}>
        <SelectTrigger className="border-ink px-5 py-1 h-auto">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-48">
          {Array.from({ length: limit + 1 }, (_, index) => index + 1).map((i) => (
            <SelectItem key={i} value={i.toString()}>
              {i}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
