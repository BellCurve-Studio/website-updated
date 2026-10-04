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
    pool: true,
    maxConnections: 1,
    maxMessages: 2,
    maxRequeues: 0,
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

function mailSender() {
  const address = process.env.SMTP_FROM_EMAIL?.trim() || process.env.SENDER_EMAIL?.trim();
  if (!address || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(address)) throw new Error("Mail configuration unavailable");
  return {
    address,
    from: process.env.SMTP_FROM ? requiredSetting("SMTP_FROM") : { name: process.env.SMTP_FROM_NAME || "BellCurve Studio", address },
  };
}

export function createEnquiryMessage(enquiry: ContactEnquiry) {
  const rows = [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Contact number", enquiry.phone],
    ["Area of help", enquiry.service],
    ["What is happening", enquiry.message],
    ["Permission to reply", "Yes"],
  ];
  const sender = mailSender();
  const to = requiredSetting("NOTIFICATION_EMAIL");
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(to)) throw new Error("Mail configuration unavailable");
  return {
    from: sender.from,
    to,
    replyTo: { name: enquiry.name, address: enquiry.email },
    subject: `Website enquiry: ${enquiry.service}`,
    text: `New BellCurve Studio enquiry\n\n${rows.map(([label, value]) => `${label}: ${value}`).join("\n\n")}`,
    html: `<div style="font-family:Arial,sans-serif;color:#141414;max-width:640px"><h1 style="font-size:24px">New BellCurve Studio enquiry</h1>${rows.map(([label, value]) => `<div style="padding:14px 0;border-bottom:1px solid #ddd"><strong>${escapeHtml(label)}</strong><p style="white-space:pre-wrap;line-height:1.6;margin:6px 0">${escapeHtml(value)}</p></div>`).join("")}</div>`,
  };
}

export function createConfirmationMessage(enquiry: ContactEnquiry) {
  const sender = mailSender();
  const address = escapeHtml(sender.address);
  return {
    from: sender.from,
    to: { name: enquiry.name, address: enquiry.email },
    replyTo: { name: "BellCurve Studio", address: sender.address },
    subject: "We’ve received your enquiry — BellCurve Studio",
    headers: { "Auto-Submitted": "auto-replied", "X-Auto-Response-Suppress": "All" },
    text: `BellCurve Studio\n\nWe’ve received your enquiry.\n\nHi ${enquiry.name},\n\nThanks for reaching out. Our team will review what you’ve shared and get in touch with you.\n\nIf you’d like to add anything, just reply to this email.\n\nSpeak soon,\nThe BellCurve Studio team\n${sender.address}\nhttps://www.bellcurvestudio.com/`,
    html: `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>We’ve received your enquiry</title></head>
<body style="margin:0;padding:0;background-color:#ddddd8;font-family:Arial,Helvetica,sans-serif;color:#141414;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">Thanks for reaching out. The BellCurve Studio team will be in touch.</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#ddddd8;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background-color:#f0f0eb;border:1px solid #c7c7c0;border-top:6px solid #141414;border-radius:3px;">
        <tr><td style="padding:36px 32px 0;">
          <p style="margin:0;font-size:25px;line-height:28px;font-weight:800;letter-spacing:-1px;">BellCurve</p>
          <p style="margin:5px 0 0;font-size:9px;line-height:14px;font-weight:700;letter-spacing:3px;">STUDIO</p>
        </td></tr>
        <tr><td style="padding:40px 32px 32px;">
          <p style="margin:0 0 18px;font-size:10px;line-height:16px;letter-spacing:2px;color:#65655f;">ENQUIRY RECEIVED</p>
          <h1 style="margin:0 0 28px;font-size:32px;line-height:36px;font-weight:700;letter-spacing:-1.2px;">You’ve taken<br>the first step.</h1>
          <p style="margin:0 0 16px;font-size:15px;line-height:24px;">Hi ${escapeHtml(enquiry.name)},</p>
          <p style="margin:0 0 18px;font-size:15px;line-height:24px;color:#54544e;">Thanks for reaching out. We’ve received your enquiry, and our team will review what you’ve shared and get in touch with you.</p>
          <p style="margin:0;font-size:15px;line-height:24px;color:#54544e;">If you’d like to add anything, just reply to this email.</p>
          <p style="margin:28px 0 0;font-size:14px;line-height:22px;">Speak soon,<br><strong>The BellCurve Studio team</strong></p>
        </td></tr>
        <tr><td style="padding:24px 32px;border-top:1px solid #d0d0c9;">
          <p style="margin:0 0 10px;font-size:12px;line-height:20px;color:#65655f;">Start with the problem. We’ll take it from there.</p>
          <p style="margin:0;font-size:12px;line-height:20px;"><a href="mailto:${address}" style="color:#141414;text-decoration:underline;word-break:break-word;">${address}</a><br><a href="https://www.bellcurvestudio.com/" style="color:#65655f;text-decoration:none;">bellcurvestudio.com ↗</a></p>
        </td></tr>
      </table>
      <p style="margin:20px 0 0;font-size:10px;line-height:16px;color:#65655f;">Sent in response to your enquiry to BellCurve Studio.</p>
    </td></tr>
  </table>
</body>
</html>`,
  };
}

export async function sendEnquiry(enquiry: ContactEnquiry) {
  const message = createEnquiryMessage(enquiry);
  const confirmation = createConfirmationMessage(enquiry);
  const transport = createMailTransport();
  try {
    const result = await transport.sendMail(message);
    if (!result.accepted.length) throw new Error("Mail was not accepted");
    try {
      const receipt = await transport.sendMail(confirmation);
      return { confirmationSent: receipt.accepted.length > 0 };
    } catch {
      return { confirmationSent: false };
    }
  } finally {
    transport.close();
  }
}
