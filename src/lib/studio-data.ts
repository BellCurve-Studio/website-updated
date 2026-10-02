export const STUDIO = {
  name: "BellCurve Studios",
  founder: "Piyush Yadav",
  location: "Delhi NCR, India",
  email: "hello@bellcurvestudios.com",
  contact: "mailto:hello@bellcurvestudios.com?subject=Start%20a%20Project",
  slogan: "Crafting Immersive Digital Experiences",
  description: "BellCurve Studios is a premier creative digital agency and tech studio based in Delhi NCR, founded by Piyush Yadav.",
};

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/bellcurvestudios" },
  { label: "LinkedIn", href: "https://linkedin.com/company/bellcurve-studios" },
  { label: "X", href: "https://x.com/bellcurvestudio" },
  { label: "Instagram", href: "https://instagram.com/bellcurvestudios" },
];

export const CLIENTS = ["Clinsight", "Kroissings", "Wellstone AI", "Composio", "calsoft", "smallest.ai", "neuroform.ai", "SYNTRIX"];

export const BENCHMARKS = [
  { number: "60 FPS", label: "Motion rendering fidelity — smooth, cinematic interaction under heavy workloads." },
  { number: "100%", label: "Bespoke code and zero bloat. Every experience is crafted without generic templates." },
  { number: ">150M", label: "Global user interactions across studio client properties." },
  { number: "120K+", label: "Lines of custom shader and GPU graphics code." },
  { number: "99.98%", label: "Frame rate stability under complex real-time rendering." },
  { number: "<180ms", label: "Ultra-low initial loading latency." },
];

export interface StudioProject {
  id: string;
  number: string;
  title: string;
  description: string;
  category: string;
  year: string;
  stat: string;
  statLabel: string;
  image: string;
  video?: string;
  link: string;
  hasAwardBadge?: boolean;
}

export const PROJECTS: StudioProject[] = [
  {
    id: "aether-spatial-canvas", number: "01/06", title: "Aether 3D Spatial Canvas", year: "2025", category: "WEBGPU / WGSL",
    description: "Next-generation WebGPU compute shaders and real-time volumetric rendering. A procedural spatial canvas built around light, depth, and interaction.",
    stat: "WebGPU", statLabel: "Compute shaders & real-time volumetrics",
    image: "/assets/AVIF/697ef14da1c89e5e19e5cca4_3D Development.avif", video: "/assets/WEBM/Development Final Compressed.webm", link: "#contact", hasAwardBadge: true,
  },
  {
    id: "nexus-immersive-web", number: "02/06", title: "Nexus Immersive Web", year: "2024", category: "THREE.JS / NEXT.JS",
    description: "A flagship 3D commerce experience combining high-performance WebGL architecture, cinematic motion, and fluid physics.",
    stat: "WebGL", statLabel: "Three.js, Next.js & GSAP motion",
    image: "/assets/AVIF/697ef15eca91ffc3ae831e4e_Web Design.avif", video: "/assets/WEBM/Design FINAL compressed.webm", link: "#contact", hasAwardBadge: true,
  },
  {
    id: "pulse-generative-ui", number: "03/06", title: "Pulse Generative UI Engine", year: "2023", category: "CANVAS / TYPESCRIPT",
    description: "Dynamic procedural canvas systems, generative color harmonies, and tactile micro-interactions brought together in a real-time UI engine.",
    stat: "Canvas", statLabel: "Generative color systems & shader graphs",
    image: "/assets/AVIF/697ef16f889c1ea502d8ee65_Visual Identity.avif", video: "/assets/WEBM/Design FINAL compressed.webm", link: "#contact", hasAwardBadge: true,
  },
  {
    id: "chroma-spatial-commerce", number: "04/06", title: "Chroma Spatial Commerce", year: "2022", category: "WEBGL / CREATIVE DEV",
    description: "A spatial approach to luxury commerce, pairing artisanal branding with pioneering WebGL interactions and considered GSAP motion.",
    stat: "3D", statLabel: "Spatial commerce & bespoke brand direction",
    image: "/assets/AVIF/697ef15eca91ffc3ae831e4e_Web Design.avif", video: "/assets/WEBM/Development Final Compressed.webm", link: "#contact", hasAwardBadge: true,
  },
  {
    id: "blackbird-awards-atelier", number: "05/06", title: "Blackbird Awards Atelier", year: "2025", category: "INTERACTIVE 3D",
    description: "An interactive digital stage for an awards ceremony, using spatial composition and real-time lighting to make every moment feel distinctive.",
    stat: "Atelier", statLabel: "Interactive 3D ceremony & digital stage",
    image: "/assets/AVIF/697ef17ae082299197a3aa88_Website Strategy.avif", video: "/assets/WEBM/Strategy Compressed.webm", link: "#contact",
  },
  {
    id: "verve-interactive-atelier", number: "06/06", title: "Verve Interactive Atelier", year: "2025", category: "EXPERIMENTAL / MOTION",
    description: "An experimental studio concept exploring expressive typography, responsive motion, and interactive editorial storytelling.",
    stat: "Motion", statLabel: "Experimental art direction & tactile interfaces",
    image: "/assets/AVIF/697ef10d5fcc93485bf8dfb4_Brand Strategy.avif", video: "/assets/WEBM/Design FINAL compressed.webm", link: "#contact",
  },
];

export const SERVICES = [
  { id: "creative-web", title: "Creative Web & WebGPU", description: "Next-gen WebGL, WebGPU, and 3D spatial experiences.", image: "/assets/AVIF/697ef14da1c89e5e19e5cca4_3D Development.avif", video: "/assets/WEBM/Development Final Compressed.webm" },
  { id: "digital-products", title: "Bespoke Digital Products", description: "High-performance web applications engineered for global scale.", image: "/assets/AVIF/697ef13b8c2c03a57cff1df0_Webflow Development.avif", video: "/assets/WEBM/Development Final Compressed.webm" },
  { id: "brand-worlds", title: "Immersive Brand Worlds", description: "Transforming brands into living, interactive digital playgrounds.", image: "/assets/AVIF/697ef16f889c1ea502d8ee65_Visual Identity.avif", video: "/assets/WEBM/Design FINAL compressed.webm" },
  { id: "ai-interfaces", title: "Real-Time AI & Interfaces", description: "Intelligent interfaces, generative canvases, and conversational state.", image: "/assets/AVIF/697ef15eca91ffc3ae831e4e_Web Design.avif", video: "/assets/WEBM/Development Final Compressed.webm" },
  { id: "experimental-rd", title: "Experimental Tech R&D", description: "Open-source libraries, shader labs, and creative technology experiments.", image: "/assets/AVIF/697ef17ae082299197a3aa88_Website Strategy.avif", video: "/assets/WEBM/Strategy Compressed.webm" },
  { id: "motion-sound", title: "Motion & Sound Design", description: "Cinematic GSAP narratives and soundscapes synchronized with interaction.", image: "/assets/AVIF/697ef10d5fcc93485bf8dfb4_Brand Strategy.avif", video: "/assets/WEBM/Design FINAL compressed.webm" },
];

export const PARTNER_PERSPECTIVES = [
  { id: "creative", quote: "The experience feels like our brand at its most expressive. Every interaction has a purpose, and the creative direction carries through to the smallest detail.", name: "Creative partner", role: "Illustrative partner perspective", avatar: "/assets/AVIF/69ce9284075cd51831cdc1d1_1753282172963.avif", index: "01/03" },
  { id: "product", quote: "A clear process, thoughtful prototypes, and an engineering team that understands the product. Complex ideas become interfaces people can explore with confidence.", name: "Product partner", role: "Illustrative partner perspective", avatar: "/assets/AVIF/690df5490b74ae9f75ed17eb_Default.avif", index: "02/03" },
  { id: "engineering", quote: "Ambitious visuals and dependable engineering belong together. The result is a distinctive experience with the performance and flexibility to keep evolving.", name: "Engineering partner", role: "Illustrative partner perspective", avatar: "/assets/AVIF/690df5543d7243082ccbfcaa_OH_STAFF©ANDYMACPHERSON-14 1.avif", index: "03/03" },
];

export const QUESTIONS = [
  {
    question: "What is BellCurve Studios? How are you different?",
    answer: [STUDIO.description, "We engineer every experience from the ground up using custom WebGL/WebGPU shaders, bespoke 3D art, and fluid motion systems. We fuse avant-garde creative direction with uncompromising engineering precision."],
  },
  {
    question: "What technologies do you specialize in?",
    answer: ["Our creative web toolkit includes WebGL, WebGPU, Three.js, WGSL/GLSL shaders, Canvas 2D, Next.js, Nuxt 3, TypeScript, GSAP, Framer Motion, and Lenis.", "We also integrate headless CMS platforms such as Sanity and develop real-time interactive AI interfaces."],
  },
  {
    question: "What is your studio’s typical project timeline?",
    answer: ["Creative sprints and interactive prototypes typically take 2–3 weeks. Comprehensive flagship builds with custom 3D, shaders, and complex animations run 6–10 weeks.", "Expect rapid iteration, close collaboration, and transparent milestones from the start."],
  },
  {
    question: "Do you work globally or only in India?",
    answer: ["Our studio is headquartered in Delhi NCR, India, and the vast majority of our clients are global.", "We collaborate with brands, tech startups, creative agencies, and enterprises across North America, Europe, Asia, and Australia."],
  },
  {
    question: "Can you work with our in-house team?",
    answer: ["Absolutely. We frequently partner with existing product, design, and engineering teams.", "We can bring your Figma designs to life with WebGL and GSAP motion, or augment your team for an ambitious product launch."],
  },
  {
    question: "How do you keep motion smooth on mobile?",
    answer: ["Performance is foundational. We profile GPU draw calls, minimize memory allocations, tree-shake bundles, and use adaptive resolution scaling for 3D canvases.", "Optimized render loops and careful device testing keep interactions fluid across modern mobile and desktop browsers."],
  },
  {
    question: "How do we start a project with BellCurve Studios?",
    answer: ["Email hello@bellcurvestudios.com or choose Start a Project. We’ll discuss your vision, creative goals, technical requirements, and timeline before preparing a tailored proposal.", "Milestone-based engagements start with a $6.5K Sprint. Production projects start at $16K, Atelier projects at $32K, and Enterprise partnerships use custom pricing."],
  },
];
