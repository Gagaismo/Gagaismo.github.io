import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// T17, S11 (L93): the designer asked to refine the components that look stock. Each one moves to the
// page's own drawing language (serif captions, 1.5px ink lines, survey stations, tone steps) without a
// new colour: the method carousel, the composer, the buttons, the header and its language switch, the
// contact rows, the offer ledger, the padel outcome, the real graph, the case facts, the footer icon
// and the disclosure.

const dist = fileURLToPath(new URL("../../dist/", import.meta.url));
const read = (path: string) => readFileSync(join(dist, path, "index.html"), "utf8");
const langs = ["es", "en"] as const;
const pages = ["es", "en", "es/casos/automatizacion", "en/cases/automation", "es/casos/club-de-padel", "en/cases/padel-club"];

const shippedCss = () => {
  const assets = join(dist, "_astro");
  const files = readdirSync(assets)
    .filter((file) => file.endsWith(".css"))
    .map((file) => readFileSync(join(assets, file), "utf8"));
  const inline = pages.flatMap((path) => [...read(path).matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]!));
  return [...files, ...inline].join("\n");
};
const unscoped = (s: string) => s.replace(/\[data-astro-cid-[\w-]+\]/g, "").trim();
// Innermost rules with the at-rules around them; selectors without Astro's scope attribute.
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
const css = shippedCss();
const rules = leafRules(css);
/** Bodies of the rules whose selector list has exactly `selector`, under an at-rule matching `at` (none if omitted). */
const body = (selector: string, at?: RegExp) =>
  rules
    .filter((r) => r.selector.split(",").map((s) => s.trim()).includes(selector) && (at ? at.test(r.at) : !r.at))
    .map((r) => r.body)
    .join(";");
const text = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const narrow = /max-width:\s*1100px|width\s*<=\s*1100px/;

describe("1. the method carousel", () => {
  it("lets each step keep its own height and hides the native scrollbar", () => {
    expect(body(".stairs")).toMatch(/align-items:\s*start/);
    expect(body(".steps", narrow)).toMatch(/scrollbar-width:\s*none/);
    expect(body(".steps::-webkit-scrollbar", narrow)).toMatch(/display:\s*none/);
  });

  it("drives a five-segment scale bar and the step count from the row's scroll, with no script", () => {
    expect(css).toMatch(/@property\s+--step\s*\{[^}]*syntax:\s*["']<integer>["']/);
    expect(body(".steps", narrow)).toMatch(/scroll-timeline:\s*--steps\s+x/);
    expect(body(".method .wrap", narrow)).toMatch(/timeline-scope:\s*--steps/);
    expect(body(".tally", /animation-timeline/)).toMatch(/animation-timeline:\s*--steps/);
  });

  it.each(langs)("/%s/: shows the bar and the count beside the hint, hidden from assistive tech", (lang) => {
    const html = read(lang);
    const tally = html.match(/<div class="tally[^"]*"[^>]*>([\s\S]*?)<\/div>/);
    expect(tally, "a .tally block").not.toBeNull();
    expect(tally![0]).toMatch(/aria-hidden="true"/);
    expect(tally![1].match(/<i\b/g)?.length).toBe(5);
    expect(text(tally![1])).toContain(lang === "es" ? "Paso" : "Step");
    expect(text(tally![1])).toContain(lang === "es" ? "de 5" : "of 5");
  });
});

describe("2. the composer's topics", () => {
  it("draws its own ring instead of the native radio", () => {
    const input = body(".opt input");
    expect(input).toMatch(/appearance:\s*none/);
    expect(input).not.toMatch(/accent-color/);
    expect(input).toMatch(/width:\s*14px/);
    expect(input).toMatch(/border:\s*1\.5px solid var\(--ink\)/);
    expect(input).toMatch(/border-radius:\s*50%/);
    expect(body(".opt input:checked")).toMatch(/background:\s*var\(--ink\)/);
    expect(body(".opt input:checked")).toMatch(/var\(--sage\)/);
  });

  it("marks the chosen topic with the sage wash, not a black slab", () => {
    const checked = body(".opt:has(input:checked)");
    expect(checked).toMatch(/background:\s*var\(--sage\)/);
    expect(checked).not.toMatch(/var\(--ink\)/);
    expect(body(".opt")).not.toMatch(/background:\s*var\(--tone\)/);
  });
});

describe("3. buttons", () => {
  it("makes the quiet button underlined ink text, with no tone fill", () => {
    const quiet = body(".btn--quiet");
    // The minifier writes `background: transparent` as `background: 0 0`.
    expect(quiet).toMatch(/background:\s*(transparent|none|0 0)(;|$)/);
    expect(quiet).toMatch(/text-decoration:\s*underline/);
    expect(quiet).not.toMatch(/var\(--tone/);
  });

  it.each(langs)("/%s/: every action button carries a drawn 1.5px mark hidden from assistive tech", (lang) => {
    const buttons = [...read(lang).matchAll(/<a\b[^>]*class="btn\b(?![^"]*btn--quiet)[^"]*"[^>]*>([\s\S]*?)<\/a>/g)];
    expect(buttons.length).toBeGreaterThanOrEqual(3);
    for (const [, inner] of buttons) expect(inner).toMatch(/<svg\b[^>]*class="btn__mark"[^>]*aria-hidden="true"/);
    expect(body(".btn__mark")).toMatch(/stroke-width:\s*1\.5/);
  });
});

describe("4-5. the header", () => {
  it("keeps the full name on one line and switches to the monogram only at 380 px or less", () => {
    expect(body(".wordmark")).toMatch(/white-space:\s*nowrap/);
    expect(body(".wordmark__mono", /max-width:\s*380px|width\s*<=\s*380px/)).toMatch(/display:\s*inline/);
    expect(body(".wordmark__mono")).toMatch(/display:\s*none/);
  });

  it.each(langs)("/%s/: the wordmark's accessible name is the full name at every width", (lang) => {
    const mark = read(lang).match(/<a class="wordmark"[^>]*>([\s\S]*?)<\/a>/);
    expect(mark).not.toBeNull();
    expect(mark![1]).toMatch(/<span class="wordmark__full"[^>]*>Lautaro Guebel<\/span>/);
    expect(mark![1]).toMatch(/<span class="wordmark__mono"[^>]*aria-hidden="true"[^>]*>LG<\/span>/);
  });

  it("sets ES · EN in serif, the current one underlined like a link, with a drawn dot between", () => {
    expect(body(".langs a")).toMatch(/var\(--serif\)/);
    expect(body(".langs a")).toMatch(/min-width:\s*44px/);
    expect(body('.langs a[aria-current="page"]') + body(".langs a[aria-current=page]")).toMatch(/text-decoration-thickness:\s*0?\.07em/);
    expect(body(".langs:after") + body(".langs::after")).toMatch(/border-radius:\s*50%/);
  });

  it("sets the desktop links in serif at the small size", () => {
    const nav = body("nav a");
    expect(nav).toMatch(/var\(--serif\)/);
    expect(nav).toMatch(/var\(--fs-small\)/);
  });
});

describe("6. the contact rows", () => {
  it("drops the grey band and sets each label as an italic serif caption", () => {
    expect(body(".row:nth-child(odd)")).not.toMatch(/background/);
    const label = body(".row small");
    expect(label).toMatch(/var\(--serif\)/);
    expect(label).toMatch(/font-style:\s*italic/);
  });

  it("aligns the rows to the page's grid", () => {
    expect(body(".row")).toMatch(/grid-template-columns:\s*repeat\(12/);
  });
});

describe("7. the offer ledger", () => {
  it("is one plate with its lines separated by space, no zebra", () => {
    expect(body(".entry:nth-child(even)")).toBe("");
    expect(body(".ledger")).toMatch(/row-gap:/);
  });

  it("sets the old way as a small italic serif line above the title", () => {
    const was = body(".entry__was");
    expect(was).toMatch(/var\(--fs-small\)/);
    expect(was).toMatch(/var\(--serif\)/);
    expect(was).toMatch(/font-style:\s*italic/);
    // The minifier folds grid-row and grid-column into grid-area: row-start / column-start / ...
    expect(was).toMatch(/grid-(row|area):\s*1\b/);
    expect(body(".entry__title")).toMatch(/grid-(row|area):\s*2\b/);
  });
});

describe("8. the padel outcome", () => {
  it.each(langs)("/%s/: reads as a register of stations, the demo's real date in a <time>", (lang) => {
    const html = read(lang);
    const register = html.match(/<ol class="register[^"]*"[^>]*>([\s\S]*?)<\/ol>/);
    expect(register, "an ol.register").not.toBeNull();
    expect(register![1]).toMatch(/<time\b[^>]*datetime="2026-09-17"[^>]*>17\/09\/2026<\/time>/);
    expect(register![1].match(/<li\b/g)?.length).toBe(2);
    expect(body(".register li:not(:last-child):after") + body(".register li:not(:last-child)::after")).toMatch(/background:\s*var\(--ink\)/);
  });
});

describe("9. the real graph", () => {
  it("clips the user's divider to the plan's width", () => {
    expect(body(".wf")).not.toMatch(/border-top/);
    const rule = body(".wf:before") + body(".wf::before");
    expect(rule).toMatch(/border-top:\s*1px solid var\(--ink-3\)/);
    expect(rule).toMatch(/68rem/);
  });

  it("names the nodes in the serif at weight 400", () => {
    const label = body(".wf__svg text");
    expect(label).toMatch(/var\(--serif\)/);
    expect(label).toMatch(/\b400\b/);
  });
});

describe("10. the case facts", () => {
  it.each(["es/casos/automatizacion", "en/cases/automation", "es/casos/club-de-padel", "en/cases/padel-club"])(
    "/%s/: sits on a plate with a caption",
    (path) => {
      const html = read(path);
      expect(html).toMatch(/<figure class="top__card"[^>]*>\s*<dl class="plate top__facts"/);
      const card = html.slice(html.indexOf('class="top__card"'), html.indexOf("</figure>", html.indexOf('class="top__card"')));
      expect(card).toMatch(/<figcaption class="caption"[^>]*>[^<]+<\/figcaption>/);
    },
  );

  it("sets each term in italic serif, the muted ink", () => {
    const dt = body(".top__facts dt");
    expect(dt).toMatch(/var\(--serif\)/);
    expect(dt).toMatch(/font-style:\s*italic/);
    expect(dt).toMatch(/var\(--ink-2\)/);
  });
});

describe("11. the footer icon", () => {
  it("keeps the pinned box at 32 px and draws its envelope at 1.5", () => {
    const box = body(".foot__icon");
    expect(box).toMatch(/width:\s*32px/);
    expect(box).toMatch(/height:\s*32px/);
    expect(box).toMatch(/border-radius:\s*6px/);
    expect(body(".foot__icon svg")).toMatch(/stroke-width:\s*1\.5(px)?(;|$)/);
    expect(body(".foot__icon svg")).toMatch(/stroke:\s*currentColor/);
  });
});

describe("12. the disclosure", () => {
  it("sets its label in italic serif", () => {
    const open = body(".wf__open");
    expect(open).toMatch(/var\(--serif\)/);
    expect(open).toMatch(/font-style:\s*italic/);
  });

  it.each(langs)("/%s/: draws the plus inside a 14 px ring", (lang) => {
    const mark = read(lang).match(/<svg\b[^>]*class="wf__mark"[^>]*>([\s\S]*?)<\/svg>/);
    expect(mark).not.toBeNull();
    expect(mark![0]).toMatch(/width="14"/);
    expect(mark![1]).toMatch(/<circle\b/);
  });
});
