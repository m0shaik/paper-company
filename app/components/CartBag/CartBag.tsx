"use client";
import { useUI } from "../Provider/context";
import { Order } from "@wix/wix-ui-icons-common";

export const CartBag = () => {
  const { setSidebarView, toggleSidebar } = useUI();
  const itemsCount = 0;

  return (
    <button
      onClick={() => {
        setSidebarView("CART_VIEW");
        toggleSidebar();
      }}
      className="flex relative"
      aria-label={`Cart items: ${itemsCount}`}
    >
      <Order size="24" stroke={"currentColor"} />
      {itemsCount! > 0 && (
        <span className="font-bold text-xs  absolute top-3 right-4">
          {itemsCount}
        </span>
      )}
    </button>
  );
};
