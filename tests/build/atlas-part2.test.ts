import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// L75, T13: the calm atlas of the hero and footer carried through the rest of the page. The padel club is
// the second estate (straw wash, no turf, its system drawn as a plan), the offer a ledger of the old way
// struck through, the contact on paper with no picture slot (no blueprint, no name above the heading), the
// cable in ink and sage, and no court colours left. The engineering stays legible.

const dist = fileURLToPath(new URL("../../dist/", import.meta.url));
const page = (lang: string) => readFileSync(join(dist, lang, "index.html"), "utf8");
const langs = ["es", "en"] as const;

const sectionOf = (html: string, id: string) => {
  const start = html.search(new RegExp(`<section\\b[^>]*\\baria-labelledby="${id}"`));
  return start < 0 ? "" : html.slice(start, html.indexOf("</section>", start));
};
const text = (html: string) => html.replace(/<(script|style)\b[\s\S]*?<\/\1>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

const shippedCss = (lang: string) => {
  const assets = join(dist, "_astro");
  const files = readdirSync(assets)
    .filter((file) => file.endsWith(".css"))
    .map((file) => readFileSync(join(assets, file), "utf8"));
  const inline = [...page(lang).matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]!);
  return [...files, ...inline].join("\n");
};
const unscoped = (s: string) => s.replace(/\[data-astro-cid-[\w-]+\]/g, "").trim();
// Innermost rules with their at-rules; selectors without Astro's scope attribute.
const leafRules = (css: string) => {
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
};
const plain = (css: string, selector: string) =>
  leafRules(css)
    .filter((r) => !r.at.length && r.selectors.includes(selector))
    .map((r) => r.body)
    .join(";");

const courtColours = /#(ffe927|1e4bd7|1a40b8|163aa6|5577e0|e4eafb|9db4ff)\b/i;

describe.each(langs)("atlas part 2 /%s/", (lang) => {
  // Craft floor: no eyebrow or kicker above a heading, in any section after the method.
  it.each(["padel-title", "offer-title", "contact-title"])("opens %s with its heading, nothing above it", (id) => {
    const section = sectionOf(page(lang), id);
    expect(section).not.toBe("");
    const before = section.slice(0, section.indexOf("<h2"));
    expect(text(before).trim()).toBe("");
    expect(section).not.toMatch(/\bdata-case-marker=/);
    expect(section).not.toMatch(/\bclass="[^"]*\b(case-mark|label)\b/);
  });

  it("lays the padel case on the straw wash, without turf, court colours or a marker label", () => {
    const html = page(lang);
    const tag = html.match(/<section\b[^>]*\bid="padel"[^>]*>/)?.[0] ?? "";
    expect(tag).toMatch(/\bdata-case="padel"/);
    expect(tag).not.toMatch(/\bturf\b/);
    expect(sectionOf(html, "padel-title")).not.toMatch(courtColours);
    expect(text(html)).not.toContain(lang === "es" ? "Caso 2 · Club de pádel" : "Case 2 · Padel club");
    // The second case says so in its first sentence instead of a label.
    const lead = sectionOf(html, "padel-title").match(/<p\b[^>]*\bclass="lead[^"]*"[^>]*>([^<]*)<\//)?.[1] ?? "";
    expect(lead).toMatch(lang === "es" ? /^Segundo caso/ : /second case/i);
    // The minifier drops the quotes in the attribute selector.
    const css = shippedCss(lang);
    expect(`${plain(css, '[data-case="padel"]')};${plain(css, "[data-case=padel]")}`).toMatch(/background(-color)?:\s*var\(--straw\)/);
  });

  // The club's engineering as legible content: the plan of the system, one plot per part.
  it("draws the club's system as a plan with roles, stock, cleaning per shift, grill and Kids fees", () => {
    const section = sectionOf(page(lang), "padel-title");
    const plan = section.slice(section.indexOf("data-plan"), section.indexOf("</figure>", section.indexOf("data-plan")));
    const plots = [...plan.matchAll(/<li\b[^>]*\bdata-plot(?=[\s>])[^>]*>([\s\S]*?)<\/li>/g)].map((m) => text(m[1]!));
    expect(plots).toHaveLength(5);
    const words =
      lang === "es"
        ? [/roles/i, /stock|agot/i, /turno/i, /parrilla/i, /kids/i]
        : [/roles/i, /stock|run out/i, /shift/i, /grill/i, /kids/i];
    for (const word of words) expect(plots.some((p) => word.test(p)), String(word)).toBe(true);
    expect(plan).toMatch(/\bdata-compass(?=[\s>])/);
    expect(text(section)).toContain("17/09/2026");
    // The court photo sits on a plate.
    expect(section).toMatch(/<div\b[^>]*\bclass="[^"]*\bplate\b[^"]*"[^>]*>\s*<figure\b[^>]*\bdata-slot="club-court"/);
  });

  // L40 + T13: six benefits as a ledger, the old way struck through on each line, no icon cards.
  it("keeps the offer as a ledger of 6 benefits, each with the old way struck through, no icons", () => {
    const section = sectionOf(page(lang), "offer-title");
    const items = [...section.matchAll(/<li\b[^>]*\bdata-benefit(?=[\s>])[^>]*>([\s\S]*?)<\/li>/g)].map((m) => m[1]!);
    expect(items).toHaveLength(6);
    for (const item of items) {
      expect(item).toMatch(/<s\b[^>]*>[^<]{8,}<\/s>/);
      expect(item).not.toMatch(/<(svg|img)\b/);
      // The heading comes first: the struck line is never a label above it.
      expect(item.indexOf("<h3")).toBeLessThan(item.indexOf("<s"));
    }
    expect(section).toMatch(/<ul\b[^>]*\bclass="[^"]*\bledger\b/);
    expect(section).toMatch(/<div\b[^>]*\bclass="[^"]*\bplate\b[^"]*"[^>]*>\s*<figure\b[^>]*\bdata-slot="business-owner"/);
  });

  // Fix batch after T13: the tall LG plate left a blank block beside the heading at 1440/768. The
  // contact now reads heading, intro, composer, rows, with no picture slot and no monogram.
  it("composes the contact as heading, intro and composer, with no LG plate or picture slot", () => {
    const section = sectionOf(page(lang), "contact-title");
    expect(section).not.toMatch(/\bdata-slot=/);
    expect(section).not.toMatch(/<figure\b/);
    expect(text(section)).not.toMatch(/\bLG\b/);
    expect(section).not.toMatch(/\bslot--(sage|blue)\b/);
    expect(section).not.toMatch(courtColours);
    // The intro follows the heading directly, then the composer.
    const afterHead = section.slice(section.indexOf("</h2>") + 5);
    expect(afterHead).toMatch(/^\s*<p\b[^>]*>[^<]{40,}<\/p>/);
    expect(section.indexOf("</h2>")).toBeLessThan(section.indexOf('name="topic"'));
    expect(text(section)).toContain("Tucumán, Argentina");
    expect(section).toMatch(/<a\b[^>]*\bid="send"[^>]*\bhref="mailto:/);
  });

  // The contact follows the offer directly: no closing button there, the closing sentence ends it.
  it("ends the offer with its closing sentence, without a 'tell me your case' button", () => {
    const section = sectionOf(page(lang), "offer-title");
    expect(section).not.toMatch(/\bclass="[^"]*\bbtn\b/);
    expect(section).not.toMatch(/href="#contact"/);
    expect(text(section)).not.toContain(lang === "es" ? "Contame tu caso" : "Tell me about your case");
    const paragraphs = [...section.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map((m) => text(m[1]!).trim());
    expect(paragraphs.at(-1)).toBe(
      lang === "es"
        ? "Arrancamos por lo que más tiempo te come, y lo ves funcionando antes de seguir con lo próximo."
        : "We start with whatever eats most of your time, and you see it working before we move on to the next thing.",
    );
  });

  // The plan already has a Roles plot; "what I built" no longer repeats it.
  it("lists what was built at the club without repeating the plan's roles plot", () => {
    const section = sectionOf(page(lang), "padel-title");
    const title = lang === "es" ? "Lo que construí" : "What I built";
    const at = section.indexOf(`${title}</h3>`);
    expect(at).toBeGreaterThan(-1);
    const list = section.slice(at, section.indexOf("</ul>", at));
    const items = [...list.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map((m) => text(m[1]!).replace(/&#39;/g, "'").trim());
    expect(items).toEqual(
      lang === "es"
        ? ["Funciona en el celular y en la compu.", "Un historial de cambios que no se borra."]
        : ["Works on phone and desktop.", "A change history that can't be erased."],
    );
  });
});

describe("atlas part 2 CSS", () => {
  const css = shippedCss("es");

  // The hero's text veils reach 5rem past the action at the right edge: the hero clips them sideways
  // (not vertically, so the art and the veils still fade into the next section).
  it("clips the hero sideways so its veils never widen the page", () => {
    const hero = plain(css, ".hero");
    expect(hero).toMatch(/overflow-x:\s*clip/);
    expect(hero).not.toMatch(/overflow(-y)?:\s*(hidden|clip)\b(?!-)/);
  });

  it("retires the turf, the tracked labels, the blueprint and the court colours", () => {
    const selectors = leafRules(css).flatMap((r) => r.selectors);
    expect(selectors.filter((s) => /\.(turf|case-mark|label|blueprint|plist|mark__name)(?![\w-])/.test(s))).toEqual([]);
    expect(css).not.toMatch(/--(yellow|blue-deep|charcoal)\s*:/);
    expect(css).not.toMatch(/#ffe927|#1a40b8/i);
  });

  // impeccable detector: no bounce or elastic curve. Every shipped cubic-bezier keeps its y control
  // points inside 0..1, and the envelope's hops decelerate on an exponential ease-out.
  it("ships no overshooting cubic-bezier and hops the envelope on an exponential ease-out", () => {
    const curves = [...css.matchAll(/cubic-bezier\(([^)]*)\)/g)].map((m) => m[1]!.split(",").map(Number));
    expect(curves.length).toBeGreaterThan(0);
    for (const [, y1, , y2] of curves) {
      expect(y1).toBeGreaterThanOrEqual(0);
      expect(y1).toBeLessThanOrEqual(1);
      expect(y2).toBeGreaterThanOrEqual(0);
      expect(y2).toBeLessThanOrEqual(1);
    }
    for (const name of ["flow-hop-x", "flow-hop-y"]) {
      const at = css.indexOf(`@keyframes ${name}`);
      expect(at, name).toBeGreaterThan(-1);
      const body = css.slice(at, css.indexOf("}}", at));
      const used = [...body.matchAll(/cubic-bezier\(([^)]*)\)/g)].map((m) => m[1]!.split(",").map(Number).join(","));
      expect(used).toHaveLength(4);
      expect(new Set(used)).toEqual(new Set(["0.16,1,0.3,1"]));
    }
  });

  // The footer's focus ring was the last court colour; it now uses the world's ink.
  it("retires the --blue token and focuses the footer in ink", () => {
    expect(css).not.toMatch(/--blue\b/);
    expect(plain(css, ".foot")).toMatch(/--focus:\s*var\(--ink\)/);
  });

  it("draws the cable in ink and sage only, with no dark-ground variant left", () => {
    const cable = leafRules(css).filter((r) => r.selectors.some((s) => s.startsWith(".cable")));
    expect(cable.length).toBeGreaterThan(0);
    expect(cable.filter((r) => r.selectors.some((s) => /data-dark/.test(s)))).toEqual([]);
    expect(page("es")).not.toMatch(/data-dark/);
  });
});
