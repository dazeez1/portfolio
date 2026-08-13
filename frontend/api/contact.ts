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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resolveFromAddress(),
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
      }),
    });

    if (!resendRes.ok) {
      console.error(
        "contact api: Resend error",
        resendRes.status,
        await resendRes.text(),
      );
      res.status(500).json(GENERIC_FAILURE);
      return;
    }

    res.status(200).json({ ok: true, reference });
  } catch (err) {
    console.error("contact api: unhandled error", err);
    res.status(500).json(GENERIC_FAILURE);
  }
}
