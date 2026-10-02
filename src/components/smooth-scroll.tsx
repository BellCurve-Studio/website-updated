"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useMemo, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, useReducedMotion } from "@/lib/animation";

interface SmoothScrollProps {
  children: ReactNode;
}

function ScrollSynchronization() {
  const lenis = useLenis(() => ScrollTrigger.update());

  useGSAP(() => {
    if (!lenis) return;
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, { dependencies: [lenis], revertOnUpdate: true });

  return null;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const reducedMotion = useReducedMotion();
  const options = useMemo(() => ({
    autoRaf: false,
    lerp: 0.1,
    duration: 1.2,
    smoothWheel: !reducedMotion,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    anchors: { duration: reducedMotion ? 0 : 1.2 },
  }), [reducedMotion]);

  return (
    <ReactLenis root options={options}>
      <ScrollSynchronization />
      {children}
    </ReactLenis>
  );
}
