// Vercel Node.js serverless function. Minimal local types instead of
// @vercel/node — that package pulled in 100+ transitive dependencies
// (several with known vulnerabilities) just for these two type names,
// which conflicts with "keep dependencies minimal" (CLAUDE.md Section 5).
// Vercel's runtime provides req.body (pre-parsed for JSON) and the
// res.status()/res.json() helpers on top of the standard Node
// http.IncomingMessage / http.ServerResponse.
interface VercelRequest {
  method?: string;
  body: unknown;
}

interface VercelResponse {
  status(code: number): VercelResponse;
  json(body: unknown): void;
}

interface ContactPayload {
  name?: string;
  email?: string;
  need?: string;
  message?: string;
  package?: string;
  type?: string;
  // Honeypot — real users never fill this in.
  company?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// One error shape for every failure that isn't "your input is invalid"
// (400) or "wrong HTTP method" (405) — the client shows the same fixed
// message regardless of which of these fires, so the contract stays
// simple on both ends.
const GENERIC_FAILURE = { error: "message_failed" };

// Resend's shared sandbox sender. Only a fallback now — the real sender comes
// from CONTACT_FROM_EMAIL. Kept because a missing env var must degrade the
// sender, never break the form: a silent contact-form failure is the worst
// outcome on this site, so we would rather deliver from the sandbox address
// and shout in the logs than 500 on the visitor.
const SANDBOX_FROM = "Portfolio Contact <onboarding@resend.dev>";

/**
 * Sender address, read per-request so it picks up an env change on the next
 * invocation rather than at cold start only.
 *
 * Set CONTACT_FROM_EMAIL in Vercel for BOTH Production and Preview, then
 * redeploy — Vercel bakes env vars in at build time, so an existing build keeps
 * the old value. The domain in it must be verified in Resend or Resend rejects
 * the send with a 422.
 */
function resolveFromAddress(): string {
  const configured = process.env.CONTACT_FROM_EMAIL?.trim();
  if (configured) return configured;

  console.warn(
    "contact api: missing env var CONTACT_FROM_EMAIL — falling back to the " +
      "Resend sandbox sender (onboarding@resend.dev). Set CONTACT_FROM_EMAIL " +
      "in Vercel for Production and Preview, then redeploy.",
  );
  return SANDBOX_FROM;
}

const OWNER_NAME = "Azeez Damilare Gbenga";
const SITE_DOMAIN = "azeezdamilare.com";

/**
 * Inline styles only, and literal hex values rather than the site's CSS
 * variables or web fonts — email clients strip <style> blocks, do not support
 * custom properties, and will not load @font-face. The nested fixed-width
 * table is the wrapper that survives Outlook's Word rendering engine, which
 * ignores max-width on a div.
 */
const EMAIL_FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

interface SendResult {
  ok: boolean;
  status: number;
  body: string;
}

/** One place that talks to Resend, so both emails share the same call shape. */
async function sendEmail(
  apiKey: string,
  payload: Record<string, unknown>,
): Promise<SendResult> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return {
    ok: res.ok,
    status: res.status,
    body: res.ok ? "" : await res.text(),
  };
}

interface Acknowledgement {
  subject: string;
  text: string;
  html: string;
}

/**
 * The receipt sent to the person who filled in the form. Deliberately a plain
 * transactional confirmation: no Calendly link, no pricing, no case studies, no
 * social links, no marketing. Someone who used the form chose not to book a
 * call, and this email should not push them to.
 *
 * A plain-text alternative ships alongside the HTML — text-only clients need
 * it, and spam filters score multipart/alternative better than HTML alone.
 */
function buildAcknowledgement(fields: {
  name: string;
  type: string;
  pkg?: string;
  message: string;
  reference: string;
}): Acknowledgement {
  const { name, type, pkg, message, reference } = fields;

  const text = [
    `Hi ${name},`,
    ``,
    `Thanks for getting in touch. I've received your message and I'll reply within 24 hours.`,
    ``,
    `Reference: ${reference}`,
    ``,
    `What you sent`,
    `Request: ${type}`,
    ...(pkg ? [`Package: ${pkg}`] : []),
    ``,
    message,
    ``,
    `If you need to add anything, just reply to this email.`,
    ``,
    `— ${OWNER_NAME}`,
    SITE_DOMAIN,
  ].join("\n");

  const label = `font-family:${EMAIL_FONT};font-size:12px;line-height:1.5;color:#706a61;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;`;
  const body = `font-family:${EMAIL_FONT};font-size:16px;line-height:1.6;color:#5c554a;margin:0 0 16px;`;

  const html = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;">
  <tr>
    <td align="center" style="padding:24px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;text-align:left;">
        <tr>
          <td>
            <p style="font-family:${EMAIL_FONT};font-size:16px;line-height:1.6;color:#211d18;margin:0 0 16px;">Hi ${escapeHtml(name)},</p>
            <p style="${body}">Thanks for getting in touch. I've received your message and I'll reply within 24 hours.</p>
            <p style="${body}"><span style="color:#706a61;">Reference:</span> <strong style="color:#211d18;">${escapeHtml(reference)}</strong></p>
            <hr style="border:0;border-top:1px solid #eae4da;margin:24px 0;">
            <p style="${label}">What you sent</p>
            <p style="${body}"><span style="color:#706a61;">Request:</span> ${escapeHtml(type)}</p>
            ${pkg ? `<p style="${body}"><span style="color:#706a61;">Package:</span> ${escapeHtml(pkg)}</p>` : ""}
            <p style="${body}">${escapeHtml(message).replace(/\n/g, "<br>")}</p>
            <hr style="border:0;border-top:1px solid #eae4da;margin:24px 0;">
            <p style="${body}">If you need to add anything, just reply to this email.</p>
            <p style="font-family:${EMAIL_FONT};font-size:16px;line-height:1.6;color:#211d18;margin:24px 0 0;">— ${OWNER_NAME}<br><span style="color:#706a61;">${SITE_DOMAIN}</span></p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;

  return {
    subject: `Your message to ${OWNER_NAME} — ${reference}`,
    text,
    html,
  };
}

function validate(body: ContactPayload): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!body.name?.trim()) errors.name = "Name is required.";
  if (!body.email?.trim() || !EMAIL_RE.test(body.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!body.need?.trim()) errors.need = "Let me know what you need.";
  if (!body.message?.trim()) errors.message = "Message is required.";
  return errors;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Whole handler is wrapped — any unexpected exception (a bad req.body
  // shape, a Resend response that doesn't parse, anything) is caught
  // here and turned into a controlled 500 instead of an uncaught crash,
  // which is what Vercel reports upstream as a 502.
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed." });
      return;
    }

    const body = (req.body ?? {}) as ContactPayload;

    // Honeypot: silently accept-and-drop, don't tip off the bot.
    if (body.company) {
      res.status(200).json({ ok: true, reference: "INQ-0" });
      return;
    }

    const errors = validate(body);
    if (Object.keys(errors).length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!apiKey) {
      console.error("contact api: missing env var RESEND_API_KEY");
      res.status(500).json(GENERIC_FAILURE);
      return;
    }
    if (!toEmail) {
      console.error("contact api: missing env var CONTACT_TO_EMAIL");
      res.status(500).json(GENERIC_FAILURE);
      return;
    }

    const name = body.name!.trim();
    const email = body.email!.trim();
    const need = body.need!.trim();
    const message = body.message!.trim();
    const pkg = body.package?.trim();
    const type = body.type?.trim() || need;

    const reference = `INQ-${Date.now().toString(36).toUpperCase()}`;
    // The package segment is dropped entirely when there isn't one, rather
    // than printing a placeholder — "[Portfolio] Hiring or recruiting — none —
    // Damilare Azeez" reads like a bug in the inbox.
    const subject = pkg
      ? `[Portfolio] ${type} — ${pkg} — ${name}`
      : `[Portfolio] ${type} — ${name}`;

    const fromAddress = resolveFromAddress();

    // ---- 1. Owner notification. The critical path: if this fails, the
    // submission failed, and the visitor is told so. Unchanged behaviour.
    const ownerRes = await sendEmail(apiKey, {
      from: fromAddress,
      to: [toEmail],
      // Replies go to the person who filled in the form, not the sender
      // domain — so hitting Reply in the inbox answers them directly.
      reply_to: email,
      subject,
      html: `
          <p><strong>Reference:</strong> ${escapeHtml(reference)}</p>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Need:</strong> ${escapeHtml(need)}</p>
          <p><strong>Package:</strong> ${escapeHtml(pkg ?? "—")}</p>
          <p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        `,
    });

    if (!ownerRes.ok) {
      console.error("contact api: Resend error", ownerRes.status, ownerRes.body);
      res.status(500).json(GENERIC_FAILURE);
      return;
    }

    // ---- 2. Acknowledgement to the submitter. Explicitly NOT the critical
    // path. The lead is already captured by the email above, so nothing that
    // happens here may turn a successful submission into an error for the
    // visitor — a lost lead is the worst outcome on this site. Every failure
    // mode (non-2xx, network error, malformed response) is swallowed after
    // being logged under a named prefix.
    try {
      const ack = buildAcknowledgement({
        name,
        type,
        pkg,
        message,
        reference,
      });
      const ackRes = await sendEmail(apiKey, {
        from: fromAddress,
        to: [email],
        // Reply-to is the owner's inbox — the same address the notification
        // goes to — so a reply to this receipt reaches him directly rather
        // than bouncing off the sending domain.
        reply_to: toEmail,
        subject: ack.subject,
        html: ack.html,
        text: ack.text,
      });
      if (!ackRes.ok) {
        console.error(
          `contact api: acknowledgement send failed — ${ackRes.status}`,
          ackRes.body,
        );
      }
    } catch (ackErr) {
      console.error(
        "contact api: acknowledgement send failed — threw",
        ackErr,
      );
    }

    res.status(200).json({ ok: true, reference });
  } catch (err) {
    console.error("contact api: unhandled error", err);
    res.status(500).json(GENERIC_FAILURE);
  }
}
