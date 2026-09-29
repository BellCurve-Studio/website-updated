"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ProjectItem {
  id: string;
  number: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  image: string;
  video?: string;
  link: string;
  hasAwardBadge?: boolean;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "oh-architecture",
    number: "01/06",
    title: "OH Architecture",
    description:
      "Brand refresh and website for a practice with a decade of crafting high-end homes for Australian families.",
    stat: "21%",
    statLabel: "Increase in conversions with projects starting from $2M+",
    image: "/assets/AVIF/68e36f423545f0f0d624de8c_image 6.avif",
    video: "/assets/WEBM/OH Arch Compressed.webm",
    link: "https://www.oharchitecture.com.au/",
  },
  {
    id: "supersolid",
    number: "02/06",
    title: "Supersolid",
    description:
      "Website for a 100% creative-owned Sydney agency built to merge commercial value with cultural impact.",
    stat: "90%",
    statLabel: "Increase in project case study engagement",
    image: "/assets/AVIF/68e36feaa84a7e56f526ef97_15_Mikeas_34513 1.avif",
    video: "/assets/MP4/Supersolid Thumbnail Compressed.mp4",
    link: "https://www.supersolid.agency/",
    hasAwardBadge: true,
  },
  {
    id: "mammoth-murals",
    number: "03/06",
    title: "Mammoth Murals",
    description:
      "Brand strategy, identity and website for an established mural agency with a decade of large-scale public art behind it.",
    stat: "$100K+",
    statLabel: "In new work within 30 days of launch",
    image: "/assets/AVIF/68e36fd385a3ac7e20eb2a7c_IMG_2674 1.avif",
    video: "/assets/WEBM/Mammoth Murals Compressed.webm",
    link: "https://mammothmurals.com/",
  },
  {
    id: "hiss-sydney",
    number: "04/06",
    title: "HISS (University of Sydney)",
    description:
      "Brand identity and website for a University of Sydney initiative challenging the norms of queer education on a global stage.",
    stat: "15+",
    statLabel: "Global universities united on a single platform",
    image: "/assets/AVIF/69490bd57585b67be7541c7e_11_Xavier_34190 1.avif",
    video: "/assets/MP4/HISS Reel Compressed.mp4",
    link: "https://www.hiss.sydney/",
    hasAwardBadge: true,
  },
  {
    id: "slik-creative",
    number: "05/06",
    title: "SLIK Creative",
    description:
      "Website for an Australian activation agency pushing creativity further for some of the country's most ambitious brands.",
    stat: "2.4x",
    statLabel: "Longer session duration on case studies",
    image: "/assets/AVIF/6a10111e38d73116c8849278_Slik.avif",
    video: "/assets/WEBM/SLIK-web.webm",
    link: "https://www.slik.com.au/",
  },
  {
    id: "vinamilk",
    number: "06/06",
    title: "Vinamilk",
    description:
      "Digital brand evolution and interactive storytelling platform for Southeast Asia's premier dairy powerhouse.",
    stat: "4.2M+",
    statLabel: "Active quarterly digital impressions",
    image: "/assets/AVIF/69490bd9af84227880218311_InUse UHT KD 180.avif",
    video: "/assets/WEBM/Design FINAL compressed.webm",
    link: "https://vinamilk.com.vn/",
    hasAwardBadge: true,
  },
];

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

function ProjectCard({ project }: { project: ProjectItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      className="project-item group w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-5 sm:gap-7 xl:gap-9">
          <div className="w-full lg:w-[64%] xl:w-[65%] shrink-0">
            <div className="relative aspect-[16/10] sm:aspect-[1.62/1] w-full overflow-hidden rounded-md sm:rounded-lg bg-[#c8c7c1] border border-black/10 shadow-xs">
              <div className="project-media-inner absolute -inset-y-[14%] inset-x-0 w-full h-[128%] will-change-transform">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 65vw, 850px"
                  className={`object-cover transition-transform duration-700 ease-out ${
                    isHovered ? "scale-[1.03]" : "scale-100"
                  }`}
                  priority={project.id === "oh-architecture"}
                />

                {project.video && (
                  <video
                    ref={videoRef}
                    src={project.video}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  />
                )}
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
                  <span className="font-semibold text-black/80">SS</span>
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
      const items = gsap.utils.toArray<HTMLElement>(".project-item");
      items.forEach((item) => {
        const mediaInner = item.querySelector<HTMLElement>(
          ".project-media-inner"
        );
        if (mediaInner) {
          gsap.fromTo(
            mediaInner,
            { yPercent: -9 },
            {
              yPercent: 9,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        }

        const info = item.querySelector<HTMLElement>(".project-info");
        if (info) {
          gsap.fromTo(
            info,
            { opacity: 0.9, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
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
                Success Stories
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
                href="https://cal.com/byhuy/project-intro-call"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#141414] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#f5f5f0] shadow-xs transition-all duration-300 hover:bg-black hover:scale-[1.02] w-fit"
              >
                <span>Start a project with us</span>
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
