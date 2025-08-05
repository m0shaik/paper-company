"use client";
import { useUI } from "../Provider/context";
import { Order } from "@wix/wix-ui-icons-common";
import { Button } from "@/components/ui/button";

interface CartBagProps {
  isScrolled?: boolean;
  isStorePage?: boolean;
}

export const CartBag = ({ isScrolled = false, isStorePage = false }: CartBagProps) => {
  const { setSidebarView, toggleSidebar } = useUI();
  const itemsCount = 0;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        setSidebarView("CART_VIEW");
        toggleSidebar();
      }}
      className={`flex relative transition-all duration-300 w-auto h-auto p-1 ${isStorePage
          ? 'text-ink hover:text-primary-500'
          : isScrolled
            ? 'text-paper hover:opacity-80'
            : 'text-ink hover:text-primary-500'
        }`}
      aria-label={`Cart items: ${itemsCount}`}
    >
      <Order size="24" stroke={"currentColor"} />
      {itemsCount! > 0 && (
        <span className="font-bold text-xs absolute top-3 right-4 bg-primary-500 text-paper rounded-full w-5 h-5 flex items-center justify-center font-body">
          {itemsCount}
        </span>
      )}
    </Button>
  );
};
