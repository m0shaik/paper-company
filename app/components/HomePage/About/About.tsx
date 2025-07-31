import React from "react";

export default function AboutSection() {
  return (
    <section className="border-2 border-border p-8 bg-paper">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-border h-64 bg-base-100 flex items-center justify-center rounded-base">
          <span className="text-base-500 font-body">Image Placeholder</span>
        </div>
        <div className="p-4">
          <h2 className="text-3xl font-bold mb-4 text-ink font-display">About Us</h2>
          <p className="text-base-600 mb-4 leading-relaxed font-body">
            We are your trusted destination for premium products across all categories. 
            With years of experience in retail excellence, we pride ourselves 
            on delivering exceptional quality and outstanding customer service.
          </p>
          <p className="text-base-600 font-body">
            Tel: 123-456-7890 | Email: info@premiumstore.com
          </p>
        </div>
      </div>
    </section>
  );
}
