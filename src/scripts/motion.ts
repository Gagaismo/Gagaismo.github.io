// The page's only script: entrances once per element, the automation flow (the page's one
// protagonist animation), and the message composer. Everything it touches is readable and usable without it.

import "./cable";
import "./feed";

const io =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("is-in");
            io?.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -8%" },
      )
    : null;

for (const el of document.querySelectorAll("[data-reveal], [data-shutter], [data-cable-at]")) {
  if (io) io.observe(el);
  else el.classList.add("is-in");
}

// The flow plays once its top is above the middle of the screen (the cable has reached its first
// station by then) and rearms when it has left the screen, so each visit plays it again. The class
// sits on <body> so the cable's branch into the flow plays with it.
const flow = document.querySelector("[data-flow]");
const play = (on: boolean) => document.body.classList.toggle("flow-play", on);

if (flow && io) {
  new IntersectionObserver(([e]) => e?.isIntersecting && play(true), { rootMargin: "0px 0px -45%" }).observe(flow);
  new IntersectionObserver(([e]) => e?.isIntersecting || play(false)).observe(flow);
} else play(true);

// Message composer: the chosen problem writes the first message and the email link carries it.
const draft = document.getElementById("draft");
const send = document.getElementById("send") as HTMLAnchorElement | null;
const copyStatus = document.getElementById("copy-status");

for (const input of document.querySelectorAll<HTMLInputElement>('input[name="topic"]')) {
  input.addEventListener("change", () => {
    if (!input.checked || !draft || !send) return;
    draft.textContent = input.dataset.draft ?? "";
    send.href = input.dataset.mailto ?? send.href;
  });
}

document.getElementById("copy")?.addEventListener("click", (event) => {
  const button = event.currentTarget as HTMLButtonElement;
  if (!draft || !copyStatus) return;
  navigator.clipboard?.writeText(draft.textContent ?? "").then(
    () => (copyStatus.textContent = button.dataset.ok ?? ""),
    () => (copyStatus.textContent = button.dataset.fail ?? ""),
  ) ?? (copyStatus.textContent = button.dataset.fail ?? "");
});
