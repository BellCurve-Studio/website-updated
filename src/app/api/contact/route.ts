import { createHash } from "node:crypto";
import { validateEnquiry } from "@/lib/contact";
import { sendEnquiry } from "@/lib/mail";

export const runtime = "nodejs";

const attempts = new Map<string, { count: number; expires: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_BYTES = 16000;

function reply(body: object, status: number, extraHeaders: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...extraHeaders } });
}

function allowAttempt(request: Request) {
  const now = Date.now();
  for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const key = createHash("sha256").update(address).digest("hex");
  const previous = attempts.get(key);
  if (previous && previous.count >= 3) return false;
  if (!previous && attempts.size >= 1000) return false;
  attempts.set(key, { count: (previous?.count || 0) + 1, expires: previous?.expires || now + WINDOW_MS });
  return true;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return reply({ message: "Please submit the form from this website." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return reply({ message: "Please submit the contact form." }, 415);
  if (Number(request.headers.get("content-length")) > MAX_BYTES) return reply({ message: "Your enquiry is too long." }, 413);

  let payload: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply({ message: "Please complete the form." }, 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BYTES) {
        await reader.cancel();
        return reply({ message: "Your enquiry is too long." }, 413);
      }
      chunks.push(value);
    }
    payload = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return reply({ message: "Please submit a valid enquiry." }, 400);
  }

  const honeypot = (payload as Record<string, unknown> | null)?.websiteConfirmation;
  if (honeypot !== undefined && honeypot !== "") return reply({ message: "Please submit the contact form." }, 400);
  const { data, errors } = validateEnquiry(payload);
  if (!data) return reply({ message: "Please check the highlighted fields.", errors }, 422);
  if (!allowAttempt(request)) return reply({ message: "You’ve sent several enquiries recently. Please try again in 15 minutes or email us directly." }, 429, { "Retry-After": "900" });

  try {
    await sendEnquiry(data);
    return reply({ message: "Your enquiry has been sent. We’ll reply to the email you provided." }, 200);
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : "MAIL_UNAVAILABLE";
    console.error("Contact delivery failed", /^[A-Z_]+$/.test(code) ? code : "MAIL_UNAVAILABLE");
    return reply({ message: "We couldn’t send your enquiry right now. Your details are still here. Please retry or email us directly." }, 503);
  }
}
