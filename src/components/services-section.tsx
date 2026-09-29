"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  index: string;
}

interface Service {
  id: string;
  title: string;
  image: string;
  video?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "mammoth-murals",
    quote:
      "For years, our website struggled to showcase our work effectively and attract the right clients. Within just 30 days of launching the new site with MONOLOG, we generated $100k in new sales and receive 2-3 qualified inquiries every week.",
    name: "Andrew Tynes",
    role: "Owner, Mammoth Murals",
    avatar: "/assets/AVIF/69ce9284075cd51831cdc1d1_1753282172963.avif",
    index: "01/03",
  },
  {
    id: "supersolid",
    quote:
      "Huy and his team are a rare collaborator who cares as much about “your thing.” Highly talented and humble, Huy is always willing to delve deeper to find the most interesting and elegant solution to the problem. We’d strongly recommend Huy to brands looking for a true web partner for their business.",
    name: "Jonathon Shannon",
    role: "Creative Director, Supersolid",
    avatar: "/assets/AVIF/690df5490b74ae9f75ed17eb_Default.avif",
    index: "02/03",
  },
  {
    id: "oh-architecture",
    quote:
      "Since launching our new website, showcasing our completed work is far more streamlined. The design is not only impressive but innovative, it truly stands out. We've also seen a real shift in enquiry quality: 21% have converted into signed projects, and we're saving 3-5 hours a week previously lost to back-and-forth qualification. It's meant a stronger pipeline and a much more efficient client acquisition process.",
    name: "Johnny Hyde",
    role: "Director, OH Architecture",
    avatar:
      "/assets/AVIF/690df5543d7243082ccbfcaa_OH_STAFF©ANDYMACPHERSON-14 1.avif",
    index: "03/03",
  },
];

const SERVICES: Service[] = [
  {
    id: "brand-strategy",
    title: "Brand Strategy",
    image: "/assets/AVIF/697ef10d5fcc93485bf8dfb4_Brand Strategy.avif",
    video: "/assets/WEBM/Strategy Compressed.webm",
  },
  {
    id: "visual-identity",
    title: "Visual Identity",
    image: "/assets/AVIF/697ef16f889c1ea502d8ee65_Visual Identity.avif",
  },
  {
    id: "website-strategy",
    title: "Website Strategy",
    image: "/assets/AVIF/697ef17ae082299197a3aa88_Website Strategy.avif",
  },
  {
    id: "website-design",
    title: "Website Design",
    image: "/assets/AVIF/697ef15eca91ffc3ae831e4e_Web Design.avif",
    video: "/assets/WEBM/Design FINAL compressed.webm",
  },
  {
    id: "website-development",
    title: "Website Development",
    image: "/assets/AVIF/697ef13b8c2c03a57cff1df0_Webflow Development.avif",
    video: "/assets/WEBM/Development Final Compressed.webm",
  },
  {
    id: "3d-development",
    title: "3D Development",
    image: "/assets/AVIF/697ef14da1c89e5e19e5cca4_3D Development.avif",
  },
];

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

  const changeSlide = useCallback((newIndex: number) => {
    if (isTransitioningRef.current || newIndex === activeSlide) return;
    isTransitioningRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioningRef.current = false;
      },
    });

    tl.to([quoteRef.current, authorRef.current], {
      opacity: 0,
      y: -8,
      duration: 0.2,
      ease: "power2.in",
      stagger: 0.03,
      onComplete: () => {
        setActiveSlide(newIndex);
      },
    });

    tl.fromTo(
      [quoteRef.current, authorRef.current],
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.38,
        ease: "power2.out",
        stagger: 0.04,
      }
    );
  }, [activeSlide]);

  const prevSlide = () => {
    changeSlide(activeSlide === 0 ? TESTIMONIALS.length - 1 : activeSlide - 1);
  };

  const nextSlide = () => {
    changeSlide(activeSlide === TESTIMONIALS.length - 1 ? 0 : activeSlide + 1);
  };

  const updateCardPosition = useCallback((index: number) => {
    if (!menuRef.current || !cardRef.current) return;
    const targetItem = itemRefs.current[index];
    if (!targetItem) return;

    const menuRect = menuRef.current.getBoundingClientRect();
    const itemRect = targetItem.getBoundingClientRect();
    const cardHeight = cardRef.current.offsetHeight || 440;

    const itemCenterY = itemRect.top - menuRect.top + itemRect.height / 2;
    const maxTravel = Math.max(0, menuRect.height - cardHeight);
    const targetY = Math.max(0, Math.min(maxTravel, itemCenterY - cardHeight / 2));

    gsap.to(cardRef.current, {
      y: targetY,
      duration: 0.55,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, []);

  const handleMenuMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!menuRef.current || !cardRef.current) return;
    const menuRect = menuRef.current.getBoundingClientRect();
    const cardHeight = cardRef.current.offsetHeight || 440;
    const mouseY = e.clientY - menuRect.top;
    const mouseX = e.clientX - menuRect.left;
    const maxTravel = Math.max(0, menuRect.height - cardHeight);
    const ratioY = Math.max(0, Math.min(1, mouseY / menuRect.height));
    const ratioX = Math.max(0, Math.min(1, mouseX / menuRect.width));
    const targetY = ratioY * maxTravel;

    const tiltX = (ratioY - 0.5) * -6;
    const tiltY = (ratioX - 0.5) * 6;

    gsap.to(cardRef.current, {
      y: targetY,
      rotateX: tiltX,
      rotateY: tiltY,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleItemEnter = (index: number) => {
    setActiveService(index);
    setIsHoveringMenu(true);
    updateCardPosition(index);
  };

  const handleMenuMouseLeave = () => {
    setIsHoveringMenu(false);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    updateCardPosition(activeService);
  };

  useEffect(() => {
    updateCardPosition(activeService);
  }, [activeService, updateCardPosition]);

  useGSAP(
    () => {
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
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".service-card-parallax-inner",
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
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
                    className="h-1 flex-1 py-2 cursor-pointer focus:outline-none"
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
                    aria-label="Previous story"
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
                    aria-label="Next story"
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
                (REAL CLIENT STORIES)
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
                  alt={currentTestimonial.name}
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
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1200px) 35vw, 440px"
                        className="object-cover"
                        priority={index === 0}
                      />

                      {service.video && (
                        <video
                          src={service.video}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                            isActive ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      )}
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
