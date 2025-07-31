import React from "react";
import MenuCard from "@/app/components/MenuCard/MenuCard";
import Link from "next/link";

const BookLink = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      className="capitalize font-body leading-[23.44px] font-light text-xl text-primary-600 hover:text-primary-700"
    >
      shop now &gt;
    </Link>
  );
};

export default function MenuSection() {
  return (
    <section className="w-screen">
      <div className="md:py-36">
        <div className="grid sm:grid-cols-3 grid-cols-1 mx-auto justify-center items-center gap-6 max-w-6xl">
          <MenuCard
            title="Featured Products"
            image="/images/placeholder.jpg"
            description="High-quality items for all your essential needs"
          >
            <BookLink href="/store" />
          </MenuCard>
          <MenuCard
            title="Premium Collection"
            image="/images/placeholder.jpg"
            description="Unique designs and premium quality for special projects"
          >
            <BookLink href="/store" />
          </MenuCard>
          <MenuCard
            title="Eco-Friendly Options"
            image="/images/placeholder.jpg"
            description="Sustainable products for environmentally conscious customers"
          >
            <BookLink href="/store" />
          </MenuCard>
        </div>
      </div>
    </section>
  );
}
