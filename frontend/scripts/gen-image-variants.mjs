/**
 * Generates the narrow `srcset` variants for the large screenshots.
 *
 * Run on demand, NOT during the build:
 *
 *     npm run images
 *
 * The variants are committed to public/images alongside their source, which is
 * why `sharp` is a devDependency rather than part of the build. Vercel's build
 * stays free of a native binary it would otherwise have to compile or download
 * on every deploy, and the images only change when the owner replaces a
 * screenshot — a handful of times a year, not once per commit. CLAUDE.md
 * Section 3 already describes screenshots as pre-optimized assets; this keeps
 * them exactly that.
 *
 * Adding a screenshot that needs variants: add its filename to SOURCES, run the
 * script, commit the output, then point the content file's `srcSet` at them.
 */
import { readFile, writeFile } from "node:fs/promises";
import { join, dirname, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const IMAGES_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

/** Sources to downscale. Each is the full-size original, left untouched. */
const SOURCES = ["sangira-card.webp", "qure-patient-portal.webp"];

/**
 * Target widths. 1400 is the source and is not regenerated.
 *
 * 700 is the one that matters: at Lighthouse's mobile emulation (412 CSS px
 * wide, DPR 1.75) the card renders about 364 CSS px, so the browser needs
 * ~640 device px and picks this. 400 covers 1x phones, 1050 covers tablets and
 * 2x half-width desktop columns.
 */
const WIDTHS = [400, 700, 1050];

/** Matches the quality the source files were encoded at closely enough. */
const QUALITY = 80;

let totalSaved = 0;
for (const file of SOURCES) {
  const src = join(IMAGES_DIR, file);
  const input = await readFile(src);
  const meta = await sharp(input).metadata();
  console.log(`${file} — source ${meta.width}x${meta.height}, ${(input.length / 1024).toFixed(1)} KiB`);

  for (const width of WIDTHS) {
    if (width >= meta.width) {
      console.log(`  ${width}w: skipped, source is only ${meta.width}px wide`);
      continue;
    }
    const out = join(IMAGES_DIR, `${basename(file, extname(file))}-${width}${extname(file)}`);
    const buf = await sharp(input).resize({ width }).webp({ quality: QUALITY }).toBuffer();
    await writeFile(out, buf);
    const saved = input.length - buf.length;
    totalSaved += saved;
    console.log(
      `  ${width}w: ${(buf.length / 1024).toFixed(1)} KiB (${((1 - buf.length / input.length) * 100).toFixed(0)}% smaller than source)`,
    );
  }
}
console.log(`\nDone. Largest single-request saving vs always serving the source: ${(totalSaved / 1024).toFixed(1)} KiB across all variants.`);