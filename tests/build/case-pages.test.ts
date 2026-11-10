import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// T4 (S5, S9): one page per case and language, each the counterpart of the other, linked from the home.

const dist = fileURLToPath(new URL("../../dist/", import.meta.url));
const content = fileURLToPath(new URL("../../src/content/case-studies/", import.meta.url));
const site = "https://gagaismo.github.io";
const read = (path: string) => readFileSync(join(dist, path, "index.html"), "utf8");

const cases = [
  { key: "automation", es: "/es/casos/automatizacion/", en: "/en/cases/automation/" },
  { key: "club-padel", es: "/es/casos/club-de-padel/", en: "/en/cases/padel-club/" },
] as const;
const langs = ["es", "en"] as const;
const pages = cases.flatMap((c) => langs.map((lang) => ({ ...c, lang, path: c[lang], other: c[lang === "es" ? "en" : "es"] })));

const htmlFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? htmlFiles(join(dir, entry.name)) : entry.name.endsWith(".html") ? [join(dir, entry.name)] : [],
  );
const inlineScripts = (html: string) => [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[0]);

describe.each(pages)("case page $path", ({ lang, path, other }) => {
  it("is built", () => {
    expect(existsSync(join(dist, path, "index.html"))).toBe(true);
  });

  it("sets <html lang>", () => {
    expect(read(path)).toMatch(new RegExp(`<html[^>]*\\blang="${lang}"`));
  });

  it("points canonical and hreflang at itself and its counterpart", () => {
    const html = read(path);
    expect(html).toContain(`<link rel="canonical" href="${site}${path}">`);
    expect(html).toContain(`<link rel="alternate" hreflang="${lang}" href="${site}${path}">`);
    const otherLang = lang === "es" ? "en" : "es";
    expect(html).toContain(`<link rel="alternate" hreflang="${otherLang}" href="${site}${other}">`);
    const es = lang === "es" ? path : other;
    expect(html).toContain(`<link rel="alternate" hreflang="x-default" href="${site}${es}">`);
  });

  it("links the ES | EN switch to the counterpart page", () => {
    const html = read(path);
    const langs = html.slice(html.indexOf('class="langs"'), html.indexOf("</div>", html.indexOf('class="langs"')));
    expect(langs).toMatch(new RegExp(`href="${path}"[^>]*aria-current="page"`));
    expect(langs).toMatch(new RegExp(`href="${other}"`));
  });

  it("has exactly one h1", () => {
    expect(read(path).match(/<h1\b/g)).toHaveLength(1);
  });

  it("ends with the email call and a link back to the home", () => {
    const html = read(path);
    const main = html.slice(html.indexOf("<main"), html.indexOf("</main>"));
    const close = main.slice(main.lastIndexOf("<section"));
    expect(close).toMatch(/href="mailto:lautarocontactof@gmail\.com[^"]*"/);
    expect(close).toContain(`href="/${lang}/"`);
  });

  it("shows no GitHub profile", () => {
    const html = read(path);
    expect(html).not.toMatch(/github\.com\/Gagaismo/i);
    expect(html).not.toMatch(/>\s*GitHub\s*</);
  });

  it("points the header and footer section links at the home, not at missing anchors", () => {
    const html = read(path);
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    const anchors = [...html.matchAll(/\shref="#([^"]+)"/g)].map((m) => m[1]);
    expect(anchors.filter((id) => !ids.has(id))).toEqual([]);
  });

  it("gives every <img> an alt attribute", () => {
    const imgs = read(path).match(/<img\b[^>]*>/g) ?? [];
    expect(imgs.length).toBeGreaterThan(0);
    expect(imgs.filter((tag) => !/\salt(="[^"]*")?(?=[\s>])/.test(tag))).toEqual([]);
  });

  // No JS of its own: whatever script the page ships, the home ships too.
  it("ships no script beyond the home's", () => {
    const home = new Set(inlineScripts(read(`/${lang}/`)));
    expect(inlineScripts(read(path)).filter((script) => !home.has(script))).toEqual([]);
  });
});

describe.each(langs)("home /%s/", (lang) => {
  it("links each case to its full page", () => {
    const html = read(`/${lang}/`);
    const label = lang === "es" ? "Ver el caso completo" : "See the full case";
    for (const c of cases) {
      expect(html).toMatch(new RegExp(`<a\\b[^>]*href="${c[lang]}"[^>]*>\\s*${label}`));
    }
  });
});

describe("site", () => {
  it("keeps no #caso-completo placeholder in any page", () => {
    const found = htmlFiles(dist).filter((file) => readFileSync(file, "utf8").includes("#caso-completo"));
    expect(found).toEqual([]);
  });

  it.each(["es", "en"])("publishes both case entries in %s", (lang) => {
    for (const file of ["automation.md", "club-padel.md"]) {
      const md = readFileSync(join(content, lang, file), "utf8");
      expect(md, file).toMatch(/^draft: false$/m);
    }
  });
});
