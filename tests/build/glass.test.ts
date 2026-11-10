import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// T20, S12 (L100-L101): the calm atlas meets a modern "mica". Plates become translucent glass with a
// light rim and soft corners, buttons become pills, the reading and UI text moves to a self-hosted sans
// (Albert Sans, latin, two weights) while headings, titles and captions keep the serif. Palette unchanged.

const dist = fileURLToPath(new URL("../../dist/", import.meta.url));
const read = (path: string) => readFileSync(join(dist, path, "index.html"), "utf8");
const langs = ["es", "en"] as const;
const pages = ["es", "en", "es/casos/automatizacion", "en/cases/automation", "es/casos/club-de-padel", "en/cases/padel-club"];

const files = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => (entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)]));

const shippedCss = () => {
  const sheets = files(join(dist, "_astro"))
    .filter((file) => file.endsWith(".css"))
    .map((file) => readFileSync(file, "utf8"));
  const inline = pages.flatMap((path) => [...read(path).matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]!));
  return [...sheets, ...inline].join("\n");
};
const unscoped = (s: string) => s.replace(/\[data-astro-cid-[\w-]+\]/g, "").trim();
// Innermost rules with the at-rules around them (including @font-face, whose "selector" is the at-rule).
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
      if (!body.includes("{") && !stack.some((p) => p.startsWith("@keyframes"))) {
        out.push({ selector: unscoped(prelude), body, at: stack.join(" ") });
      }
      start = i + 1;
    } else if (c === ";" && css.slice(start, i).trim().startsWith("@") && !css.slice(start, i).includes("{")) {
      start = i + 1;
    }
  }
  return out;
};
const css = shippedCss();
const rules = leafRules(css);
const body = (selector: string, at?: RegExp) =>
  rules
    .filter((r) => r.selector.split(",").map((s) => s.trim()).includes(selector) && (at ? at.test(r.at) : !r.at))
    .map((r) => r.body)
    .join(";");
const prop = (block: string, name: string) => block.match(new RegExp(`(?:^|;)\\s*${name}:\\s*([^;]+)`))?.[1]?.trim();

// A colour as written by the source or the minifier: rgb(r g b / a), rgba(r,g,b,a) or #rrggbb[aa].
const rgba = (value: string): [number, number, number, number] => {
  const hex = value.match(/^#([\da-f]{6})([\da-f]{2})?$/i);
  if (hex) {
    const n = hex[1]!.match(/../g)!.map((h) => parseInt(h, 16));
    return [n[0]!, n[1]!, n[2]!, hex[2] ? parseInt(hex[2], 16) / 255 : 1];
  }
  const fn = value.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*(?:[/,]\s*([\d.]+%?))?\s*\)$/);
  if (!fn) throw new Error(`not a colour: ${value}`);
  const a = fn[4] === undefined ? 1 : fn[4].endsWith("%") ? parseFloat(fn[4]) / 100 : Number(fn[4]);
  return [Number(fn[1]), Number(fn[2]), Number(fn[3]), a];
};
const lin = (c: number) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = ([r, g, b]: number[]) => 0.2126 * lin(r!) + 0.7152 * lin(g!) + 0.0722 * lin(b!);
const contrast = (a: number[], b: number[]) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x! + 0.05) / (y! + 0.05);
};
const over = ([r, g, b, a]: number[], bg: number[]) => [r!, g!, b!].map((c, i) => c * a! + bg[i]! * (1 - a!));
const ink = [0x1f, 0x2a, 0x22];
// The darkest pixel of the hero engraving's visible land (below its masked sky), measured on
// the 1915-px hero-fields.png with no blur: the worst case behind the hero's glass. The T19 plate's darkest
// visible pixel is rgb(51 55 48), lighter, so this stays a safe bound.
const darkestArt = [12, 22, 2];

describe("radius tokens", () => {
  it("declares the panel, control and pill radii", () => {
    const root = body(":root");
    expect(prop(root, "--radius-panel")).toBe("14px");
    expect(prop(root, "--radius-control")).toBe("10px");
    expect(prop(root, "--radius-pill")).toBe("999px");
  });

  it("makes every button a pill", () => {
    expect(prop(body(".btn"), "border-radius")).toBe("var(--radius-pill)");
  });

  it("gives the composer's topics the control radius, like segmented pills", () => {
    expect(prop(body(".opt"), "border-radius")).toBe("var(--radius-control)");
  });
});

describe("glass and mica", () => {
  it("lays every plate as translucent mica: blur, a light rim, the panel radius", () => {
    const plate = body(".plate");
    expect(prop(plate, "backdrop-filter")).toBe("var(--glass-blur)");
    // Safari before 18 needs the prefix; it lives in an @supports of its own so the minifier keeps it.
    expect(prop(body(".plate", /@supports\s*\(+-webkit-backdrop-filter/), "-webkit-backdrop-filter")).toBe("var(--glass-blur)");
    expect(prop(plate, "border-radius")).toBe("var(--radius-panel)");
    expect(prop(plate, "box-shadow")).toBe("var(--glass-rim)");
    expect(prop(plate, "background")).toBe("var(--mica)");
    expect(prop(body(":root"), "--glass-blur")).toMatch(/^blur\(\d+px\)\s+saturate\([\d.]+\)$/);
    // Translucent, but mostly paper: the mica reads as a brighter plate, not as see-through glass.
    const mica = rgba(prop(body(":root"), "--mica")!);
    expect(mica[3]).toBeGreaterThanOrEqual(0.75);
    expect(mica[3]).toBeLessThan(1);
    expect(mica.slice(0, 3)).toEqual([0xfb, 0xf6, 0xe6]);
  });

  it("turns the glass opaque and unblurred for people who ask for less transparency", () => {
    const reduced = body(":root", /prefers-reduced-transparency:\s*reduce/);
    expect(prop(reduced, "--glass-blur")).toBe("none");
    expect(prop(reduced, "--mica")).toBe("var(--plate)");
    expect(prop(reduced, "--glass")).toBe("var(--plate)");
  });

  it("thickens the fills where the browser cannot blur", () => {
    const fallback = body(":root", /@supports\s+not/);
    expect(fallback).not.toBe("");
    expect(rgba(prop(fallback, "--glass")!)[3]).toBeGreaterThan(rgba(prop(body(":root"), "--glass")!)[3]);
  });

  it("keeps ink on the hero's glass AA over the darkest stroke of the engraving, blurred or not", () => {
    const glass = rgba(prop(body(":root"), "--glass")!);
    expect(contrast(ink, over(glass, darkestArt))).toBeGreaterThanOrEqual(7);
    const fallback = rgba(prop(body(":root", /@supports\s+not/), "--glass")!);
    expect(contrast(ink, over(fallback, darkestArt))).toBeGreaterThanOrEqual(7);
  });

  it.each(langs)("/%s/: sets the hero's lead and its action on glass panels instead of veils", (lang) => {
    const html = read(lang);
    expect(html).toMatch(/<p class="[^"]*\bhero__lead\b[^"]*\bglass\b/);
    expect(html).toMatch(/<div class="[^"]*\bhero__act\b[^"]*\bglass\b/);
    const glass = body(".glass");
    expect(prop(glass, "background")).toBe("var(--glass)");
    expect(prop(glass, "backdrop-filter")).toBe("var(--glass-blur)");
    expect(prop(glass, "border-radius")).toBe("var(--radius-panel)");
    expect(body(".hero__lead::before") + body(".hero__lead:before")).toBe("");
  });

  it("casts at most one soft shadow, and only from the floating glass", () => {
    const lift = prop(body(":root"), "--glass-lift")!;
    expect(lift).toMatch(/rgb|#/);
    expect(prop(body(".glass"), "box-shadow")).toMatch(/var\(--glass-lift\)/);
    expect(prop(body(".plate"), "box-shadow")).not.toMatch(/--glass-lift/);
  });
});

describe("type", () => {
  it("reads in the self-hosted sans and keeps the serif for headings, titles and captions", () => {
    expect(prop(body(":root"), "--sans")).toMatch(/^"?Albert Sans"?,/);
    expect(prop(body(":root"), "--serif")).toMatch(/^Georgia,/);
    expect(body("body")).toMatch(/var\(--sans\)/);
    for (const selector of [".display", ".head", ".subhead", ".caption"]) expect(body(selector), selector).toMatch(/var\(--serif\)/);
    expect(body(".btn")).toMatch(/var\(--sans\)/);
    expect(body("nav a")).toMatch(/var\(--sans\)/);
  });

  it("declares Albert Sans in two weights, latin only, swapping in", () => {
    const faces = rules.filter((r) => r.selector === "@font-face" && /Albert Sans"?\s*(;|$)/m.test(prop(r.body, "font-family") ?? ""));
    const weights = [...new Set(faces.map((f) => prop(f.body, "font-weight")))].sort();
    expect(weights).toEqual(["400", "600"]);
    for (const face of faces) {
      expect(prop(face.body, "font-display")).toBe("swap");
      // Basic Latin and Latin-1; the minifier writes U+0000-00FF as U+??.
      expect(prop(face.body, "unicode-range")).toMatch(/^U\+(0000-00FF\b|\?\?,)/i);
      expect(prop(face.body, "src")).toMatch(/albert-sans-latin-(400|600)-normal[^)]*\.woff2/);
    }
  });

  it("ships two latin woff2 files and nothing else", () => {
    const fonts = files(dist).filter((file) => /\.(woff2?|ttf|otf|eot)$/.test(file));
    expect(fonts.length).toBeLessThanOrEqual(2);
    for (const font of fonts) expect(font).toMatch(/albert-sans-latin-(400|600)-normal\.[\w-]+\.woff2$/);
  });

  it.each(pages)("/%s/: preloads the regular weight", (path) => {
    const preload = read(path).match(/<link\b[^>]*\brel="preload"[^>]*\bas="font"[^>]*>/)?.[0] ?? "";
    expect(preload).toMatch(/href="[^"]*albert-sans-latin-400-normal\.[\w-]+\.woff2"/);
    expect(preload).toMatch(/type="font\/woff2"/);
    expect(preload).toMatch(/\bcrossorigin\b/);
  });
});
