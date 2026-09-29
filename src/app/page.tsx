import { HeroSection } from "@/components/hero-section";
import { ScrollRevealSection } from "@/components/scroll-reveal-section";
import { GapRevealSection } from "@/components/gap-reveal-section";
import { SuccessStoriesSection } from "@/components/success-stories-section";
import { ServicesSection } from "@/components/services-section";
import { ProjectJourneySection } from "@/components/project-journey-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#ddddd8] text-[#141414] antialiased">
      <HeroSection />
      <ScrollRevealSection />
      <GapRevealSection />
      <SuccessStoriesSection />
      <ServicesSection />
      <ProjectJourneySection />

      <footer className="border-t border-black/10 py-12 px-6 sm:px-10 lg:px-14 bg-[#ddddd8]">
        <div className="mx-auto flex max-w-[1520px] flex-col sm:flex-row items-center justify-between gap-6 text-xs text-black/60 font-mono">
          <div>
            © {new Date().getFullYear()} MONOLOG. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>MELBOURNE</span>
            <span>•</span>
            <span>HANOI</span>
            <span>•</span>
            <span>AWWWARDS SOTD (X5)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
