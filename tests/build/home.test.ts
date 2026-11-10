import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const dist = fileURLToPath(new URL("../../dist/", import.meta.url));
const page = (lang: string) => readFileSync(join(dist, lang, "index.html"), "utf8");
const langs = ["es", "en"] as const;
const phoneFrames = /<figure\b[^>]*\bdata-phone(?=[\s>])[^>]*>([\s\S]*?)<\/figure>/g;
// The <section> labelled by a heading id, up to its first closing tag.
const sectionOf = (html: string, id: string) => {
  const start = html.search(new RegExp(`<section\\b[^>]*\\baria-labelledby="${id}"`));
  return start < 0 ? "" : html.slice(start, html.indexOf("</section>", start));
};

const technologies = [
  "React", "React Native", "Astro", "Supabase", "PostgreSQL", "Postgres", "MySQL", "SQLite", "MongoDB", "Firebase",
  "Vercel", "Cloudflare", "Docker", "VPS", "n8n", "Zapier", "Node", "Python", "Rust", "Java", "TypeScript",
  "JavaScript", "Next.js", "Vite", "Tauri", "Notion", "Google Sheets", "Google Workspace", "Documenso", "OpenAI",
  "DeepSeek", "Groq", "MCP", "API", "APIs", "GitHub Actions", "CI", "Meta Ads",
];

describe.each(langs)("home /%s/", (lang) => {
  it("sets <html lang>", () => {
    expect(page(lang)).toMatch(new RegExp(`<html[^>]*\\blang="${lang}"`));
  });

  // L64: the user asked to remove everything related to their GitHub profile.
  it("links the real email, no placeholder and no GitHub profile", () => {
    const html = page(lang);
    expect(html).toContain("mailto:lautarocontactof@gmail.com");
    expect(html).not.toMatch(/github\.com\/Gagaismo/i);
    expect(html).not.toMatch(/>\s*GitHub\s*</);
    expect(html).not.toContain("#email-pendiente");
  });

  it("shows the automation case before the padel case", () => {
    const html = page(lang);
    const automation = html.indexOf('id="automation"');
    const padel = html.indexOf('id="padel"');
    expect(automation).toBeGreaterThan(-1);
    expect(padel).toBeGreaterThan(automation);
  });

  // L40 supersedes the two technology groups of L17: an owner reads outcomes, not tool names.
  it("names no technology, framework, database or tool", () => {
    const html = page(lang);
    const attrs = [...html.matchAll(/\b(?:alt|aria-label|title|content)="([^"]*)"/g)].map((m) => m[1]);
    const text = [
      html.replace(/<(script|style)\b[\s\S]*?<\/\1>/g, " ").replace(/<[^>]+>/g, " "),
      ...attrs,
    ]
      .join(" ")
      .replace(/github\.com\/Gagaismo/gi, " ");
    const found = technologies.filter((name) => new RegExp(`(?<![\\w.])${name.replace(/[.+]/g, "\\$&")}(?![\\w])`, "i").test(text));
    expect(found).toEqual([]);
    expect(html).not.toMatch(/\bdata-(tech-group|stack)\b/);
  });

  it("never mentions rflap or orca-stack", () => {
    expect(page(lang).toLowerCase()).not.toMatch(/rflap|r flap|orca-stack/);
  });

  it("draws one decorative cable with a node per main section", () => {
    const html = page(lang);
    const cables = html.match(/<[a-z]+\b[^>]*\bdata-cable(?=[\s>])[^>]*>/g) ?? [];
    expect(cables).toHaveLength(1);
    expect(cables[0]).toMatch(/\baria-hidden="true"/);
    const nodes = [...html.matchAll(/\bdata-cable-node="([a-z]+)"/g)].map((m) => m[1]);
    expect(nodes).toEqual(["hero", "automation", "method", "padel", "offer", "contact"]);
  });

  // L76: the hero phone's feed moved into the automation case, as the plan's live event log.
  it("shows a decorative feed of sample automation events with a hidden description", () => {
    const html = page(lang);
    const feeds = html.match(/<[a-z]+\b[^>]*\bdata-feed(?=[\s>])[^>]*>/g) ?? [];
    expect(feeds).toHaveLength(1);
    expect(feeds[0]).toMatch(/\baria-hidden="true"/);
    expect(html.match(/\bdata-feed-card(?=[\s>])/g)?.length ?? 0).toBeGreaterThanOrEqual(3);
    expect(html).toContain(lang === "es" ? "datos de ejemplo" : "sample data");
    const desc = html.match(/<p\b[^>]*\bdata-feed-desc(?=[\s>])[^>]*>([^<]*)<\/p>/);
    expect(desc?.[0]).toMatch(/\bclass="sr-only"/);
    expect(desc?.[1]?.trim().length ?? 0).toBeGreaterThan(40);
  });

  // T13: the padel marker went too (eyebrow ban); "second case" now opens its lead.
  it("keeps both cases in their sections, neither opening with a marker label", () => {
    const html = page(lang);
    const sections = [...html.matchAll(/<section\b[^>]*>/g)].map((m) => m[0]);
    const cased = sections
      .filter((tag) => /\bdata-case="/.test(tag))
      .map((tag) => [tag.match(/\bdata-case="([a-z]+)"/)?.[1], tag.match(/\baria-labelledby="([^"]+)"/)?.[1]]);
    expect(cased).toEqual([
      ["automation", "change-title"],
      ["automation", "flow-title"],
      ["automation", "method-title"],
      ["padel", "padel-title"],
    ]);
    expect(html).not.toMatch(/\bdata-case-marker=/);
  });

  // Craft floor: no eyebrow or kicker above a heading. The heading is the first text of each section,
  // and no tracked mono label is left in them.
  it.each(["change-title", "flow-title", "method-title"])("opens the %s section with its heading, no label above it", (id) => {
    const section = sectionOf(page(lang), id);
    expect(section).not.toBe("");
    const before = section.slice(0, section.indexOf("<h2"));
    expect(before.replace(/<[^>]+>/g, "").trim()).toBe("");
    expect(section).not.toMatch(/\bdata-case-marker=/);
    expect(section).not.toMatch(/\bclass="[^"]*\b(case-mark|label)\b/);
  });

  // L75: the automation case takes the calm look of the hero and footer: ink on paper; no court blue,
  // no ball yellow, no blueprint grid.
  it("draws the automation case without court blue, ball yellow or a blueprint grid", () => {
    for (const id of ["change-title", "flow-title", "method-title"]) {
      const section = sectionOf(page(lang), id);
      expect(section, id).not.toMatch(/#(ffe927|1e4bd7|1a40b8|163aa6|5577e0|e4eafb)\b/i);
      expect(section.match(/<section\b[^>]*>/)?.[0], id).not.toMatch(/\bblueprint\b/);
    }
  });

  it("draws the flow as a plan with a compass rose and a scale bar, the event log beside it", () => {
    const section = sectionOf(page(lang), "flow-title");
    const at = section.indexOf("data-flow");
    const flow = section.slice(at, section.indexOf("</figure>", at));
    expect(flow.match(/\bdata-compass(?=[\s>])/g)?.length ?? 0).toBeGreaterThanOrEqual(1);
    expect(flow.match(/\bdata-scale(?=[\s>])/g)?.length ?? 0).toBeGreaterThanOrEqual(1);
    expect(section).toMatch(/<[a-z]+\b[^>]*\bdata-feed(?=[\s>])[^>]*\baria-hidden="true"/);
    expect(section).toContain(lang === "es" ? "datos de ejemplo" : "sample data");
    expect(section).toMatch(/<p\b[^>]*\bclass="sr-only"[^>]*\bdata-feed-desc(?=[\s>])/);
  });

  it("shows one or two phone screens in the after column, each in a phone frame with alt text", () => {
    const html = page(lang);
    const after = html.slice(html.indexOf("side--after"), html.indexOf("</section>", html.indexOf("side--after")));
    const phones = [...after.matchAll(phoneFrames)].map((m) => m[1]!);
    expect(phones.length).toBeGreaterThanOrEqual(1);
    expect(phones.length).toBeLessThanOrEqual(2);
    for (const phone of phones) expect(phone).toMatch(/<img\b[^>]*\balt="[^"]{20,}"/);
  });

  // L75: "Saca el telefono del hero." The hero keeps the plate, the promise, the lead and the actions.
  it("shows no phone and no feed in the hero", () => {
    const html = page(lang);
    const start = html.search(/<section\b[^>]*\bclass="hero\b/);
    const hero = html.slice(start, html.indexOf("</section>", start));
    expect(hero).not.toBe("");
    expect(hero).not.toMatch(/\bdata-phone(?=[\s>])/);
    expect(hero).not.toMatch(/\bdata-feed(?=[\s>])/);
    expect(hero).toContain("mailto:lautarocontactof@gmail.com");
  });

  it("draws one phone on the page, in the after column", () => {
    expect([...page(lang).matchAll(phoneFrames)]).toHaveLength(1);
  });

  // L42: the sample phone screen over the court photo did not convince; the photo stands alone.
  it("shows the padel case with the court photo and no sample phone screen", () => {
    const html = page(lang);
    const padel = html.slice(html.indexOf('id="padel"'), html.indexOf("</section>", html.indexOf('id="padel"')));
    expect(padel).not.toMatch(/\bdata-ui\b/);
    expect(padel).not.toContain(lang === "es" ? "Datos de ejemplo" : "Sample data");
    expect(padel).toMatch(/\bdata-slot="club-court"/);
    expect(padel).toMatch(/<img\b[^>]*\balt="[^"]*(pádel|padel)[^"]*"/);
  });

  it("draws the real sale-to-onboarding workflow with generic labels only", () => {
    const svg = page(lang).match(/<svg\b[^>]*\bdata-workflow(?=[\s>])[^>]*>[\s\S]*?<\/svg>/g) ?? [];
    expect(svg.length).toBeGreaterThanOrEqual(1);
    const labels =
      lang === "es"
        ? ["Formulario de venta", "Mail de bienvenida", "Contrato", "Reintento", "Aviso al operador"]
        : ["Sale form", "Welcome email", "Contract", "Retry", "Operator alert"];
    for (const graph of svg) {
      expect(graph).toMatch(/\brole="img"/);
      expect(graph.match(/\baria-label="([^"]*)"/)?.[1]?.length ?? 0).toBeGreaterThan(60);
      // Labels may wrap over several <tspan> lines: compare the visible text with the tags removed.
      const text = graph.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
      for (const label of labels) expect(text).toContain(label);
      expect(graph.toLowerCase()).not.toMatch(/skool|webhook|https?:|n8n|@|token/);
    }
  });

  it("gives every <img> an alt attribute", () => {
    const imgs = page(lang).match(/<img\b[^>]*>/g) ?? [];
    expect(imgs.length).toBeGreaterThan(0);
    // A decorative picture's empty alt is written as a bare `alt`.
    expect(imgs.filter((tag) => !/\salt(="[^"]*")?(?=[\s>])/.test(tag))).toEqual([]);
  });
});

// T4: the case pages tell the engineering story in the same plain words, so the same names stay out.
describe.each(["es/casos/automatizacion", "es/casos/club-de-padel", "en/cases/automation", "en/cases/padel-club"])(
  "case page /%s/",
  (path) => {
    it("names no technology, framework, database or tool", () => {
      const html = page(path);
      const attrs = [...html.matchAll(/\b(?:alt|aria-label|title|content)="([^"]*)"/g)].map((m) => m[1]);
      const text = [html.replace(/<(script|style)\b[\s\S]*?<\/\1>/g, " ").replace(/<[^>]+>/g, " "), ...attrs].join(" ");
      const found = technologies.filter((name) => new RegExp(`(?<![\\w.])${name.replace(/[.+]/g, "\\$&")}(?![\\w])`, "i").test(text));
      expect(found).toEqual([]);
    });
  },
);

describe("shipped CSS", () => {
  it("honours prefers-reduced-motion", () => {
    const assets = join(dist, "_astro");
    const css = readdirSync(assets)
      .filter((file) => file.endsWith(".css"))
      .map((file) => readFileSync(join(assets, file), "utf8"))
      .join("\n");
    expect(css + page("es")).toMatch(/prefers-reduced-motion:\s*reduce/);
  });

  it("shows the cable static under prefers-reduced-motion", () => {
    const assets = join(dist, "_astro");
    const css = readdirSync(assets)
      .filter((file) => file.endsWith(".css"))
      .map((file) => readFileSync(join(assets, file), "utf8"))
      .join("\n");
    expect(css + page("es")).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[^{}]*\.cable[^{}]*\{/);
  });

  it("keeps the feed static under prefers-reduced-motion", () => {
    const assets = join(dist, "_astro");
    const css = readdirSync(assets)
      .filter((file) => file.endsWith(".css"))
      .map((file) => readFileSync(join(assets, file), "utf8"))
      .join("\n");
    expect(css + page("es")).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[^{}]*\.feed[^{}]*\{/);
  });
});

describe("shipped scripts", () => {
  it.each(langs)("only look up element ids that exist on /%s/", (lang) => {
    const html = readFileSync(fileURLToPath(new URL(`../../dist/${lang}/index.html`, import.meta.url)), "utf8");
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    // The minifier may quote ids with backticks.
    const lookedUp = [...html.matchAll(/getElementById\(["'`]([^"'`]+)["'`]\)/g)].map((m) => m[1]);
    expect(lookedUp.length).toBeGreaterThan(0);
    expect(lookedUp.filter((id) => !ids.has(id))).toEqual([]);
  });
});
