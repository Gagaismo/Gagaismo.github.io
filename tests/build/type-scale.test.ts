import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// Idea 8: fewer type sizes. Six tokens (display, head, sub, lead, body, small) and every text rule uses one.
// Drawings (SVG text, in viewBox units) and interface fragments ([data-ui], still styled in
// global.css) keep their own sizes, as the tasteskill inspector does.

const dist = fileURLToPath(new URL("../../dist/", import.meta.url));
const page = (lang: string) => readFileSync(join(dist, lang, "index.html"), "utf8");

const TOKENS = ["--fs-display", "--fs-head", "--fs-sub", "--fs-lead", "--fs-body", "--fs-small"];
const EXEMPT = /\.(flow__label|flow__fail|flow__note|map__nodes|map__links|pmap__node|pmap__links|wf__svg)\b/;

const shippedCss = () => {
  const assets = join(dist, "_astro");
  const files = readdirSync(assets)
    .filter((file) => file.endsWith(".css"))
    .map((file) => readFileSync(join(assets, file), "utf8"));
  const inline = [...page("es").matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]!);
  return [...files, ...inline].join("\n");
};

// Innermost rules: selector and body, whatever at-rules wrap them.
const leafRules = (css: string) => [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({ selector: m[1]!.trim(), body: m[2]! }));

const fontSizes = (body: string) =>
  [...body.matchAll(/(?:^|;)\s*(font-size|font)\s*:\s*([^;]+)/g)]
    .map((m) => (m[1] === "font" ? m[2]!.replace(/\/[^ ]+/, "").trim() : m[2]!.trim()))
    .filter((value) => value !== "inherit");

describe("type scale", () => {
  it("declares the six size tokens on :root", () => {
    const root = leafRules(shippedCss()).filter((rule) => rule.selector === ":root").map((rule) => rule.body).join(";");
    for (const token of TOKENS) expect(root).toMatch(new RegExp(`${token}\\s*:`));
  });

  it("sizes every text rule with a token, and uses no more than six", () => {
    const rules = leafRules(shippedCss()).filter((rule) => !rule.selector.startsWith("@") && !EXEMPT.test(rule.selector));
    const values = rules.flatMap((rule) => fontSizes(rule.body).map((value) => ({ selector: rule.selector, value })));
    expect(values.length).toBeGreaterThan(5);
    expect(values.filter(({ value }) => !/^(\d{3} )?var\(--fs-[a-z]+\)/.test(value))).toEqual([]);
    const used = new Set(values.map(({ value }) => value.match(/var\((--fs-[a-z]+)\)/)![1]));
    expect([...used].filter((token) => !TOKENS.includes(token))).toEqual([]);
    expect(used.size).toBeLessThanOrEqual(6);
  });
});
