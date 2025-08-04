import React, { FC } from "react";
import { Quantity, QuantityProps } from "../Quantity/Quantity";

export interface QuantityAsUnitAreaProps extends QuantityProps {
  unit?: string;
}

export const QuantityAsUnitArea: FC<QuantityAsUnitAreaProps> = ({
  unit = "sq ft",
  ...quantityProps
}) => {
  return (
    <div className="flex items-center gap-2">
      <Quantity {...quantityProps} />
      <span className="text-sm text-gray-600 font-body">{unit}</span>
    </div>
  );
};