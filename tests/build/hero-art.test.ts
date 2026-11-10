import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// L72: "en el hero quiero agregar algo similar en lo que hicimos en el footer [...] inspirado en la caña
// de azucar y los campos de tucuman". The engraving of the cane fields fills the bottom of the hero, full
// bleed and behind the text, with a living loop in CSS only: the camera pushes in, the cane in both
// corners sways, smoke drifts from the mill's chimney and a gust ripples the field. Static under
// prefers-reduced-motion.

const dist = fileURLToPath(new URL("../../dist/", import.meta.url));
const page = (lang: string) => readFileSync(join(dist, lang, "index.html"), "utf8");
const langs = ["es", "en"] as const;

const hero = (html: string) => {
  const start = html.search(/<section\b[^>]*\bclass="hero\b/);
  return start < 0 ? "" : html.slice(start, html.indexOf("</section>", start));
};

// From the art's opening tag to the headline.
const artOf = (section: string) => section.slice(section.lastIndexOf("<", section.indexOf("data-hero-art")), section.indexOf("<h1"));

const shippedCss = (lang: string) => {
  const assets = join(dist, "_astro");
  const files = readdirSync(assets)
    .filter((file) => file.endsWith(".css"))
    .map((file) => readFileSync(join(assets, file), "utf8"));
  const inline = [...page(lang).matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]!);
  return [...files, ...inline].join("\n");
};

const unscoped = (s: string) => s.replace(/\[data-astro-cid-[\w-]+\]/g, "").trim();

// Innermost rules with the at-rules around them; selectors without Astro's scope attribute.
function rules(css: string): { selectors: string[]; body: string; at: string[] }[] {
  const out: { selectors: string[]; body: string; at: string[] }[] = [];
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
        out.push({ selectors: prelude.split(",").map(unscoped), body, at: [...stack] });
      }
      start = i + 1;
    } else if (c === ";" && css.slice(start, i).trim().startsWith("@") && !css.slice(start, i).includes("{")) {
      start = i + 1;
    }
  }
  return out;
}

function keyframes(css: string): Map<string, string> {
  const out = new Map<string, string>();
  for (const m of css.matchAll(/@keyframes\s+([\w-]+)\s*\{/g)) {
    let depth = 1;
    let i = m.index! + m[0].length;
    for (; i < css.length && depth; i++) depth += css[i] === "{" ? 1 : css[i] === "}" ? -1 : 0;
    out.set(m[1]!, css.slice(m.index! + m[0].length, i - 1));
  }
  return out;
}

const numbers = (s: string, re: RegExp) => [...s.matchAll(re)].map((m) => Number(m[1]));
const base = (selector: string, name: string) => new RegExp(`^\\.${name}(:|$)`).test(selector);
const plain = (all: ReturnType<typeof rules>, name: string) =>
  all.filter((r) => r.selectors.some((s) => base(s, name)) && !r.at.length);
const animationOf = (all: ReturnType<typeof rules>, name: string) =>
  plain(all, name)
    .map((r) => r.body.match(/animation:[^;]*?\b(hero-[\w-]+)/)?.[1])
    .find(Boolean) ?? "";
const reducedMotion = (all: ReturnType<typeof rules>) =>
  all.filter((r) => r.at.some((at) => /prefers-reduced-motion:\s*reduce/.test(at)));

describe.each(langs)("hero art /%s/", (lang) => {
  it("puts the cane-field engraving in the hero, hidden from assistive tech", () => {
    const section = hero(page(lang));
    const art = section.match(/<([a-z]+)\b[^>]*\bdata-hero-art(?=[\s>])[^>]*>/)?.[0] ?? "";
    expect(art).not.toBe("");
    expect(art).toMatch(/\baria-hidden="true"/);
    // Behind the text in source order too: the art comes before the headline.
    expect(section.indexOf("data-hero-art")).toBeLessThan(section.indexOf("<h1"));
  });

  it("delivers it as responsive AVIF/WebP, loaded eagerly, high priority once, decorative", () => {
    const art = artOf(hero(page(lang)));
    const imgs = art.match(/<img\b[^>]*>/g) ?? [];
    expect(imgs.length).toBeGreaterThanOrEqual(1);
    for (const img of imgs) {
      expect(img).toMatch(/\bsrc="[^"]*hero-fields[^"]*"/);
      expect(img).toMatch(/\bloading="eager"/);
      expect(img).not.toMatch(/\bloading="lazy"/);
      // Decorative: an empty alt, which Astro writes as a bare `alt`.
      expect(img).toMatch(/\salt(="")?(?=[\s>])/);
    }
    expect(imgs.filter((img) => /\bfetchpriority="high"/.test(img))).toHaveLength(1);
    expect(art).toMatch(/<source\b[^>]*\btype="image\/avif"/);
    expect(art).toMatch(/<source\b[^>]*\btype="image\/webp"/);
    expect(art).toMatch(/<source\b[^>]*\bsrcset="[^"]*\b1915w/);
    expect(art).not.toMatch(/<script\b/);
  });

  it("draws the chimney smoke and the wind in markup, no text and nothing to fetch", () => {
    const art = artOf(hero(page(lang)));
    expect(art.match(/\bdata-hero-smoke(?=[\s>])/g) ?? []).toHaveLength(1);
    const filters = art.match(/<filter\b[\s\S]*?<\/filter>/g) ?? [];
    expect(filters).toHaveLength(1);
    expect(filters[0]).toMatch(/<animate\b[^>]*\brepeatCount="indefinite"/);
    expect(filters[0]).toMatch(/<feDisplacementMap\b/);
    expect(art.replace(/<[^>]+>/g, "").trim()).toBe("");
  });
});

describe("hero art CSS", () => {
  it("lies full bleed behind the hero content, its sky masked into the page", () => {
    const all = rules(shippedCss("es"));
    const art = plain(all, "hero__art").map((r) => r.body).join(";");
    expect(art).toMatch(/position:\s*absolute/);
    expect(art).toMatch(/z-index:\s*-1\b/);
    expect(art).toMatch(/inset:\s*0\b|left:\s*0\b[\s\S]*right:\s*0\b|right:\s*0\b[\s\S]*left:\s*0\b/);
    const hero = plain(all, "hero").map((r) => r.body).join(";");
    expect(hero).toMatch(/position:\s*relative/);
    // The sky fades out from the top: transparent first, opaque further down (the minifier writes
    // `transparent` as #0000 and drops the default direction).
    const masked = all.filter(
      (r) =>
        r.selectors.some((s) => /^\.hero__/.test(s)) &&
        /mask-image:\s*linear-gradient\((to bottom,\s*)?(transparent|#0000(0000)?)\b/.test(r.body),
    );
    expect(masked.length).toBeGreaterThan(0);
  });

  // L74/L75: the veils read as light patches. They now fade over a wide margin (no edge to see) and let
  // the darkest strokes under the text show at 38% at most (5.5:1 or more against ink, measured on the art).
  it("lightens the art behind the lead and the actions with a soft, wide veil so text stays AA", () => {
    const all = rules(shippedCss("es"));
    for (const name of ["hero__lead", "hero__act"]) {
      const veil = all
        .filter((r) => r.selectors.some((s) => new RegExp(`^\\.${name}:{1,2}before$`).test(s)) && !r.at.length)
        .map((r) => r.body)
        .join(";");
      expect(veil, name).toMatch(/background(-color)?:\s*var\(--bg\)/);
      const opacity = numbers(veil, /opacity:\s*([\d.]+)/g)[0] ?? 0;
      expect(opacity, name).toBeGreaterThanOrEqual(0.62);
      // Every feather is at least 3.5rem wide: the veil has no edge that reads as a patch. The mask is
      // full from --vx / --vy in (F5: the reach shrinks on tablets), so read them at every width.
      expect(veil, name).toMatch(/#000\s+var\(--vx\)/);
      expect(veil, name).toMatch(/#000\s+var\(--vy\)/);
      const reach = all
        .filter((r) => r.selectors.includes(`.${name}`))
        .flatMap((r) => numbers(r.body, /--v[xy]:\s*([\d.]+)rem/g));
      expect(reach.length, name).toBeGreaterThan(1);
      expect(Math.min(...reach), name).toBeGreaterThanOrEqual(3.5);
    }
  });

  it("moves the camera, sways the cane in both corners from its base and drifts the smoke", () => {
    const css = shippedCss("es");
    const all = rules(css);
    const frames = keyframes(css);

    const camera = frames.get(animationOf(all, "hero__scene")) ?? "";
    expect(Math.max(...numbers(camera, /scale\(([\d.]+)\)/g))).toBeGreaterThanOrEqual(1.05);
    expect(plain(all, "hero__scene").map((r) => r.body).join(";")).toMatch(/animation:(?=[^;]*\bease-in-out\b)/);

    for (const side of ["hero__cane--left", "hero__cane--right"]) {
      expect(all.some((r) => r.selectors.some((s) => base(s, side)))).toBe(true);
    }
    const sway = frames.get(animationOf(all, "hero__sway")) ?? "";
    // The minifier writes skewX() as skew().
    expect(Math.max(...numbers(sway, /skew(?:X)?\(-?([\d.]+)deg\)/g))).toBeGreaterThanOrEqual(1.5);
    expect(plain(all, "hero__sway").map((r) => r.body).join(";")).toMatch(/transform-origin:[^;]*\b100%/);

    const smoke = frames.get(animationOf(all, "hero__puff")) ?? "";
    expect(smoke).toMatch(/translate\(/);
    expect(smoke).toMatch(/opacity:\s*0\b/);
  });

  it("keeps every hero art animation slow: 5 s or longer", () => {
    const all = rules(shippedCss("es"));
    const art = ["hero__scene", "hero__band--far", "hero__sway", "hero__puff"];
    for (const name of art) {
      const body = plain(all, name).map((r) => r.body).join(";");
      const seconds = numbers(body, /animation:[^;]*?\b([\d.]+)s\b/g);
      expect(seconds.length, name).toBeGreaterThan(0);
      expect(Math.min(...seconds), name).toBeGreaterThanOrEqual(5);
    }
  });

  it("stops every hero art animation under prefers-reduced-motion and hides the smoke and wind layers", () => {
    const all = rules(shippedCss("es"));
    // The hero's entrance animations live inside a no-preference block already; the art runs always.
    const animated = all.filter(
      (r) =>
        /(?:^|;)\s*animation:\s*(?!none)/.test(r.body) &&
        r.selectors.some((s) => /^\.hero__/.test(s)) &&
        !r.at.some((at) => /prefers-reduced-motion:\s*no-preference/.test(at)),
    );
    expect(animated.length).toBeGreaterThanOrEqual(4);
    const reduced = reducedMotion(all);
    const stopped = reduced.filter((r) => /animation:\s*none/.test(r.body)).flatMap((r) => r.selectors);
    for (const rule of animated) for (const s of rule.selectors) expect(stopped).toContain(s);
    const hidden = reduced.filter((r) => /display:\s*none/.test(r.body)).flatMap((r) => r.selectors);
    for (const name of ["hero__smoke", "hero__wind"]) expect(hidden.some((s) => base(s, name)), name).toBe(true);
  });
});
