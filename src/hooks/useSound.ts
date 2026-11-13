"use client";
import { useCallback } from "react";

export function playSound(src: string): void {
  if (typeof Audio === "undefined") return;
  new Audio(src).play().catch(() => {});
}

export function useSound(src: string): () => void {
  return useCallback(() => playSound(src), [src]);
}
