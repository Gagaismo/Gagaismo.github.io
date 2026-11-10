import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// L111: the serif read heavy and "old". Two voices now: the atlas serif only for the hero's promise, the
// italic captions and the wordmark; Albert Sans (the two weights already shipped) for every heading,
// title, footer line and contact row. No new font files.

const dist = fileURLToPath(new URL("../../dist/", import.meta.url));
const read = (path: string) => readFileSync(join(dist, path, "index.html"), "utf8");
const pages = ["es", "en", "es/casos/automatizacion", "en/cases/automation", "es/casos/club-de-padel", "en/cases/padel-club"];

const files = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => (entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)]));

const css = [
  ...files(join(dist, "_astro"))
    .filter((file) => file.endsWith(".css"))
    .map((file) => readFileSync(file, "utf8")),
  ...pages.flatMap((path) => [...read(path).matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]!)),
].join("\n");

const unscoped = (s: string) => s.replace(/\[data-astro-cid-[\w-]+\]/g, "").trim();
// Innermost rules (at-rules around them ignored; keyframes skipped).
const rules: { selector: string; body: string }[] = [];
{
  const stack: string[] = [];
  let start = 0;
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (c === "{") {
      stack.push(css.slice(start, i).trim());
      start = i + 1;
    } else if (c === "}") {
      const prelude = stack.pop() ?? "";
      const body = css.slice(start, i);
      if (!body.includes("{") && !stack.some((p) => p.startsWith("@keyframes")) && !prelude.startsWith("@")) {
        rules.push({ selector: unscoped(prelude), body });
      }
      start = i + 1;
    } else if (c === ";" && css.slice(start, i).trim().startsWith("@") && !css.slice(start, i).includes("{")) {
      start = i + 1;
    }
  }
}
const selectors = (r: { selector: string }) => r.selector.split(",").map((s) => s.trim());
const body = (selector: string) =>
  rules
    .filter((r) => selectors(r).includes(selector))
    .map((r) => r.body)
    .join(";");
const prop = (block: string, name: string) => [...block.matchAll(new RegExp(`(?:^|;)\\s*${name}:\\s*([^;]+)`, "g"))].pop()?.[1]?.trim();

describe("the serif keeps three jobs", () => {
  it("sets the hero's promise, the captions and the wordmark in the serif", () => {
    for (const selector of [".display", ".caption", ".wordmark", ".foot__logo"]) expect(body(selector), selector).toMatch(/var\(--serif\)/);
    for (const lang of ["es", "en"]) expect(read(lang)).toMatch(/<h1 class="hero__statement display"/);
  });

  it("uses the serif nowhere else but in italic captions", () => {
    const allowed = new Set([".display", ".wordmark", ".foot__logo"]);
    const stray = rules
      .filter((r) => /var\(--serif\)/.test(r.body) && !/italic/.test(r.body))
      .filter((r) => !selectors(r).every((s) => allowed.has(s)))
      .map((r) => r.selector);
    expect(stray).toEqual([]);
  });

  it.each(pages)("/%s/: draws no plan label in Georgia", (path) => {
    expect(read(path)).not.toMatch(/font-family="[^"]*Georgia/);
  });
});

describe("the sans takes the headings and titles", () => {
  it("sets the section headings and the chapters in the sans, tracked in", () => {
    const head = body(".head");
    expect(head).toMatch(/var\(--sans\)/);
    expect(head).not.toMatch(/var\(--serif\)/);
    expect(prop(head, "font-weight")).toBe("400");
    expect(Number(prop(head, "letter-spacing")?.replace("em", ""))).toBeLessThanOrEqual(-0.02);
    expect(prop(head, "line-height")).toBe("1.1");
    const sub = body(".subhead");
    expect(sub).toMatch(/var\(--sans\)/);
    expect(prop(sub, "font-weight")).toBe("600");
  });

  it("sets the case pages' h1 in the sans", () => {
    expect(body(".top__title")).toMatch(/var\(--sans\)/);
    for (const path of pages.slice(2)) expect(read(path)).toMatch(/<h1\b[^>]*class="[^"]*\btop__title\b/);
  });

  it.each([
    ".specimen",
    ".row a",
    ".entry__title",
    ".stage__line",
    ".art__title",
    ".adr__title",
    ".plan__title",
    ".plot__name",
    ".facts__title",
    ".register__when",
    ".sheet__title",
    ".record__decision",
    ".gloss dt",
    ".day__n",
    ".foot__title",
    ".foot__col a",
    ".foot__bar",
    ".wf__open",
    ".wf__svg text",
  ])("sets %s in the sans", (selector) => {
    const rule = body(selector);
    expect(rule).toMatch(/var\(--sans\)/);
    expect(rule).not.toMatch(/var\(--serif\)/);
  });

  it("sets the titles at or under the sub size in the bolder weight", () => {
    for (const selector of [".entry__title", ".stage__line", ".art__title", ".plot__name", ".sheet__title", ".foot__title"]) {
      expect(body(selector), selector).toMatch(/\b600\b/);
    }
  });
});

describe("no new bytes", () => {
  it("ships exactly the two Albert Sans woff2 files", () => {
    const fonts = files(dist).filter((file) => /\.(woff2?|ttf|otf|eot)$/.test(file));
    expect(fonts).toHaveLength(2);
    for (const font of fonts) expect(font).toMatch(/albert-sans-latin-(400|600)-normal\.[\w-]+\.woff2$/);
  });
});
