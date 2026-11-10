import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// T24 (L123): the padel case page ends with the delivery the home's register already shows (L115), and
// the site gets its own icon: the serif "LG" in plate on a moss-metal square, linked from every page.

const dist = fileURLToPath(new URL("../../dist/", import.meta.url));
const read = (path: string) => readFileSync(join(dist, path, "index.html"), "utf8");
const file = (name: string) => readFileSync(join(dist, name));

const padel = [
  { lang: "es", path: "es/casos/club-de-padel", text: "Sistema terminado y entregado.", demo: "17/09/2026" },
  { lang: "en", path: "en/cases/padel-club", text: "System finished and delivered.", demo: "17/09/2026" },
] as const;

/** The chapter section labelled by the heading with this id. */
const chapter = (html: string, id: string) => {
  const at = html.indexOf(`aria-labelledby="${id}"`);
  if (at < 0) return "";
  const start = html.lastIndexOf("<section", at);
  return html.slice(start, html.indexOf("</section>", at));
};

describe.each(padel)("the padel case page /$path/", ({ path, text, demo }) => {
  it("ends its outcome with the delivery, dated 17/10/2026 in a <time>", () => {
    const outcome = chapter(read(path), "outcome");
    expect(outcome, "the outcome chapter").not.toBe("");
    const delivery = outcome.match(/<li\b[^>]*>(?:(?!<\/li>)[\s\S])*?<time\b[^>]*datetime="2026-10-17"[^>]*>17\/10\/2026<\/time>([\s\S]*?)<\/li>/);
    expect(delivery, "an entry with the delivery date").not.toBeNull();
    expect(delivery![1]).toContain(text);
    // After the demo, never before it.
    expect(outcome.indexOf(demo)).toBeGreaterThan(-1);
    expect(outcome.indexOf("2026-10-17")).toBeGreaterThan(outcome.indexOf(demo));
  });
});

const pages = ["es", "en", "es/casos/club-de-padel", "en/cases/padel-club", "es/casos/automatizacion", "en/cases/automation"];

/** Every <link> in the head, as attribute maps. */
const links = (html: string) =>
  [...html.slice(0, html.indexOf("</head>")).matchAll(/<link\b([^>]*)>/g)].map((m) =>
    Object.fromEntries([...m[1]!.matchAll(/([\w-]+)="([^"]*)"/g)].map((a) => [a[1]!, a[2]!])),
  );

describe.each(pages)("/%s/ head", (path) => {
  const head = () => links(read(path));

  it("links the SVG icon, the ICO fallback, the touch icon and the manifest", () => {
    const all = head();
    expect(all).toContainEqual(expect.objectContaining({ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }));
    expect(all).toContainEqual(expect.objectContaining({ rel: "icon", href: "/favicon.ico", sizes: "32x32" }));
    expect(all).toContainEqual(expect.objectContaining({ rel: "apple-touch-icon", href: "/apple-touch-icon.png" }));
    expect(all).toContainEqual(expect.objectContaining({ rel: "manifest", href: "/site.webmanifest" }));
  });

  it("keeps the theme colour the manifest uses", () => {
    const manifest = JSON.parse(file("site.webmanifest").toString("utf8"));
    expect(read(path)).toContain(`<meta name="theme-color" content="${manifest.theme_color}">`);
  });
});

/** A PNG's width, height and colour type, from its IHDR chunk. */
const png = (name: string) => {
  const b = file(name);
  expect(b.subarray(1, 4).toString("ascii")).toBe("PNG");
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20), colorType: b[25] };
};

describe("the icon files", () => {
  it.each(["favicon.svg", "favicon.ico", "apple-touch-icon.png", "icon-512.png", "site.webmanifest"])("emits %s", (name) => {
    expect(existsSync(join(dist, name))).toBe(true);
  });

  it("draws the SVG icon in the palette, the letters as paths (no font needed), safe in a dark scheme", () => {
    const svg = file("favicon.svg").toString("utf8");
    expect(svg).toMatch(/^<svg\b[^>]*\bviewBox="0 0 64 64"/);
    expect(svg).toContain("#4f6b4a");
    expect(svg).toContain("#fbf6e6");
    expect(svg).not.toMatch(/<text\b/);
    expect(svg).toMatch(/prefers-color-scheme:\s*dark/);
  });

  it("packs the ICO with a 16 and a 32 px image", () => {
    const ico = file("favicon.ico");
    expect(ico.readUInt16LE(0)).toBe(0);
    expect(ico.readUInt16LE(2)).toBe(1);
    expect(ico.readUInt16LE(4)).toBe(2);
    const sizes = [0, 1].map((i) => ico[6 + i * 16]);
    expect(sizes.sort()).toEqual([16, 32]);
  });

  it("makes the touch icon 180 x 180 with no transparency, and the large icon 512 x 512", () => {
    // Colour type 2 is RGB: no alpha channel.
    expect(png("apple-touch-icon.png")).toEqual({ width: 180, height: 180, colorType: 2 });
    expect(png("icon-512.png")).toMatchObject({ width: 512, height: 512 });
  });

  it("describes the site in a minimal manifest, in the palette, with the PNG icons", () => {
    const manifest = JSON.parse(file("site.webmanifest").toString("utf8"));
    expect(manifest).toMatchObject({ name: "Lautaro Guebel", short_name: "LG", theme_color: "#f4f1ea", background_color: "#f4f1ea" });
    expect(manifest.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }),
        expect.objectContaining({ src: "/icon-512.png", sizes: "512x512", type: "image/png" }),
      ]),
    );
    for (const icon of manifest.icons) expect(existsSync(join(dist, icon.src))).toBe(true);
  });
});
