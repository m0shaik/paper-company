import { CartBag } from "../CartBag/CartBag";
import { NavBar } from "./NavBar/NavBar";
import Logo from "@/app/components/Layout/Logo/Logo";
import Link from "next/link";

const Header = () => (
  <header className="w-full border-b border-border bg-base-900">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex h-20 items-center justify-between">
        <div className="flex-1">
          <NavBar />
        </div>
        <div className="flex-1 flex justify-center">
          <Link href="/" className="voice-2l hover:opacity-80 transition-opacity">
            The Paper Company
          </Link>
        </div>
        <div className="flex-1 flex justify-end">
          <CartBag />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
