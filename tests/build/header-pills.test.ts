import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// T21, S12 (L100-L101): the header becomes floating glass pills ("Mist"): the wordmark, the section links
// with ES · EN, and the green action, on a transparent bar. A chip follows the section in view (set by
// script only) and the bar slides away while reading down, never under reduced motion.

const dist = fileURLToPath(new URL("../../dist/", import.meta.url));
const read = (path: string) => readFileSync(join(dist, path, "index.html"), "utf8");
const pages = ["es", "en", "es/casos/automatizacion", "en/cases/automation", "es/casos/club-de-padel", "en/cases/padel-club"];
const assets = join(dist, "_astro");

const shippedCss = () => {
  const files = readdirSync(assets)
    .filter((file) => file.endsWith(".css"))
    .map((file) => readFileSync(join(assets, file), "utf8"));
  const inline = pages.flatMap((path) => [...read(path).matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]!));
  return [...files, ...inline].join("\n");
};
const unscoped = (s: string) => s.replace(/\[data-astro-cid-[\w-]+\]/g, "").trim();
const leafRules = (css: string) => {
  const out: { selector: string; body: string; at: string }[] = [];
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
      if (!body.includes("{") && !prelude.startsWith("@") && !stack.some((p) => p.startsWith("@keyframes"))) {
        out.push({ selector: unscoped(prelude), body, at: stack.join(" ") });
      }
      start = i + 1;
    } else if (c === ";" && css.slice(start, i).trim().startsWith("@") && !css.slice(start, i).includes("{")) {
      start = i + 1;
    }
  }
  return out;
};
const rules = leafRules(shippedCss());
const body = (selector: string, at?: RegExp) =>
  rules
    .filter((r) => r.selector.split(",").map((s) => s.trim()).includes(selector) && (at ? at.test(r.at) : !r.at))
    .map((r) => r.body)
    .join(";");
const reduce = /prefers-reduced-motion:\s*reduce/;
const phone = /max-width:\s*720px|width\s*<=\s*720px/;
const header = (html: string) => html.slice(html.indexOf('<header class="site"'), html.indexOf("</header>"));
const scripts = (html: string) => [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].map((m) => ({ attrs: m[1]!, code: m[2]! }));

describe("the header's three pills", () => {
  it.each(pages)("/%s/: the wordmark, the links with ES · EN, then the action, in that order", (path) => {
    const bar = header(read(path));
    const mark = bar.indexOf('<a class="wordmark"');
    const group = bar.indexOf('<div class="top__nav"');
    const nav = bar.indexOf("<nav");
    const switcher = bar.indexOf('class="langs"');
    const action = bar.indexOf('class="btn top__cta"');
    expect(mark).toBeGreaterThan(-1);
    expect(group).toBeGreaterThan(mark);
    expect(nav).toBeGreaterThan(group);
    expect(switcher).toBeGreaterThan(nav);
    expect(action).toBeGreaterThan(switcher);
  });

  it("draws the wordmark and the link group as glass pills, and the action as the green pill", () => {
    for (const selector of [".wordmark", ".top__nav"]) {
      const pill = body(selector);
      expect(pill, selector).toMatch(/border-radius:\s*var\(--radius-pill\)/);
      expect(pill, selector).toMatch(/background:\s*var\(--glass\)/);
      expect(pill, selector).toMatch(/backdrop-filter:\s*var\(--glass-blur\)/);
      expect(pill, selector).toMatch(/var\(--glass-rim\)/);
      expect(pill, selector).toMatch(/pointer-events:\s*auto/);
    }
    expect(body(".btn")).toMatch(/border-radius:\s*var\(--radius-pill\)/);
    expect(body(".top__cta")).toMatch(/min-height:\s*44px/);
    expect(body(".top__cta")).toMatch(/pointer-events:\s*auto/);
  });

  // Glass at 0.74 over the darkest stroke on the page, unblurred: ink 7.7:1, ink-2 only 4.0:1.
  it("sets every label on the glass in the full ink", () => {
    expect(body(".langs a")).toMatch(/color:\s*var\(--ink\)/);
    expect(body(".langs a")).not.toMatch(/color:\s*var\(--ink-2\)/);
    expect(body("nav a")).not.toMatch(/color:\s*var\(--ink-2\)/);
  });

  it("keeps 44 px tall pills and link targets", () => {
    expect(body(".wordmark")).toMatch(/min-height:\s*44px/);
    expect(body("nav a")).toMatch(/min-height:\s*44px/);
    expect(body(".langs a")).toMatch(/min-height:\s*44px/);
  });

  it("lets the page show between the pills: a transparent bar that lets clicks through", () => {
    const bar = body(".site");
    // The minifier writes a transparent background as "0 0".
    expect(bar).toMatch(/background:\s*(transparent|none|0 0)\s*(;|$)/);
    expect(bar).not.toMatch(/var\(--bg\)/);
    expect(bar).toMatch(/pointer-events:\s*none/);
    expect(bar).toMatch(/position:\s*sticky/);
  });

  it("keeps ES · EN and the action on phones, the links hidden", () => {
    expect(body("nav", phone)).toMatch(/display:\s*none/);
    expect(body(".top__nav", phone)).not.toMatch(/display:\s*none/);
  });
});

describe("scrollspy", () => {
  it.each(pages)("/%s/: ships no active link in the HTML; the chip is decorative and empty", (path) => {
    const bar = header(read(path));
    const nav = bar.slice(bar.indexOf("<nav"), bar.indexOf("</nav>"));
    expect(nav).not.toMatch(/aria-current/);
    expect(nav).toMatch(/<span class="nav__chip"[^>]*aria-hidden="true"[^>]*><\/span>/);
  });

  it("shows the chip only once the script has placed it, sliding between links", () => {
    expect(body(".nav__chip")).toMatch(/opacity:\s*0/);
    expect(body(".nav__chip")).toMatch(/transition:[^;]*transform/);
    expect(body(".nav__chip[data-on]")).toMatch(/opacity:\s*1/);
  });

  it("moves the chip without a slide and keeps the bar in place under reduced motion", () => {
    expect(body(".nav__chip", reduce)).toMatch(/transition:\s*none/);
    expect(body(".site", reduce)).toMatch(/transition:\s*none/);
    expect(body(".site[data-hidden]", reduce)).toMatch(/transform:\s*none/);
  });

  it("slides the bar up past its own height when hidden", () => {
    expect(body(".site[data-hidden]")).toMatch(/transform:\s*translateY\(/);
    expect(body(".site")).toMatch(/transition:[^;]*transform/);
  });
});

describe("the header's script", () => {
  it.each(pages)("/%s/: keeps the inline JS under Vite's 4,096 B threshold", (path) => {
    const inline = scripts(read(path)).filter((s) => !/\ssrc=/.test(s.attrs));
    const bytes = inline.reduce((sum, s) => sum + Buffer.byteLength(s.code), 0);
    expect(bytes).toBeLessThanOrEqual(4096);
  });

  it.each(pages)("/%s/: ships the scrollspy and the hide-on-scroll, marking the link with aria-current", (path) => {
    const html = read(path);
    const external = scripts(html)
      .map((s) => s.attrs.match(/\ssrc="\/_astro\/([^"]+\.js)"/)?.[1])
      .filter((file): file is string => !!file)
      .map((file) => readFileSync(join(assets, file), "utf8"));
    const code = [...scripts(html).map((s) => s.code), ...external].join("\n");
    expect(code).toMatch(/IntersectionObserver/);
    expect(code).toMatch(/aria-current/);
    expect(code).toMatch(/data-hidden/);
    expect(code).toMatch(/prefers-reduced-motion/);
    expect(code).toMatch(/focusin/);
  });
});
