import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// Idea 6: one protagonist animation (the message along the automation flow), everything else quieter.

const dist = fileURLToPath(new URL("../../dist/", import.meta.url));
const page = (lang: string) => readFileSync(join(dist, lang, "index.html"), "utf8");
const langs = ["es", "en"] as const;

const REVEAL_BUDGET = 12;
const REVEALS_PER_SECTION = 2;

const revealTags = (html: string) => html.match(/<[a-z][a-z0-9]*\b[^>]*\sdata-reveal(?=[\s>=])[^>]*>/g) ?? [];

type Rule = { selectors: string[]; body: string; at: string[] };

// Leaf rules of a stylesheet with the at-rules around them (@media, @supports, @keyframes...).
function rules(css: string): Rule[] {
  const out: Rule[] = [];
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
        out.push({ selectors: prelude.split(","), body, at: [...stack] });
      }
      start = i + 1;
    } else if (c === ";" && css.slice(start, i).trim().startsWith("@") && !css.slice(start, i).includes("{")) {
      start = i + 1;
    }
  }
  return out;
}

const shippedCss = (lang: string) => {
  const assets = join(dist, "_astro");
  const files = readdirSync(assets)
    .filter((file) => file.endsWith(".css"))
    .map((file) => readFileSync(join(assets, file), "utf8"));
  const inline = [...page(lang).matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]!);
  return [...files, ...inline].join("\n");
};

describe.each(langs)("quiet page /%s/", (lang) => {
  it(`reveals at most ${REVEAL_BUDGET} elements, at most ${REVEALS_PER_SECTION} per section`, () => {
    const html = page(lang);
    expect(revealTags(html).length).toBeLessThanOrEqual(REVEAL_BUDGET);
    const sections = [...html.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g)].map((m) => m[0]);
    expect(sections.length).toBeGreaterThan(5);
    const over = sections
      .map((s) => [s.match(/\baria-labelledby="([^"]+)"/)?.[1] ?? s.slice(0, 40), revealTags(s).length] as const)
      .filter(([, n]) => n > REVEALS_PER_SECTION);
    expect(over).toEqual([]);
  });

  it("never moves body text or list items in", () => {
    expect(revealTags(page(lang)).filter((tag) => /^<(p|li)\b/.test(tag))).toEqual([]);
  });
});

describe("the automation flow without script", () => {
  // The lit layer of each station: a group whose washed rect is followed by the station's label.
  const lit = /<g class="([^"]*\bflow__lit\b[^"]*)"[^>]*>\s*<rect\b[^>]*>(?:<\/rect>)?\s*<text\b/g;
  const litClasses = (html: string) => [...new Set([...html.matchAll(lit)].flatMap((m) => m[1]!.split(/\s+/)))];

  it.each(langs)("draws a lit layer for each of the 5 stations in both layouts on /%s/", (lang) => {
    const html = page(lang);
    expect(html.match(lit) ?? []).toHaveLength(10);
  });

  it("hides or animates the stations only once the script has marked <html> with .js", () => {
    const classes = litClasses(page("es"));
    expect(classes.length).toBeGreaterThan(0);
    const touchesStation = (selector: string) => classes.some((c) => new RegExp(`\\.${c}(?![\\w-])`).test(selector));
    const hides = (body: string) => /(?:^|;)\s*opacity:\s*0(?![.\d])/.test(body) || /(?:^|;)\s*animation(?:-name)?:\s*(?!none)/.test(body);
    const ungated = rules(shippedCss("es"))
      .filter((rule) => hides(rule.body))
      .flatMap((rule) => rule.selectors.filter((s) => touchesStation(s) && !/\.js(?![\w-])/.test(s)).map((s) => `${s.trim()}{${rule.body}}`));
    expect(ungated).toEqual([]);
  });

  it("has a reduced-motion rule for the flow and for the cable", () => {
    const reduced = rules(shippedCss("es")).filter((rule) => rule.at.some((at) => /prefers-reduced-motion:\s*reduce/.test(at)));
    const selectors = reduced.flatMap((rule) => rule.selectors);
    expect(selectors.some((s) => /\.flow/.test(s))).toBe(true);
    expect(selectors.some((s) => /\.cable/.test(s))).toBe(true);
  });
});
