import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// L49: the typography of artboard 02 on the whole site: a serif for headings, a sans for text, a mono for
// real data. S12 (T20) moves the sans to the self-hosted Albert Sans (tests/build/glass.test.ts pins its
// files and preload); the serif and the mono stay system faces. L111 narrows the serif to the hero's
// promise, the italic captions and the wordmark (tests/build/type-voices.test.ts); headings use the sans.

const dist = fileURLToPath(new URL("../../dist/", import.meta.url));
const page = (lang: string) => readFileSync(join(dist, lang, "index.html"), "utf8");

const files = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)],
  );

const shippedCss = (lang: string) => {
  const sheets = files(join(dist, "_astro"))
    .filter((file) => file.endsWith(".css"))
    .map((file) => readFileSync(file, "utf8"));
  const inline = [...page(lang).matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]!);
  return [...sheets, ...inline].join("\n");
};

const leafRules = (css: string) => [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({ selector: m[1]!.trim(), body: m[2]! }));
const rule = (css: string, selector: string) =>
  leafRules(css)
    .filter((r) => r.selector.split(",").some((s) => s.trim() === selector))
    .map((r) => r.body)
    .join(";");

describe.each(["es", "en"])("typography (%s)", (lang) => {
  it("declares the stacks: system serif, Albert Sans over the system sans, system mono", () => {
    const root = rule(shippedCss(lang), ":root");
    expect(root).toMatch(/--serif:\s*Georgia,/);
    expect(root).toMatch(/--sans:\s*"?Albert Sans"?,[^;]*system-ui,/);
    expect(root).toMatch(/--mono:\s*ui-monospace,/);
  });

  it("ships no Barlow and downloads only the sans: no serif or mono web font", () => {
    const html = page(lang);
    const css = shippedCss(lang);
    expect(`${html}\n${css}`).not.toMatch(/barlow/i);
    const families = [...css.matchAll(/@font-face\s*\{[^}]*font-family:\s*([^;}]+)/g)].map((m) => m[1]!.replace(/["']/g, "").trim());
    expect(new Set(families)).toEqual(new Set(["Albert Sans", "Albert Sans Fallback"]));
    expect([...html.matchAll(/<link\b[^>]*\bas=["']?font\b[^>]*>/g)].length).toBe(1);
  });

  // L75 (atlas): no tracked mono labels are left; the mono sets real data only, the feed's timestamps.
  it("maps the roles: serif display, sans headings and text, mono only for timestamps, no uppercase labels", () => {
    const css = shippedCss(lang);
    expect(rule(css, "body")).toMatch(/var\(--sans\)/);
    expect(rule(css, ".display")).toMatch(/var\(--serif\)/);
    expect(rule(css, ".head")).toMatch(/var\(--sans\)/);
    const mono = leafRules(css).filter((r) => r.selector !== ":root" && /var\(--mono\)/.test(r.body));
    expect(mono.length).toBeGreaterThan(0);
    expect(mono.filter((r) => !/\.feed__time\b/.test(r.selector)).map((r) => r.selector)).toEqual([]);
    expect(leafRules(css).filter((r) => /text-transform:\s*uppercase/.test(r.body)).map((r) => r.selector)).toEqual([]);
  });
});

describe("font files", () => {
  it("ships only the sans's woff2 files", () => {
    const fonts = files(dist).filter((file) => /\.(woff2?|ttf|otf)$/.test(file));
    expect(fonts.every((file) => /albert-sans-latin-\d+-normal\.[\w-]+\.woff2$/.test(file))).toBe(true);
  });
});
