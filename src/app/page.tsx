import React from "react";
import Hero from "./components/Hero";

export default function Page() {
  return (
    <main className="w-screen h-dvh flex items-center justify-center bg-black">
      <div className="
        w-full h-full
        border-[8px] border-gold box-border
        sm:border-[16px]
        lg:border-[20px]
        overflow-hidden
      ">
        <Hero />
      </div>
    </main>
  );
}
