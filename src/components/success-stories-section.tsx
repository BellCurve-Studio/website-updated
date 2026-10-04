"use client";

import React, { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_QUERY, parallaxMedia } from "@/lib/animation";
import { PROJECTS, STUDIO, type StudioProject } from "@/lib/studio-data";
import { StudioMedia } from "@/components/ui/studio-media";

function AwardBadge() {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#f0c2c2] bg-[#fbf1f1] text-[#c94b4b] shadow-xs shrink-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </div>
  );
}

function ProjectCard({ project }: { project: StudioProject }) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className="project-item group w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={handleMouseEnter}
      onBlurCapture={handleMouseLeave}
    >
      <a
        href={project.link}
        className="block"
      >
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-5 sm:gap-7 xl:gap-9">
          <div className="w-full lg:w-[64%] xl:w-[65%] shrink-0">
            <div className="relative aspect-[16/10] sm:aspect-[1.62/1] w-full overflow-hidden rounded-md sm:rounded-lg bg-[#c8c7c1] border border-black/10 shadow-xs">
              <div className="project-media-inner absolute -inset-y-[14%] inset-x-0 w-full h-[128%] will-change-transform">
                <StudioMedia
                  image={project.image}
                  video={project.video}
                  enabled={isHovered}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 65vw, 850px"
                />
              </div>

              <div className="absolute top-3.5 right-3.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-black/10 text-black shadow-xs opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105">
                <span className="font-mono text-xs leading-none">↗</span>
              </div>
            </div>
          </div>

          <div className="project-info flex-1 min-w-0 flex flex-col justify-between py-1 lg:py-1.5">
            <div>
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-1.5 font-mono text-xs text-black/60 tracking-wider">
                  <span className="font-semibold text-black/80">BC</span>
                  <span className="text-black/40">←</span>
                  <span className="rounded border border-black/30 px-1 py-0.5 text-[10px] font-mono font-medium text-black/80 bg-black/[0.03]">
                    {project.number}
                  </span>
                </div>

                {project.hasAwardBadge && <AwardBadge />}
              </div>

              <h3 className="text-2xl sm:text-[26px] lg:text-[28px] font-bold tracking-tight text-[#141414] leading-snug group-hover:text-black/75 transition-colors duration-300">
                {project.title}
              </h3>

              <p className="mt-2 text-[13.5px] sm:text-[14px] leading-relaxed text-black/60 font-normal max-w-sm">
                {project.description}
              </p>
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-auto pt-2">
              <div className="inline-block rounded-md bg-black/[0.06] px-3 py-1 text-2xl sm:text-[26px] font-bold tracking-tight text-[#141414]">
                {project.stat}
              </div>
              <p className="mt-1.5 text-xs sm:text-[13px] font-semibold text-[#1a1a1a] leading-snug max-w-[230px]">
                {project.statLabel}
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export function SuccessStoriesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(MOTION_QUERY, () => {
        const items = gsap.utils.toArray<HTMLElement>(".project-item");
        items.forEach((item) => {
          const mediaInner = item.querySelector<HTMLElement>(
            ".project-media-inner"
          );
          if (mediaInner) {
            parallaxMedia(mediaInner, item);
          }

          const info = item.querySelector<HTMLElement>(".project-info");
          if (info) {
            gsap.fromTo(
              info,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 85%",
                  once: true,
                },
              }
            );
          }
        });
      });
      return () => media.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative z-10 w-full bg-[#ddddd8] text-[#141414] px-4 sm:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 border-t border-black/10 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            "url('/assets/PNG/692114faea9b602a766335ec_download.png')",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1560px]">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10 xl:gap-14">
          <div className="w-full lg:w-[170px] xl:w-[200px] shrink-0 lg:sticky lg:top-24 self-start pt-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#7a7a75]" />
              <span className="text-[14px] font-medium tracking-tight text-[#141414]">
                Selected Works
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-0 w-full">
            {PROJECTS.map((project, index) => (
              <React.Fragment key={project.id}>
                <ProjectCard project={project} />
                {index < PROJECTS.length - 1 && (
                  <div className="w-full border-b border-dashed border-black/20 my-6 sm:my-8" />
                )}
              </React.Fragment>
            ))}

            <div className="mt-10 sm:mt-14 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-t border-black/15">
              <div className="flex items-center gap-2.5 font-mono text-xs text-black/60 tracking-wider">
                <span className="font-semibold text-black/80">06</span>
                <span>/</span>
                <span>SELECTED ARCHIVE</span>
              </div>

              <a
                href={STUDIO.contact}
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#141414] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#f5f5f0] shadow-xs transition-all duration-300 hover:bg-black hover:scale-[1.02] w-fit"
              >
                <span>Start a Project</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 font-mono text-xs">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
