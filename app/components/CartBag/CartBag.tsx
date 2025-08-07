"use client";
import { useUI } from "../Provider/context";
import { useCart } from "@/app/hooks/useCart";
import { Order } from "@wix/wix-ui-icons-common";
import { Button } from "@/app/components/ui/button";

interface CartBagProps { }

export const CartBag = ({ }: CartBagProps) => {
  const { setSidebarView, toggleSidebar } = useUI();
  const { data } = useCart();
  const itemsCount = data?.lineItems?.length || 0;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        setSidebarView("CART_VIEW");
        toggleSidebar();
      }}
      className="flex relative transition-all duration-300 w-auto h-auto p-1 text-ink hover:text-primary-500"
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
