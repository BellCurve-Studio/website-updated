"use client";

import { useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
export const MOTION_QUERY = "(prefers-reduced-motion: no-preference)";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeToMotionPreference(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function useReducedMotion() {
  return useSyncExternalStore(subscribeToMotionPreference, prefersReducedMotion, () => false);
}

export function parallaxMedia(target: Element | string, trigger: Element | string, travel = 9) {
  const distance = () => window.innerWidth < 768 ? travel * 0.45 : travel;
  return gsap.fromTo(target, { yPercent: () => -distance() }, {
    yPercent: distance,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "clamp(top bottom)",
      end: "clamp(bottom top)",
      scrub: 0.65,
      invalidateOnRefresh: true,
    },
  });
}

export function revealElements(scope: Element | null) {
  if (!scope) return;
  gsap.utils.toArray<HTMLElement>(".section-reveal", scope).forEach((element) => {
    gsap.from(element, {
      y: 22,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: element, start: "top 88%", once: true },
    });
  });
}
