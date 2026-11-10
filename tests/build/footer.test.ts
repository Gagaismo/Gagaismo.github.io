import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// L67: the footer of the user's references, as close as possible. Cream ground that matches the
// illustration's sky, the LG letters and one email icon button, two link columns (serif then; the sans
// since L111, tests/build/type-voices.test.ts), a hairline, the copyright and "Hecho en Tucumán", and the landscape filling the bottom with a slow living loop.

const dist = fileURLToPath(new URL("../../dist/", import.meta.url));
const page = (lang: string) => readFileSync(join(dist, lang, "index.html"), "utf8");
const langs = ["es", "en"] as const;

const footer = (html: string) => html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0] ?? "";

const shippedCss = (lang: string) => {
  const assets = join(dist, "_astro");
  const files = readdirSync(assets)
    .filter((file) => file.endsWith(".css"))
    .map((file) => readFileSync(join(assets, file), "utf8"));
  const inline = [...page(lang).matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]!);
  return [...files, ...inline].join("\n");
};

// Innermost rules with the at-rules around them.
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
        out.push({ selectors: prelude.split(",").map((s) => s.trim()), body, at: [...stack] });
      }
      start = i + 1;
    } else if (c === ";" && css.slice(start, i).trim().startsWith("@") && !css.slice(start, i).includes("{")) {
      start = i + 1;
    }
  }
  return out;
}

// Keyframes by name, each step's selector with its declarations.
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

const columns = {
  es: [
    ["Secciones", [["Casos", "#automation"], ["Cómo trabajo", "#method"], ["Qué hago", "#offer"], ["Contacto", "#contact"]]],
    ["Contacto", [["Escribime por email", "mailto:contacto@lautaroguebel.tech"], ["Volver arriba", "#top"]]],
  ],
  en: [
    ["Sections", [["Work", "#automation"], ["How I work", "#method"], ["What I do", "#offer"], ["Contact", "#contact"]]],
    ["Contact", [["Email me", "mailto:contacto@lautaroguebel.tech"], ["Back to top", "#top"]]],
  ],
} as const;

describe.each(langs)("footer /%s/", (lang) => {
  it("shows two link columns, each a title and its links", () => {
    const foot = footer(page(lang));
    const found = [...foot.matchAll(/<div\b[^>]*\bdata-foot-col(?=[\s>])[^>]*>([\s\S]*?)<\/div>/g)].map((m) => [
      m[1]!.match(/<h2\b[^>]*>([^<]*)<\/h2>/)?.[1]?.trim(),
      [...m[1]!.matchAll(/<a\b[^>]*\bhref="([^"]*)"[^>]*>([^<]*)<\/a>/g)].map((a) => [a[2]!.trim(), a[1]]),
    ]);
    expect(found).toEqual(columns[lang]);
  });

  it("has the LG letters and one email icon button with an accessible name, no GitHub", () => {
    const foot = footer(page(lang));
    expect(foot).toMatch(/<a\b[^>]*\bhref="#top"[^>]*>\s*<span\b[^>]*\baria-hidden="true"[^>]*>LG<\/span>/);
    const icons = foot.match(/<a\b[^>]*\bdata-foot-icon(?=[\s>])[^>]*>/g) ?? [];
    expect(icons).toHaveLength(1);
    expect(icons[0]).toMatch(/\bhref="mailto:contacto@lautaroguebel.tech"/);
    expect(icons[0]).toMatch(/\baria-label="[^"]{6,}"/);
    expect(foot.toLowerCase()).not.toContain("github");
  });

  it("closes with the copyright and the made-in line", () => {
    const text = footer(page(lang)).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    expect(text).toContain("© 2026 Lautaro Guebel · Argentina");
    expect(text).toContain(lang === "es" ? "Hecho en Tucumán" : "Made in Tucumán");
  });

  it("drops the old big call to action and the charcoal bar", () => {
    const foot = footer(page(lang));
    expect(foot).not.toMatch(/\bclass="[^"]*\b(display|foot__line)\b/);
    expect(foot).not.toMatch(/>\s*(Escribime|Write to me)\s*</);
  });

  it("fills the bottom with the landscape as responsive AVIF/WebP, lazy and async", () => {
    const foot = footer(page(lang));
    const art = foot.match(/<[a-z]+\b[^>]*\bdata-foot-art(?=[\s>])[^>]*>/)?.[0] ?? "";
    expect(art).toMatch(/\baria-hidden="true"/);
    const imgs = foot.match(/<img\b[^>]*>/g) ?? [];
    expect(imgs.length).toBeGreaterThanOrEqual(1);
    for (const img of imgs) {
      expect(img).toMatch(/\bsrc="[^"]*footer-landscape[^"]*"/);
      expect(img).toMatch(/\bloading="lazy"/);
      expect(img).toMatch(/\bdecoding="async"/);
      // Decorative: an empty alt, which Astro writes as a bare `alt`.
      expect(img).toMatch(/\salt(="")?(?=[\s>])/);
    }
    expect(foot).toMatch(/<source\b[^>]*\btype="image\/avif"/);
    expect(foot).toMatch(/<source\b[^>]*\bsrcset="[^"]*\b4100w/);
  });

  // L70/L71: "una canoa o balsa pequeña atravesando el agua".
  it("puts a small drawn canoe on the lake, inside the moving scene, hidden from assistive tech", () => {
    const foot = footer(page(lang));
    const scene = foot.slice(foot.indexOf('class="foot__scene'));
    const boat = scene.match(/<([a-z]+)\b[^>]*\bdata-foot-boat(?=[\s>])[^>]*>[\s\S]*?<\/svg>/)?.[0] ?? "";
    expect(boat).not.toBe("");
    expect(boat).toMatch(/^<[a-z]+\b[^>]*\baria-hidden="true"/);
    // Drawn inline: no text, no image or link to fetch.
    expect(boat).toMatch(/<svg\b[^>]*\bviewBox=/);
    expect(boat).not.toMatch(/<(text|image|use)\b|\bhref=/);
  });

  it("moves the ripples on the water instead of only crossfading still ones", () => {
    const foot = footer(page(lang));
    const filters = foot.match(/<filter\b[\s\S]*?<\/filter>/g) ?? [];
    expect(filters).toHaveLength(2);
    for (const filter of filters) {
      expect(filter).toMatch(/<animate\b[^>]*\battributeName="d[xy]"[^>]*\brepeatCount="indefinite"/);
      expect(Math.min(...numbers(filter, /<feDisplacementMap\b[^>]*\bscale="([\d.]+)"/g))).toBeGreaterThanOrEqual(14);
    }
  });
});

describe("footer CSS", () => {
  it("sets the cream ground of the illustration's sky", () => {
    const unscoped = (s: string) => s.replace(/\[data-astro-cid-[\w-]+\]/g, "");
    const foot = rules(shippedCss("es")).filter((r) => r.selectors.map(unscoped).includes(".foot") && !r.at.length);
    expect(foot.map((r) => r.body).join(";")).toMatch(/background(-color)?:\s*#fbf6e6/i);
  });

  it("animates the illustration and stops it under prefers-reduced-motion", () => {
    const all = rules(shippedCss("es"));
    const animated = all.filter((r) => /(?:^|;)\s*animation:\s*(?!none)/.test(r.body) && r.selectors.some((s) => /\.foot__/.test(s)));
    expect(animated.length).toBeGreaterThan(0);
    const reduced = all.filter(
      (r) => r.at.some((at) => /prefers-reduced-motion:\s*reduce/.test(at)) && /animation:\s*none/.test(r.body),
    );
    const stopped = reduced.flatMap((r) => r.selectors);
    for (const rule of animated) for (const s of rule.selectors) expect(stopped).toContain(s);
  });

  // L70: "Se nota muy levemente que hay movimiento".
  it("moves enough to be seen: a real camera push, a visible sway, slow eased cycles", () => {
    const css = shippedCss("es");
    const frames = keyframes(css);
    const camera = frames.get("foot-camera") ?? "";
    expect(Math.max(...numbers(camera, /scale\(([\d.]+)\)/g))).toBeGreaterThanOrEqual(1.06);
    expect(Math.max(...numbers(frames.get("foot-sway") ?? "", /rotate\(-?([\d.]+)deg\)/g))).toBeGreaterThanOrEqual(1);
    const scene = rules(css).find((r) => r.selectors.some((s) => /^\.foot__scene(\[|$)/.test(s)) && !r.at.length);
    // The minifier may reorder the shorthand.
    expect(scene?.body).toMatch(/animation:(?=[^;]*\bfoot-camera\b)(?=[^;]*\bease-in-out\b)/);
  });

  it("sails the canoe across the lake and fades it at the ends of its path", () => {
    const css = shippedCss("es");
    const all = rules(css);
    const lane = all.find((r) => r.selectors.some((s) => /^\.foot__lane(\[|$)/.test(s)) && !r.at.length);
    const name = lane?.body.match(/animation:[^;]*?\b(foot-[\w-]+)/)?.[1] ?? "";
    const path = keyframes(css).get(name) ?? "";
    expect(path).toMatch(/translate(X)?\(/);
    expect(path).toMatch(/opacity:\s*0\b/);
    // The hull bobs on its own.
    const hull = all.find((r) => r.selectors.some((s) => /^\.foot__hull(\[|$)/.test(s)) && !r.at.length);
    expect(hull?.body).toMatch(/animation:[^;]*\bfoot-[\w-]+/);
  });

  it("parks the canoe on the water, visible, under prefers-reduced-motion", () => {
    const all = rules(shippedCss("es"));
    const reduced = all.filter((r) => r.at.some((at) => /prefers-reduced-motion:\s*reduce/.test(at)));
    const stopped = reduced.filter((r) => /animation:\s*none/.test(r.body)).flatMap((r) => r.selectors);
    for (const part of ["lane", "hull"]) expect(stopped.some((s) => s.startsWith(`.foot__${part}`))).toBe(true);
    // Without its animation the lane rests at its parking spot, fully opaque.
    const lane = all.find((r) => r.selectors.some((s) => /^\.foot__lane(\[|$)/.test(s)) && !r.at.length);
    expect(lane?.body).toMatch(/transform:\s*translate(X)?\(var\(--park\)/);
    expect(lane?.body).not.toMatch(/opacity:\s*0\b/);
  });
});
