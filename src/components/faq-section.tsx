"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP, MOTION_QUERY, useReducedMotion } from "@/lib/animation";
import { QUESTIONS } from "@/lib/studio-data";
import { StudioCta } from "@/components/ui/studio-cta";

function FaqItem({
  item,
  index,
  expanded,
  onToggle,
}: {
  item: (typeof QUESTIONS)[number];
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  return (
    <div ref={itemRef} className="faq-item border-t border-dotted border-white/20">
      <h3 className="font-sans!">
        <button
          id={`faq-question-${index}`}
          type="button"
          aria-expanded={expanded}
          aria-controls={`faq-answer-${index}`}
          onClick={onToggle}
          className="faq-question group flex min-h-16 w-full cursor-pointer items-center justify-between gap-6 py-4 text-left text-base leading-snug font-semibold tracking-tight sm:text-lg lg:text-xl data-[expanded=true]:bg-[#f0f0eb] data-[expanded=true]:px-3 data-[expanded=true]:text-[#141414] hover:bg-[#f0f0eb] hover:px-3 hover:text-[#141414] focus-visible:bg-[#f0f0eb] focus-visible:px-3 focus-visible:text-[#141414] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0f0eb]"
          data-expanded={expanded}
        >
          <span>{item.question}</span>
          <span aria-hidden="true" className="mr-1 size-1.5 shrink-0 rounded-full border border-current opacity-50 group-hover:bg-current group-focus-visible:bg-current group-data-[expanded=true]:bg-current group-data-[expanded=true]:opacity-100" />
        </button>
      </h3>
      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => ScrollTrigger.refresh()}
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        aria-hidden={!expanded}
        inert={!expanded}
        className="overflow-hidden"
      >
        <div className="max-w-[560px] space-y-4 py-6 pr-6 text-sm leading-relaxed font-medium text-[#aaa9a3] sm:text-base">
          {item.answer.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </motion.div>
    </div>
  );
}

export function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(MOTION_QUERY, () => {
        gsap.from(".faq-heading", {
          y: 30,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq-heading", start: "top 90%", once: true },
        });
        gsap.from(".faq-list", {
          y: 20,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq-list", start: "top 90%", once: true },
        });
      });
      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="faq"
      ref={sectionRef}
      aria-labelledby="faq-heading"
      className="relative z-10 bg-[#0d0d0d] px-6 py-20 text-[#f0f0eb] selection:bg-[#f0f0eb] selection:text-[#141414] sm:px-10 sm:py-28 lg:px-14 lg:py-32 xl:px-18"
    >
      <div className="pointer-events-none absolute inset-0 bg-[url('/assets/PNG/692114faea9b602a766335ec_download.png')] opacity-[0.045] mix-blend-screen" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1640px] grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
        <div className="flex items-center gap-3 self-start text-base font-semibold lg:col-start-1 lg:row-start-1">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-[#a7a7a0]" />
          <span>FAQs</span>
        </div>
        <div className="min-w-0 lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <h2 id="faq-heading" className="faq-heading mb-12 max-w-[1040px] text-[clamp(2.25rem,4.8vw,5.5rem)] leading-[1.06] font-bold tracking-[-0.055em] sm:mb-16 lg:mb-18">
            <span className="sm:block">A few things to know </span>
            <span className="sm:block">before we start </span>
            <span className="sm:block">working together.</span>
          </h2>
          <div className="faq-list border-b border-dotted border-white/20">
            {QUESTIONS.map((item, index) => (
              <FaqItem
                key={item.question}
                item={item}
                index={index}
                expanded={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
        <aside className="flex flex-col items-start gap-5 border-t border-white/15 pt-8 min-[380px]:flex-row min-[380px]:items-center sm:gap-7 lg:col-start-1 lg:row-start-2 lg:flex-col lg:items-start lg:justify-end lg:gap-6 lg:self-end lg:border-0 lg:pt-0">
          <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xs sm:w-32 lg:w-40">
            <Image
              src="/assets/AVIF/697ef14da1c89e5e19e5cca4_3D Development-p-500.avif"
              alt=""
              fill
              sizes="(min-width: 1024px) 160px, (min-width: 640px) 128px, 96px"
              className="object-cover object-[center_35%]"
            />
          </div>
          <div>
            <p className="mb-4 max-w-[270px] text-lg leading-tight font-bold tracking-tight text-[#a7a7a0] sm:text-2xl lg:mb-6">
              Wondering if<br className="hidden lg:block" /> we&apos;re a good fit?
            </p>
            <StudioCta className="gap-2 text-xs sm:text-sm lg:text-base">Start a conversation</StudioCta>
          </div>
        </aside>
      </div>
    </section>
  );
}
