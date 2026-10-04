"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePageReady } from "@/components/page-entrance";
import { gsap, ScrollTrigger, useGSAP, MOTION_QUERY, prefersReducedMotion, useReducedMotion } from "@/lib/animation";
import { STUDIO, PROJECTS } from "@/lib/studio-data";
import { StudioCta } from "@/components/ui/studio-cta";
import { StudioMedia } from "@/components/ui/studio-media";
import { StudioWordmark } from "@/components/ui/studio-wordmark";

const FEATURED = PROJECTS.slice(0, 2);
const NAVIGATION = [{ label: "Studio", href: "#about" }, { label: "Works", href: "#work" }, { label: "Capabilities", href: "#services" }, { label: "Process", href: "#process" }];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ready = usePageReady();
  const reducedMotion = useReducedMotion();
  const audioRef = useRef<AudioContext | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => () => { audioRef.current?.close(); }, []);

  const playClickSound = () => {
    if (isMuted || prefersReducedMotion()) return;
    try {
      const audio = audioRef.current ?? new AudioContext();
      audioRef.current = audio;
      if (audio.state === "suspended") void audio.resume();
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      oscillator.frequency.setValueAtTime(520, audio.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(780, audio.currentTime + 0.09);
      gain.gain.setValueAtTime(0.035, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.09);
      oscillator.connect(gain);
      gain.connect(audio.destination);
      oscillator.start();
      oscillator.stop(audio.currentTime + 0.1);
    } catch { return; }
  };

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add(MOTION_QUERY, () => {
      if (!ready) {
        gsap.set(".hero-nav, .hero-intro, .hero-visual-card", { autoAlpha: 0 });
        gsap.set(".hero-title-line", { yPercent: 105 });
        return;
      }
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-nav", { y: -12, autoAlpha: 0, duration: 0.7 })
        .from(".hero-title-line", { yPercent: 105, duration: 1.05, stagger: 0.09 }, "-=0.35")
        .from(".hero-intro", { y: 20, autoAlpha: 0, duration: 0.85 }, "-=0.8")
        .from(".hero-visual-card", { y: 28, autoAlpha: 0, duration: 1 }, "-=0.6");
    });
    return () => media.revert();
  }, { scope: containerRef, dependencies: [ready], revertOnUpdate: true });

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add(MOTION_QUERY, () => {
      gsap.fromTo(".hero-media-parallax", { yPercent: -5 }, {
        yPercent: 5, ease: "none",
        scrollTrigger: { trigger: ".hero-visual-card", start: "clamp(top bottom)", end: "bottom top", scrub: 0.65, invalidateOnRefresh: true },
      });
      gsap.to(".hero-watermark", {
        y: () => window.innerWidth < 768 ? 35 : 100, ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 0.8, invalidateOnRefresh: true },
      });
    });
    return () => media.revert();
  }, { scope: containerRef });

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".hero-slide").forEach((slide, index) => {
      gsap.to(slide, { autoAlpha: index === activeIndex ? 1 : 0, scale: index === activeIndex ? 1 : 1.035, duration: prefersReducedMotion() ? 0 : 0.7, ease: "power2.inOut", overwrite: true });
    });
  }, { scope: containerRef, dependencies: [activeIndex] });

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add(MOTION_QUERY, () => {
      if (!ready || paused || interacting) return;
      const progress = gsap.fromTo(".hero-progress", { scaleX: 0 }, { scaleX: 1, duration: 7, ease: "none", onComplete: () => setActiveIndex((index) => (index + 1) % FEATURED.length) });
      const visibility = ScrollTrigger.create({
        trigger: containerRef.current, start: "top bottom", end: "bottom top",
        onToggle: (trigger) => { progress.paused(!trigger.isActive || document.hidden); },
      });
      const updateVisibility = () => { progress.paused(!visibility.isActive || document.hidden); };
      updateVisibility();
      document.addEventListener("visibilitychange", updateVisibility);
      return () => document.removeEventListener("visibilitychange", updateVisibility);
    });
    return () => media.revert();
  }, { scope: containerRef, dependencies: [activeIndex, paused, interacting, ready], revertOnUpdate: true });

  return (
    <div ref={containerRef} className="relative overflow-clip bg-[#ddddd8] text-[#141414]">
      <div aria-hidden="true" className="hero-watermark pointer-events-none absolute -left-6 top-48 font-heading text-[clamp(10rem,22vw,25rem)] leading-[0.8] tracking-tight opacity-[0.035] [writing-mode:vertical-rl]">BELL CURVE</div>
      <header className="hero-nav studio-shell relative z-30 py-6 sm:py-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <a href="#top" aria-label="BellCurve Studios home"><StudioWordmark /></a>
          <nav aria-label="Primary navigation" className="hidden items-center gap-7 text-sm font-semibold lg:flex">
            {NAVIGATION.map((link) => <a key={link.href} href={link.href} className="hover:opacity-60">{link.label}</a>)}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <button type="button" onClick={() => setIsMuted(!isMuted)} aria-label={isMuted ? "Enable interaction sounds" : "Disable interaction sounds"} aria-pressed={!isMuted} className="hidden size-11 cursor-pointer items-center justify-center rounded-xs border border-black/15 sm:flex">
              <span aria-hidden="true" className="font-mono text-sm">{isMuted ? "♪ ×" : "♪"}</span>
            </button>
            <StudioCta className="shrink-0 gap-1.5 whitespace-nowrap bg-[#141414] px-2 text-[10px] text-[#f0f0eb] hover:bg-[#292929] sm:gap-3 sm:pl-3 sm:text-base [&>span:last-child]:size-6 sm:[&>span:last-child]:size-8 [&>span:last-child]:bg-[#f0f0eb] [&_img]:size-5 sm:[&_img]:size-6 [&_img]:invert-0">Start a Project</StudioCta>
            <button type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen(!menuOpen)} className="flex size-11 shrink-0 cursor-pointer items-center justify-center border border-black/15 font-mono text-lg lg:hidden">{menuOpen ? "×" : "="}</button>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.nav id="mobile-navigation" aria-label="Mobile navigation" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.35 }} onAnimationComplete={() => ScrollTrigger.refresh()} className="overflow-hidden lg:hidden">
              <div className="mt-5 border-t border-black/15 pt-4">
                <div className="grid grid-cols-2 gap-3 text-sm font-semibold">
                  {NAVIGATION.map((link) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="py-2">{link.label} ↗</a>)}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      <section aria-labelledby="hero-heading" className="studio-shell relative z-10 pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="hero-intro order-2 flex flex-col justify-between lg:order-1 lg:col-span-4 lg:pr-5">
            <div>
              <p className="section-label mb-6">Independent digital studio</p>
              <p className="max-w-[340px] text-lg leading-relaxed font-medium sm:text-xl">Thoughtful design. Distinctive digital experiences. We bring your ideas to life with care, clarity, and a sense of possibility.</p>
              <a href="#work" className="mt-7 inline-flex min-h-11 items-center gap-8 border-b border-black/30 pb-2 text-sm font-bold">Explore Works <span aria-hidden="true">↗</span></a>
            </div>
            <div className="mt-12 flex items-end justify-between gap-5 lg:mt-20">
              <p className="font-mono text-[10px] leading-relaxed tracking-wide text-black/55">DELHI NCR, INDIA<br />WORKING WORLDWIDE</p>
              <a href="#about" aria-label="Explore the studio" className="flex size-11 items-center justify-center rounded-full border border-black/20 text-xl">↓</a>
            </div>
          </div>
          <div className="order-1 min-w-0 lg:order-2 lg:col-span-8">
            <h1 id="hero-heading" className="hero-heading mb-10 text-[clamp(2.6rem,5.8vw,6.7rem)] leading-[0.98] font-bold tracking-[-0.065em] sm:mb-12">
              {["Crafting immersive", "digital experiences."].map((line) => <span key={line} className="block overflow-hidden pb-[0.08em]"><span className="hero-title-line block">{line}</span></span>)}
            </h1>
            <div onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }} className="hero-visual-card relative aspect-[16/11] overflow-hidden rounded-lg border border-black/15 bg-[#c5c4bd] sm:aspect-[16/10]">
              {FEATURED.map((project, index) => <div key={project.id} aria-hidden={index !== activeIndex} className={`hero-slide absolute inset-0 ${index === 0 ? "" : "opacity-0 invisible"}`}><div className="hero-media-parallax absolute -inset-y-[8%] inset-x-0"><StudioMedia image={project.image} video={project.video} enabled={index === activeIndex} eager={index === 0} sizes="(min-width: 1024px) 65vw, 100vw" /></div><div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/10" /></div>)}
              <div className="absolute top-4 left-4 z-10 flex gap-2 sm:top-5 sm:left-5">
                {FEATURED.map((project, index) => <button key={project.id} type="button" aria-pressed={activeIndex === index} aria-label={`View ${project.title}`} onClick={() => { playClickSound(); setActiveIndex(index); }} className={`flex size-11 cursor-pointer items-center justify-center rounded-xs font-mono text-xs ${activeIndex === index ? "bg-[#f0f0eb] text-black" : "border border-white/30 bg-black/30 text-white"}`}>0{index + 1}</button>)}
              </div>
              <div className="absolute right-4 bottom-6 left-4 z-10 flex items-end justify-between gap-5 text-[#f0f0eb] sm:right-6 sm:bottom-7 sm:left-6">
                <div><p className="mb-2 font-mono text-[9px] tracking-widest text-white/60">{FEATURED[activeIndex].category} / {FEATURED[activeIndex].year}</p><p className="max-w-[330px] text-base leading-tight font-bold sm:text-2xl">{FEATURED[activeIndex].title}</p><p className="mt-2 hidden text-[10px] text-white/55 min-[380px]:block">Selected work</p></div>
                <div className="flex shrink-0 gap-2"><button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Play project slideshow" : "Pause project slideshow"} aria-pressed={paused} className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/25 font-mono text-xs">{paused ? "▶" : "Ⅱ"}</button><button type="button" onClick={() => { playClickSound(); setActiveIndex((index) => (index + 1) % FEATURED.length); }} aria-label="Next featured project" className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-[#f0f0eb] text-lg text-black">↗</button></div>
              </div>
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-10 h-0.5 bg-white/20"><div className="hero-progress h-full origin-left bg-[#f0f0eb]" /></div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-black/15 pt-5 font-mono text-[10px] tracking-wide text-black/55 sm:mt-16"><span>24+ design honors</span><span>Made to move you.</span><span>Founded by {STUDIO.founder}</span></div>
      </section>
    </div>
  );
}
