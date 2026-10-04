export const STUDIO = {
  name: "BellCurve Studio",
  founder: "Piyush Yadav",
  location: "Delhi NCR, India",
  email: "connect@bellcurvestudio.com",
  contact: "#contact",
  slogan: "Software that fits the way you work",
  description: "BellCurve Studio designs and builds digital experiences, business systems, and automated workflows around the way your organization works.",
};

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/BellCurve-Studio" },
];

export const STARTING_POINTS = ["Slow processes", "Manual follow-ups", "Scattered data", "Disconnected tools", "Missed enquiries", "Repeated tasks", "Unclear reporting", "Outgrown systems"];

export const BENCHMARKS = [
  { number: "Understand", label: "We start with how your business works, what is getting in the way, and what needs to change." },
  { number: "Audit", label: "A free basic audit looks at your digital presence and workflows to identify useful starting points." },
  { number: "Diagnose", label: "We look beyond the symptoms to find the gaps in the process behind them." },
  { number: "Design", label: "We shape a solution around your team, your tools, and the outcome you need." },
  { number: "Build", label: "You understand the scope and priorities before we begin. We keep the work focused on what matters." },
  { number: "Improve", label: "Once the system is in use, we look at what works and where the next improvement belongs." },
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
}

export const PROJECTS: StudioProject[] = [
  {
    id: "website-enquiries", number: "01/06", title: "Turn visits into conversations", year: "Possible starting point", category: "Digital experiences",
    description: "A website should help people understand your business and take the next step. We connect the enquiry to your team’s follow-up process.",
    stat: "Clear next steps", statLabel: "Websites that support your business",
    image: "/assets/AVIF/697ef14da1c89e5e19e5cca4_3D Development.avif", video: "/assets/WEBM/Development Final Compressed.webm", link: "#contact",
  },
  {
    id: "business-visibility", number: "02/06", title: "See what needs attention", year: "Possible starting point", category: "Business systems",
    description: "Bring scattered records and updates into one useful view. Give your team information they can trust and act on.",
    stat: "Better visibility", statLabel: "Connected records and useful dashboards",
    image: "/assets/AVIF/697ef15eca91ffc3ae831e4e_Web Design.avif", video: "/assets/WEBM/Design FINAL compressed.webm", link: "#contact",
  },
  {
    id: "workflow-handoffs", number: "03/06", title: "Keep work moving", year: "Possible starting point", category: "Workflow automation",
    description: "Replace repeated copying, reminders, and manual handoffs with a workflow that gives each task a clear next step.",
    stat: "Less manual work", statLabel: "Practical automation for everyday tasks",
    image: "/assets/AVIF/697ef16f889c1ea502d8ee65_Visual Identity.avif", video: "/assets/WEBM/Design FINAL compressed.webm", link: "#contact",
  },
  {
    id: "connected-tools", number: "04/06", title: "Make your tools work together", year: "Possible starting point", category: "System integrations",
    description: "Connect the tools you already use so your website, sales process, and internal systems share the information they need.",
    stat: "Connected tools", statLabel: "Fewer gaps between teams and systems",
    image: "/assets/AVIF/697ef15eca91ffc3ae831e4e_Web Design.avif", video: "/assets/WEBM/Development Final Compressed.webm", link: "#contact",
  },
  {
    id: "useful-ai", number: "05/06", title: "Put AI to useful work", year: "Possible starting point", category: "Automation & AI",
    description: "Find the repetitive work where AI can help. Build it into your process with clear checks and room for human judgement.",
    stat: "Useful AI", statLabel: "Support for real operational problems",
    image: "/assets/AVIF/697ef17ae082299197a3aa88_Website Strategy.avif", video: "/assets/WEBM/Strategy Compressed.webm", link: "#contact",
  },
  {
    id: "right-first-step", number: "06/06", title: "Find the right first step", year: "Possible starting point", category: "Strategy & consulting",
    description: "Before investing in a build, understand what is getting in the way. We review your setup and recommend the simplest useful improvement.",
    stat: "Clear priorities", statLabel: "A diagnosis before a proposal",
    image: "/assets/AVIF/697ef10d5fcc93485bf8dfb4_Brand Strategy.avif", video: "/assets/WEBM/Design FINAL compressed.webm", link: "#contact",
  },
];

export const SERVICES = [
  { id: "digital-experiences", title: "Digital Experiences", description: "Websites and digital journeys that make the next step clear.", image: "/assets/AVIF/697ef14da1c89e5e19e5cca4_3D Development.avif", video: "/assets/WEBM/Development Final Compressed.webm" },
  { id: "business-systems", title: "Business Systems", description: "Connected records, dashboards, and tools shaped around your operations.", image: "/assets/AVIF/697ef13b8c2c03a57cff1df0_Webflow Development.avif", video: "/assets/WEBM/Development Final Compressed.webm" },
  { id: "workflow-automation", title: "Workflow Automation", description: "Less copying, fewer manual handoffs, and clearer ownership.", image: "/assets/AVIF/697ef16f889c1ea502d8ee65_Visual Identity.avif", video: "/assets/WEBM/Design FINAL compressed.webm" },
  { id: "ai-integrations", title: "AI Integrations", description: "Practical AI support for repetitive work, with people in control.", image: "/assets/AVIF/697ef15eca91ffc3ae831e4e_Web Design.avif", video: "/assets/WEBM/Development Final Compressed.webm" },
  { id: "strategy-consulting", title: "Strategy & Consulting", description: "A diagnosis, a clear plan, and a scope you can make a decision on.", image: "/assets/AVIF/697ef17ae082299197a3aa88_Website Strategy.avif", video: "/assets/WEBM/Strategy Compressed.webm" },
  { id: "ongoing-improvement", title: "Ongoing Improvement", description: "Review what is working and adapt your systems as your business changes.", image: "/assets/AVIF/697ef10d5fcc93485bf8dfb4_Brand Strategy.avif", video: "/assets/WEBM/Design FINAL compressed.webm" },
];

export const PARTNER_PERSPECTIVES = [
  { id: "diagnose", quote: "Before we suggest a build, we understand what is getting in the way. The right question often changes the solution.", name: "Diagnose first", role: "The BellCurve approach", avatar: "/assets/AVIF/69ce9284075cd51831cdc1d1_1753282172963.avif", index: "01/03" },
  { id: "advice", quote: "Sometimes a better process is enough. We recommend the simplest solution that solves the problem, even when that means less software.", name: "Honest advice", role: "The BellCurve approach", avatar: "/assets/AVIF/690df5490b74ae9f75ed17eb_Default.avif", index: "02/03" },
  { id: "fit", quote: "Your team should understand what we are building, why it matters, and how it fits the way you work. Useful software starts there.", name: "Built to fit", role: "The BellCurve approach", avatar: "/assets/AVIF/690df5543d7243082ccbfcaa_OH_STAFF©ANDYMACPHERSON-14 1.avif", index: "03/03" },
];

export const QUESTIONS = [
  { question: "What can BellCurve Studio help us with?", answer: [STUDIO.description, "We can help with an ineffective website, scattered business data, disconnected tools, or work your team keeps doing manually. We start with the problem and work out what would improve it."] },
  { question: "What does the free basic audit include?", answer: ["We review your website or digital presence, take a first look at your workflows, and identify the key issues worth investigating.", "It is a useful starting point. A detailed diagnosis, solution design, or implementation can be scoped separately if you need it."] },
  { question: "Do we need a technical brief before getting in touch?", answer: ["No. Tell us what is happening, what feels slow or difficult, and what you would like to work better.", "Screenshots, existing tools, or a rough description can help, but you do not need to know which technology or solution to ask for."] },
  { question: "Will you work with the tools we already use?", answer: ["We begin by understanding your current setup. Where it makes sense, we connect and improve existing tools rather than replace them.", "If a new system is needed, we explain how it would fit your process and what the change would involve."] },
  { question: "Does every problem need a custom build?", answer: ["No. A clearer process, a small integration, or an existing tool may solve the problem.", "Our engagement can start with an audit or consulting. We recommend a custom build when it is a useful fit for your needs."] },
  { question: "How do you decide the cost and timeline?", answer: ["We first understand the problem, the scope, and the systems involved. Then we agree on the priorities, deliverables, and a realistic schedule.", "Share any budget or deadline you have in mind. We can use those constraints to shape a sensible first step."] },
  { question: "What happens after we contact you?", answer: ["We review your enquiry and start a conversation about your current setup and the outcome you want.", "From there, we suggest an audit, a consulting engagement, or a scoped build. If we build together, we also agree on handover and any ongoing support."] },
];
