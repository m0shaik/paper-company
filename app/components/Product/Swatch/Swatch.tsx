import React from "react";
import { Button } from "@/components/ui/button";
interface SwatchProps {
  active?: boolean;
  children?: any;
  variant?: "size" | "color" | string;
  color?: string;
  label?: string | null;
}

const Swatch: React.FC<
  Omit<React.ButtonHTMLAttributes<any>, "variant"> & SwatchProps
> = ({ active, color = "", label = null, variant = "size", ...props }) => {
  variant = variant?.toLowerCase();

  if (label) {
    label = label?.toLowerCase();
  }

  return (
    <Button
      variant="outline"
      size="icon"
      role="option"
      className="rounded-full flex items-center justify-center border border-border bg-paper w-5 h-5 p-1 hover:border-primary-400 transition-colors"
      aria-selected={active}
      aria-label={variant && label ? `${variant} ${label}` : "Variant Swatch"}
      {...(label && { title: label })}
      style={{ backgroundColor: color }}
      {...props}
    >
      {color && active && (
        <span>
          <svg
            className="w-3 h-3 text-paper mix-blend-difference"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </span>
      )}
      {!color ? label : null}
    </Button>
  );
};

export default React.memo(Swatch);
