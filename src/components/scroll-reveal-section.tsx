"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface StatItem {
  id: string;
  number: string;
  label: string;
}

const stats: StatItem[] = [
  {
    id: "brands",
    number: "15+",
    label:
      "Founder-led brands from disruptive creative agencies to consumer brands",
  },
  {
    id: "awards",
    number: "30+",
    label: "Globally recognized awards (Awwwards, FWA, CSSDA)",
  },
];

const paragraph1Text =
  "Great founders changing the world deserve a presence as powerful as what they're building. Most founders we work with have built something significant, but their digital presence doesn't show it yet.";

const paragraph2Text =
  "That gap costs more than revenue. It costs the certainty that your brand is finally being understood.";

const clientRow1 = [
  {
    name: "Vinamilk",
    icon: "/assets/SVG/69e9f4f4c88302e5028f9618_Client-6.svg",
    scaleClass: "scale-[1.9] sm:scale-[2.15] lg:scale-[2.4]",
  },
  {
    name: "Moc Chau Creamery",
    icon: "/assets/SVG/69e9f491acef69f9818ce334_Client-1.svg",
    scaleClass: "scale-[1.45] sm:scale-[1.65] lg:scale-[1.85]",
  },
  {
    name: "University of Sydney",
    icon: "/assets/SVG/69e9f4c62222c4e2399adb2d_Client-4.svg",
    scaleClass: "scale-[1.85] sm:scale-[2.1] lg:scale-[2.35]",
  },
  {
    name: "OH Architecture",
    icon: "/assets/SVG/69e9f4dc7cb660c42ce224bd_Client.svg",
    scaleClass: "scale-[1.5] sm:scale-[1.7] lg:scale-[1.9]",
  },
];

const clientRow2 = [
  {
    name: "Supersolid Agency",
    icon: "/assets/SVG/69e9f4d0e415495ae306feb2_Client-3.svg",
    scaleClass: "scale-[1.6] sm:scale-[1.85] lg:scale-[2.1]",
  },
  {
    name: "SLIK Agency",
    icon: "/assets/SVG/69e9f4ae5b2f1cfeee4e5276_Client-5.svg",
    scaleClass: "scale-[1.65] sm:scale-[1.9] lg:scale-[2.15]",
  },
  {
    name: "Mammoth Murals",
    icon: "/assets/SVG/69e9f4ba9599b080b301b9f2_Client-7.svg",
    scaleClass: "scale-[1.6] sm:scale-[1.85] lg:scale-[2.1]",
  },
  {
    name: "Backhouse",
    icon: "/assets/SVG/69e9f4a05d31ea04c8f9f86a_Client-2.svg",
    scaleClass: "scale-[1.55] sm:scale-[1.8] lg:scale-[2.05]",
  },
];

export function ScrollRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textTriggerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const [activeStatIndex, setActiveStatIndex] = useState(0);

  const words1 = paragraph1Text.split(" ");
  const words2 = paragraph2Text.split(" ");

  const goToStat = (nextIdx: number, direction: "next" | "prev") => {
    if (isAnimatingRef.current || nextIdx === activeStatIndex) return;
    isAnimatingRef.current = true;

    const currentSlide = `.stat-slide-${activeStatIndex}`;
    const nextSlide = `.stat-slide-${nextIdx}`;
    const currentCounter = `.stat-counter-${activeStatIndex}`;
    const nextCounter = `.stat-counter-${nextIdx}`;

    const yOut = direction === "next" ? -22 : 22;
    const yIn = direction === "next" ? 26 : -26;

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveStatIndex(nextIdx);
        isAnimatingRef.current = false;
      },
    });

    tl.to(currentSlide, {
      y: yOut,
      opacity: 0,
      filter: "blur(4px)",
      duration: 0.34,
      ease: "power2.inOut",
    })
      .to(
        currentCounter,
        {
          y: yOut * 0.7,
          opacity: 0,
          duration: 0.28,
          ease: "power2.inOut",
        },
        "<"
      )
      .fromTo(
        nextCounter,
        {
          y: yIn * 0.7,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.38,
          ease: "power3.out",
        },
        "-=0.12"
      )
      .fromTo(
        nextSlide,
        {
          y: yIn,
          opacity: 0,
          filter: "blur(5px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power3.out",
        },
        "<0.02"
      );
  };

  useGSAP(
    () => {
      const words = containerRef.current?.querySelectorAll(".scroll-reveal-word");
      if (!words || words.length === 0) return;

      gsap.fromTo(
        words,
        {
          opacity: 0.18,
          color: "rgba(255, 255, 255, 0.18)",
        },
        {
          opacity: 1,
          color: "rgba(255, 255, 255, 1)",
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: textTriggerRef.current,
            start: "top 75%",
            end: "bottom 70%",
            scrub: 0.7,
          },
        }
      );

      gsap.from(".stat-box", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".author-card", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".author-card",
          start: "top 90%",
        },
      });

      gsap.from(".client-logo-card", {
        opacity: 0,
        y: 20,
        stagger: 0.04,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".client-logo-grid",
          start: "top 85%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative z-10 w-full bg-[#121212] text-[#f0f0eb] px-6 sm:px-10 lg:px-14 py-24 sm:py-32 lg:py-40 selection:bg-white selection:text-black overflow-hidden"
    >
      <div className="mx-auto max-w-[1520px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-14 xl:gap-x-20 items-start">
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-between self-stretch">
            <div className="stat-box w-full max-w-[320px]">
              <div className="border-t border-white/20 pt-4 flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      const prevIdx =
                        (activeStatIndex - 1 + stats.length) % stats.length;
                      goToStat(prevIdx, "prev");
                    }}
                    aria-label="Previous stat"
                    className="group flex h-6 w-6 items-center justify-center text-white/50 hover:text-white transition-colors active:scale-90"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const nextIdx = (activeStatIndex + 1) % stats.length;
                      goToStat(nextIdx, "next");
                    }}
                    aria-label="Next stat"
                    className="group flex h-6 w-6 items-center justify-center text-white/50 hover:text-white transition-colors active:scale-90"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center font-mono text-xs sm:text-[13px] text-white/50 tracking-wider">
                  <div className="relative h-4 w-5 overflow-hidden inline-flex items-center justify-center">
                    {stats.map((_, idx) => (
                      <span
                        key={idx}
                        className={`stat-counter-${idx} absolute inset-0 flex items-center justify-center ${
                          idx === activeStatIndex
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                    ))}
                  </div>
                  <span>/0{stats.length}</span>
                </div>
              </div>

              <div className="relative min-h-[160px] w-full overflow-hidden">
                {stats.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`stat-slide-${idx} ${
                      idx === activeStatIndex
                        ? "relative z-10"
                        : "absolute inset-0 pointer-events-none opacity-0"
                    }`}
                  >
                    <div className="hero-heading text-6xl sm:text-7xl font-bold tracking-tight text-white select-none">
                      {item.number}
                    </div>
                    <p className="mt-4 text-xs sm:text-sm leading-relaxed text-white/60 max-w-[260px]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            ref={textTriggerRef}
            className="lg:col-span-8 xl:col-span-8 flex flex-col justify-between"
          >
            <div className="hero-heading text-[1.75rem] sm:text-[2.5rem] md:text-[2.85rem] lg:text-[3rem] xl:text-[3.35rem] font-bold tracking-[-0.03em] leading-[1.2] text-white">
              <p className="mb-8 sm:mb-12">
                {words1.map((word, i) => (
                  <span
                    key={`w1-${i}`}
                    className="scroll-reveal-word inline-block mr-[0.28em]"
                  >
                    {word}
                  </span>
                ))}
              </p>

              <p className="mb-12 sm:mb-16">
                {words2.map((word, i) => (
                  <span
                    key={`w2-${i}`}
                    className="scroll-reveal-word inline-block mr-[0.28em]"
                  >
                    {word}
                  </span>
                ))}
              </p>
            </div>

            <div className="author-card flex items-center justify-between border-t border-white/10 pt-8 mt-2">
              <div className="flex items-center gap-3.5">
                <div className="relative h-10 w-10 sm:h-11 sm:w-11 overflow-hidden rounded-full border border-white/20 bg-white/10 shrink-0">
                  <Image
                    src="/assets/AVIF/6a092d5259ca7aa33208cde1_DSCF2544 copy.avif"
                    alt="Huy Nguyen portrait"
                    fill
                    sizes="48px"
                    className="object-cover object-center"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-tight">
                    Huy (By Huy) Nguyen
                  </h4>
                  <p className="text-xs font-mono text-white/50 tracking-tight mt-0.5">
                    Founder, MONOLOG
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#e25442] shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-none stroke-current stroke-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="client-logo-grid mt-20 sm:mt-28 lg:mt-36 pt-10 sm:pt-14 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-12 xl:gap-x-16 items-start">
            <div className="lg:col-span-4 flex items-center lg:h-24 sm:lg:h-28 lg:h-32">
              <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-mono tracking-wider text-white/55">
                <span className="h-2 w-2 rounded-full bg-white/40 inline-block shrink-0" />
                <span>Brands we&apos;ve helped</span>
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 sm:gap-x-8 lg:gap-x-10 pb-6 sm:pb-8 lg:pb-10 border-b border-white/10">
                {clientRow1.map((client) => (
                  <div
                    key={client.name}
                    className="client-logo-card group flex items-center justify-center text-center select-none"
                  >
                    <div className="h-24 sm:h-28 lg:h-32 w-full flex items-center justify-center">
                      <div className="transition-transform duration-300 group-hover:scale-105 flex items-center justify-center w-full">
                        <div
                          className={`flex items-center justify-center origin-center ${client.scaleClass}`}
                        >
                          <Image
                            src={client.icon}
                            alt={client.name}
                            width={320}
                            height={320}
                            className="h-16 sm:h-20 lg:h-24 w-auto max-w-[85%] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 sm:gap-x-8 lg:gap-x-10 pt-6 sm:pt-8 lg:pt-10">
                {clientRow2.map((client) => (
                  <div
                    key={client.name}
                    className="client-logo-card group flex items-center justify-center text-center select-none"
                  >
                    <div className="h-24 sm:h-28 lg:h-32 w-full flex items-center justify-center">
                      <div className="transition-transform duration-300 group-hover:scale-105 flex items-center justify-center w-full">
                        <div
                          className={`flex items-center justify-center origin-center ${client.scaleClass}`}
                        >
                          <Image
                            src={client.icon}
                            alt={client.name}
                            width={320}
                            height={320}
                            className="h-16 sm:h-20 lg:h-24 w-auto max-w-[85%] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
