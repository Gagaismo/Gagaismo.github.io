import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// Idea 7: a shorter page a small-business owner reads in one go. Numbers out of the method, services and
// technologies in one section, the composer kept with the contact.

const dist = fileURLToPath(new URL("../../dist/", import.meta.url));
const page = (lang: string) => readFileSync(join(dist, lang, "index.html"), "utf8");
const langs = ["es", "en"] as const;

// The visible text of <main>: no scripts, styles or attributes.
const mainText = (html: string) =>
  (html.match(/<main\b[\s\S]*?<\/main>/)?.[0] ?? "")
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");

// The element that opens with `open` and its matching close tag, nesting included.
function element(html: string, open: RegExp): string {
  const start = html.search(open);
  if (start < 0) return "";
  const tag = html.slice(start).match(/^<([a-z0-9]+)/)?.[1] ?? "";
  const re = new RegExp(`<${tag}\\b|</${tag}>`, "g");
  re.lastIndex = start;
  let depth = 0;
  for (let m = re.exec(html); m; m = re.exec(html)) {
    depth += m[0].startsWith("</") ? -1 : 1;
    if (depth === 0) return html.slice(start, m.index + m[0].length);
  }
  return html.slice(start);
}

describe.each(langs)("shorter page /%s/", (lang) => {
  it("shows no figures from the repository in the method", () => {
    const text = mainText(page(lang));
    expect(text).not.toMatch(/\b417\b/);
    expect(text).not.toMatch(/\b1[.,]742\b/);
    expect(text).not.toMatch(/\b27\b/);
    expect(text).not.toMatch(/\b24\b/);
    expect(text).not.toMatch(/\b23 (más|more)\b/);
  });

  it("puts the five method steps in one keyboard-reachable, labelled scroller", () => {
    const method = element(page(lang), /<section\b[^>]*\bid="method"/);
    const scroller = element(method, /<[a-z]+\b[^>]*\bdata-steps(?=[\s>])/);
    expect(scroller).toMatch(/^<[a-z]+\b[^>]*\btabindex="0"/);
    expect(scroller).toMatch(/^<[a-z]+\b[^>]*\brole="region"/);
    expect(scroller).toMatch(/^<[a-z]+\b[^>]*\baria-label="[^"]{4,}"/);
    expect(scroller.match(/<li\b[^>]*\bclass="[^"]*\bstage\b/g)).toHaveLength(5);
  });

  // L40: the offer sells what can be built and how it helps the owner, with no tool lists.
  it("tells the offer as 4 to 6 benefits, each a title and one sentence", () => {
    const html = page(lang);
    expect(html).not.toMatch(/<section\b[^>]*\bid="(services|tech)"/);
    const offer = element(html, /<section\b[^>]*\bid="offer"/);
    expect(offer).not.toBe("");
    expect(offer).toMatch(/\baria-labelledby="offer-title"/);
    const items = [...offer.matchAll(/<li\b[^>]*\bdata-benefit(?=[\s>])[^>]*>([\s\S]*?)<\/li>/g)].map((m) => m[1]!);
    expect(items.length).toBeGreaterThanOrEqual(4);
    expect(items.length).toBeLessThanOrEqual(6);
    for (const item of items) {
      expect(item.match(/<h3\b[^>]*>[^<]{6,}<\/h3>/g)).toHaveLength(1);
      const sentence = item.match(/<p\b[^>]*\bdata-benefit-text(?=[\s>])[^>]*>([^<]*)<\/p>/)?.[1]?.trim() ?? "";
      expect(sentence.length).toBeGreaterThan(30);
      expect(sentence).toMatch(/^[^.!?]+[.!?]$/);
    }
    expect(offer).not.toMatch(/\bdata-(stack|tech-group)\b/);
  });

  it("keeps the problem composer in the contact, with the real email", () => {
    const contact = element(page(lang), /<section\b[^>]*\bid="contact"/);
    expect(contact.replace(/&#39;/g, "'")).toContain(lang === "es" ? "¿Qué se te complica hoy?" : "What's giving you trouble today?");
    expect(contact.match(/<input\b[^>]*\bname="topic"/g)?.length ?? 0).toBeGreaterThanOrEqual(3);
    expect(contact).toMatch(/<a\b[^>]*\bid="send"[^>]*\bhref="mailto:contacto@lautaroguebel.tech\?subject=/);
  });

  it("keeps the real workflow graph behind a disclosure with a visible summary", () => {
    const details = element(page(lang), /<details\b[^>]*\bclass="[^"]*\bwf\b/);
    expect(details).toMatch(/<summary\b[^>]*>[^<]{6,}/);
    expect(details).toMatch(/<svg\b[^>]*\bdata-workflow(?=[\s>])/);
  });
});
