export const CONTACT_OPTIONS = {
  engagement: ["Free basic audit", "Strategy & consulting", "Build & improve", "Help me decide"],
  service: ["Digital experiences", "Business systems", "Automation & AI", "More than one", "Not sure yet"],
  budget: ["Not decided yet", "Under ₹1 lakh", "₹1–3 lakh", "₹3–10 lakh", "₹10 lakh or more", "Let’s discuss"],
  timeline: ["Flexible / exploring", "Within a month", "In 1–3 months", "In 3–6 months", "A specific deadline"],
};

export const CONTACT_LIMITS = { name: 100, email: 254, organization: 150, website: 500, phone: 40, message: 4000 };

export interface ContactEnquiry {
  name: string;
  email: string;
  organization: string;
  website: string;
  phone: string;
  engagement: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  consent: boolean;
}

export type ContactErrors = Partial<Record<keyof ContactEnquiry, string>>;

export function validateEnquiry(input: unknown): { data?: ContactEnquiry; errors: ContactErrors } {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { errors: { message: "Please complete the form." } };
  const source = input as Record<string, unknown>;
  const errors: ContactErrors = {};
  const fields: Record<string, string> = {};

  for (const [key, limit] of Object.entries(CONTACT_LIMITS)) {
    const field = key as keyof typeof CONTACT_LIMITS;
    const raw = source[field];
    const value = typeof raw === "string" ? raw.trim() : "";
    fields[field] = value;
    if (raw !== undefined && typeof raw !== "string") errors[field] = "Please enter a valid value.";
    else if (value.length > limit) errors[field] = `Please use ${limit} characters or fewer.`;
    else if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value) || (field !== "message" && /[\r\n]/.test(value))) errors[field] = "Please enter a valid value.";
  }

  if (!fields.name) errors.name = "Please tell us your name.";
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fields.email)) errors.email = "Please enter a valid email address.";
  if (fields.message.length < 20) errors.message = "Please share a little more detail (at least 20 characters).";
  if (fields.website) {
    try {
      const url = new URL(fields.website);
      if (!["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".") || url.username || url.password) throw new Error("Invalid website");
    } catch {
      errors.website = "Please enter a website starting with https:// or http://.";
    }
  }

  for (const [key, options] of Object.entries(CONTACT_OPTIONS)) {
    const field = key as keyof typeof CONTACT_OPTIONS;
    const raw = source[field];
    if (typeof raw !== "string" || !options.includes(raw)) errors[field] = "Please choose one of the available options.";
    fields[field] = typeof raw === "string" ? raw : "";
  }
  if (source.consent !== true) errors.consent = "Please allow us to reply to your enquiry.";
  if (Object.keys(errors).length) return { errors };
  return { data: { name: fields.name, email: fields.email, organization: fields.organization, website: fields.website, phone: fields.phone, engagement: fields.engagement, service: fields.service, budget: fields.budget, timeline: fields.timeline, message: fields.message, consent: true }, errors };
}
