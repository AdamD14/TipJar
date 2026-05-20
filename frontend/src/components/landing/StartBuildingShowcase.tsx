"use client";

import ExampleProfile from "./ExampleProfile";

export default function StartBuildingShowcase() {
  return (
    <section id="studio" className="relative w-full min-h-screen">
      <img
        src="/show.webp"
        alt=""
        className="pointer-events-none absolute inset-0 -z-10 w-full h-full object-cover"
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 md:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — ExampleProfile */}
          <div className="flex items-center justify-center">
            <ExampleProfile />
          </div>

          {/* Middle — empty */}
          <div className="hidden lg:block" />

          {/* Right — empty */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
