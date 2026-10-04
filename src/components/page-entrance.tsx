"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useLenis } from "lenis/react";
import { gsap, ScrollTrigger, useReducedMotion } from "@/lib/animation";
import { Loader } from "@/components/ui/loader";
import { cn } from "@/lib/utils";

const EntranceContext = createContext(true);
const subscribeToHydration = () => () => {};

export function usePageReady() {
  return useContext(EntranceContext);
}

export function PageEntrance({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [complete, setComplete] = useState(false);
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const reducedMotion = useReducedMotion();
  const lenis = useLenis();

  useEffect(() => {
    if (!hydrated || reducedMotion) return;

    const timer = gsap.delayedCall(2.2, () => {
      setReady(true);
    });

    return () => {
      timer.kill();
    };
  }, [hydrated, reducedMotion]);

  useEffect(() => {
    if (!hydrated) return;
    if (complete) {
      ScrollTrigger.refresh();
      return;
    }
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      document.documentElement.style.overflow = overflow;
      lenis?.start();
    };
  }, [hydrated, complete, lenis]);

  const handleComplete = () => {
    setReady(true);
    setComplete(true);
  };

  return (
    <EntranceContext value={ready}>
      <div inert={hydrated && !ready} aria-busy={hydrated && !ready}>
        {children}
      </div>
      {!complete && (
        <Loader
          duration={2.2}
          className={cn(
            "fixed inset-0 z-[100] h-screen w-screen",
            ready && "pointer-events-none",
          )}
          onComplete={handleComplete}
        />
      )}
    </EntranceContext>
  );
}
