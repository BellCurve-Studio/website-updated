import "server-only";
import nodemailer from "nodemailer";
import type { ContactEnquiry } from "./contact";

function requiredSetting(name: string) {
  const value = process.env[name]?.trim();
  if (!value || /[\r\n]/.test(value)) throw new Error("Mail configuration unavailable");
  return value;
}

export function createMailTransport() {
  const host = requiredSetting("SMTP_HOST");
  const port = Number(requiredSetting("SMTP_PORT"));
  if (![465, 587].includes(port)) throw new Error("Mail configuration unavailable");
  const password = requiredSetting("SMTP_PASSWORD");
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: true,
    auth: { user: requiredSetting("SMTP_USERNAME"), pass: host === "smtp.gmail.com" ? password.replace(/\s/g, "") : password },
    tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
    dnsTimeout: 10000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
}

export function createEnquiryMessage(enquiry: ContactEnquiry) {
  const rows = [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Organization", enquiry.organization || "Not provided"],
    ["Website", enquiry.website || "Not provided"],
    ["Phone", enquiry.phone || "Not provided"],
    ["Starting point", enquiry.engagement],
    ["Area of help", enquiry.service],
    ["Budget", enquiry.budget],
    ["Timeline", enquiry.timeline],
    ["What is happening", enquiry.message],
    ["Permission to reply", "Yes"],
  ];
  const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SENDER_EMAIL;
  if (!fromEmail || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fromEmail)) throw new Error("Mail configuration unavailable");
  const to = requiredSetting("NOTIFICATION_EMAIL");
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(to)) throw new Error("Mail configuration unavailable");
  return {
    from: process.env.SMTP_FROM?.trim() || { name: process.env.SMTP_FROM_NAME || "BellCurve Studio", address: fromEmail },
    to,
    replyTo: { name: enquiry.name, address: enquiry.email },
    subject: `Website enquiry: ${enquiry.engagement}`,
    text: `New BellCurve Studio enquiry\n\n${rows.map(([label, value]) => `${label}: ${value}`).join("\n\n")}`,
    html: `<div style="font-family:Arial,sans-serif;color:#141414;max-width:640px"><h1 style="font-size:24px">New BellCurve Studio enquiry</h1>${rows.map(([label, value]) => `<div style="padding:14px 0;border-bottom:1px solid #ddd"><strong>${escapeHtml(label)}</strong><p style="white-space:pre-wrap;line-height:1.6;margin:6px 0">${escapeHtml(value)}</p></div>`).join("")}</div>`,
  };
}

export async function sendEnquiry(enquiry: ContactEnquiry) {
  const message = createEnquiryMessage(enquiry);
  const transport = createMailTransport();
  try {
    const result = await transport.sendMail(message);
    if (!result.accepted.length) throw new Error("Mail was not accepted");
  } finally {
    transport.close();
  }
}
