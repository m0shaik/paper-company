"use client";
import React from "react";
import { Sidebar } from "./Sidebar";
import { useUI } from "../Provider/context";
import { CartView } from "../Cart/CartView";

export const SidebarUI: React.FC = () => {
  const { displaySidebar, closeSidebar } = useUI();
  return displaySidebar ? (
    <Sidebar onClose={closeSidebar}>
      <CartView />
    </Sidebar>
  ) : null;
};
