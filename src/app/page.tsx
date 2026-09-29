export default function Home() {
  return (
    <div className="min-h-screen bg-[#ddddd8] text-[#141414] font-sans antialiased selection:bg-[#141414] selection:text-[#ddddd8]">
      <header className="sticky top-0 z-40 w-full border-b border-black/10 bg-[#ddddd8]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest px-2.5 py-1 rounded border border-black/15 bg-black/4">
              STUDIO
            </span>
            <span className="font-semibold text-sm tracking-tight">
              BCS LABS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-black/3 px-3 py-1 text-xs font-mono text-black/70">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Lenis Smooth Scroll
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 sm:px-8 py-20 sm:py-28">
        <section className="flex flex-col items-start gap-8 border-b border-black/10 pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/3 px-3.5 py-1 text-xs font-mono uppercase tracking-wider text-black/70">
            Grain & Motion Engine
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#141414] max-w-4xl leading-[1.08]">
            Crafting tactile digital experiences with fluid precision.
          </h1>

          <p className="max-w-2xl text-lg sm:text-xl leading-relaxed text-black/70">
            A brutalist paper aesthetic with dynamic film grain canvas overlays,
            buttery-smooth Lenis inertia scrolling, and cohesive structural
            alignment.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#showcase"
              className="flex h-12 items-center justify-center rounded-full bg-[#141414] px-7 text-sm font-medium text-[#ddddd8] transition-all hover:bg-black/85 hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Experience
            </a>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center rounded-full border border-black/20 bg-transparent px-7 text-sm font-medium text-[#141414] transition-all hover:bg-black/5 active:scale-[0.98]"
            >
              Documentation
            </a>
          </div>
        </section>

        <section id="showcase" className="py-24 border-b border-black/10">
          <div className="flex flex-col gap-4 mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-black/60">
              System Overview
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Unified design and smooth motion stack
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col justify-between rounded-2xl border border-black/10 bg-black/2 p-8 transition-all hover:border-black/25 hover:bg-black/4">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs text-black/50">
                  01 / OVERLAY
                </span>
                <h3 className="text-xl font-semibold">Film Grain Noise</h3>
                <p className="text-sm leading-relaxed text-black/70">
                  Global canvas-rendered procedural noise overlay fixed across
                  the entire viewport with non-blocking pointer events.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-black/10 font-mono text-xs text-black/60">
                blendMode: normal • alpha: 14
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-black/10 bg-black/2 p-8 transition-all hover:border-black/25 hover:bg-black/4">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs text-black/50">
                  02 / KINETICS
                </span>
                <h3 className="text-xl font-semibold">Lenis Smooth Scroll</h3>
                <p className="text-sm leading-relaxed text-black/70">
                  Configured with normalized wheel multipliers, physics-based
                  lerp damping, and seamless document synchronization.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-black/10 font-mono text-xs text-black/60">
                lerp: 0.08 • duration: 1.2s
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-black/10 bg-black/2 p-8 transition-all hover:border-black/25 hover:bg-black/4">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs text-black/50">
                  03 / PALETTE
                </span>
                <h3 className="text-xl font-semibold">#ddddd8 Foundation</h3>
                <p className="text-sm leading-relaxed text-black/70">
                  A balanced warm tactile canvas base replacing harsh blacks
                  with editorial paper warmth and deep charcoal contrast.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-black/10 font-mono text-xs text-black/60">
                contrast ratio: 12.4:1
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 border-b border-black/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <span className="font-mono text-xs uppercase tracking-widest text-black/60">
                Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                Engineered for performance and alignment.
              </h2>
              <p className="text-base leading-relaxed text-black/70">
                Every layout boundary is anchored to consistent grid increments.
                The smooth scroller runs off the requestAnimationFrame pipeline
                without layout thrashing, maintaining a stable 60+ FPS while
                noise buffers cache pre-computed noise matrices in memory.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="border border-black/10 rounded-xl p-4 bg-black/2">
                  <div className="text-2xl font-bold font-mono">120Hz</div>
                  <div className="text-xs text-black/60 mt-1">
                    High-refresh display ready
                  </div>
                </div>
                <div className="border border-black/10 rounded-xl p-4 bg-black/2">
                  <div className="text-2xl font-bold font-mono">0ms</div>
                  <div className="text-xs text-black/60 mt-1">
                    Input latency overhead
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-black/15 bg-black/3 p-8 sm:p-10 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <span className="font-mono text-xs text-black/60">
                  Runtime Configuration
                </span>
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <pre className="font-mono text-xs leading-relaxed text-black/80 overflow-x-auto">
                {`Smooth Scroll Specs:
lerp: 0.08
duration: 1.2
smoothWheel: true
wheelMultiplier: 1.0

Noise Texture Specs:
patternAlpha: 14
patternSize: 250
mode: "grain"
fullScreen: true
pointerEvents: "none"`}
              </pre>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="rounded-3xl border border-black/15 bg-black/4 p-10 sm:p-16 flex flex-col items-center text-center gap-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight max-w-xl">
              Ready to construct your project.
            </h2>
            <p className="max-w-md text-sm sm:text-base text-black/70">
              The noise overlay, smooth scroll physics, and #ddddd8 canvas
              foundation are fully configured and ready for expansion.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center justify-center rounded-full bg-[#141414] px-6 text-sm font-medium text-[#ddddd8] hover:bg-black/85 transition-colors"
              >
                Deploy Platform
              </a>
              <a
                href="#top"
                className="flex h-11 items-center justify-center rounded-full border border-black/20 px-6 text-sm font-medium text-[#141414] hover:bg-black/5 transition-colors"
              >
                Back to Top ↑
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 py-8 bg-[#ddddd8]">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-8 text-xs text-black/60 font-mono">
          <div>© {new Date().getFullYear()} BCS LABS. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-6">
            <span>LENIS 1.3</span>
            <span>NOISE COMPONENT</span>
            <span>NEXT.JS 16</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
