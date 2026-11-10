import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// T14, the impeccable finish review's fix list (L81, F2-F8) and the T4 honesty fix (F9): drawn icons
// instead of text glyphs, clear space between each cable station and its heading, a clean peek in the
// method's carousel, the hero plate raised on tablets and phones, the real graph at full width with the
// normal gap after it, larger method sheets, and the padel plan stating only confirmed facts.

const dist = fileURLToPath(new URL("../../dist/", import.meta.url));
const read = (path: string) => readFileSync(join(dist, path, "index.html"), "utf8");
const langs = ["es", "en"] as const;
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
const css = shippedCss();
const rules = leafRules(css);
/** Bodies of the rules whose selector list has exactly `selector`, under an at-rule matching `at` (none if omitted). */
const body = (selector: string, at?: RegExp) =>
  rules
    .filter((r) => r.selector.split(",").map((s) => s.trim()).includes(selector) && (at ? at.test(r.at) : !r.at))
    .map((r) => r.body)
    .join(";");
const text = (html: string) =>
  html
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");

describe("F2: icons are drawn, not typed", () => {
  const glyph = /[+−→←›»✕×✓]/;

  it.each(pages)("%s: no plus, minus or arrow glyph stands in for an icon", (path) => {
    const html = read(path);
    for (const m of html.matchAll(/<summary\b[^>]*>([\s\S]*?)<\/summary>/g)) expect(text(m[1]!), path).not.toMatch(glyph);
    for (const m of html.matchAll(/<p class="swipe[^"]*"[^>]*>([\s\S]*?)<\/p>/g)) expect(text(m[1]!), path).not.toMatch(glyph);
    // No text node made only of an icon glyph anywhere on the page.
    expect(text(html).split(" ").filter((word) => /^[+−→←›»✕×✓]$/.test(word)), path).toEqual([]);
  });

  it("puts no glyph in generated content", () => {
    expect(css).not.toMatch(/content:\s*["'](\+|−|→|←|\\2212|\\2192|\\2b)["']/i);
  });

  it.each(langs)("/%s/: the graph's disclosure and the method's hint carry an inline SVG hidden from assistive tech", (lang) => {
    const html = read(lang);
    const summary = html.match(/<summary class="wf__open[^"]*"[^>]*>([\s\S]*?)<\/summary>/)?.[1] ?? "";
    expect(summary).toMatch(/<svg\b[^>]*class="wf__mark[^"]*"[^>]*aria-hidden="true"|<svg\b[^>]*aria-hidden="true"[^>]*class="wf__mark/);
    const hint = html.match(/<p class="swipe[^"]*"[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? "";
    expect(hint).toMatch(/<svg\b[^>]*aria-hidden="true"/);
  });

  it("draws both icons in the page's 1.5px ink line, one text line tall, the minus taking the plus's place when open", () => {
    for (const selector of [".wf__mark", ".swipe__arrow"]) {
      const b = body(selector);
      expect(b, selector).toMatch(/stroke:\s*currentColor/);
      expect(b, selector).toMatch(/stroke-width:\s*1\.5(px)?(;|$)/);
      expect(b, selector).toMatch(/height:\s*\.?\d*\.?\d+em\b/);
    }
    expect(body(".wf[open] .wf__mark-v")).toMatch(/transform:\s*scaleY\(0\)/);
  });
});

describe("F3: clear space between each cable station and its heading", () => {
  it.each(langs)("/%s/: every heading that carries a station keeps 12 px or more of paper before its first letter", (lang) => {
    const ids = [...read(lang).matchAll(/data-cable-at="([\w-]+)"/g)].map((m) => m[1]!).filter((id) => id !== "send");
    expect(ids.length).toBe(6);
    const rule = css.match(/:is\(([^)]*#hero-title[^)]*)\)\s*\{([^}]*)\}/);
    expect(rule, "a padding rule over the stations' headings").not.toBeNull();
    for (const id of ids) expect(rule![1]).toContain(`#${id}`);
    // The station is 14 px wide and centred in the margin: its right edge is margin / 2 + 7 px from the
    // page's edge, the heading's text starts at the margin plus this padding.
    const pad = rule![2]!.match(/padding-left:\s*max\(0(?:px)?,\s*(\d+)px\s*-\s*var\(--margin\)\s*\/\s*2\)/);
    expect(pad, "padding-left: max(0px, Npx - var(--margin) / 2)").not.toBeNull();
    expect(Number(pad![1]) - 7).toBeGreaterThanOrEqual(12);
  });
});

describe("F4: the method carousel peeks cleanly", () => {
  const narrow = /max-width:\s*1100px|width\s*<=\s*1100px/;

  it("sizes each step from the row so the next shows 15-20% of its width", () => {
    const steps = body(".steps", narrow);
    const peek = steps.match(/--peek:\s*calc\(var\(--card\)\s*\*\s*([\d.]+)\)/);
    expect(peek).not.toBeNull();
    expect(Number(peek![1])).toBeGreaterThanOrEqual(0.15);
    expect(Number(peek![1])).toBeLessThanOrEqual(0.2);
    expect(steps).toMatch(/--card:\s*calc\(\(100cqw\s*-\s*var\(--show\)\s*\*\s*var\(--gutter\)\)\s*\/\s*\(var\(--show\)\s*\+\s*\.?0?\.18\)\)/);
    expect(body(".stairs", narrow)).toMatch(/grid-auto-columns:\s*var\(--card\)/);
    expect(body(".method .wrap", narrow)).toMatch(/container-type:\s*inline-size/);
  });

  it("fades the peek into the paper so no word is cut at the edge, unfaded under keyboard focus", () => {
    const steps = body(".steps", narrow);
    // Fully transparent before the next card starts (the soft edge sits in the gap), no half-opaque stop.
    const fade = steps.match(/mask-image:\s*linear-gradient\(to right,\s*#000 calc\(100% - var\(--peek\) - (\d+)px\),\s*(?:transparent|#0000) calc\(100% - var\(--peek\) - (\d+)px\)\)/);
    expect(fade).not.toBeNull();
    expect(Number(fade![2])).toBeGreaterThanOrEqual(1);
    expect(Number(fade![1])).toBeGreaterThan(Number(fade![2]));
    expect(steps).not.toMatch(/rgb\(0 0 0 \/ 0?\.\d+\)|#00000080/);
    expect(body(".steps:focus-visible", narrow)).toMatch(/mask-image:\s*none/);
    // The last step can reach the clear part of the row.
    expect(body(".stairs", narrow)).toMatch(/padding-inline-end:\s*calc\(var\(--peek\)\s*\+\s*var\(--gutter\)\)/);
  });

  it.each(langs)("/%s/: keeps scroll-snap, keyboard access and the hint", (lang) => {
    expect(body(".steps", narrow)).toMatch(/scroll-snap-type:\s*x mandatory/);
    expect(body(".stage", narrow)).toMatch(/scroll-snap-align:\s*start/);
    expect(read(lang)).toMatch(/<div class="steps[^"]*"[^>]*data-steps[^>]*role="region"[^>]*tabindex="0"/);
    expect(body(".swipe", narrow)).toMatch(/display:\s*block/);
  });
});

describe("F5: the hero plate on tablets and phones", () => {
  const tablet = /max-width:\s*1199px|width\s*<=\s*1199px/;
  const phone = /max-width:\s*720px|width\s*<=\s*720px/;

  it("sizes the plate from the hero's height on tablets so the land fills the lower half", () => {
    expect(body(".hero__art")).toMatch(/container-type:\s*size/);
    const sw = body(".hero__art", tablet).match(/--sw:\s*max\(100%,\s*1000px,\s*(\d+)cqh\)/);
    expect(sw).not.toBeNull();
    // The picture is 1915 x 821 and its land starts at 48% of its height: 2 x the hero's height puts the
    // mountains at the middle of the hero.
    expect(Number(sw![1])).toBeGreaterThanOrEqual(200);
  });

  it("veils only the text: the action's box is as wide as its content on tablets", () => {
    expect(body(".hero__act", tablet)).toMatch(/justify-self:\s*start/);
    const lead = body(".hero__lead::before") || body(".hero__lead:before");
    expect(lead).toMatch(/inset:\s*calc\(-1\s*\*\s*var\(--vy\)\)\s*calc\(-1\s*\*\s*var\(--vx\)\)/);
  });

  it("lets the plate show below the action on phones, clear of the text", () => {
    const pad = body(".hero", phone).match(/padding-bottom:\s*clamp\(([\d.]+)rem/);
    expect(pad).not.toBeNull();
    expect(Number(pad![1])).toBeGreaterThanOrEqual(12);
    const sw = body(".hero__art", phone).match(/--sw:\s*(\d+)px/);
    expect(Number(sw?.[1] ?? 0)).toBeGreaterThanOrEqual(1000);
  });
});

describe("F7: the real graph at full width, then the normal section gap", () => {
  it("lets the graph's plate run the full width of the text", () => {
    const plate = body(".wf__plate");
    expect(plate).not.toMatch(/max-width/);
    expect(plate).toMatch(/width:\s*100%/);
  });

  it("drops the flow section's bottom padding before the method on the same paper, from tablet up", () => {
    // The minifier writes `min-width: 721px` as `width>=721px`.
    expect(body(".flow-sec:has(+#method)", /min-width:\s*721px|width\s*>=\s*721px/)).toMatch(/padding-bottom:\s*0\b/);
  });

  it("keeps that padding on phones, so the collapsed graph summary never sits on the method heading", () => {
    expect(body(".flow-sec:has(+#method)")).not.toMatch(/padding-bottom:\s*0\b/);
  });
});

describe("F8: the method's sheets read at body size", () => {
  it("sets the sheets' text with --fs-body and their notes with --fs-small", () => {
    for (const selector of [".survey", ".gloss", ".adr", ".checks"]) expect(body(selector), selector).toMatch(/font-size:\s*var\(--fs-body\)/);
    for (const selector of [".survey dd", ".gloss dd"]) expect(body(selector), selector).toMatch(/font-size:\s*var\(--fs-small\)/);
  });

  it("keeps the six size tokens, the smallest 14 px, and the plan's labels at 13 px or more at its narrowest", () => {
    const root = body(":root");
    expect(root.match(/--fs-[a-z]+\s*:/g)).toHaveLength(6);
    expect(root).toMatch(/--fs-small:\s*\.875rem/);
    // The plan is 260 units wide and renders 223 px wide at 1440 (a fifth of the row, less the padding).
    for (const selector of [".map__nodes", ".map__links"]) {
      const size = Number(body(selector).match(/(\d+)px/)?.[1] ?? 0);
      expect((size * 223) / 260, selector).toBeGreaterThanOrEqual(13);
    }
  });

  it("keeps the brick notes AA on the plate paper", () => {
    const hex = (name: string) => body(":root").match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, "i"))![1]!;
    const lum = (h: string) => {
      const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
      return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
    };
    const [a, b] = [lum(hex("brick")), lum(hex("plate"))];
    expect((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)).toBeGreaterThanOrEqual(4.5);
  });
});

describe("F9: the padel plan states only confirmed facts", () => {
  const cases = [
    {
      path: "es/casos/club-de-padel",
      roles: ["Administrador", "profesor", "encargado de pádel", "encargado de fútbol", "encargado del programa infantil", "personal de limpieza"],
      parts: [/Clases/, /asistencia/, /evaluación técnica del 1 al 10/, /comunicados, incidencias y la lista de limpieza de cada turno/i, /stock bajo/, /pedidos de insumos/, /reservas que se pisen/, /cuota del mes al día o pendiente/],
      caption: "Plano simplificado",
    },
    {
      path: "en/cases/padel-club",
      roles: ["Administrator", "coach", "padel manager", "football manager", "kids' programme manager", "cleaning staff"],
      parts: [/Classes/, /attendance/, /technical score from 1 to 10/, /notices, incidents and each shift's cleaning checklist/i, /low-stock/, /supply requests/, /overlapping bookings/, /monthly fee up to date or pending/],
      caption: "Simplified plan",
    },
  ];

  it.each(cases)("$path: names the six roles that combine and what each part of the system holds", ({ path, roles, parts, caption }) => {
    const page = text(read(path));
    for (const role of roles) expect(page, role).toContain(role);
    for (const part of parts) expect(page).toMatch(part);
    expect(page).toContain(caption);
  });

  it.each(cases)("$path: asserts no per-role visibility the project's documents do not confirm", ({ path }) => {
    const page = text(read(path));
    expect(page).not.toMatch(
      /qué ve cada rol|ve exactamente lo que le toca|cada rol ve solo lo suyo|solo la lista del turno activo|todo el club: alumnos|sus clases: asistencia|su área: comunicados|what each role sees|sees exactly their part|each role sees only its own part|only the active shift's checklist|the whole club: students|their classes: attendance|their area: notices/i,
    );
  });
});
