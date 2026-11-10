import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = fileURLToPath(new URL("../../src/content/case-studies/", import.meta.url));
const list = (lang: string) =>
  readdirSync(root + lang)
    .filter((file) => file.endsWith(".md"))
    .sort();

describe("case studies", () => {
  it("exist in es", () => {
    expect(list("es").length).toBeGreaterThan(0);
  });

  it("have the same filenames in es and en", () => {
    expect(list("en")).toEqual(list("es"));
  });
});
