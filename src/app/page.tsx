import { HeroSection } from "@/components/hero-section";
import { ScrollRevealSection } from "@/components/scroll-reveal-section";
import { GapRevealSection } from "@/components/gap-reveal-section";
import { SuccessStoriesSection } from "@/components/success-stories-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#ddddd8] text-[#141414] antialiased">
      <HeroSection />
      <ScrollRevealSection />
      <GapRevealSection />
      <SuccessStoriesSection />

      <section
        id="services"
        className="relative z-10 border-t border-black/10 px-6 py-24 sm:px-10 lg:px-14 bg-[#ddddd8]"
      >
        <div className="mx-auto max-w-[1520px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <span className="font-mono text-xs uppercase tracking-widest text-black/60">
                Capabilities
              </span>
              <h2 className="hero-heading text-3xl sm:text-5xl font-bold tracking-tight mt-2">
                Full-spectrum digital delivery
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-black/70">
                We integrate strategy, design, and high-performance engineering
                under one focused team so nothing gets lost in translation.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-black/10 bg-black/3 p-8 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-black/50">01</span>
                  <h4 className="text-xl font-bold mt-2">Brand Strategy</h4>
                  <p className="text-sm leading-relaxed text-black/70 mt-3">
                    Positioning that separates you from market noise. We define
                    who you are, what you stand for, and why clients choose you.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-black/10 font-mono text-xs text-black/60">
                  Narrative • Messaging • Architecture
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-black/3 p-8 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-black/50">02</span>
                  <h4 className="text-xl font-bold mt-2">Visual Identity</h4>
                  <p className="text-sm leading-relaxed text-black/70 mt-3">
                    Distinctive design systems that look unmistakably yours
                    across every touchpoint, from logomark to tactile motion.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-black/10 font-mono text-xs text-black/60">
                  Logomarks • Typography • Art Direction
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-black/3 p-8 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-black/50">03</span>
                  <h4 className="text-xl font-bold mt-2">Website Design</h4>
                  <p className="text-sm leading-relaxed text-black/70 mt-3">
                    Bespoke digital experiences built for conversion and
                    lasting cultural impression, engineered down to the pixel.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-black/10 font-mono text-xs text-black/60">
                  UX Wireframes • UI Artistry • Prototyping
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-black/3 p-8 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-black/50">04</span>
                  <h4 className="text-xl font-bold mt-2">Webflow Development</h4>
                  <p className="text-sm leading-relaxed text-black/70 mt-3">
                    Clean semantic builds with fluid GSAP choreography,
                    effortless CMS management, and uncompromising performance.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-black/10 font-mono text-xs text-black/60">
                  GSAP Motion • Custom Code • 90-day Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
