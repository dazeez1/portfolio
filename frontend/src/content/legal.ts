/**
 * Shared shapes for the legal pages (/privacy, /terms). LegalLayout renders
 * these blocks and knows nothing about which document it is showing.
 */

export type LegalBlock =
  /** Plain paragraph. */
  | { kind: "paragraph"; text: string }
  /** Bold lead-in label, then regular body text on the same line. */
  | { kind: "labeled"; items: { label: string; text: string }[] }
  /** Named third-party service with an outbound link to its own policy. */
  | {
      kind: "services";
      items: { name: string; text: string; href: string }[];
    }
  /** Contact lines; `href` for mailto/external, `to` for in-app routes. */
  | {
      kind: "contacts";
      items: { text: string; href?: string; to?: string }[];
    };

export interface LegalSection {
  id: string;
  title: string;
  body: LegalBlock[];
}

export interface LegalDocument {
  metaTitle: string;
  metaDescription: string;
  path: string;
  title: string;
  lastUpdated: string;
  tocLabel: string;
  sections: LegalSection[];
}