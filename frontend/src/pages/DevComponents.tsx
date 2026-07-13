import { Accordion } from "../components/Accordion";
import { BrowserFrame } from "../components/BrowserFrame";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";
import { Select, Textarea, TextInput } from "../components/FormFields";
import { MetricCard } from "../components/MetricCard";
import { Nav } from "../components/Nav";
import { SectionHeading } from "../components/SectionHeading";
import { TagPill } from "../components/TagPill";
import { TimelineItem } from "../components/TimelineItem";

const faqItems = [
  {
    question: "How long does a typical project take?",
    answer: "Depends on scope — timelines are agreed up front per project.",
  },
  {
    question: "Do you work with a fixed price or hourly?",
    answer:
      "Fixed price by default, scoped up front. Hourly only for ongoing/retainer work.",
  },
];

const buttonVariants = ["primary", "accent", "secondary"] as const;

// Not a real screenshot — a plain labeled block standing in for the image
// slot in this dev-only gallery. CLAUDE.md Section 3 requires real product
// screenshots everywhere on the actual site; this demo intentionally avoids
// anything that could be mistaken for one.
function DemoImageSlot() {
  return (
    <div className="flex h-40 items-center justify-center bg-tint text-center font-sans text-xs text-accent-text">
      Example image slot
      <br />
      (placeholder for demo only — not a real screenshot)
    </div>
  );
}

function ThemePanel({ theme }: { theme: "light" | "dark" }) {
  return (
    <div
      data-theme={theme}
      className="flex-1 overflow-hidden rounded-lg border border-border bg-bg text-ink"
    >
      <div className="p-8 pb-0">
        <h2 className="mb-6 font-serif text-2xl capitalize">{theme} mode</h2>
      </div>

      <section className="mb-10">
        <SectionHeading
          title="Nav"
          variant="label"
          as="h3"
          className="px-8 pb-3"
        />
        <Nav sticky={false} />
      </section>

      <div className="px-8">
        <section className="mb-10">
          <SectionHeading title="Button" variant="label" as="h3" />
          <div className="mt-3 flex flex-wrap items-center gap-4">
            {buttonVariants.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant}
              </Button>
            ))}
            {buttonVariants.map((variant) => (
              <Button key={`${variant}-disabled`} variant={variant} disabled>
                {variant} disabled
              </Button>
            ))}
          </div>
          <p className="mt-3 text-xs text-text-muted">
            Hover or Tab to a button to preview its hover and focus-ring
            states.
          </p>
        </section>

        <section className="mb-10">
          <SectionHeading title="Card" variant="label" as="h3" />
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card>
              <p className="font-serif text-lg">Base card</p>
              <p className="mt-2 text-sm text-text-secondary">
                Surface background, 1px border, consistent radius.
              </p>
            </Card>
            <Card hoverLift>
              <p className="font-serif text-lg">Hover-lift card</p>
              <p className="mt-2 text-sm text-text-secondary">
                Hover to see the lift and shadow.
              </p>
            </Card>
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading title="SectionHeading" variant="label" as="h3" />
          <div className="mt-3 flex flex-col gap-6">
            <SectionHeading
              title="Selected work"
              action={
                <a href="#" className="text-sm text-accent-text underline">
                  View all →
                </a>
              }
            />
            <SectionHeading title="Tools I work with" variant="label" />
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading title="TagPill" variant="label" as="h3" />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <TagPill>React</TagPill>
            <TagPill>TypeScript</TagPill>
            <TagPill>Node.js</TagPill>
            <TagPill variant="tinted">● Available for work</TagPill>
            <TagPill variant="tinted">Selected</TagPill>
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading title="BrowserFrame" variant="label" as="h3" />
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs text-text-muted">URL + image</p>
              <BrowserFrame url="sangira.vercel.app">
                <DemoImageSlot />
              </BrowserFrame>
            </div>
            <div>
              <p className="mb-2 text-xs text-text-muted">
                URL, no image (placeholder)
              </p>
              <BrowserFrame url="qure.app" />
            </div>
            <div>
              <p className="mb-2 text-xs text-text-muted">Image, no URL</p>
              <BrowserFrame>
                <DemoImageSlot />
              </BrowserFrame>
            </div>
            <div>
              <p className="mb-2 text-xs text-text-muted">
                No URL, no image (placeholder)
              </p>
              <BrowserFrame />
            </div>
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading title="Accordion" variant="label" as="h3" />
          <div className="mt-3">
            <Accordion items={faqItems} defaultOpenIndex={0} />
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading title="MetricCard" variant="label" as="h3" />
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <MetricCard value="3" label="Portals" />
            <MetricCard value="95/100/96" label="Lighthouse" />
            <MetricCard value="−82%" label="Bundle size" />
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading title="TimelineItem" variant="label" as="h3" />
          <div className="mt-3">
            <TimelineItem
              isFirst
              title="Graduation — 2026"
              context="B.Sc. Software Engineering, African Leadership University"
            />
            <TimelineItem
              title="Vephla"
              context="Full-stack development training"
            />
            <TimelineItem
              isLast
              title="SideHustle — 2021"
              context="Graphics design internship"
            />
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading title="Form fields" variant="label" as="h3" />
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextInput label="Name" placeholder="Ada Lovelace" />
            <TextInput
              label="Email"
              type="email"
              defaultValue="not-an-email"
              error="Enter a valid email address."
            />
            <Select label="What do you need?" defaultValue="">
              <option value="" disabled>
                Select one
              </option>
              <option value="new-project">New project</option>
              <option value="existing-product">Existing product help</option>
            </Select>
            <TextInput label="Budget range" optional placeholder="$2,000–$4,000" />
            <Textarea
              label="Message"
              placeholder="Tell me about what you're building."
              className="sm:col-span-2"
            />
          </div>
        </section>
      </div>

      <section>
        <SectionHeading
          title="Footer"
          variant="label"
          as="h3"
          className="px-8 pb-3"
        />
        <Footer />
      </section>
    </div>
  );
}

export default function DevComponents() {
  return (
    <div className="min-h-screen bg-surface-alt">
      {/* Live instance — real sticky behavior, real theme toggle, doubles as navigation testing. */}
      <Nav />

      <div className="p-8">
        <h1 className="mb-8 font-serif text-3xl">Component gallery</h1>
        <div className="flex flex-col gap-8 lg:flex-row">
          <ThemePanel theme="light" />
          <ThemePanel theme="dark" />
        </div>
      </div>

      {/* Live instance at page bottom, mirroring real placement. */}
      <Footer />
    </div>
  );
}
