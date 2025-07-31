import React from "react";

export default function HeroSection() {
  return (
    <section
      className="relative h-[85vh] w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://static.wixstatic.com/media/0e1e6c_8bfcd7d725f546088aea17b762efd3fa~mv2.jpg/v1/fill/w_1805,h_939,al_c,q_85,enc_avif,quality_auto/0e1e6c_8bfcd7d725f546088aea17b762efd3fa~mv2.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-paper/50" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 max-w-7xl mx-auto">
        <h2 className="text-[64px] italic font-display tracking-tight mb-4">
          Fresh from the Press
        </h2>
        <p className="text-muted-foreground font-body text-lg mb-8 tracking-wider">
          explore our newest additions added to the collection
        </p>
        <button className="bg-paper text-ink border border-ink px-8 py-3 uppercase tracking-widest text-sm font-body hover:bg-ink hover:text-paper transition-colors">
          NEW ARRIVALS
        </button>
      </div>
    </section>
  );
}
