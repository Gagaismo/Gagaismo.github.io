import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// T18, S11 (L93): the taste re-run flagged "Ver el caso completo" as an eyebrow, because at 768px and
// below the link was the last line of the intro, right above the "Antes" heading. The link stays on
// the home, but no heading of the before/after pair may come right after it.

const dist = fileURLToPath(new URL("../../dist/", import.meta.url));
const read = (path: string) => readFileSync(join(dist, path, "index.html"), "utf8");
const pairs = [
  { lang: "es", label: "Ver el caso completo", headings: ["Antes", "Después"] },
  { lang: "en", label: "See the full case", headings: ["Before", "After"] },
] as const;

/** The last visible text before `index` in the markup (tags, styles and scripts dropped). */
const textBefore = (html: string, index: number) => {
  const visible = html
    .slice(0, index)
    .replace(/<(style|script)\b[\s\S]*?<\/\1>/g, " ")
    .replace(/<[^>]+>/g, "\n")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  return visible[visible.length - 1] ?? "";
};

describe.each(pairs)("home /$lang/ before/after headings", ({ lang, label, headings }) => {
  it.each(headings)("does not put the case link right above %s", (title) => {
    const html = read(lang);
    const at = html.search(new RegExp(`<h3\\b[^>]*>\\s*${title}\\s*</h3>`));
    expect(at, `${title} heading`).toBeGreaterThan(-1);
    expect(textBefore(html, at)).not.toBe(label);
  });

  it("still links to the automation case from the comparison", () => {
    const html = read(lang);
    const section = html.slice(html.indexOf('id="automation"'), html.indexOf('aria-labelledby="flow-title"'));
    expect(section).toMatch(new RegExp(`<a\\b[^>]*href="/${lang}/[^"]+/"[^>]*>\\s*${label}`));
  });
});
