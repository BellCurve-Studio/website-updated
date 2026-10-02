"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP, MOTION_QUERY, prefersReducedMotion } from "@/lib/animation";
import { STUDIO, SOCIALS } from "@/lib/studio-data";
import { StudioWordmark } from "@/components/ui/studio-wordmark";
import { useLenis } from "lenis/react";
import { StudioCta } from "@/components/ui/studio-cta";

const FOOTER_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "FAQs", href: "#faq" },
];

function AwardMark({ name }: { name: "FWA" | "CSSDesignAwards" | "Awwwards" }) {
  const isAwwwards = name === "Awwwards";

  return (
    <div role="img" aria-label={`${name} Site of the Day awards`} className="relative aspect-[593/322] w-full">
      <Image
        src="/assets/SVG/cta_home_svgs.svg"
        alt=""
        fill
        className={isAwwwards ? "invert" : "invert [clip-path:polygon(0_0,30%_0,30%_35%,18%_35%,18%_65%,30%_65%,30%_100%,0_100%)]"}
      />
      {!isAwwwards && (
        <>
          <Image src="/assets/SVG/cta_home_svgs.svg" alt="" fill className="invert [clip-path:polygon(70%_0,100%_0,100%_100%,70%_100%,70%_65%,82%_65%,82%_35%,70%_35%)]" />
          <span className={`absolute inset-0 flex items-center justify-center ${name === "FWA" ? "font-heading text-[clamp(1.5rem,3.5vw,3.5rem)] tracking-[-0.04em]" : "text-[clamp(0.5rem,0.9vw,0.8rem)] font-semibold"}`}>
            {name === "FWA" ? "FWA" : "CSSDesignAwards"}
          </span>
        </>
      )}
    </div>
  );
}

export function ClosingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(MOTION_QUERY, () => {
        gsap.timeline({
          defaults: { duration: 1, ease: "power3.out" },
          scrollTrigger: { trigger: ".closing-title", start: "top 85%", once: true },
        })
          .from(".closing-title-line", { yPercent: 105, stagger: 0.09 })
          .from(".closing-main-cta", { opacity: 0, y: 20, duration: 0.7 }, "-=0.5");

        gsap.fromTo(".closing-photo", { yPercent: -5 }, {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: ".closing-scene", start: "top bottom", end: "bottom top", scrub: 1.2 },
        });

        gsap.from(".closing-recognition", {
          y: 28,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".closing-recognition", start: "top 88%", once: true },
        });

        const cleanups = gsap.utils.toArray<HTMLAnchorElement>(".studio-cta").map((button) => {
          const arrow = button.querySelector(".studio-cta-arrow");
          const hover = gsap.to(arrow, { x: 3, y: -3, duration: 0.25, ease: "power2.out", paused: true });
          const enter = () => { hover.play(); };
          const leave = () => { hover.reverse(); };
          button.addEventListener("mouseenter", enter);
          button.addEventListener("mouseleave", leave);
          button.addEventListener("focus", enter);
          button.addEventListener("blur", leave);
          return () => {
            button.removeEventListener("mouseenter", enter);
            button.removeEventListener("mouseleave", leave);
            button.removeEventListener("focus", enter);
            button.removeEventListener("blur", leave);
          };
        });

        return () => cleanups.forEach((cleanup) => cleanup());
      });
      return () => media.revert();
    },
    { scope: containerRef },
  );

  const scrollToTop = () => {
    const reducedMotion = prefersReducedMotion();
    if (lenis) lenis.scrollTo(0, { duration: 1.4, immediate: reducedMotion });
    else window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
  };

  return (
    <div ref={containerRef} className="relative z-10 bg-[#0d0d0d] text-[#f0f0eb] selection:bg-[#f0f0eb] selection:text-[#141414]">
      <section id="contact" aria-labelledby="closing-heading" className="closing-scene relative isolate overflow-clip">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
          <div className="sticky top-0 h-screen overflow-hidden">
            <div className="closing-photo absolute -inset-y-[7%] inset-x-0">
              <Image
                src="/assets/AVIF/6917e0c8019265ad19e8d1ac_DSCF2511 1.avif"
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-[30%_center] brightness-[0.62] sm:object-center"
                onLoad={() => ScrollTrigger.refresh()}
              />
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-black/10 via-black/20 to-black/60" />

        <div className="mx-auto flex min-h-[85svh] max-w-[1640px] flex-col items-center justify-center px-6 py-24 sm:min-h-screen sm:px-10 sm:py-16 lg:px-14">
          <h2 id="closing-heading" className="closing-title w-full max-w-[1280px] text-[clamp(2.6rem,13.8vw,5.5rem)] leading-[0.91] tracking-[-0.025em] uppercase sm:text-[clamp(5.5rem,10.6vw,11.5rem)]">
            <span className="block overflow-hidden pb-[0.06em] pl-[3%] sm:pl-[14%]"><span className="closing-title-line block">Let&apos;s build</span></span>
            <span className="block overflow-hidden pb-[0.06em] pl-[8%] sm:pl-[22%]"><span className="closing-title-line block">an experience</span></span>
            <span className="block overflow-hidden pb-[0.06em] sm:pl-[10%]"><span className="closing-title-line block">that moves</span></span>
            <span className="block overflow-hidden pb-[0.06em] pl-[23%] sm:pl-[38%]">
              <span className="closing-title-line flex items-center gap-[0.15em]"><span aria-hidden="true" className="font-sans text-[0.85em]">→</span> people</span>
            </span>
          </h2>
          <StudioCta className="closing-main-cta mt-14 gap-4 p-2 pl-4 text-[clamp(1.35rem,2.8vw,3rem)] leading-tight sm:mt-20 sm:gap-5 sm:p-3 sm:pl-5 [&>span:last-child]:size-11 sm:[&>span:last-child]:size-14 [&_img]:size-8 sm:[&_img]:size-10">
            Start a Project
          </StudioCta>
        </div>

        <div className="closing-recognition mx-auto flex min-h-[65svh] max-w-[850px] flex-col items-center justify-center px-6 pt-12 pb-28 sm:px-10 sm:pt-16 sm:pb-40">
          <div className="mb-9 grid w-full grid-cols-3 items-center gap-3 sm:mb-12 sm:gap-5">
            <AwardMark name="FWA" />
            <AwardMark name="CSSDesignAwards" />
            <AwardMark name="Awwwards" />
          </div>
          <figure className="max-w-[510px] text-center">
            <blockquote className="text-xl leading-tight font-bold tracking-tight sm:text-2xl lg:text-[28px]">
              &ldquo;Purpose-built to deliver unforgettable digital experiences and elevate brands beyond the ordinary.&rdquo;
            </blockquote>
            <figcaption className="mt-7 font-mono text-[10px] tracking-wide text-white/65 uppercase sm:mt-10 sm:text-xs">— BellCurve Studios</figcaption>
          </figure>
        </div>
      </section>

      <footer className="px-6 pt-16 pb-7 sm:px-10 sm:pt-24 lg:px-14 xl:px-18">
        <div className="mx-auto max-w-[1640px]">
          <div className="grid grid-cols-1 gap-12 border-b border-white/15 pb-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-20">
            <div>
              <a href="#" onClick={(event) => { event.preventDefault(); scrollToTop(); }} aria-label="BellCurve Studios home" className="inline-block focus-visible:outline-2 focus-visible:outline-offset-6">
                <StudioWordmark className="[&>span:first-child]:text-[34px]" />
              </a>
              <p className="mt-6 max-w-[260px] text-sm leading-relaxed text-white/55">Bespoke creative technology.<br />Immersive digital experiences.</p>
              <div className="mt-7 flex flex-wrap gap-3 font-mono text-[9px] text-white/65">
                <span className="rounded-xs border border-white/20 px-2 py-2">ISO 27001 Certified</span>
                <span className="rounded-xs border border-white/20 px-2 py-2">AICPA SOC Certified</span>
              </div>
            </div>
            <div>
              <p className="mb-5 font-mono text-xs text-white/45 uppercase">Navigation</p>
              <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-8 gap-y-3 text-lg font-semibold">
                {FOOTER_LINKS.map((link) => (
                  <a key={link.href} href={link.href} onClick={(event) => {
                    if (lenis) {
                      event.preventDefault();
                      lenis.scrollTo(link.href, { duration: 1.2, immediate: prefersReducedMotion() });
                    }
                  }} className="flex items-center justify-between gap-3 hover:text-white/60 focus-visible:outline-2 focus-visible:outline-offset-4">{link.label}<span aria-hidden="true">↗</span></a>
                ))}
                <a href={STUDIO.contact} className="flex items-center justify-between gap-3 hover:text-white/60 focus-visible:outline-2 focus-visible:outline-offset-4">Contact<span aria-hidden="true">↗</span></a>
              </nav>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="mb-5 font-mono text-xs text-white/45 uppercase">Studio details</p>
              <a href={`mailto:${STUDIO.email}`} className="break-all text-xl font-semibold tracking-tight hover:text-white/60 focus-visible:outline-2 focus-visible:outline-offset-4">{STUDIO.email} ↗</a>
              <p className="mt-4 text-sm leading-relaxed text-white/55">Based in Delhi NCR, India.<br />Working worldwide.</p>
              <div className="mt-6 flex flex-wrap gap-5 text-xs font-medium">
                {SOCIALS.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="hover:text-white/60 focus-visible:outline-2 focus-visible:outline-offset-4">{social.label} ↗</a>)}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 pt-7 text-[10px] text-white/45 sm:flex-row sm:items-center sm:justify-between sm:text-xs">
            <p className="font-mono">© {new Date().getFullYear()} BellCurve Studios</p>
            <p className="font-medium">Founded by Piyush Yadav. Delhi NCR, India.</p>
            <button type="button" onClick={scrollToTop} className="min-h-11 w-fit cursor-pointer text-sm font-semibold text-[#f0f0eb] hover:text-white/60 focus-visible:outline-2 focus-visible:outline-offset-4">Back to top ↑</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
