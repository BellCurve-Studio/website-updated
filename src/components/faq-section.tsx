"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { StudioCta } from "@/components/ui/studio-cta";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const QUESTIONS = [
  {
    question: "Who will actually be working on our project?",
    answer: [
      "Huy is your creative lead and main contact, from the first strategy session to launch.",
      "A team of specialist designers and developers joins according to your project’s needs.",
    ],
  },
  {
    question: "How long do your projects usually take?",
    answer: [
      "Typically, 10–14 weeks from discovery to launch.",
      "We agree on the schedule and key milestones together before work begins.",
    ],
  },
  {
    question: "How do you communicate and manage work?",
    answer: [
      "Your Notion workspace keeps deliverables and deadlines in one place.",
      "Expect Loom updates, weekly Slack or WhatsApp check-ins, and calls for key decisions.",
    ],
  },
  {
    question: "What do you need to start working together?",
    answer: [
      "First, a conversation about your ambitions. Then, a proposal shaped around your needs.",
      "A signed agreement and initial deposit secure your project and begin onboarding.",
    ],
  },
  {
    question: "What happens after launch?",
    answer: [
      "You get 90 days of support, documentation, and CMS training.",
      "Manage your website confidently in-house, or choose an ongoing care plan.",
    ],
  },
  {
    question: "Can you handle branding, design and development?",
    answer: [
      "Yes. Strategy, identity, design, and development happen together.",
      "One team connects your story to every part of the experience.",
    ],
  },
  {
    question: "What is the project investment?",
    answer: [
      "Projects start at $20,000 USD. Most fall between $25,000 and $50,000.",
      "Your proposal sets out the investment for your scope and complexity.",
    ],
  },
];

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
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;

      gsap.to(panel, {
        height: expanded ? "auto" : 0,
        opacity: expanded ? 1 : 0,
        duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.45,
        ease: "power3.inOut",
        overwrite: true,
        onComplete: () => ScrollTrigger.refresh(),
      });
    },
    { scope: itemRef, dependencies: [expanded] },
  );

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
      <div
        ref={panelRef}
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        aria-hidden={!expanded}
        inert={!expanded}
        className="h-0 overflow-hidden"
      >
        <div className="max-w-[560px] space-y-4 py-6 pr-6 text-sm leading-relaxed font-medium text-[#aaa9a3] sm:text-base">
          {item.answer.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
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
            <span className="sm:block">Here&apos;s what you need </span>
            <span className="sm:block">to consider before </span>
            <span className="sm:block">partnering with us.</span>
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
              src="/assets/AVIF/6a092d5259ca7aa33208cde1_DSCF2544 copy-p-500.avif"
              alt="Huy Nguyen, founder of Monolog"
              fill
              sizes="(min-width: 1024px) 160px, (min-width: 640px) 128px, 96px"
              className="object-cover object-[center_35%]"
            />
          </div>
          <div>
            <p className="mb-4 max-w-[270px] text-lg leading-tight font-bold tracking-tight text-[#a7a7a0] sm:text-2xl lg:mb-6">
              Would like to know<br className="hidden lg:block" /> if we&apos;d be a good fit?
            </p>
            <StudioCta className="gap-2 text-xs sm:text-sm lg:text-base">Book a call with Huy</StudioCta>
          </div>
        </aside>
      </div>
    </section>
  );
}
