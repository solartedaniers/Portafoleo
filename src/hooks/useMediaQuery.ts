"use client";
import { useEffect, useState } from "react";
import { BREAKPOINTS } from "@/config/ui";

export function useMediaQuery(query: string, initialValue = false): boolean {
  const [matches, setMatches] = useState(initialValue);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export function useIsMobile(breakpoint: number = BREAKPOINTS.mobile): boolean {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
}

export function useHasHover(): boolean {
  return useMediaQuery("(hover: hover)", true);
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
