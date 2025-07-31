import React from "react";

export default function HeroSection() {
  return (
    <section
      className="relative h-[85vh] w-full bg-cover  bg-no-repeat bg-[110%]"
      style={{
        backgroundImage: `url('https://static.wixstatic.com/media/0e1e6c_924808d0379d4a9bb8fc6d4acb7b30aa~mv2.jpg/v1/fill/w_1737,h_1031,al_c,q_85,enc_auto/0e1e6c_924808d0379d4a9bb8fc6d4acb7b30aa~mv2.jpg')`,
      }}
    >
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 max-w-7xl mx-auto gap-7">
        <h2 className="voice-5l italic">Fresh from the Press</h2>
        <p className="voice-lg">
          explore our newest additions added to the collection
        </p>
        <button className="bg-paper text-ink border border-ink px-8 py-3 uppercase tracking-widest text-sm font-body hover:bg-ink hover:text-paper transition-colors">
          NEW ARRIVALS
        </button>
      </div>
    </section>
  );
}


