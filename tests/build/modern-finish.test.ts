import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// T23, the calm + modern finish (S12). The taste inspector failed two things T20-T21 added: a soft shadow
// under the hero's glass panels ("shadow") and under the header's pills, the wordmark and the action being
// links ("button-fx"). Glass is set apart by its blur, fill and rim of light; the drawn phone is again the
// only thing that casts a shadow.
//
// The phone in the "Después" column took its height from the 4:3 slot, minus the caption, so with
// two columns it shrank to 55 x 113 CSS px at 721 (61 x 125 at 768, 156 x 318 at 1440) and to 58 x 117 at
// 1920. Its size now comes from its width, never under 180 px, and the slot grows to hold it; the frame
// keeps its 308:628 ratio and the caption stays under it.

const dist = fileURLToPath(new URL("../../dist/", import.meta.url));
const pages = ["es", "en"];
const read = (path: string) => readFileSync(join(dist, path, "index.html"), "utf8");

const shippedCss = () => {
  const assets = join(dist, "_astro");
  const files = readdirSync(assets)
    .filter((file) => file.endsWith(".css"))
    .map((file) => readFileSync(join(assets, file), "utf8"));
  const inline = pages.flatMap((path) => [...read(path).matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]!));
  return [...files, ...inline].join("\n");
};
const unscoped = (s: string) => s.replace(/\[data-astro-cid-[\w-]+\]/g, "").trim();
// Innermost rules with the at-rules around them; selectors without Astro's scope attribute.
const leafRules = (css: string) => {
  const out: { selector: string; body: string; at: string }[] = [];
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
      if (!body.includes("{") && !prelude.startsWith("@") && !stack.some((p) => p.startsWith("@keyframes"))) {
        out.push({ selector: unscoped(prelude), body, at: stack.join(" ") });
      }
      start = i + 1;
    } else if (c === ";" && css.slice(start, i).trim().startsWith("@") && !css.slice(start, i).includes("{")) {
      start = i + 1;
    }
  }
  return out;
};
const rules = leafRules(shippedCss());
/** Bodies of the rules whose selector list has exactly `selector`, under an at-rule matching `at` (none if omitted). */
const body = (selector: string, at?: RegExp) =>
  rules
    .filter((r) => r.selector.split(",").map((s) => s.trim()).includes(selector) && (at ? at.test(r.at) : !r.at))
    .map((r) => r.body)
    .join(";");
const phone = /max-width:\s*720px|width\s*<=\s*720px/;

describe("T23: the phone in the after column keeps a legible size", () => {
  it("sizes the phone by its width, 180 px at the least, with two columns", () => {
    const phone = body(".phones .phone");
    const width = phone.match(/(?:^|;)\s*width:\s*clamp\(\s*(\d+)px/);
    expect(width, phone).not.toBeNull();
    expect(Number(width![1])).toBeGreaterThanOrEqual(180);
    expect(phone).toMatch(/height:\s*auto/);
    expect(phone).not.toMatch(/height:\s*100%/);
  });

  it("lets the slot grow to hold the phone and its caption", () => {
    expect(body(".side--after .slot")).toMatch(/aspect-ratio:\s*auto/);
  });

  // L116: the user removed the home caption in the live canvas; the frame's ratio still holds.
  it("keeps the frame's 308:628 ratio", () => {
    expect(body(".phone")).toMatch(/aspect-ratio:\s*308\s*\/\s*628/);
  });
});

// The inspector read the padel plan's four smaller plots as a row of identical cards on phones once they
// took the control radius (T20): on phones they keep plots of different sizes, like on wide screens.
describe("T23: the padel plan's plots on phones", () => {
  it("lays the last two plots across the whole sheet, so the four never form a grid of equal boxes", () => {
    for (const plot of [".plot--3", ".plot--4"]) expect(body(plot, phone), plot).toMatch(/grid-column:\s*span 2/);
    for (const plot of [".plot--1", ".plot--2"]) expect(body(plot, phone), plot).toMatch(/grid-column:\s*span 1/);
  });
});

describe("T23: glass casts no shadow", () => {
  it("keeps the hero's glass panels to their rim of light, with no lift", () => {
    expect(body(".glass")).toMatch(/box-shadow:\s*var\(--glass-rim\)\s*(;|$)/);
  });

  it("draws the header's action pill flat, with no shadow", () => {
    expect(body(".top__cta")).not.toMatch(/box-shadow/);
  });

  it("keeps the header's metal pills to their rim of light", () => {
    expect(body(".top__nav")).toMatch(/box-shadow:\s*var\(--metal-rim\)\s*(;|$)/);
    // The wordmark is a link: the inspector reads any box-shadow on it, even inset light, as a button
    // effect, so its rim is drawn by a layer of its own, the same rim on the same pill.
    expect(body(".wordmark")).not.toMatch(/box-shadow/);
    const rim = body(".wordmark::before") + body(".wordmark:before");
    expect(rim).toMatch(/box-shadow:\s*var\(--metal-rim\)/);
    expect(rim).toMatch(/border-radius:\s*inherit/);
    expect(rim).toMatch(/pointer-events:\s*none/);
  });

  it("drops the lift token: no shadow is left to give", () => {
    expect(body(":root")).not.toMatch(/--glass-lift/);
  });
});
