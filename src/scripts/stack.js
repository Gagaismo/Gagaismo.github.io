// The method's cards (src/components/Method.astro) stack as you read down: each sticks under the header's
// pills 20 px lower than the card before, so the covered ones keep their top edge in view, and the next
// slides over it. A card taller than the room under the header sticks by its bottom instead, 16 px above
// the screen's edge, so all of it has been read before the next one covers it. The CSS makes the cards
// sticky only once this has placed them (data-on on the list), so without it they are a plain list.
// Plain JS shipped as is, in its own file, so the page's inline script stays under Vite's 4,096 B.
const stack = document.querySelector("[data-cards]");

if (stack && "ResizeObserver" in window) {
  const cards = [...stack.children];
  const place = () => {
    const room = innerHeight - 16;
    cards.forEach((card, i) => {
      card.style.top = Math.min(88 + i * 20, room - card.offsetHeight) + "px";
    });
    stack.dataset.on = "";
  };
  new ResizeObserver(place).observe(stack);
  addEventListener("resize", place);
}
