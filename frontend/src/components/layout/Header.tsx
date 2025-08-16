"use client";

import Navbar from "./Navbar";
import { Button } from "@/components/base/buttons";
import { LinkButton } from "@/components/base/buttons";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full h-16 border-b border-brand-gold shadow-[0_2px_6px_0_rgba(255,165,0,0.2)]">
      <div className="mx-auto flex h-16  items-start gap-4 px-2  justify-between">
        <div className="flex items-center text-[10px]">
          <Navbar />
        </div>

        <div className="flex items-center space-x-2 mt-2">
          <button
            className="inline-block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
          >
            Login
          </button>
          <button
            className="inline-block rounded-sm border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring-3 focus:outline-hidden"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}