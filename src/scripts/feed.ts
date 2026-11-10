// The sample event log beside the automation plan (src/components/Feed.astro, moved out of the hero in
// L76): every 4 s the next event enters on top and the oldest leaves; CSS places each card by its order.
// Paused while its section is off-screen, the tab is hidden, or the visitor points at the log or works in
// the section. No loop under reduced motion. Calm on purpose: the plan above it is the protagonist.

const feed = document.querySelector<HTMLElement>("[data-feed]");
const list = feed?.querySelector("ul");
const hero = feed?.closest("section");

if (feed && list && hero && matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  const events: string[] = JSON.parse(feed.dataset.events ?? "[]");
  const times: string[] = JSON.parse(feed.dataset.times ?? "[]");
  const hold = new Set(["off"]);
  let next = list.children.length;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const play = () => {
    clearTimeout(timer);
    if (!hold.size && !document.hidden) timer = setTimeout(add, 4000);
  };
  const set = (reason: string, on: boolean) => (on ? hold.add(reason) : hold.delete(reason), play());

  function add() {
    // The card that left on the previous turn has finished fading by now.
    while (list!.children.length > times.length) list!.lastElementChild!.remove();
    const card = list!.firstElementChild!.cloneNode(true) as HTMLElement;
    card.toggleAttribute("data-new", true);
    card.children[1]!.textContent = events[next++ % events.length] ?? "";
    list!.prepend(card);
    [...list!.children].forEach((el, i) => times[i] && (el.lastElementChild!.textContent = times[i]));
    play();
  }

  new IntersectionObserver(([entry]) => set("off", !entry?.isIntersecting)).observe(hero);
  document.addEventListener("visibilitychange", play);
  feed.addEventListener("pointerenter", () => set("hover", true));
  feed.addEventListener("pointerleave", () => set("hover", false));
  hero.addEventListener("focusin", () => set("focus", true));
  hero.addEventListener("focusout", () => set("focus", false));
}
