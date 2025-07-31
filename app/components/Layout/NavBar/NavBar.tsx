"use client";
import { NavLink } from "./NavLink";
import { useEffect, useState } from "react";
import type { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { CartBag } from "@/app/components/CartBag/CartBag";
import { useUI } from "@/app/components/Provider/context";
import {
  HOME_ROUTE,
  STORE_ROUTE,
} from "@/app/routes";

export const navbarMainItems = [
  { ref: STORE_ROUTE, label: "Collections" },
];

const StyledNavLink = ({
  isActive,
  className,
  ...linkProps
}: LinkProps & {
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
}) => (
  <NavLink
    className={`${className ?? ""} ${isActive ? "underline rounded-md" : "text-ink hover:text-primary-500"
      } font-body`}
    {...linkProps}
  />
);

export function NavBar() {
  const pathname = usePathname();
  const [linkRef, setLinkRef] = useState<LinkProps["href"]>(pathname!);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { closeSidebar } = useUI();

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeSidebar();
    }
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const effect = () => {
      if (isMenuOpen) {
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
      } else {
        document.getElementsByTagName("html")[0].style.overflow = "auto";
      }
    };
    effect();
  }, [isMenuOpen]);

  useEffect(() => {
    linkRef !== pathname && setLinkRef(pathname!);
    isMenuOpen && setIsMenuOpen(false);
  }, [pathname]);

  return (
    <div>
      <nav className="py-4 justify-between items-center flex">
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className={`relative flex items-center rounded-base focus:outline-none border border-ink overflow-hidden z-[51] ${isMenuOpen ? "border-none" : ""
              }`}
            aria-controls="primary-navigation"
            style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0.1)" }}
          >
            <svg
              stroke="currentColor"
              fill="none"
              className={`w-12 h-12 transition-all duration-[350ms] text-ink ${isMenuOpen ? "translate-x-[3px] -translate-y-[1px] rotate-45" : ""
                }`}
              viewBox="-10 -10 120 120"
            >
              <path
                className={`transition-[stroke-dasharray,stroke-dashoffset] duration-[350ms] ${isMenuOpen ? "[stroke-dasharray:60_105_60_300] [stroke-dashoffset:-90]" : "[stroke-dasharray:60_31_60_300]"
                  }`}
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70"
              ></path>
            </svg>
          </button>
        </div>
        <ul className="lg:flex items-center gap-4 justify-end hidden">
          {navbarMainItems.map(({ ref, label }) => (
            <li key={ref} className="relative">
              <StyledNavLink
                className="text-lg font-bold font-body"
                isActive={ref === linkRef}
                href={ref}
                onClick={() => {
                  setLinkRef(ref);
                }}
              >
                {label}
              </StyledNavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`relative z-50 ${isMenuOpen ? "visible" : "invisible"}`}>
        <nav
          className={`fixed top-0 bottom-0 flex flex-col w-screen py-6 px-6 bg-paper border-r border-border overflow-y-auto
                    ${isMenuOpen
              ? "left-0 opacity-100"
              : "left-[100vw] opacity-0"
            } transition-all ease-in-out duration-slow`}
        >
          <ul className="my-10 flex flex-col items-center gap-8 justify-end">
            <li key={HOME_ROUTE} className="relative">
              <StyledNavLink
                className="text-2xl font-bold font-display"
                isActive={HOME_ROUTE === linkRef}
                href={HOME_ROUTE}
                onClick={() => {
                  setLinkRef(HOME_ROUTE);
                }}
              >
                Home
              </StyledNavLink>
            </li>
            {navbarMainItems.map(({ ref, label }) => (
              <li key={ref} className="relative">
                <StyledNavLink
                  className="text-2xl font-bold font-display"
                  isActive={ref === linkRef}
                  href={ref}
                  onClick={() => {
                    setLinkRef(ref);
                  }}
                >
                  {label}
                </StyledNavLink>
              </li>
            ))}
            <li className="relative mt-20">
              <CartBag />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
