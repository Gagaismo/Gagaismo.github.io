// The header's pills (src/layouts/Base.astro): a chip under the link of the section in view, and the bar
// sliding away while reading down, back on any upward scroll, on focus and after a jump to an anchor;
// never near the top or under reduced motion. Plain JS shipped as is, in its own file, so the page's
// inline script stays under Vite's 4,096 B threshold. Without it the bar stays, with no chip.
const bar = document.querySelector("[data-header]");
const nav = bar && bar.querySelector("nav");
const chip = nav && nav.querySelector("[data-chip]");

if (chip) {
  const still = matchMedia("(prefers-reduced-motion: reduce)");

  // Each top-level section lights the link to its anchor; one without an id (the automation plan) keeps
  // the link before it, and the padel club is a case, so it lights the cases.
  const links = new Map([...nav.querySelectorAll('a[href^="#"]')].map((a) => [a.hash.slice(1), a]));
  const owner = new Map();
  let prev;
  for (const s of document.querySelectorAll("#content > section")) {
    prev = s.id ? links.get(s.id === "padel" ? "automation" : s.id) : prev;
    owner.set(s, prev);
  }

  let current;
  const place = () => {
    if (!current) return;
    chip.style.setProperty("--x", current.offsetLeft + "px");
    chip.style.setProperty("--w", current.offsetWidth + "px");
  };
  const light = (link) => {
    if (link === current) return;
    current?.removeAttribute("aria-current");
    link?.setAttribute("aria-current", "true");
    // Appearing, the chip takes its place first and then fades in; between links it slides.
    if (!current) chip.style.transition = "none";
    current = link;
    place();
    chip.toggleAttribute("data-on", !!link);
    chip.offsetWidth;
    chip.style.transition = "";
  };

  // The section crossing a thin band at 40% of the screen is the one being read.
  const spy = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && light(owner.get(e.target))),
    { rootMargin: "-40% 0px -59%" },
  );
  owner.forEach((_, s) => spy.observe(s));
  new ResizeObserver(place).observe(nav);

  // Hide on scroll. A jump to an anchor holds the bar until the scroll it starts has settled.
  let y = scrollY;
  let hold = !!location.hash;
  let timer;
  let frame = 0;
  const show = (on) => bar.toggleAttribute("data-hidden", !on);
  const hero = () => document.querySelector(".hero")?.offsetHeight ?? innerHeight;
  const settle = () => {
    hold = true;
    show(true);
  };

  addEventListener(
    "scroll",
    () => {
      frame ||= requestAnimationFrame(() => {
        frame = 0;
        const now = scrollY;
        if (hold) {
          clearTimeout(timer);
          timer = setTimeout(() => ((hold = false), (y = scrollY)), 160);
        } else if (Math.abs(now - y) > 4) {
          show(now < y || now < hero() || still.matches || bar.contains(document.activeElement));
        } else return;
        y = now;
      });
    },
    { passive: true },
  );
  bar.addEventListener("focusin", () => show(true));
  addEventListener("hashchange", settle);
  document.addEventListener("click", (e) => e.target.closest?.('a[href^="#"]') && settle());
}
