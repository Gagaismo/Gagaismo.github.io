import { describe, expect, it } from "vitest";
import { home } from "../../src/i18n/home";

// Every string path, with array indexes, so es and en must have the same shape and list lengths.
function paths(value: unknown, prefix = ""): string[] {
  if (typeof value === "string") return [prefix];
  if (Array.isArray(value)) return value.flatMap((item, i) => paths(item, `${prefix}[${i}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) => paths(item, prefix ? `${prefix}.${key}` : key));
  }
  return [];
}

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

describe("home copy", () => {
  it("has the same structure in es and en", () => {
    expect(paths(home.en)).toEqual(paths(home.es));
  });

  it("has no empty strings", () => {
    for (const lang of ["es", "en"] as const) {
      expect(strings(home[lang]).filter((s) => s.trim() === "")).toEqual([]);
    }
  });

  // Idea 7 (L28): repository figures overwhelm an owner who only wants to know what I do. The padel
  // demo date stays: it is an outcome, not a count.
  it("keeps repository figures out of the copy", () => {
    for (const lang of ["es", "en"] as const) {
      const text = strings(home[lang]).join(" ");
      expect(text).not.toMatch(/\b417\b/);
      expect(text).not.toMatch(/\b1[.,]742\b/);
      expect(text).not.toMatch(/\b24\b/);
      expect(text).not.toMatch(/\b27\b/);
      expect(text).toContain("17/09/2026");
    }
  });

  // L40: the offer is 4 to 6 things I can build, each told as the owner's benefit in one sentence.
  it("offers 4 to 6 benefits in es and en, the same number, each a title and one sentence", () => {
    const es = home.es.offer.items;
    const en = home.en.offer.items;
    expect(es.length).toBeGreaterThanOrEqual(4);
    expect(es.length).toBeLessThanOrEqual(6);
    expect(en).toHaveLength(es.length);
    for (const item of [...es, ...en]) {
      expect(item.title.trim().length).toBeGreaterThan(5);
      expect(item.text).toMatch(/^[^.!?]+[.!?]$/);
      expect(item).not.toHaveProperty("stack");
    }
    expect(home.es.offer).not.toHaveProperty("groups");
    expect(home.en.offer).not.toHaveProperty("groups");
  });

  // L76: the hero phone's feed moved into the automation flow.
  it("has the same sample feed events in es and en, none empty", () => {
    const { es, en } = { es: home.es.flow.feed, en: home.en.flow.feed };
    expect(es.events.length).toBeGreaterThanOrEqual(4);
    expect(en.events).toHaveLength(es.events.length);
    expect(en.times).toHaveLength(es.times.length);
    for (const feed of [es, en]) {
      expect([...feed.events, ...feed.times].filter((s) => s.trim() === "")).toEqual([]);
    }
  });
});
