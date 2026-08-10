import type { LegalDocument } from "./legal";

/**
 * Section 4 (Cookies and storage) and section 5 (Third-party services) are
 * written from a live audit of the deployed site — actual cookies observed,
 * actual third-party hosts contacted, actual Resend payload from
 * api/contact.ts — not from a generic template. If the site's behaviour
 * changes, these two sections must be re-checked against reality.
 */
export const privacy: LegalDocument = {
  metaTitle: "Privacy Policy — Azeez Damilare Gbenga",
  metaDescription:
    "How I collect, use, and share personal information when you visit or interact with azeezdamilare.com, including the third-party services involved.",
  path: "/privacy",
  title: "Privacy Policy",
  lastUpdated: "Last updated: August 2026",
  tocLabel: "Contents",
  sections: [
    {
      id: "what-this-covers",
      title: "What this covers",
      body: [
        {
          kind: "paragraph",
          text: "This policy explains how I collect, use, and share personal information when you visit or interact with azeezdamilare.com. I am a sole practitioner, so \"I\" throughout means one person, not a company or a team.",
        },
        {
          kind: "paragraph",
          text: "It covers this website only. It does not extend to third-party sites linked from the portfolio — those have their own policies, and visiting them is outside my control.",
        },
      ],
    },
    {
      id: "information-i-collect",
      title: "Information I collect",
      body: [
        {
          kind: "labeled",
          items: [
            {
              label: "Contact form.",
              text: "Your name, your email address, and whatever you write in the message field. If you arrived through a pre-filled link — for example from a pricing card — the request type and the package name come through with it.",
            },
            {
              label: "Booking a call.",
              text: "Booking runs inside Calendly's own scheduling window, so whatever you enter there goes to Calendly rather than to this site. I receive the resulting booking details from them.",
            },
            {
              label: "Usage data.",
              text: "The hosting platform records standard server request data, including your IP address, as part of serving the site. Analytics records aggregate page views without cookies or persistent identifiers.",
            },
          ],
        },
        {
          kind: "paragraph",
          text: "I do not collect payment information through this website. There is no checkout, and no card details are ever entered here.",
        },
      ],
    },
    {
      id: "how-i-use-it",
      title: "How I use it",
      body: [
        {
          kind: "paragraph",
          text: "I use what you send to reply to your enquiry, to schedule and prepare for calls, and to understand which pages people find useful so I can improve them.",
        },
        {
          kind: "paragraph",
          text: "I do not sell, rent, or trade personal information.",
        },
      ],
    },
    {
      id: "cookies-and-storage",
      title: "Cookies and storage",
      body: [
        {
          kind: "paragraph",
          text: "This site sets no cookies of its own.",
        },
        {
          kind: "labeled",
          items: [
            {
              label: "Theme preference.",
              text: "If you switch between light and dark mode, that choice is saved in your browser's local storage under a single key named \"theme\". It stays on your device, is never sent to a server, and clearing your browser data removes it.",
            },
            {
              label: "Analytics.",
              text: "Plausible runs without cookies and without any persistent identifier, so it cannot follow you between sites or across visits.",
            },
            {
              label: "Calendly.",
              text: "If — and only if — you open the booking window, Calendly sets two cookies on its own domain, calendly.com: \"__cf_bm\" and \"_cfuvid\". Both come from its Cloudflare bot protection. They are not set on this site, and they do not appear unless you open the booking window.",
            },
          ],
        },
      ],
    },
    {
      id: "third-party-services",
      title: "Third-party services",
      body: [
        {
          kind: "paragraph",
          text: "Running this site depends on a small number of external services. Each one receives only what it needs to do its job:",
        },
        {
          kind: "services",
          items: [
            {
              name: "Vercel",
              text: "hosts the site and serves every page. As part of that it receives standard request data, including your IP address.",
              href: "https://vercel.com/legal/privacy-policy",
            },
            {
              name: "Resend",
              text: "delivers contact form submissions to my inbox, so it receives your name, email address, message, and the request type and package if those were included.",
              href: "https://resend.com/legal/privacy-policy",
            },
            {
              name: "Calendly",
              text: "handles call scheduling and receives whatever you enter in its booking window. Calendly also loads its own third parties inside that window, including Stripe, Google reCAPTCHA, and Google Sign-In.",
              href: "https://calendly.com/legal/privacy-notice",
            },
            {
              name: "Plausible",
              text: "provides privacy-focused analytics. It is cookieless, collects no personal data, and reports only aggregate figures such as page views and referrers.",
              href: "https://plausible.io/data-policy",
            },
          ],
        },
        {
          kind: "paragraph",
          text: "Each of these services has its own privacy policy governing what it does with the data it receives. The links above go to those policies.",
        },
      ],
    },
    {
      id: "data-retention",
      title: "Data retention",
      body: [
        {
          kind: "paragraph",
          text: "Contact form submissions arrive as email and stay in my inbox. I keep them for as long as they are useful — an ongoing conversation, a project record, a quote I may need to refer back to. I am not running a separate database of enquiries, so there is no retention schedule beyond that to describe honestly.",
        },
        {
          kind: "paragraph",
          text: "If you would like your enquiry deleted, email me and I will remove it.",
        },
      ],
    },
    {
      id: "data-security",
      title: "Data security",
      body: [
        {
          kind: "paragraph",
          text: "I take reasonable measures to protect the information you send, including serving the site over HTTPS and keeping credentials for the services above out of the codebase.",
        },
        {
          kind: "paragraph",
          text: "That said, no method of transmitting or storing information over the internet is completely secure, so I cannot guarantee absolute security.",
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      body: [
        {
          kind: "paragraph",
          text: "You can ask me for a copy of the personal information I hold about you, ask me to correct it, or ask me to delete it. Email me and I will action it.",
        },
        {
          kind: "paragraph",
          text: "I may ask you to verify your identity first, so that I am not handing someone's information to the wrong person.",
        },
      ],
    },
    {
      id: "childrens-information",
      title: "Children's information",
      body: [
        {
          kind: "paragraph",
          text: "This site is not intended for anyone under 13, and I do not knowingly collect information from children. If you believe a child has sent me information, email me and I will delete it.",
        },
      ],
    },
    {
      id: "changes-to-this-policy",
      title: "Changes to this policy",
      body: [
        {
          kind: "paragraph",
          text: "If this policy changes, the updated version will be posted on this page with a revised date at the top.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      body: [
        {
          kind: "paragraph",
          text: "Questions about this policy, or about anything above:",
        },
        {
          kind: "contacts",
          items: [
            {
              text: "azeezdamilare31@gmail.com",
              href: "mailto:azeezdamilare31@gmail.com",
            },
            { text: "The contact page", to: "/contact" },
          ],
        },
      ],
    },
  ],
};