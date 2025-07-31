import { CartBag } from "../CartBag/CartBag";
import { NavBar } from "./NavBar/NavBar";
import Logo from "@/app/components/Layout/Logo/Logo";

const Header = () => (
  <header className="w-full border-b border-border bg-base-900">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex h-20 items-center justify-between">
        <div className="flex-1">
          <NavBar />
        </div>
        <div className="flex-1 flex justify-center">
          <h1 className="text-2xl font-display">The Paper Company</h1>
        </div>
        <div className="flex-1 flex justify-end">
          <CartBag />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
