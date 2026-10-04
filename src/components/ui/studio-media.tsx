"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP, useReducedMotion } from "@/lib/animation";

interface StudioMediaProps {
  image: string;
  video?: string;
  enabled?: boolean;
  eager?: boolean;
  sizes?: string;
  alt?: string;
}

export function StudioMedia({ image, video, enabled = true, eager = false, sizes = "100vw", alt = "" }: StudioMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = videoRef.current;
    const container = containerRef.current;
    if (!element || !container) return;
    let visible = false;
    let mounted = true;
    const updatePlayback = () => {
      if (visible && enabled && !reducedMotion && !document.hidden) {
        void element.play().then(() => {
          if (!mounted || !visible || document.hidden) element.pause();
        }).catch(() => {});
      } else element.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    }, { threshold: 0.05 });
    observer.observe(container);
    document.addEventListener("visibilitychange", updatePlayback);
    return () => {
      mounted = false;
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      element.pause();
    };
  }, [enabled, reducedMotion, video]);

  useGSAP(() => {
    if (!videoRef.current) return;
    gsap.to(videoRef.current, { opacity: playing && enabled && !reducedMotion ? 1 : 0, duration: reducedMotion ? 0 : 0.4, ease: "power2.out", overwrite: true });
  }, { scope: containerRef, dependencies: [playing, enabled, reducedMotion] });

  return (
    <div ref={containerRef} data-priority-media={eager ? "true" : undefined} className="absolute inset-0">
      <Image src={image} alt={alt} fill sizes={sizes} preload={eager} className="object-cover" />
      {video && <video ref={videoRef} src={video} muted loop playsInline preload="none" aria-hidden="true" onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setPlaying(false)} className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0" />}
    </div>
  );
}
