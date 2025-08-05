"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HOME_ROUTE, STORE_ROUTE } from "@/app/routes";

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    router.prefetch(HOME_ROUTE);
  }, []);

  useEffect(() => {
    const getTitle = () => {
      return document?.title?.split("|")[0] || "";
    };

    const getDescription = () => {
      return (
        document
          ?.querySelector('meta[name="description"]')
          ?.getAttribute("content") || ""
      );
    };

    setTitle(getTitle());
    setDescription(getDescription());
  }, [pathname]);

  if (
    pathname === STORE_ROUTE || pathname.includes("store/category/")
  ) {
    return (
      <div>
        <div className="pb-8 text-center">
          <div className={`${description ? "mb-12" : "mb-10"}`}>
            {/* Spacing div to maintain layout without title/underline */}
          </div>
          {description && (
            <div className="mb-10">
              <h2 className="inner-page-subtitle">{description}</h2>
            </div>
          )}
          {children}
        </div>
      </div>
    );
  }
  return <>{children}</>;
};
