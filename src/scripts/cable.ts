// The cable (src/components/Cable.astro): spans the wire in the page margin from the hero's headline to
// the send button, puts a node on each heading and the branch into the automation flow. The wire itself
// is one CSS line (every ground is light, so it has one colour). motion.ts lights the nodes as they enter.

const cable = document.querySelector<HTMLElement>("[data-cable]");
const main = cable?.parentElement;

if (cable && main) {
  const branch = cable.firstElementChild!.appendChild(document.createElement("b"));
  const marks = [...cable.querySelectorAll<HTMLElement>("[data-cable-at]")];

  // Layout offsets from <main> ignore transforms, so entrances and scroll effects never move the nodes.
  // Summed up the chain: an animated ancestor can be an element's offsetParent.
  const top = (el: HTMLElement) => {
    let y = 0;
    for (let e: HTMLElement | null = el; e && e !== main; e = e.offsetParent as HTMLElement | null) y += e.offsetTop;
    return y;
  };

  const layout = () => {
    const at = marks.map((mark, i) => {
      const el = document.getElementById(mark.dataset.cableAt!);
      if (!el) return 0;
      // The first mark is the hero's: the wire starts level with the middle of the headline's first line.
      if (!i) return top(el) + (el.firstElementChild as HTMLElement).offsetHeight / 2;
      const css = getComputedStyle(el);
      return top(el) + parseFloat(css.paddingTop) + parseFloat(css.lineHeight) / 2;
    });
    const start = at[0] ?? 0;
    cable.style.top = `${start}px`;
    cable.style.height = `${at.at(-1)! - start}px`;
    marks.forEach((mark, i) => (mark.style.top = `${at[i]! - start}px`));

    const dot = [...document.querySelectorAll("[data-cable-tap]")].find((el) => el.getBoundingClientRect().width);
    if (dot) {
      const r = dot.getBoundingClientRect();
      const m = main.getBoundingClientRect();
      const x = cable.offsetWidth / 2;
      branch.style.cssText = `top:${r.top + r.height / 2 - m.top - start}px;width:${r.left - m.left - x}px`;
    }
  };

  let queued = 0;
  layout();
  // Shown once the fonts have settled the layout, so the cable itself never shifts on screen.
  document.fonts.ready.then(() => (layout(), cable.toggleAttribute("data-ready", true)));
  new ResizeObserver(() => (queued ||= requestAnimationFrame(() => ((queued = 0), layout())))).observe(main);

  // Browsers without scroll-driven animations: one custom property from a passive, rAF-throttled listener.
  if (!CSS.supports("animation-timeline: view()") && matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    let frame = 0;
    const draw = () => {
      frame = 0;
      const r = cable.getBoundingClientRect();
      cable.style.setProperty("--p", `${Math.min(1, Math.max(0, (innerHeight * 0.7 - r.top) / r.height))}`);
    };
    addEventListener("scroll", () => (frame ||= requestAnimationFrame(draw)), { passive: true });
    draw();
  }
}
