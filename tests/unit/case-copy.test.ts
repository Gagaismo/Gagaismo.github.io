import { describe, expect, it } from "vitest";
import { automationStory, caseUi, padelStory } from "../../src/i18n/cases";

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

describe.each([
  ["case ui", caseUi],
  ["automation story", automationStory],
  ["padel story", padelStory],
] as const)("%s copy", (_, copy) => {
  it("has the same structure in es and en", () => {
    expect(paths(copy.en)).toEqual(paths(copy.es));
  });

  it("has no empty strings", () => {
    for (const lang of ["es", "en"] as const) expect(strings(copy[lang]).filter((s) => s.trim() === "")).toEqual([]);
  });
});
