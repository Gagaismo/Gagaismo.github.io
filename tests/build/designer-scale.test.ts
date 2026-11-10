import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// T16, S11 (L93): the designer asked for a smaller overall scale and wider side margins. The page gets a
// maximum width and an inset that grows with the viewport, the display size tops out lower, buttons are
// 44 px tall and the wide plans stop growing with the screen.

const dist = fileURLToPath(new URL("../../dist/", import.meta.url));
const read = (path: string) => readFileSync(join(dist, path, "index.html"), "utf8");
const pages = ["es", "en", "es/casos/automatizacion", "en/cases/automation", "es/casos/club-de-padel", "en/cases/padel-club"];

const shippedCss = () => {
  const assets = join(dist, "_astro");
  const files = readdirSync(assets)
    .filter((file) => file.endsWith(".css"))
    .map((file) => readFileSync(join(assets, file), "utf8"));
  const inline = pages.flatMap((path) => [...read(path).matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]!));
  return [...files, ...inline].join("\n");
};
const unscoped = (s: string) => s.replace(/\[data-astro-cid-[\w-]+\]/g, "").trim();
// Innermost rules outside any at-rule; selectors without Astro's scope attribute.
const topRules = (css: string) => {
  const out: { selector: string; body: string }[] = [];
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
      if (!body.includes("{") && !prelude.startsWith("@") && stack.length === 0) out.push({ selector: unscoped(prelude), body });
      start = i + 1;
    } else if (c === ";" && css.slice(start, i).trim().startsWith("@") && !css.slice(start, i).includes("{")) {
      start = i + 1;
    }
  }
  return out;
};
const rules = topRules(shippedCss());
const body = (selector: string) =>
  rules
    .filter((r) => r.selector.split(",").map((s) => s.trim()).includes(selector))
    .map((r) => r.body)
    .join(";");

describe("S11 side margins", () => {
  it("declares a page maximum and an inset that never drops under the margin", () => {
    const root = body(":root");
    expect(root).toMatch(/--page-max:\s*\d+(\.\d+)?rem/);
    expect(root).toMatch(/--inset:\s*max\(var\(--margin\),\s*\(100vw\s*-\s*var\(--page-max\)\)\s*\/\s*2\)/);
  });

  it("pads every .wrap with the inset", () => {
    expect(body(".wrap")).toMatch(/padding-inline:\s*var\(--inset\)/);
  });
});

describe("S11 scale", () => {
  it("caps the display size at 6.5rem or less", () => {
    const display = body(":root").match(/--fs-display:\s*min\(clamp\(([\d.]+)rem,\s*[\d.]+vw,\s*([\d.]+)rem\)/);
    expect(display, "--fs-display: min(clamp(…rem, …vw, …rem), …)").not.toBeNull();
    expect(Number(display![2])).toBeLessThanOrEqual(6.5);
  });

  it("makes buttons 44 px tall", () => {
    expect(body(".btn")).toMatch(/min-height:\s*44px/);
  });

  it("stops the wide plans growing with the screen", () => {
    for (const selector of [".flow__svg--wide", ".wf__svg--wide"]) expect(body(selector), selector).toMatch(/max-width:\s*\d/);
  });
});
