"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_QUERY, prefersReducedMotion, revealElements } from "@/lib/animation";
import { STUDIO, BENCHMARKS, STARTING_POINTS } from "@/lib/studio-data";

const PARAGRAPHS = ["Good technology should make your business clearer, not more complicated.", "We’re a small software studio that asks questions before writing code. We understand the process, find what matters, and build around the way your team works."];

export function ScrollRevealSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add(MOTION_QUERY, () => {
      gsap.fromTo(".scroll-reveal-word", { opacity: 0.2 }, { opacity: 1, stagger: 0.035, ease: "none", scrollTrigger: { trigger: textRef.current, start: "top 85%", end: "bottom 65%", scrub: 0.6 } });
      revealElements(containerRef.current);
    });
    return () => media.revert();
  }, { scope: containerRef });

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".stat-slide").forEach((slide, index) => {
      gsap.to(slide, { autoAlpha: index === activeIndex ? 1 : 0, y: index === activeIndex ? 0 : 12, duration: prefersReducedMotion() ? 0 : 0.45, ease: "power3.out", overwrite: true });
    });
  }, { scope: containerRef, dependencies: [activeIndex] });

  return (
    <section id="about" ref={containerRef} aria-labelledby="about-heading" className="studio-section relative bg-[#121212] text-[#f0f0eb]">
      <div className="studio-shell">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="section-reveal lg:col-span-4">
            <p className="section-label mb-9">Inside the studio</p>
            <div id="benchmarks" className="max-w-[360px] scroll-mt-16 border-t border-white/20 pt-4">
              <div className="mb-7 flex items-center justify-between"><div className="flex gap-2"><button type="button" aria-label="Previous approach" onClick={() => setActiveIndex((index) => (index - 1 + BENCHMARKS.length) % BENCHMARKS.length)} className="size-11 cursor-pointer rounded-full border border-white/15 text-xl">←</button><button type="button" aria-label="Next approach" onClick={() => setActiveIndex((index) => (index + 1) % BENCHMARKS.length)} className="size-11 cursor-pointer rounded-full border border-white/15 text-xl">→</button></div><span className="font-mono text-xs text-white/45">0{activeIndex + 1} / 0{BENCHMARKS.length}</span></div>
              <div className="relative min-h-[200px]" aria-live="polite">
                {BENCHMARKS.map((stat, index) => <div key={stat.number} aria-hidden={index !== activeIndex} className={`stat-slide absolute inset-0 ${index === 0 ? "" : "invisible opacity-0"}`}><p className="hero-heading text-[clamp(2.8rem,4.6vw,4.8rem)] leading-none font-bold tracking-[-0.06em]">{stat.number}</p><p className="mt-5 max-w-[290px] text-sm leading-relaxed text-white/55">{stat.label}</p></div>)}
              </div>
            </div>
          </div>
          <div ref={textRef} className="lg:col-span-8">
            <h2 id="about-heading" className="sr-only">About BellCurve Studio</h2>
            <div className="hero-heading text-[clamp(1.75rem,3.1vw,3.5rem)] leading-[1.17] font-semibold tracking-[-0.045em]">
              {PARAGRAPHS.map((paragraph) => <p key={paragraph} className="mb-8 last:mb-0" aria-label={paragraph}>{paragraph.split(" ").map((word, index) => <span key={index} aria-hidden="true" className="scroll-reveal-word inline-block mr-[0.24em]">{word}</span>)}</p>)}
            </div>
            <div className="section-reveal mt-10 flex items-center justify-between gap-6 border-t border-white/15 pt-7 sm:mt-14">
              <div className="flex items-center gap-4"><span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/20 font-heading text-xl">PY</span><div><p className="text-sm font-bold">{STUDIO.founder}</p><p className="mt-1 text-xs text-white/50">Founder</p></div></div><a href={STUDIO.contact} aria-label="Contact Piyush Yadav" className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-xl">↗</a>
            </div>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-white/15 pt-10 sm:mt-24 lg:grid-cols-12 lg:gap-16">
          <div className="section-reveal lg:col-span-4"><p className="section-label">Sound familiar?</p><p className="mt-4 max-w-[260px] text-sm leading-relaxed text-white/50">These are useful starting points. Bring the problem as it is; we’ll help you make sense of it.</p></div>
          <div className="grid grid-cols-2 lg:col-span-8 md:grid-cols-4">{STARTING_POINTS.map((point, index) => <div key={point} className="section-reveal flex min-h-24 items-center justify-center border-b border-white/10 px-3 text-center"><span className={`text-[clamp(1rem,1.5vw,1.5rem)] font-bold tracking-tight ${index % 3 === 0 ? "font-heading text-2xl" : ""}`}>{point}</span></div>)}</div>
        </div>
      </div>
    </section>
  );
}
