import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { home } from "../../src/i18n/home";

// T22, S12 (L101): the motion the user picked from the scroll cheat sheet. The engravings move with the
// scroll (parallax and a slow zoom, sheet #10 and #11), section headings come in word by word (#04 and
// #06), and "Cómo trabajo" becomes a stack of cards that slide over one another (#20). Every one is off
// under reduced motion, and the page reads the same without them.

const dist = fileURLToPath(new URL("../../dist/", import.meta.url));
const read = (path: string) => readFileSync(join(dist, path, "index.html"), "utf8");
const langs = ["es", "en"] as const;
const pages = ["es", "en", "es/casos/automatizacion", "en/cases/automation", "es/casos/club-de-padel", "en/cases/padel-club"];
const assets = join(dist, "_astro");

const shippedCss = () => {
  const files = readdirSync(assets)
    .filter((file) => file.endsWith(".css"))
    .map((file) => readFileSync(join(assets, file), "utf8"));
  const inline = pages.flatMap((path) => [...read(path).matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]!));
  return [...files, ...inline].join("\n");
};
const unscoped = (s: string) => s.replace(/\[data-astro-cid-[\w-]+\]/g, "").trim();
// Innermost rules with the at-rules around them; selectors without Astro's scope attribute.
const leafRules = (css: string) => {
  const out: { selectors: string[]; body: string; at: string }[] = [];
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
        out.push({ selectors: prelude.split(",").map(unscoped), body, at: stack.join(" ") });
      }
      start = i + 1;
    } else if (c === ";" && css.slice(start, i).trim().startsWith("@") && !css.slice(start, i).includes("{")) {
      start = i + 1;
    }
  }
  return out;
};
const keyframes = (css: string) => {
  const out = new Map<string, string>();
  for (const m of css.matchAll(/@keyframes\s+([\w-]+)\s*\{/g)) {
    let depth = 1;
    let i = m.index! + m[0].length;
    for (; i < css.length && depth; i++) depth += css[i] === "{" ? 1 : css[i] === "}" ? -1 : 0;
    out.set(m[1]!, css.slice(m.index! + m[0].length, i - 1));
  }
  return out;
};
const css = shippedCss();
const rules = leafRules(css);
const frames = keyframes(css);
const has = (r: (typeof rules)[number], selector: string) => r.selectors.includes(selector);
const supportsTimeline = /@supports[^{]*animation-timeline/;
const noPreference = /prefers-reduced-motion:\s*no-preference/;
const reduce = /prefers-reduced-motion:\s*reduce/;
const decode = (s: string) =>
  s
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
const textOf = (html: string) => decode(html.replace(/<[^>]+>/g, ""));

describe("parallax and scroll zoom on the engravings", () => {
  // Each layer that moves with the scroll: the whole picture, the far mountains, and what stands in front.
  const layers = [".hero__frame", ".hero__band--far", ".hero__cane--left", ".hero__cane--right", ".foot__scene", ".foot__band--far", ".foot__band--near"];

  it.each(layers)("%s moves with the scroll only where the browser ties animations to it, and only for motion-allowed readers", (selector) => {
    const timed = rules.filter((r) => has(r, selector) && /animation-timeline:[^;]*--[\w-]+/.test(r.body));
    expect(timed.length, selector).toBeGreaterThan(0);
    for (const rule of timed) {
      expect(rule.at, selector).toMatch(supportsTimeline);
      expect(rule.at, selector).toMatch(noPreference);
    }
  });

  it("names a view timeline on the hero and on the footer's picture, and moves the layers with transform properties only", () => {
    const named = rules.filter((r) => /view-timeline(-name)?:\s*--[\w-]+/.test(r.body)).flatMap((r) => r.selectors);
    expect(named).toContain(".hero");
    expect(named).toContain(".foot__art");
    const scrollFrames = rules
      .filter((r) => layers.some((l) => has(r, l)) && supportsTimeline.test(r.at))
      .flatMap((r) => [...r.body.matchAll(/animation(?:-name)?:\s*([^;]+)/g)].flatMap((m) => m[1]!.split(",")))
      .map((a) => a.trim().match(/\b((?:hero|foot)-[\w-]+)/)?.[1])
      .filter((name): name is string => !!name);
    expect(scrollFrames.length).toBeGreaterThan(0);
    for (const name of scrollFrames) {
      const body = frames.get(name) ?? "";
      expect(body, name).not.toBe("");
      const props = [...body.matchAll(/([a-z-]+)\s*:/g)].map((m) => m[1]);
      for (const p of props) expect(["scale", "translate", "transform", "opacity", "filter"], `${name}: ${p}`).toContain(p);
    }
  });

  it("keeps the living loops running beside the scroll: the far mountains still lag on their own clock", () => {
    for (const [selector, loop] of [
      [".hero__band--far", "hero-far"],
      [".foot__band--far", "foot-far"],
      [".foot__scene", "foot-camera"],
      [".foot__band--near", "foot-near"],
    ] as const) {
      const scroll = rules.filter((r) => has(r, selector) && supportsTimeline.test(r.at)).map((r) => r.body).join(";");
      // The scroll animation is added to the loop's list, after it, not put in its place.
      expect(scroll, selector).toMatch(new RegExp(`animation-name:\\s*${loop}\\s*,`));
      expect(scroll, selector).toMatch(/animation-timeline:\s*auto\s*,/);
      expect(scroll, selector).toMatch(/animation-iteration-count:\s*infinite\s*,/);
    }
  });

  it("never runs a scroll-driven animation under reduced motion", () => {
    const timed = rules.filter((r) => /animation-timeline:[^;]*--[\w-]+/.test(r.body) && layers.some((l) => has(r, l)));
    expect(timed.filter((r) => !noPreference.test(r.at))).toEqual([]);
    // And the global switch still turns every animation off.
    expect(rules.some((r) => reduce.test(r.at) && has(r, "*") && /animation:\s*none\s*!important/.test(r.body))).toBe(true);
  });
});

describe("headings come in word by word", () => {
  const headings = (html: string) =>
    [...html.matchAll(/<(h1|h2)\b([^>]*\bclass="[^"]*\b(?:head|subhead|top__title)\b[^"]*"[^>]*)>([\s\S]*?)<\/\1>/g)].map((m) => ({
      attrs: m[2]!,
      inner: m[3]!,
    }));

  it.each(pages)("/%s/: every section, chapter and case heading has the word hook and reads as one plain string", (path) => {
    const found = headings(read(path));
    expect(found.length, path).toBeGreaterThanOrEqual(5);
    for (const { attrs, inner } of found) {
      const text = textOf(inner);
      expect(attrs, text).toMatch(/\bdata-reveal="words"/);
      expect(attrs, text).not.toMatch(/\baria-label=/);
      expect(inner, text).not.toMatch(/aria-hidden/);
      expect(inner, text).not.toMatch(/sr-only/);
      // One span per word, the spaces left as text between them: the accessible name is the copy.
      const words = text.split(/\s+/).filter(Boolean);
      expect(inner.match(/<span\b[^>]*\bclass="[^"]*\bw\b[^"]*"/g)?.length, text).toBe(words.length);
      expect(text, text).toBe(text.trim());
      expect(text, text).not.toMatch(/\s{2,}/);
    }
  });

  it.each(langs)("/%s/: the home headings read exactly as the copy", (lang) => {
    const texts = headings(read(lang)).map((h) => textOf(h.inner));
    const copy = home[lang];
    for (const title of [copy.change.title, copy.flow.title, copy.method.title, copy.padel.title, copy.offer.title, copy.contact.title]) {
      expect(texts).toContain(title);
    }
  });

  it("staggers the words, 60-80 ms apart, over 600-700 ms, with the words' layout reserved", () => {
    const words = rules.filter((r) => r.selectors.some((s) => /\[data-reveal=["']?words["']?\]\s+\.w$/.test(s)) && /opacity:\s*0\b/.test(r.body));
    expect(words.length).toBeGreaterThan(0);
    for (const rule of words) {
      expect(rule.at).toMatch(noPreference);
      expect(rule.selectors.every((s) => /^\.js\b/.test(s))).toBe(true);
      expect(rule.body).toMatch(/transition-delay:\s*calc\(var\(--w\)\s*\*\s*var\(--stagger\)\)/);
      expect(rule.body).toMatch(/transition:[^;]*var\(--t-reveal\)/);
      expect(rule.body).toMatch(/filter:\s*blur\(/);
    }
    expect(css).toMatch(/--stagger:\s*70ms/);
    // The minifier writes 640ms as .64s.
    expect(css).toMatch(/--t-reveal:\s*(640ms|\.64s)/);
    // Each word is a box of its own in every state, so the reveal never reflows the heading.
    expect(rules.some((r) => has(r, ".w") && !r.at && /display:\s*inline-block/.test(r.body))).toBe(true);
    // The heading itself does not rise as a block any more.
    const block = rules.filter((r) => r.selectors.some((s) => /^\.js \[data-reveal\]$/.test(s)));
    expect(block).toEqual([]);
  });
});

describe("Cómo trabajo as stacking cards", () => {
  const method = (html: string) => {
    const start = html.indexOf('id="method"');
    return html.slice(start, html.indexOf("</section>", start));
  };

  it.each(langs)("/%s/: lists the five steps as cards, each with its sheet, and no carousel", (lang) => {
    const section = method(read(lang));
    // data-cards, not data-stack: tests/build/home.test.ts keeps the old technology stack's hook out.
    const list = section.match(/<ol\b[^>]*\bdata-cards(?=[\s>=])[^>]*>/)?.[0] ?? "";
    expect(list).not.toBe("");
    expect(list).toMatch(/\baria-label="[^"]{4,}"/);
    const cards = section.split(/<li\b[^>]*\bclass="[^"]*\bstage\b/).slice(1);
    expect(cards).toHaveLength(5);
    for (const card of cards) expect(card).toMatch(/<figure class="stage__art/);
    expect(section).not.toMatch(/\bclass="(tally|swipe|method__foot)\b/);
    expect(section).not.toMatch(/\bdata-steps\b/);
    expect(section).not.toMatch(/\brole="region"/);
  });

  it("drops the sideways scroll, the tally and the hint from the stylesheet", () => {
    expect(css).not.toMatch(/scroll-snap-type:\s*x/);
    expect(css).not.toMatch(/scroll-timeline:\s*--steps/);
    expect(rules.some((r) => r.selectors.some((s) => /^\.(tally|swipe)\b/.test(s)))).toBe(false);
  });

  it("makes each card a mica sheet that sticks under the header only once the script has placed it, and only with motion allowed", () => {
    const html = read("es");
    const card = method(html).match(/<li\b[^>]*\bclass="[^"]*\bstage\b[^"]*"/)?.[0] ?? "";
    expect(card).toMatch(/\bplate\b/);
    const sticky = rules.filter((r) => r.selectors.some((s) => /\.stage$/.test(s)) && /position:\s*sticky/.test(r.body));
    expect(sticky.length).toBeGreaterThan(0);
    for (const rule of sticky) {
      expect(rule.at).toMatch(noPreference);
      for (const s of rule.selectors) expect(s).toMatch(/\[data-cards\]\[data-on\]|\.stack\[data-on\]/);
    }
  });

  it("scales the covered cards down with the scroll where supported, from their top edge", () => {
    const scaled = rules.filter((r) => r.selectors.some((s) => /\.stage$/.test(s)) && /animation-timeline:\s*--[\w-]+/.test(r.body));
    expect(scaled.length).toBeGreaterThan(0);
    for (const rule of scaled) {
      expect(rule.at).toMatch(supportsTimeline);
      expect(rule.at).toMatch(noPreference);
      expect(rule.body).toMatch(/animation-range:[^;]*exit-crossing/);
    }
    const name = scaled.map((r) => r.body.match(/animation(?:-name)?:\s*([\w-]+)/)?.[1]).find(Boolean) ?? "";
    expect(frames.get(name) ?? "").toMatch(/scale:/);
    expect(rules.some((r) => r.selectors.some((s) => /\.stage$/.test(s)) && /transform-origin:\s*50% 0/.test(r.body))).toBe(true);
  });

  it("ships the placing script as its own file, which offsets each card and lifts tall ones by their bottom", () => {
    const html = read("es");
    const src = html.match(/<script\b[^>]*\bsrc="\/_astro\/(stack[^"]*\.js)"/)?.[1];
    expect(src).toBeDefined();
    const code = readFileSync(join(assets, src!), "utf8");
    expect(code).toMatch(/data-cards/);
    expect(code).toMatch(/innerHeight/);
    expect(code).toMatch(/dataset\.on|setAttribute\(["']data-on/);
    // Not on the case pages, which have no method.
    expect(read("es/casos/automatizacion")).not.toMatch(/\/_astro\/stack[^"]*\.js/);
  });

  it.each(pages)("/%s/: keeps the inline JS under Vite's 4,096 B threshold", (path) => {
    const inline = [...read(path).matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].filter((m) => !/\ssrc=/.test(m[1]!));
    expect(inline.reduce((sum, m) => sum + Buffer.byteLength(m[2]!), 0)).toBeLessThanOrEqual(4096);
  });
});
