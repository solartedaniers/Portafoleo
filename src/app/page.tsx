// app/page.tsx
"use client";
import React from "react";
import { AppProvider } from "./components/ThemeLangContext";
import Hero from "./components/Hero";
import './globals.css';

export default function Page() {
  return (
    <AppProvider>
      <main className="min-h-screen">
        <Hero />
      </main>
    </AppProvider>
  );
}
