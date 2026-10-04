"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_QUERY } from "@/lib/animation";
import { SERVICES } from "@/lib/studio-data";
import { StudioMedia } from "@/components/ui/studio-media";

const FILMS = [SERVICES[0], SERVICES[2], SERVICES[4]];

export function GapRevealSection() {
  const containerRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const [activeFilm, setActiveFilm] = useState(0);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 1024px)", motion: MOTION_QUERY }, (context) => {
      if (!context.conditions?.motion) return;
      if (!context.conditions.desktop) {
        gsap.from(".gap-content", { y: 24, autoAlpha: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 85%", once: true } });
        return;
      }
      const timeline = gsap.timeline({ scrollTrigger: {
        trigger: containerRef.current, start: "top top", end: () => `+=${Math.round(window.innerHeight * 1.15)}`, pin: true, scrub: 0.65, invalidateOnRefresh: true,
        onUpdate: (trigger) => { const next = Math.min(2, Math.floor(trigger.progress * 3)); if (next !== activeRef.current) { activeRef.current = next; setActiveFilm(next); } },
      } });
      timeline.fromTo(".gap-word-left", { x: -65 }, { x: 0, duration: 1, ease: "none" }, 0)
        .fromTo(".gap-word-right", { x: 65 }, { x: 0, duration: 1, ease: "none" }, 0)
        .fromTo(".gap-media", { scale: 0.9 }, { scale: 1.03, duration: 1, ease: "none" }, 0)
        .to(".gap-film-0", { autoAlpha: 0, duration: 0.16 }, 0.27)
        .fromTo(".gap-film-1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.16 }, 0.27)
        .to(".gap-film-1", { autoAlpha: 0, duration: 0.16 }, 0.59)
        .fromTo(".gap-film-2", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.16 }, 0.59);
    });
    return () => media.revert();
  }, { scope: containerRef });

  return (
    <section id="direction" ref={containerRef} aria-labelledby="direction-heading" className="relative flex min-h-[85svh] flex-col justify-center overflow-clip border-t border-white/10 bg-[#121212] py-20 text-[#f0f0eb] lg:min-h-screen lg:py-12">
      <div className="studio-shell gap-content">
        <p className="section-label mb-12 text-center lg:mb-16">Software that fits your business</p>
        <h2 id="direction-heading" className="sr-only">Less friction. More progress. Systems built around the way you work.</h2>
        <div aria-hidden="true" className="flex flex-col items-center justify-center gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_clamp(180px,21vw,270px)_minmax(0,1fr)] lg:gap-7">
          <span className="gap-word-left font-heading text-[clamp(4rem,8.5vw,9.5rem)] leading-none tracking-tight lg:justify-self-end lg:text-[clamp(4rem,7.5vw,9.5rem)]">LESS</span>
          <div className="gap-media relative aspect-[16/10] w-full max-w-[380px] overflow-hidden rounded-lg border border-white/15 bg-[#202020] lg:aspect-[3/4] lg:max-w-[270px]">
            {FILMS.map((film, index) => <div key={film.title} className={`gap-film-${index} absolute inset-0 ${index === 0 ? "" : "invisible opacity-0"}`}><StudioMedia image={film.image} video={film.video} enabled={activeFilm === index} sizes="(min-width:1024px) 25vw, 85vw" /></div>)}
          </div>
          <span className="gap-word-right font-heading text-[clamp(4rem,8.5vw,9.5rem)] leading-none tracking-tight lg:justify-self-start lg:text-[clamp(4rem,7.5vw,9.5rem)]">FRICTION.</span>
        </div>
        <div className="mx-auto mt-12 grid max-w-[940px] grid-cols-1 gap-8 border-t border-white/15 pt-7 sm:grid-cols-2 lg:mt-16">
          <p className="text-base leading-relaxed font-semibold sm:text-lg">Your tools should help work move.<br /><span className="text-white/50">Not add another step to the process.</span></p>
          <p className="text-sm leading-relaxed text-white/55">An enquiry, a record, a handoff. We connect the small gaps that slow your team down, so the next step is easier to see and act on.</p>
        </div>
      </div>
    </section>
  );
}
