import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// S12 (T19): "Hay que rehacer las imagenes porque quedaron con baja calidad/escala rara"; decision "Las 6
// (Recomendado)": every picture regenerated at a higher resolution, in the aspect its slot uses. Each slot
// offers a candidate at least twice its widest rendered size (measured at 1440, 768 and 390), and every
// shipped source carries its generation prompt.

const root = fileURLToPath(new URL("../../", import.meta.url));
const dist = join(root, "dist");
const read = (path: string) => readFileSync(join(dist, path), "utf8");
const langs = ["es", "en"] as const;
const casePages = { es: ["casos/automatizacion", "casos/club-de-padel"], en: ["cases/automation", "cases/padel-club"] };

// The widest candidate any <source>/<img> srcset of a picture offers, for the image whose file name
// starts with `name`.
function widest(html: string, name: string): number {
  const widths = [...html.matchAll(/\bsrcset="([^"]*)"/g)]
    .flatMap((m) => m[1]!.split(","))
    .filter((candidate) => candidate.includes(`/${name}.`))
    .map((candidate) => Number(candidate.trim().match(/\s(\d+)w$/)?.[1] ?? 0));
  return Math.max(0, ...widths);
}

// Widest rendered CSS width of each slot (Ego, 1440/768/390), from the T19 measurement.
const needs = [
  // The hero frame is 210cqh wide on tablets (1766 px at 768) and pushes in by 1.07.
  { name: "hero-fields", css: 1766 },
  { name: "footer-landscape", css: 1539 },
  { name: "before-desk", css: 505 },
  { name: "padel-court", css: 626 },
  { name: "business-owner", css: 672 },
  { name: "after-screen", css: 217 },
];

describe("T19: every picture has a 2x candidate", () => {
  it.each(langs)("/%s/: offers each home picture at twice its widest rendered size or more", (lang) => {
    const html = read(`${lang}/index.html`);
    for (const { name, css } of needs) {
      expect.soft(widest(html, name), name).toBeGreaterThanOrEqual(Math.min(2 * css, 4100));
    }
  });

  it.each(langs)("/%s/: offers the case pages' pictures and the phone screen at 2x", (lang) => {
    const [automation, padel] = casePages[lang].map((path) => read(`${lang}/${path}/index.html`));
    // The case top is 4:3 at 693 x 520; the phone screen 217 px wide.
    expect(widest(automation!, "before-desk")).toBeGreaterThanOrEqual(1386);
    expect(widest(automation!, "after-screen")).toBeGreaterThanOrEqual(434);
    expect(widest(padel!, "padel-court")).toBeGreaterThanOrEqual(1040);
  });
});

describe("T19: sources", () => {
  const images = join(root, "src/assets/images");
  const sources = ["hero-fields.png", "footer-landscape.png", "before-desk.jpg", "padel-court.jpg", "business-owner.jpg", "case/after-screen.png"];

  it.each(sources)("%s carries its T19 generation prompt", (file) => {
    const bytes = readFileSync(join(images, file)).toString("latin1");
    // A boolean, so a failure never prints the binary.
    expect(/impeccable:prompt\0ChatGPT image (generation|edit)[^\0]*T19/.test(bytes), file).toBe(true);
  });

  // The engravings keep their composition: the layered copies in Hero/Footer cut bands by percent, so the
  // frame's aspect ratio must be the picture's own.
  it("sizes the engraving frames from the new pictures", () => {
    expect(readFileSync(join(root, "src/components/Hero.astro"), "utf8")).toMatch(/aspect-ratio:\s*4100\s*\/\s*1758/);
    expect(readFileSync(join(root, "src/components/Footer.astro"), "utf8")).toMatch(/aspect-ratio:\s*4100\s*\/\s*1757/);
  });
});
