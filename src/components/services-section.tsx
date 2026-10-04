"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { gsap, useGSAP, MOTION_QUERY, prefersReducedMotion, useReducedMotion, parallaxMedia } from "@/lib/animation";
import { SERVICES, PARTNER_PERSPECTIVES as TESTIMONIALS } from "@/lib/studio-data";
import { StudioMedia } from "@/components/ui/studio-media";

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);

  const [activeSlide, setActiveSlide] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [isHoveringMenu, setIsHoveringMenu] = useState(false);

  const reducedMotion = useReducedMotion();
  const cardMotionRef = useRef<{
    y: ReturnType<typeof gsap.quickTo>;
    rotateX: ReturnType<typeof gsap.quickTo>;
    rotateY: ReturnType<typeof gsap.quickTo>;
  } | null>(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  useGSAP(() => {
    if (!cardRef.current) return;
    const options = { duration: reducedMotion ? 0 : 0.55, ease: "power2.out" };
    cardMotionRef.current = {
      y: gsap.quickTo(cardRef.current, "y", options),
      rotateX: gsap.quickTo(cardRef.current, "rotateX", options),
      rotateY: gsap.quickTo(cardRef.current, "rotateY", options),
    };
    return () => { cardMotionRef.current = null; };
  }, { scope: containerRef, dependencies: [reducedMotion], revertOnUpdate: true });

  const changeSlide = (newIndex: number) => {
    contextSafe(() => {
      if (isTransitioningRef.current || newIndex === activeSlide) return;
      if (prefersReducedMotion()) {
        setActiveSlide(newIndex);
        return;
      }
      isTransitioningRef.current = true;
      gsap.timeline({ onComplete: () => { isTransitioningRef.current = false; } })
        .to([quoteRef.current, authorRef.current], {
          opacity: 0, y: -8, duration: 0.2, ease: "power2.in", stagger: 0.03,
          onComplete: () => { setActiveSlide(newIndex); },
        })
        .fromTo([quoteRef.current, authorRef.current], { opacity: 0, y: 12 }, {
          opacity: 1, y: 0, duration: 0.38, ease: "power2.out", stagger: 0.04,
        });
    })();
  };

  const prevSlide = () => changeSlide((activeSlide - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const nextSlide = () => changeSlide((activeSlide + 1) % TESTIMONIALS.length);

  const updateCardPosition = useCallback((index: number) => {
    const menu = menuRef.current;
    const card = cardRef.current;
    const item = itemRefs.current[index];
    if (!menu || !card || !item) return;
    const menuRect = menu.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const center = itemRect.top - menuRect.top + itemRect.height / 2;
    const travel = Math.max(0, menuRect.height - card.offsetHeight);
    cardMotionRef.current?.y(Math.max(0, Math.min(travel, center - card.offsetHeight / 2)));
  }, []);

  const handleMenuMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const menu = menuRef.current;
    const card = cardRef.current;
    if (reducedMotion || !menu || !card) return;
    const bounds = menu.getBoundingClientRect();
    const ratioY = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    const ratioX = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const motion = cardMotionRef.current;
    motion?.y(ratioY * Math.max(0, bounds.height - card.offsetHeight));
    motion?.rotateX((ratioY - 0.5) * -6);
    motion?.rotateY((ratioX - 0.5) * 6);
  };

  const handleItemEnter = (index: number) => {
    setActiveService(index);
    setIsHoveringMenu(true);
    updateCardPosition(index);
  };

  const handleMenuMouseLeave = () => {
    setIsHoveringMenu(false);
    cardMotionRef.current?.rotateX(0);
    cardMotionRef.current?.rotateY(0);
    updateCardPosition(activeService);
  };

  useEffect(() => {
    const resize = () => updateCardPosition(activeService);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [activeService, reducedMotion, updateCardPosition]);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(MOTION_QUERY, () => {
        gsap.fromTo(
          ".services-fade-in",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );

        parallaxMedia(".service-card-parallax-inner", containerRef.current!, 8);
      });
      return () => media.revert();
    },
    { scope: containerRef }
  );

  const currentTestimonial = TESTIMONIALS[activeSlide];

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative z-10 w-full bg-[#0d0d0d] text-[#f5f5f0] px-6 sm:px-10 lg:px-14 xl:px-18 py-24 sm:py-32 border-t border-white/10 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-screen"
        style={{
          backgroundImage:
            "url('/assets/PNG/692114faea9b602a766335ec_download.png')",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1640px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-stretch">
          <div className="services-fade-in lg:col-span-3 xl:col-span-3 flex flex-col justify-between self-stretch pr-0 lg:pr-2">
            <div>
              <div className="flex items-center gap-1.5 w-full max-w-[280px]">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => changeSlide(idx)}
                    className="h-1 flex-1 py-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    <div
                      className={`h-[1px] w-full transition-colors duration-300 ${
                        activeSlide === idx ? "bg-white" : "bg-white/20"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between w-full max-w-[280px] mt-2 text-white/70">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous principle"
                    className="p-1 hover:text-white transition-colors cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next principle"
                    className="p-1 hover:text-white transition-colors cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <span className="font-mono text-xs tracking-wider text-white/50">
                  {currentTestimonial.index}
                </span>
              </div>

              <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mt-6 sm:mt-8">
                (HOW WE THINK)
              </p>

              <div className="mt-5 min-h-[190px] sm:min-h-[220px]">
                <p
                  ref={quoteRef}
                  className="text-[14px] sm:text-[14.5px] leading-relaxed text-white/80 font-normal will-change-transform"
                >
                  &ldquo;{currentTestimonial.quote}&rdquo;
                </p>
              </div>
            </div>

            <div
              ref={authorRef}
              className="flex items-center gap-3.5 pt-6 mt-6 border-t border-white/10 will-change-transform"
            >
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/15 bg-white/5">
                <Image
                  src={currentTestimonial.avatar}
                  alt=""
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white tracking-tight leading-tight">
                  {currentTestimonial.name}
                </p>
                <p className="text-xs text-white/50 font-sans mt-0.5 truncate">
                  {currentTestimonial.role}
                </p>
              </div>
            </div>
          </div>

          <div
            ref={menuRef}
            onMouseMove={handleMenuMouseMove}
            onMouseLeave={handleMenuMouseLeave}
            className="services-fade-in lg:col-span-5 xl:col-span-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-6 sm:mb-8 text-white/80">
                <span className="h-2 w-2 rounded-full bg-[#7a7a75]" />
                <span className="text-[14px] font-medium tracking-tight">
                  What we can help with
                </span>
              </div>

              <div className="flex flex-col space-y-1 sm:space-y-2 select-none">
                {SERVICES.map((service, index) => {
                  const isActive = activeService === index;
                  return (
                    <div
                      key={service.id}
                      ref={(el) => {
                        itemRefs.current[index] = el;
                      }}
                      onMouseEnter={() => handleItemEnter(index)}
                      onFocus={() => handleItemEnter(index)}
                      onClick={() => handleItemEnter(index)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          handleItemEnter(index);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isActive}
                      aria-label={`${service.title}. ${service.description}`}
                      className="group relative flex items-center cursor-pointer py-1.5"
                    >
                      <h2
                        className={`text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4.1rem] font-bold tracking-tight leading-[1.08] transition-all duration-300 ${
                          isActive
                            ? "text-white scale-[1.01] translate-x-2"
                            : "text-[#4a4a46] opacity-35 hover:opacity-75 hover:text-white/80"
                        }`}
                      >
                        {service.title}
                      </h2>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="services-fade-in lg:col-span-4 xl:col-span-4 hidden lg:block relative self-stretch [perspective:1000px]">
            <div
              ref={cardRef}
              className={`absolute top-0 right-0 w-full max-w-[390px] xl:max-w-[440px] aspect-[4/5] rounded-2xl overflow-hidden bg-[#181817] shadow-2xl shadow-black/95 will-change-transform transition-colors duration-500 ease-out ${
                isHoveringMenu
                  ? "border border-white/25"
                  : "border border-white/10"
              }`}
            >
              {SERVICES.map((service, index) => {
                const isActive = activeService === index;
                return (
                  <div
                    key={service.id}
                    className={`absolute inset-0 h-full w-full overflow-hidden transition-all duration-500 ease-out ${
                      isActive
                        ? "opacity-100 scale-100 z-10"
                        : "opacity-0 scale-[1.03] pointer-events-none z-0"
                    }`}
                  >
                    <div className="service-card-parallax-inner absolute -inset-y-[12%] inset-x-0 w-full h-[124%] will-change-transform">
                      <StudioMedia
                        image={service.image}
                        video={service.video}
                        enabled={isActive}
                        sizes="(max-width: 1200px) 35vw, 440px"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
