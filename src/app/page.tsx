import { HeroSection } from "@/components/hero-section";
import { ScrollRevealSection } from "@/components/scroll-reveal-section";
import { GapRevealSection } from "@/components/gap-reveal-section";
import { SuccessStoriesSection } from "@/components/success-stories-section";
import { ServicesSection } from "@/components/services-section";
import { ProjectJourneySection } from "@/components/project-journey-section";
import { FaqSection } from "@/components/faq-section";
import { ClosingSection } from "@/components/closing-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#ddddd8] text-[#141414] antialiased">
      <HeroSection />
      <ScrollRevealSection />
      <GapRevealSection />
      <SuccessStoriesSection />
      <ServicesSection />
      <ProjectJourneySection />
      <FaqSection />
      <ClosingSection />
    </div>
  );
}
