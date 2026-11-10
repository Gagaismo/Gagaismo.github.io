import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const dist = fileURLToPath(new URL("../../dist/", import.meta.url));
// SHA-256 of the confidential client's names (lowercase), so the names never live in this public repo.
const forbidden = new Set([
  "775a8540645bfb5d1402ff6f8e39055f3e6246439adf24758a39c3a3fb6f8fe5",
  "805e3c2221f23448ccef70b91c65f095d7f20d5547425dbd099249532edb8f67",
  // The academy of the automation case: its brand (one word and the two-word form joined), its
  // sub-brand, and the owner's and the onboarding operator's names. The owner's four-letter nickname is
  // left out: as a word pair it matches random bytes inside the compressed images.
  "4c9e413da281baceadf81a32f7315742ed57b0864047125e059530570cac287c",
  "73178dfef3200a5b8f51fadf98bd5cb31b20e4be76266989c9c171b886e37c36",
  "90cc33a41b541af2c1964e3e10a46088cbdedf63031efaa35d588a698c91193f",
  "664f7102d6997662f291c99d787a7d1af9b70af70326fa70f5f69805c2fbf246",
]);
const sha256 = (text: string) => createHash("sha256").update(text).digest("hex");

// Checks every word and every pair of adjacent words, so "Foo Bar" and "foo-bar" both match "foobar".
function leaksClientName(text: string): boolean {
  const words = text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  return words.some((word, i) => forbidden.has(sha256(word)) || forbidden.has(sha256(word + (words[i + 1] ?? ""))));
}

function files(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)],
  );
}

describe("build output", () => {
  it.each(["es/index.html", "en/index.html", "index.html"])("has %s", (page) => {
    expect(existsSync(join(dist, page))).toBe(true);
  });

  it("redirects / to /es/", () => {
    expect(readFileSync(join(dist, "index.html"), "utf8")).toMatch(/url=\/es\/?["']/);
  });

  it("sets the page language", () => {
    expect(readFileSync(join(dist, "es/index.html"), "utf8")).toContain('<html lang="es"');
    expect(readFileSync(join(dist, "en/index.html"), "utf8")).toContain('<html lang="en"');
  });

  it("never contains the venue's or the academy's names", () => {
    const leaks = files(dist).filter((file) => leaksClientName(readFileSync(file, "latin1")));
    expect(leaks).toEqual([]);
    // Every file is scanned, binaries included; the full-bleed PNG fallbacks are megabytes each.
  }, 30_000);
});
