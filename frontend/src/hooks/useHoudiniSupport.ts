"use client";

import { useEffect } from "react";

/**
 * Detects support for CSS Houdini (Paint Worklet) and WebGPU, mirroring
 * the result onto the existing `--houdini-supported` / `--webgpu-supported`
 * custom properties (see globals.css) on the root element. These tokens
 * aren't consumed by any styles yet — this hook only keeps them accurate
 * for future conditional styling / feature gating.
 */
export function useHoudiniSupport() {
  useEffect(() => {
    const root = document.documentElement;

    const houdiniSupported = typeof CSS !== "undefined" && "paintWorklet" in CSS;
    root.style.setProperty("--houdini-supported", houdiniSupported ? "1" : "0");

    let cancelled = false;

    if ("gpu" in navigator) {
      (navigator as unknown as { gpu: { requestAdapter: () => Promise<unknown> } }).gpu
        .requestAdapter()
        .then((adapter) => {
          if (!cancelled) root.style.setProperty("--webgpu-supported", adapter ? "1" : "0");
        })
        .catch(() => {
          if (!cancelled) root.style.setProperty("--webgpu-supported", "0");
        });
    } else {
      root.style.setProperty("--webgpu-supported", "0");
    }

    return () => {
      cancelled = true;
    };
  }, []);
}
