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
  // shape, a Brevo response that doesn't parse, anything) is caught
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

    const apiKey = process.env.BREVO_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!apiKey) {
      console.error("contact api: missing env var BREVO_API_KEY");
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
    const subject = `[Portfolio] ${type} — ${pkg ?? "none"} — ${name}`;

    const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Portfolio contact form", email: toEmail },
        to: [{ email: toEmail }],
        replyTo: { email, name },
        subject,
        htmlContent: `
          <p><strong>Reference:</strong> ${escapeHtml(reference)}</p>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Need:</strong> ${escapeHtml(need)}</p>
          <p><strong>Package:</strong> ${escapeHtml(pkg ?? "—")}</p>
          <p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    if (!brevoRes.ok) {
      console.error(
        "contact api: Brevo error",
        brevoRes.status,
        await brevoRes.text(),
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
