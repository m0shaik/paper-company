"use client";
import { CartBag } from "../CartBag/CartBag";
import Link from "next/link";
import { STORE_ROUTE } from "@/app/routes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isStorePage = pathname?.startsWith('/store');

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
        <div className="flex py-4 items-center">
          <div className="flex-1">
            <Link
              href={STORE_ROUTE}
              className={`voice-lg transition-all duration-300 ${isStorePage
                ? 'text-ink hover:text-primary-500'
                : isScrolled
                  ? 'text-paper hover:opacity-80'
                  : 'text-ink hover:text-primary-500'
                }`}
            >
              Collections
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <Link
              href="/"
              className={`voice-2l transition-all duration-300 whitespace-nowrap ${isStorePage
                ? 'text-ink hover:text-primary-500'
                : isScrolled
                  ? 'text-paper hover:opacity-80'
                  : 'text-ink hover:text-primary-500'
                }`}
            >
              The Paper Company
            </Link>
          </div>
          <div className="flex-1 flex justify-end">
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
