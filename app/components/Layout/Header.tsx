"use client";
import { CartBag } from "../CartBag/CartBag";
import Link from "next/link";
import { STORE_ROUTE } from "@/app/routes";
import Logo from "./Logo/Logo";

const Header = () => {
  return (
    <header className="w-full border-b sticky top-0 z-50 backdrop-blur-lg transition-all duration-300 bg-transparent text-ink border-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 py-4 items-center">
          {/* Navigation links on the left */}
          <div className="flex-shrink-0">
            <Link
              href={STORE_ROUTE}
              className="text-sm sm:text-base md:voice-lg transition-all duration-300 text-ink hover:text-primary-500"
            >
              Collections
            </Link>
          </div>

          {/* Logo in center */}
          <div className="flex-1 flex justify-center">
            <Logo
              textClassName="voice-lg transition-all duration-300 text-ink hover:text-primary-500"
            />
          </div>

          {/* Cart on the right */}
          <div className="flex-shrink-0 justify-self-end">
            <div className="w-6 h-6 flex items-center justify-center">
              <CartBag />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
