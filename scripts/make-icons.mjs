// The site's icon (T24): the serif "LG" of the wordmark in plate paper on a tile of the buttons' liquid
// moss metal (the sage ink with a specular light top-left, a band across the middle and a rim, as in
// .btn in src/styles/global.css). The letters are drawn as paths, so no font is needed to show them.
//
// Two drawings of the same letters: a sturdy one for the tab (favicon.svg and the 16 / 32 px ICO), with
// thicker hairlines and almost no serifs so it holds at 16 px, and a finer one for the large icons.
//
//   node scripts/make-icons.mjs
//
// writes public/favicon.svg, favicon.ico, apple-touch-icon.png (180, opaque), icon-512.png and
// site.webmanifest. sharp comes with Astro.
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const paper = "#f4f1ea";
const plate = "#fbf6e6";
const ink = "#1f2a22";
const moss = "#4f6b4a";
const out = new URL("../public/", import.meta.url);
mkdirSync(out, { recursive: true });

const rect = (x0, y0, x1, y1) => `M${x0} ${y0}H${x1}V${y1}H${x0}Z`;
const ellipse = ([cx, cy, rx, ry]) => `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${2 * rx} 0a${rx} ${ry} 0 1 0 ${-2 * rx} 0Z`;

// On a 64-unit grid. L: top serif, stem, foot, beak. G: a ring thick at the sides and thin at the top and
// bottom (inner ellipse narrower than the outer), opened top-right, with its beak, bar and spur.
const glyphs = {
  small: {
    shift: -0.5,
    l: [rect(7, 14, 20, 17), rect(9, 14, 17, 50), rect(7, 46, 26, 50), rect(23, 42, 26, 50)],
    outer: [44, 32, 13, 18.4],
    inner: [44.8, 32, 7, 14.8],
    open: rect(47, 19.5, 64, 32),
    g: [rect(52.5, 19.5, 55.5, 23.5), rect(45, 32, 58, 35.5), rect(51, 32, 56.5, 44)],
    shadow: 0,
  },
  large: {
    shift: -2,
    l: [rect(9, 17, 21.5, 19), rect(12, 17, 18, 47), rect(9, 45, 29.5, 47), rect(27.5, 40, 29.5, 47)],
    outer: [45.5, 32, 12.5, 15.6],
    inner: [46.1, 32, 7.6, 13.4],
    open: rect(47.5, 22, 64, 32.5),
    g: [rect(53.4, 20.6, 55.6, 27), rect(48, 32.5, 58.2, 34.5), rect(53, 32.5, 57, 43)],
    shadow: 0.6,
  },
};

const letters = ({ l, outer, inner, g }, fill, extra = "") =>
  `<g fill="${fill}"${extra}><path d="${l.join("")}"/><path mask="url(#open)" fill-rule="evenodd" d="${ellipse(outer)}${ellipse(inner)}"/><path d="${g.join("")}"/></g>`;

/** The icon as SVG. `bleed`: a full square with no corners or rim (the touch icon; the device rounds it). */
function icon(size, { bleed = false } = {}) {
  const s = glyphs[size];
  const r = bleed ? 0 : 14;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">`,
    // On a dark tab bar the tile's edge turns to plate, so the square still stands off the chrome.
    `<style>@media (prefers-color-scheme: dark){.edge{stroke:${plate};stroke-opacity:.4}}</style>`,
    `<defs>`,
    `<radialGradient id="spec" cx=".3" cy="-.2" r="1.1"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/></radialGradient>`,
    `<linearGradient id="band" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".1"/><stop offset=".48" stop-color="#fff" stop-opacity="0"/><stop offset=".52" stop-color="${ink}" stop-opacity=".2"/><stop offset="1" stop-color="${ink}" stop-opacity=".05"/></linearGradient>`,
    `<linearGradient id="rim" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".35" stop-color="#fff" stop-opacity="0"/><stop offset=".7" stop-color="${ink}" stop-opacity="0"/><stop offset="1" stop-color="${ink}" stop-opacity=".4"/></linearGradient>`,
    `<mask id="open"><rect x="-8" y="-8" width="80" height="80" fill="#fff"/><path d="${s.open}" fill="#000"/></mask>`,
    `</defs>`,
    `<rect width="64" height="64" rx="${r}" fill="${moss}"/>`,
    `<rect width="64" height="64" rx="${r}" fill="url(#band)"/>`,
    `<rect width="64" height="64" rx="${r}" fill="url(#spec)"/>`,
    bleed
      ? ""
      : `<rect x=".75" y=".75" width="62.5" height="62.5" rx="13.25" fill="none" stroke="url(#rim)" stroke-width="1.5"/>` +
        `<rect class="edge" x=".5" y=".5" width="63" height="63" rx="13.5" fill="none" stroke="${ink}" stroke-opacity=".3"/>`,
    `<g transform="translate(${s.shift} 0)">`,
    s.shadow ? letters(s, ink, ` fill-opacity=".35" transform="translate(0 ${s.shadow})"`) : "",
    letters(s, plate),
    `</g>`,
    `</svg>`,
  ].join("");
}

const render = (svg, px) => sharp(Buffer.from(svg), { density: (72 * px) / 64 }).resize(px, px);

// An ICO of PNG images (read by every browser that still asks for one).
function ico(images) {
  const head = Buffer.alloc(6 + 16 * images.length);
  head.writeUInt16LE(0, 0);
  head.writeUInt16LE(1, 2);
  head.writeUInt16LE(images.length, 4);
  let offset = head.length;
  images.forEach(({ px, data }, i) => {
    const at = 6 + 16 * i;
    head[at] = px;
    head[at + 1] = px;
    head.writeUInt16LE(1, at + 4);
    head.writeUInt16LE(32, at + 6);
    head.writeUInt32LE(data.length, at + 8);
    head.writeUInt32LE(offset, at + 12);
    offset += data.length;
  });
  return Buffer.concat([head, ...images.map((image) => image.data)]);
}

const small = icon("small");
writeFileSync(new URL("favicon.svg", out), small + "\n");
const sizes = await Promise.all([16, 32].map(async (px) => ({ px, data: await render(small, px).png().toBuffer() })));
writeFileSync(new URL("favicon.ico", out), ico(sizes));
await render(icon("large", { bleed: true }), 180).flatten({ background: moss }).removeAlpha().png().toFile(fileURLToPath(new URL("apple-touch-icon.png", out)));
await render(icon("large"), 512).png().toFile(fileURLToPath(new URL("icon-512.png", out)));

const manifest = {
  name: "Lautaro Guebel",
  short_name: "LG",
  icons: [
    { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
  ],
  theme_color: paper,
  background_color: paper,
  display: "browser",
};
writeFileSync(new URL("site.webmanifest", out), JSON.stringify(manifest, null, 2) + "\n");
