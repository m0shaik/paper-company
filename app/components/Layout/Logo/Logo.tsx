import Link from "next/link";
import { HOME_ROUTE } from "@/app/routes";

const Logo = () => (
  <Link
    href={HOME_ROUTE}
    className="flex md:justify-start md:items-center gap-2 md:px-8 max-md:pt-6"
  >
    <h5 className="relative text-ink font-bold text-2xl font-display">
      The Paper Company
    </h5>
  </Link>
);

export default Logo;
