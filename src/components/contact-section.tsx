"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  gsap,
  ScrollTrigger,
  useGSAP,
  MOTION_QUERY,
  useReducedMotion,
  revealElements,
} from "@/lib/animation";
import {
  CONTACT_LIMITS,
  CONTACT_OPTIONS,
  validateEnquiry,
  type ContactErrors,
} from "@/lib/contact";
import { STUDIO } from "@/lib/studio-data";

const INPUT_CLASS =
  "mt-3 min-h-13 w-full rounded-xs border border-white/20 bg-white/[0.025] px-4 py-3 text-base text-[#f0f0eb] placeholder:text-white/30 focus:border-[#f0f0eb] focus:outline-none focus:ring-1 focus:ring-[#f0f0eb] aria-[invalid=true]:border-[#efb3a5] disabled:opacity-60";
const TEXT_FIELDS = [
  {
    name: "name",
    label: "Your name",
    placeholder: "What should we call you?",
    type: "text",
    autoComplete: "name",
    required: true,
  },
  {
    name: "email",
    label: "Email address",
    placeholder: "you@company.com",
    type: "email",
    autoComplete: "email",
    required: true,
  },
  {
    name: "organization",
    label: "Business or organization",
    placeholder: "Your organization’s name",
    type: "text",
    autoComplete: "organization",
    required: false,
  },
  {
    name: "website",
    label: "Website",
    placeholder: "https://yourwebsite.com",
    type: "url",
    autoComplete: "url",
    required: false,
  },
  {
    name: "phone",
    label: "Phone number",
    placeholder: "Include your country code",
    type: "tel",
    autoComplete: "tel",
    required: false,
  },
] as const;
const SELECT_FIELDS = [
  { name: "engagement", label: "Where would you like to start?" },
  { name: "service", label: "What might you need help with?" },
  { name: "budget", label: "Budget in mind (INR)" },
  { name: "timeline", label: "When would you like to start?" },
] as const;

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const sendingRef = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<{
    kind: "success" | "error";
    message: string;
  } | null>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(MOTION_QUERY, () =>
        revealElements(sectionRef.current, ".contact-reveal"),
      );
      return () => media.revert();
    },
    { scope: sectionRef },
  );

  function fieldAttributes(name: keyof ContactErrors) {
    return {
      "aria-invalid": !!errors[name],
      "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    };
  }

  function fieldError(name: keyof ContactErrors) {
    return errors[name] ? (
      <p
        id={`contact-${name}-error`}
        className="mt-2 text-xs leading-relaxed text-[#efb3a5]"
      >
        {errors[name]}
      </p>
    ) : null;
  }

  function showErrors(nextErrors: ContactErrors) {
    setErrors(nextErrors);
    const firstField = Object.keys(nextErrors)[0];
    const input = formRef.current?.elements.namedItem(firstField);
    if (input instanceof HTMLElement) input.focus();
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const payload = {
      ...Object.fromEntries(values),
      consent: values.get("consent") === "on",
    };
    const { data, errors: validationErrors } = validateEnquiry(payload);
    setStatus(null);
    if (!data) {
      showErrors(validationErrors);
      return;
    }

    sendingRef.current = true;
    setSending(true);
    setErrors({});
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          websiteConfirmation: values.get("websiteConfirmation") || "",
        }),
        signal: AbortSignal.timeout(35000),
      });
      const result = await response.json();
      if (!response.ok) {
        if (result.errors) showErrors(result.errors);
        throw new Error(
          result.message ||
            "We couldn’t send your enquiry. Please try again or email us directly.",
        );
      }
      form.reset();
      setStatus({ kind: "success", message: result.message });
    } catch (error) {
      const message =
        error instanceof Error && error.name === "Error"
          ? error.message
          : "We couldn’t reach the studio. Your details are still here. Please retry or email us directly.";
      setStatus({ kind: "error", message });
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="relative scroll-mt-8 border-y border-white/15 px-6 py-24 sm:px-10 sm:py-32 lg:px-14 xl:px-18"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/assets/PNG/692114faea9b602a766335ec_download.png')] opacity-[0.035]"
      />
      <div className="relative mx-auto grid max-w-[1640px] grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="contact-reveal lg:col-span-4 lg:self-start">
          <p className="section-label mb-8 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-[#a7a7a0]"
            />
            Contact us
          </p>
          <h2
            id="contact-heading"
            className="hero-heading max-w-130 text-[clamp(2.7rem,4.5vw,5rem)] leading-[1.04] font-bold tracking-[-0.055em]"
          >
            Start with
            <br />
            the problem.
          </h2>
          <p className="mt-7 max-w-90 text-base leading-relaxed text-white/65">
            Something taking too long? Tools not talking to each other? Tell us
            what’s happening and what you’d like to work better.
          </p>
          <p className="mt-5 max-w-90 text-sm leading-relaxed text-white/50">
            You don’t need a technical brief. A rough description is enough to
            begin a useful conversation.
          </p>
          <div className="mt-10 border-t border-white/15 pt-6">
            <p className="text-xs text-white/50">Prefer email?</p>
            <a
              href={`mailto:${STUDIO.email}`}
              className="mt-3 inline-flex max-w-full items-center gap-3 break-all text-base font-semibold sm:text-lg"
            >
              {STUDIO.email}
              <span aria-hidden="true">↗</span>
            </a>
            <p className="mt-7 font-mono text-[10px] tracking-wide text-white/50 uppercase">
              Free basic audit available
              <br />
              <span className="mt-2 inline-block">No obligation to build.</span>
            </p>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={submit}
          noValidate
          onChange={(event) => {
            const target = event.target;
            if (
              !(
                target instanceof HTMLInputElement ||
                target instanceof HTMLSelectElement ||
                target instanceof HTMLTextAreaElement
              )
            )
              return;
            const name = target.name as keyof ContactErrors;
            if (errors[name])
              setErrors((current) => ({ ...current, [name]: undefined }));
          }}
          aria-busy={sending}
          className="contact-reveal min-w-0 lg:col-span-8"
        >
          <div className="mb-8 flex items-center justify-between gap-4 border-b border-white/15 pb-5">
            <p className="text-lg font-semibold tracking-tight">
              Tell us a little about your situation.
            </p>
            <p className="shrink-0 text-xs text-white/45">* Required</p>
          </div>
          <fieldset
            disabled={sending}
            className="grid min-w-0 grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2"
          >
            <legend className="sr-only">
              Your contact details and enquiry
            </legend>
            {TEXT_FIELDS.map((field) => (
              <div
                key={field.name}
                className={field.name === "phone" ? "sm:col-span-2" : undefined}
              >
                <label
                  htmlFor={`contact-${field.name}`}
                  className="text-sm font-semibold"
                >
                  {field.label}
                  <span className="ml-1 text-white/40">
                    {field.required ? "*" : "(optional)"}
                  </span>
                </label>
                <input
                  id={`contact-${field.name}`}
                  name={field.name}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  required={field.required}
                  maxLength={CONTACT_LIMITS[field.name]}
                  className={INPUT_CLASS}
                  {...fieldAttributes(field.name)}
                />
                {fieldError(field.name)}
              </div>
            ))}
            {SELECT_FIELDS.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={`contact-${field.name}`}
                  className="text-sm font-semibold"
                >
                  {field.label}
                </label>
                <select
                  id={`contact-${field.name}`}
                  name={field.name}
                  defaultValue={
                    field.name === "service"
                      ? "Not sure yet"
                      : CONTACT_OPTIONS[field.name][0]
                  }
                  className={`${INPUT_CLASS} cursor-pointer scheme-dark`}
                  {...fieldAttributes(field.name)}
                >
                  {CONTACT_OPTIONS[field.name].map((option) => (
                    <option
                      key={option}
                      value={option}
                      className="bg-[#141414]"
                    >
                      {option}
                    </option>
                  ))}
                </select>
                {fieldError(field.name)}
              </div>
            ))}
            <div className="sm:col-span-2">
              <label
                htmlFor="contact-message"
                className="text-sm font-semibold"
              >
                What’s getting in the way?{" "}
                <span className="text-white/40">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                minLength={20}
                maxLength={CONTACT_LIMITS.message}
                rows={5}
                placeholder="How does it work today? Where does it get difficult? What would a better outcome look like? Add any deadline or context that matters."
                className={`${INPUT_CLASS} min-h-44 resize-y leading-relaxed`}
                {...fieldAttributes("message")}
              />
              {fieldError("message")}
            </div>
            <div aria-hidden="true" className="hidden">
              <label htmlFor="contact-website-confirmation">
                Leave this field empty
              </label>
              <input
                id="contact-website-confirmation"
                name="websiteConfirmation"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-white/60 sm:text-sm">
                <input
                  id="contact-consent"
                  name="consent"
                  type="checkbox"
                  required
                  className="mt-0.5 size-4 shrink-0 cursor-pointer accent-[#f0f0eb]"
                  {...fieldAttributes("consent")}
                />
                <span>
                  BellCurve Studio may contact me about this enquiry.{" "}
                  <span className="text-white/40">*</span>
                </span>
              </label>
              {fieldError("consent")}
            </div>
          </fieldset>
          <div className="mt-9 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <motion.button
              type="submit"
              disabled={sending}
              whileHover={reducedMotion || sending ? undefined : { y: -2 }}
              whileTap={reducedMotion || sending ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 360, damping: 26 }}
              className="inline-flex min-h-13 cursor-pointer items-center gap-5 rounded-xs bg-[#f0f0eb] p-2 pl-4 text-base font-bold tracking-tight text-[#141414] hover:bg-white disabled:cursor-wait disabled:opacity-60"
            >
              <span>
                {sending ? "Sending your enquiry…" : "Start the conversation"}
              </span>
              <span
                aria-hidden="true"
                className="flex size-9 shrink-0 items-center justify-center rounded-xs bg-[#141414]"
              >
                <Image
                  src="/assets/SVG/g_btn_svg.svg"
                  alt=""
                  width={26}
                  height={26}
                  className="invert"
                />
              </span>
            </motion.button>
            <p className="max-w-57.5 text-xs leading-relaxed text-white/45">
              We’ll review your situation and suggest a useful next step.
            </p>
          </div>
          <AnimatePresence initial={false}>
            {status && (
              <motion.div
                ref={statusRef}
                key={status.kind}
                role={status.kind === "error" ? "alert" : "status"}
                tabIndex={-1}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.25 }}
                onAnimationComplete={() => {
                  ScrollTrigger.refresh();
                  if (!Object.values(errors).some(Boolean))
                    statusRef.current?.focus({ preventScroll: true });
                }}
                className={`mt-6 rounded-xs border p-5 text-sm leading-relaxed ${status.kind === "success" ? "border-white/25 bg-white/5 text-[#f0f0eb]" : "border-[#efb3a5]/35 bg-[#efb3a5]/5 text-[#efb3a5]"}`}
              >
                <p>{status.message}</p>
                {status.kind === "error" && (
                  <a
                    className="mt-3 inline-block break-all font-semibold underline underline-offset-4"
                    href={`mailto:${STUDIO.email}`}
                  >
                    {STUDIO.email} ↗
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
}
