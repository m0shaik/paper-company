"use client";
import { CartBag } from "../CartBag/CartBag";
import Link from "next/link";
import { STORE_ROUTE, HOME_ROUTE } from "@/app/routes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo/Logo";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isStorePage = pathname?.startsWith('/store');
  const isHomePage = pathname === HOME_ROUTE;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full border-b sticky top-0 z-50 backdrop-blur-lg transition-all duration-300 ${isScrolled
      ? 'bg-[hsla(30_4%,_90%,_0.2)] text-paper border-border'
      : 'bg-transparent text-ink border-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 py-4 items-center">
          {/* Navigation links on the left */}
          <div className="flex-shrink-0">
            <Link
              href={STORE_ROUTE}
              className={`voice-lg transition-all duration-300 ${!isHomePage
                  ? 'text-ink hover:text-primary-500'
                  : isStorePage
                    ? 'text-ink hover:text-primary-500'
                    : isScrolled
                      ? 'text-paper hover:opacity-80'
                      : 'text-ink hover:text-primary-500'
                }`}
            >
              Collections
            </Link>
          </div>

          {/* Logo in center */}
          <div className="flex-1 flex justify-center">
            <Logo
              textClassName={`voice-lg transition-all duration-300 ${!isHomePage
                  ? 'text-ink hover:text-primary-500'
                  : isStorePage
                    ? 'text-ink hover:text-primary-500'
                    : isScrolled
                      ? 'text-paper hover:opacity-80'
                      : 'text-ink hover:text-primary-500'
                }`}
            />
          </div>

          {/* Cart on the right */}
          <div className="flex-shrink-0 justify-self-end">
            <div className="w-6 h-6 flex items-center justify-center">
              <CartBag isScrolled={isScrolled} isStorePage={isStorePage} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
