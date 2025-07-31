import React from "react";

export default function Testimonies() {
  return (
    <section className="border-2 border-border p-8 bg-paper">
      <div className="max-w-screen-md mx-auto text-center">
        <blockquote className="mb-6">
          <h4 className="text-2xl font-bold mb-4 text-ink font-display">
            "Exceptional quality and service. The best online store we've shopped with."
          </h4>
        </blockquote>
        <div className="flex flex-col items-center">
          <div className="border border-border w-24 h-24 bg-base-100 mb-4 flex items-center justify-center rounded-base">
            <span className="text-base-500 text-xs font-body">Photo</span>
          </div>
          <div className="text-base-600 font-body">Sarah Johnson, Toronto</div>
        </div>
      </div>
    </section>
  );
}
