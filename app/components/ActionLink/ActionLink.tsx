import React from "react";
import Link from "next/link";
import { HOME_ROUTE } from "@/app/routes";
import { Button } from "@/app/components/ui/button";

interface ActionLinkaProps {
  href?: string;
  children?: React.ReactNode;
  className?: string;
  position?: "start" | "end" | "center" | "stretch";
}

export default function ActionLink({
  href = HOME_ROUTE,
  children = "Press Me",
  className = "",
  position = "start",
}: ActionLinkaProps) {
  return (
    <Button
      asChild
      className={`btn-main self-${position} max-lg:w-full max-lg:text-center md:mt-2 ${className}`}
    >
      <Link href={href}>
        {children}
      </Link>
    </Button>
  );
}
