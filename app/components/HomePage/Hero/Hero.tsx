import React from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { STORE_ROUTE } from "@/app/routes";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 max-w-7xl mx-auto gap-7 z-10 text-paper">
        <h2 className="voice-5l italic">Fresh from the Press</h2>
        <p className="voice-lg">
          explore our newest additions added to the collection
        </p>
        <Link href={STORE_ROUTE}>
          <Button
            variant="outline"
            className="bg-paper text-ink border border-ink px-8 py-3 uppercase tracking-widest text-sm font-body hover:bg-ink hover:text-paper transition-colors"
          >
            NEW ARRIVALS
          </Button>
        </Link>
      </div>
    </section>
  );
}


