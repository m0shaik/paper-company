import Link from "next/link";
import { HOME_ROUTE } from "@/app/routes";

interface LogoProps {
  className?: string;
  textClassName?: string;
}

const Logo = ({ className = "", textClassName = "" }: LogoProps) => (
  <Link
    href={HOME_ROUTE}
    className={`select-none ${className}`}
  >
    <span className={`font-semibold select-none ${textClassName}`}>
      <span className="font-bold text-primary-500 text-2xl">P</span>aper Company
    </span>
  </Link>
);

export default Logo;
