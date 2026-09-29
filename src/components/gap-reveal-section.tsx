"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function GapRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLSpanElement>(null);
  const rightTextRef = useRef<HTMLSpanElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const getOffsetX = () => {
        if (typeof window === "undefined") return 120;
        return Math.min(Math.max(window.innerWidth * 0.1, 40), 160);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        contentWrapperRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.22, ease: "power2.out" },
        0
      );

      tl.fromTo(
        bottomTextRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" },
        0.05
      );

      tl.fromTo(
        leftTextRef.current,
        { x: () => -getOffsetX() },
        { x: 0, duration: 0.52, ease: "power1.inOut" },
        0.22
      );

      tl.fromTo(
        rightTextRef.current,
        { x: () => getOffsetX() },
        { x: 0, duration: 0.52, ease: "power1.inOut" },
        0.22
      );

      tl.to(
        ".gap-video-1",
        { opacity: 0, duration: 0.16, ease: "power1.inOut" },
        0.34
      );
      tl.fromTo(
        ".gap-video-2",
        { opacity: 0 },
        { opacity: 1, duration: 0.16, ease: "power1.inOut" },
        0.34
      );

      tl.to(
        ".gap-video-2",
        { opacity: 0, duration: 0.16, ease: "power1.inOut" },
        0.54
      );
      tl.fromTo(
        ".gap-video-3",
        { opacity: 0 },
        { opacity: 1, duration: 0.16, ease: "power1.inOut" },
        0.54
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative z-20 h-screen w-full bg-[#121212] text-[#f0f0eb] overflow-hidden flex flex-col justify-between items-center px-4 sm:px-6 md:px-10 selection:bg-white selection:text-black"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-screen"
        style={{
          backgroundImage:
            "url('/assets/PNG/692114faea9b602a766335ec_download.png')",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="w-full pt-20 sm:pt-24 shrink-0" />

      <div
        ref={contentWrapperRef}
        className="relative z-10 w-full flex items-center justify-center my-auto will-change-transform"
      >
        <div className="flex items-center justify-center w-full max-w-[1720px] px-2 sm:px-4">
          <span
            ref={leftTextRef}
            className="hero-heading text-[clamp(2rem,5.8vw,7rem)] font-bold tracking-[-0.03em] uppercase text-white whitespace-nowrap select-none will-change-transform leading-none pr-3 sm:pr-5 lg:pr-8 shrink-0 text-right"
          >
            WE CLOSE
          </span>

          <div
            ref={videoWrapperRef}
            className="relative aspect-[9/13] w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border border-white/20 bg-black shadow-2xl shadow-black/90 my-auto"
          >
            <video
              src="/assets/WEBM/Mammoth%20Murals%20Compressed.webm"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="gap-video-1 absolute inset-0 h-full w-full object-cover"
            />
            <video
              src="/assets/WEBM/OH%20Arch%20Compressed.webm"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="gap-video-2 absolute inset-0 h-full w-full object-cover opacity-0"
            />
            <video
              src="/assets/WEBM/Looping%20About%20photo.webm"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="gap-video-3 absolute inset-0 h-full w-full object-cover opacity-0"
            />
          </div>

          <span
            ref={rightTextRef}
            className="hero-heading text-[clamp(2rem,5.8vw,7rem)] font-bold tracking-[-0.03em] uppercase text-white whitespace-nowrap select-none will-change-transform leading-none pl-3 sm:pl-5 lg:pl-8 shrink-0 text-left"
          >
            THAT GAP
          </span>
        </div>
      </div>

      <div
        ref={bottomTextRef}
        className="relative z-10 w-full max-w-[620px] mx-auto text-center px-4 pb-10 sm:pb-14 lg:pb-16 shrink-0 will-change-transform"
      >
        <p className="text-xs sm:text-[13.5px] md:text-[14.5px] leading-relaxed text-white/60 tracking-tight font-sans">
          Your website is where ideal customers decide if you&apos;re worth
          their time. We take what makes you irreplaceable, shape the entire
          experience around it, and make sure they feel that before they read
          another word.
        </p>
      </div>
    </section>
  );
}
