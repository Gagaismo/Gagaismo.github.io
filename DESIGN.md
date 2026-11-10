---
name: Lautaro Guebel
description: A hand-coloured atlas of Tucumán in which a business is surveyed and put in order, laid under sheets of mica.
colors:
  paper: "#f4f1ea"
  plate: "#fbf6e6"
  ink: "#1f2a22"
  ink-2: "#4d564c"
  ink-3: "#8a9183"
  sage: "#dce3d0"
  sage-ink: "#4f6b4a"
  straw: "#ebdcae"
  ochre: "#8a5e17"
  brick: "#9c4127"
  tone: "#eae5d8"
  tone-strong: "#ddd6c4"
  green: "#0c7866"
  green-deep: "#095c4e"
  on-green: "#ffffff"
typography:
  display:
    fontFamily: "Georgia, \"Iowan Old Style\", \"Times New Roman\", serif"
    fontSize: "min(clamp(3rem, 7vw, 6.5rem), var(--fit, 100vw))"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "\"Albert Sans\", \"Albert Sans Fallback\", system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: "clamp(1.75rem, 1.2rem + 1.5vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "\"Albert Sans\", \"Albert Sans Fallback\", system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.3vw, 1.4375rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  wordmark:
    fontFamily: "Georgia, \"Iowan Old Style\", \"Times New Roman\", serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.3vw, 1.4375rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.01em"
  sheet-title:
    fontFamily: "\"Albert Sans\", \"Albert Sans Fallback\", system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.15vw, 1.125rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "\"Albert Sans\", \"Albert Sans Fallback\", system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.15vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "\"Albert Sans\", \"Albert Sans Fallback\", system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "\"Albert Sans\", \"Albert Sans Fallback\", system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.3
  caption:
    fontFamily: "Georgia, \"Iowan Old Style\", \"Times New Roman\", serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
  data:
    fontFamily: "ui-monospace, \"Cascadia Code\", \"SF Mono\", Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.3
    fontFeature: "\"tnum\""
rounded:
  panel: "14px"
  control: "10px"
  inner: "6px"
  pill: "999px"
  mark: "50%"
spacing:
  margin: "clamp(1.75rem, 0.75rem + 4vw, 5rem)"
  gutter: "clamp(1rem, 0.5rem + 1.6vw, 2rem)"
  page-max: "80rem"
  inset: "max(var(--margin), (100vw - var(--page-max)) / 2)"
  section: "clamp(3.5rem, 6vw, 5.5rem)"
  chapter: "clamp(3rem, 5.5vw, 5rem)"
  plate: "clamp(0.875rem, 1.8vw, 1.5rem)"
  photo-mat: "clamp(0.625rem, 1.4vw, 1rem)"
  plan-max: "68rem"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.on-green}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "10px 22px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.green-deep}"
    textColor: "{colors.on-green}"
  button-header:
    backgroundColor: "{colors.green}"
    textColor: "{colors.on-green}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "44px"
  header-pill:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "44px"
  button-quiet:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "10px 4px"
    height: "44px"
  plate:
    backgroundColor: "{colors.plate}"
    rounded: "{rounded.panel}"
    padding: "{spacing.plate}"
  plate-sage:
    backgroundColor: "{colors.sage}"
    rounded: "{rounded.panel}"
    padding: "{spacing.plate}"
  plate-straw:
    backgroundColor: "{colors.straw}"
    rounded: "{rounded.panel}"
    padding: "{spacing.plate}"
  glass-panel:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
  composer-option:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
    height: "44px"
  composer-option-hover:
    backgroundColor: "{colors.tone}"
  composer-option-selected:
    backgroundColor: "{colors.sage}"
    textColor: "{colors.ink}"
  estate-plot:
    backgroundColor: "{colors.straw}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "14px 16px 16px"
  disclosure-summary:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    typography: "{typography.sheet-title}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
    height: "44px"
  disclosure-summary-hover:
    backgroundColor: "{colors.tone}"
  method-card:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "clamp(1.25rem, 2.6vw, 2.25rem)"
---

# Design System: Lautaro Guebel

## Overview

**Creative North Star: "The Hand-Coloured Atlas of Tucumán, under mica"**

The site reads as a bound atlas. Two engraved landscape plates open and close it: the cane fields and sugar mill under the hero's promise, the lake and chapel under the footer. Between them, the engineering work is drawn as surveyor's plans in the same green-black ink: a flow of five stations on a pencilled track with a compass rose and a scale bar, an estate of plots for the club's system, a ledger for what a business can do on its own. A small business is mapped and put in order the way a cane estate is surveyed. The world was pinned by the user ("Me gusta muchos los colores (beige) y estetica tranquila que tiene el hero y footer. Quiero poder plasmar eso en el resto de la pagina"), so the build extends the plates' palette and calm to every section.

The calm + modern pass (S12, L100-L101) lays that atlas under sheets of mica: "Quiero mezclar el estilo tranquilo con algo moderno", with a frosted-glass dashboard ("es como una mica o un estilo ui de iphone") and a pill navbar as references. Figures sit on translucent, softly rounded sheets with a rim of light; text over the engravings sits on thicker glass; actions are pills; the header floats as three glass pills; the engravings move with the scroll, headings come in word by word and the method's steps stack as cards. The palette and the drawn plans are unchanged: the modern layer is material and motion, not colour. A designer's note (L111: "acompañemos la tipografia de la serif con otro tipo de tipografia para que no sea tan pesada y no se vea tan "vieja"") then moved the headings and titles to the sans too: the serif is kept for the hero's promise, the captions and the wordmark.

Density is low and the tempo is slow. Each section has its own composition, and a section is separated from the next by space and by a step in paper tone, never by a rule. Colour is watercolour wash on rag paper: a cream ground, a brighter plate paper for figures, a sage wash for the automation case, a straw wash for the padel case, and brick only where something fails or is struck out. The one saturated colour on the page is the forest-green action, kept from earlier versions on purpose so the action is never mistaken for decoration.

The world explicitly refuses the SaaS landing: saturated colour bands, blueprint grids and rows of same-size cards (direction contract, THESIS).

**Key Characteristics:**
- Cream paper ground; figures on sheets of mica (translucent plate paper, blur, a rim of light, 14px corners), never on ruled frames.
- Green-black ink for text and for every drawn line; washes carry case identity (sage = automation, straw = padel).
- The atlas serif only for the hero's promise, the italic captions and the wordmark; Albert Sans, self-hosted, for every heading, title, reading text and control.
- Diagrams in 1–1.5px ink linework with hatching, a compass rose and a scale bar where a plan is shown.
- Soft corners on surfaces (14 / 10 / 6px), pills for actions and the header; circles for drawn marks and stations.
- One protagonist animation (the automation plan drawing itself), with scroll-linked depth on the engravings, word-by-word headings and stacking method cards. Static and complete without JS, without scroll timelines or with reduced motion.

## Colors

A watercolour palette on rag paper: two papers, one ink in three strengths, two case washes each with its own ink, one failure colour and one action green. S12 adds no colour: mica and glass are the plate paper and the washes with alpha.

### Primary
- **Forest Action Green** (#0c7866): the action and nothing else: every `.btn` fill (hero, header pill, composer, case close), the caret, and the hover colour of the contact email row. White on it.
- **Deep Action Green** (#095c4e): the button's hover fill, and the written state of a decision record ("aceptada") on the sage wash (6.0:1).

### Secondary
- **Sage Wash** (#dce3d0): the automation case's field. The "Después" column, lit stations of the flow plan, retry nodes in the real graph, sage plates in the method and case chapters (`chapter--sage`), the chosen composer topic; `--mica-sage` is this wash at 0.86.
- **Sage Ink** (#4f6b4a): lines and marks of the automation case. The cable through the page (5.3:1 on paper), the "Después" list dots, the health-check ticks, the event log's check ring.

### Tertiary
- **Harvest Straw** (#ebdcae): the padel estate's whole field (`[data-case="padel"]`; ink 10.9:1, ink-2 5.6:1 on it), its plots, start/end nodes of plans, the travelling envelope, text selection, and the "venta" highlight (a pinned exception, see Typography); `--mica-straw` is this wash at 0.86.
- **Ochre Ink** (#8a5e17): the padel case's line marks (the 2px dash before each list line) and the booked-slot outline in the grill week.
- **Mill Brick** (#9c4127): failure and the old way. Hatched failure boxes and dashed failure paths in every plan, alert nodes, the strike-through on the offer ledger, the "how it was done" notes in surveys (6.1:1 on plate paper).

### Neutral
- **Rag Paper** (#f4f1ea): the body ground and the `theme-color`; it shows between the header's pills.
- **Plate Paper** (#fbf6e6): the brighter paper a figure sits on. Made translucent it is the mica (`--mica`, 0.8) of plates, the composer, the contact card and the phone's sheet, and the glass (`--glass`, 0.74) over the engravings and in the header; opaque it is the method cards, the event log's lines, the case closing band and the footer's ground (the engravings' own sky).
- **Green-Black Ink** (#1f2a22): all running text and headings, every drawn line in plans, the focus ring, the header's links and ES · EN (7.73:1 on the glass over the darkest stroke).
- **Faded Ink** (#4d564c): secondary text (5.5:1 or more on paper, plate and both washes): "Antes" column, captions, legends; the dot between ES and EN.
- **Pencil** (#8a9183): non-text lines only. The dashed track under the flow stations and the one user-requested separator above the real graph. Never text.
- **Tone** (#eae5d8) and **Tone Strong** (#ddd6c4): the hover of composer options and of the disclosure, the roles plot on the padel plan, the default image slot.

### Named Rules
**The One Saturated Colour Rule.** Forest green is the only saturated colour, and it only ever means "act". Washes carry case identity; brick carries failure; nothing else gets colour.

**The Wash Is the Case Rule.** Sage belongs to the automation case and straw to the padel case. A wash appears outside its case only as a small node fill inside a plan (straw for ends and the envelope, sage for retries and lit stations).

**The Pencil Is Not Ink Rule.** `ink-3` draws non-text lines only; any text uses `ink` or `ink-2`.

**The Mica Is Paper Rule.** Every translucent fill is an existing paper or wash with alpha, never a new colour or a white veil.

## Typography

**Display, Caption and Wordmark Font:** Georgia (with Iowan Old Style, Times New Roman, serif)
**Heading, Body and UI Font:** Albert Sans, self-hosted (400 and 600, latin, `font-display: swap`, 400 preloaded), with a metric-matched Arial fallback and the system sans after it
**Label/Mono Font:** ui-monospace (with Cascadia Code, SF Mono, Consolas, monospace), for real data only

**Character:** Two voices. The atlas serif, at weight 400, speaks in three places only: the hero's promise, the italic captions (under figures, plan legends, the contact lines' labels, the ledger's struck old way, the case facts' terms) and the wordmark ("Lautaro Guebel" and the "LG" monogram, in the header and the footer). A modern geometric-humanist sans carries everything else: section headings, the case pages' h1 and chapters, every title, the reading text and every control. S12 first decided "Serif en títulos + sans moderna en UI"; L111 (a designer's note relayed by the user: the serif read heavy and "old") moved the headings and titles to the sans as well, so the page reads lighter. Large sans sizes run at 400 with the tracking pulled in (-0.025em for headlines, -0.03em for the before/after words); everything at the title size or under is 600, tracked -0.015em (title) or -0.01em (sheet title). Only the two shipped weights are used. The fallback ("Albert Sans Fallback", Arial at `size-adjust: 105.2%`, ascent 90.3%, descent 23.8%) keeps the lines where they are while the sans swaps in.

### Hierarchy
Six size tokens are the only sizes text uses (`--fs-display`, `--fs-head`, `--fs-sub`, `--fs-lead`, `--fs-body`, `--fs-small`). Drawings (SVG plans, the real graph) set their own sizes in viewBox units. At 1440 / 768 / 390px the display renders about 101 / 54 / 46px, the headline 40 / 31 / 28px, the title 22 / 20 / 20px, the lead 18 / 17 / 17px and the body 16px.
- **Display** (serif 400, `--fs-display` = `min(clamp(3rem, 7vw, 6.5rem), var(--fit))`, line-height 1, tracking -0.025em): the hero promise on two lines. The "Antes" / "Después" specimen words take the same size in the sans 400 (line-height 0.9, -0.03em). `--fit` is computed from the longer hero line and the real text column, `(100vw - 2 × --inset - 12px) / (characters × 0.5)`, so the hero and the before/after words are one size per language and the longer line always fits; `min(15vw, var(--fit))` at 720px and below.
- **Headline** (sans 400, `--fs-head` = `clamp(1.75rem, 1.2rem + 1.5vw, 2.5rem)`, 1.1, -0.025em): one per section (`.head`, revealed word by word; the flow's "venta" keeps its straw fill), the case page's single `h1` (1.08), the contact email and place lines.
- **Title** (sans 600, `--fs-sub` = `clamp(1.25rem, 1.1rem + 0.3vw, 1.4375rem)`, 1.15, -0.015em): chapter headings on case pages (`.subhead`), method card lines, offer ledger titles.
- **Wordmark** (serif 400, `--fs-sub`, 1, -0.01em; -0.02em for the footer "LG"): the header wordmark (and its "LG" monogram) from 1101px, the footer "LG".
- **Sheet title / Lead** (`--fs-lead` = `clamp(1.0625rem, 1rem + 0.15vw, 1.125rem)`): in sans 600 at 1.25 (-0.01em) for plate and sheet titles, plot names, list titles, decision records, register dates, contract days, footer column titles and the real graph's disclosure label; in the sans 400 at 1.5 for lead paragraphs (max 38–52ch), the hero's on glass.
- **Body** (sans 400, `--fs-body` = 1rem, 1.6): running text, measure 34–62ch depending on the column; buttons are sans 600 at this size, and the header wordmark drops to this size (in the serif) from 1100px down.
- **Label** (sans 400, `--fs-small` = 0.875rem): the header's four links and ES · EN, the header action (600), plot and detail text, status text.
- **Caption** (serif italic 400, `--fs-small`, 1.45, `ink-2`): under every plate and sheet, 10px below it, like an atlas caption, the phone's "Pantalla ilustrativa" included; the same voice labels the contact lines, the struck-through old way in the offer ledger and the case facts' terms. Plan legends inside SVGs use the same italic serif; their upright labels (node names, the compasses' "N") are in the sans.
- **Data** (mono 400, `--fs-small`, tabular figures, `ink-2`): event-log timestamps only.

### Named Rules
**The Six Sizes Rule.** Text uses the six size tokens and nothing else. A new size is a design change, not a tweak.

**The Two Voices Rule.** Serif for the hero's promise, the italic captions and the wordmark, nothing else; Albert Sans for every heading, title, reading text and control. Never a third face outside real data.

**The Atlas Caption Rule.** A figure's caption sits under it in small serif italic, never above it, never in tracked capitals.

**The Mono Is Data Rule.** Monospace appears only on real measured data (the timestamps of the event log), with tabular figures. Never as a "technical" costume.

### Pinned exception
**The "venta" highlight.** In the flow heading, the word "venta" sits on a straw fill (`padding-inline: 0.1em`, `box-decoration-break: clone`), requested by the user (L56). It is the only styled word inside a heading on the site and stays a single exception, not a pattern.

## Layout

One 12-column grid (`.grid`, `minmax(0, 1fr)` columns) inside equal outer insets:
- `--margin: clamp(1.75rem, 0.75rem + 4vw, 5rem)` grows with the viewport;
- `--page-max: 80rem` stops the content column at 1280px;
- `--inset: max(var(--margin), (100vw - var(--page-max)) / 2)` is whichever is wider, so the column is centred on wide screens. `.wrap` pads by `--inset`; effective insets are 80 / 43 / 28px at 1440 / 768 / 390px.
- `--gutter: clamp(1rem, 0.5rem + 1.6vw, 2rem)`: 31 / 20 / 16px.

Sections are separated by `--gap-section: clamp(3.5rem, 6vw, 5.5rem)` (86px at 1440, 56px on tablets and phones) and by a change of ground (paper, sage, straw, plate), never by lines; case chapters, the case close and the footer top use `clamp(3rem, 5.5vw, 5rem)`. Plates pad by `--plate-pad: clamp(0.875rem, 1.8vw, 1.5rem)`. The header is a transparent sticky bar of pills, 60px (56px at 720px and below), `scroll-padding-top` 76px, and the hero is `100svh - 60px` tall with the bar over its paper. Large figures (hero plate, footer plate, the before/after pair) run full bleed; their text keeps to the inset; text blocks share a few left edges. In the before/after pair the outer edges take the inset and the inner edges `--gutter / 2 + --margin`, so both columns keep their width past `--page-max`.

Compositions change from section to section: hero (promise across, lead and action on glass panels at the bottom), before/after as two half-width fields with the case link closing the "Después" column, the flow plan with the event log under it on seven columns and the legend on the last four, the method as five stacking cards, the padel estate as intro + photo + plan + two lists and a dated register, the offer as a single-plate ledger, the contact as a composer and a calling card of mica. Case pages alternate chapter layouts: `aside` (text 6 cols, sheets from col 8), `below` (text 7 cols, sheets across in `auto-fit, minmax(300px, 1fr)`), `flip` (sheets left 5 cols, text right); beside tall sheets the text is sticky under the header (top 88px) from 901px.

Survey plans stop growing at `68rem` (`max-width` on `.flow__svg--wide` and `.wf__svg--wide`, centred), so their labels render about 17px instead of scaling with the viewport. The real workflow graph switches to its tall plan from 1150px down (the wide plan's labels would fall under 13px); between 721 and 1150px the tall plan (420px at most) sits centred on a plate just as wide, under a divider of the same width.

The inset is a reserved lane: the cable (a 2px sage line with an ink-ringed station level with each section heading) runs there (`width: var(--inset)`) and content never enters it; each such heading keeps ≥12px of paper from the station (13px at 390px), and the hero link keeps 16px from the cable's envelope.

**Responsive rules (breakpoints in the code):**
- **1199px:** the hero's action drops under the lead on the left; the hero plate is sized from the hero's height.
- **1150px:** the real workflow graph switches to its tall plan (centred on a plate as wide as the 420px plan down to 721px).
- **1100px:** the method head goes to one column; the header wordmark drops to body size and the header action loses its mark.
- **900px:** two-column heads, padel, offer, contact and case chapters collapse to one column; each method card puts its sheet under its text; padel photo becomes 3:2.
- **860px:** the header's links and ES · EN tighten (10px link padding, 40px language targets, 12px action padding).
- **820–721px:** the wordmark pill shows the serif "LG" monogram so the four links fit beside it.
- **720px:** phone. The header hides the links (wordmark, ES · EN pill and action remain; 56px tall); hero is promise, lead, full-width action, then the plate shown clear below; flow plan switches to its tall drawing and the real graph waits behind a disclosure; before/after stack, the phone at `min(210px, 56vw)`; offer ledger stacks old way, title, sentence; lists pair up; the padel plots go two, two and two across; footer columns go to two and the bar stacks.
- **560 / 420px:** contract days and supply states run down the side and the case facts cartouche goes to one column; case-page plots go to one column. The padel register sets its dates beside the entries from a 22rem container.
- **389px:** the wordmark gives way to the serif "LG" monogram (the full name stays the link's accessible name).
- Usable at 360px with no horizontal overflow (`overflow-x: clip` on `body` and on `.hero`).

### Named Rules
**The Margin Lane Rule.** The outer inset belongs to the cable. Nothing else is placed in it.

**The Tone Step Rule.** Surfaces are separated by a step in paper tone, a wash or a sheet of mica, never by a line.

## Elevation & Depth

Depth comes from three things: tone steps between papers (paper → plate → wash), sheets of mica that let what lies behind them through, blurred, and the engravings themselves, which recede through masks into the page's own ground so no picture has an edge. Glass and mica cast no shadow: their blur, fill and rim set them apart.

### Surfaces (S12)
- **Mica** (`.plate`, and the components below): `background: var(--mica)` (plate paper at 0.8; `--mica-sage` and `--mica-straw` at 0.86 on the washes), `backdrop-filter: var(--glass-blur)` = `blur(18px) saturate(1.3)`, `box-shadow: var(--glass-rim)` = `inset 0 0 0 1px rgb(255 255 255 / 0.6), inset 0 1px 0 rgb(255 255 255 / 0.9)` (a 1px rim of light and a brighter top edge), `border-radius: var(--radius-panel)`. Mostly paper on purpose: on flat ground it reads as a lighter plate, never as see-through glass. Applies to every plate and sheet, the "Después" phone's sheet, the composer's draft and topic rows, the contact calling card, the real graph's disclosure, the event log's frame and the case pages' sheets and cartouche.
- **Glass** (`.glass`): the thicker fill, `--glass` = plate paper at 0.74, with the same blur, rim and radius. Only over the engravings: the hero's lead and its action panel, and the header's wordmark and nav pills. Over the darkest stroke of the hero's art (rgb(12 22 2)) ink keeps 7.7:1 unblurred, 10:1 blurred. The hero's panels rest on the picture and cast no shadow.
- **Opaque cards:** the method's stacking cards are `.plate` with `background-color: var(--plate)`, because a card must hide the one it covers.
- **Fallbacks:** without `backdrop-filter` (both prefixed and unprefixed, nested `@supports not`) the fills thicken to 0.92 (mica) and 0.9 (glass); under `prefers-reduced-transparency: reduce` every mica and glass is opaque (`--plate`, `--sage`, `--straw`) and `--glass-blur` is `none`. The `-webkit-backdrop-filter` lives in its own `@supports` block because the minifier folds it into the unprefixed declaration otherwise.

### Shadow Vocabulary
- **Floating phone** (`filter: drop-shadow(0 18px 28px rgb(0 0 0 / 0.28))`): the drawn phone that holds the illustrative "Alta de alumno" screen, on the "Después" column and on the automation case page.

Inset `box-shadow` rings are not elevation: the glass rim above, and on case-page marks (contract day stations, survey scale dots, grill-week slots) drawn ink linework.

### Named Rules
**The Only Floating Thing Rule.** Only the drawn phone casts a shadow. Plates, glass, the header's pills and buttons rest flat (T23 removed the lift S12 had put under the hero's glass and the header's pills: the taste inspector failed it as "shadow" and "button-fx").

## Shapes

S12 replaced the square corners with soft ones ("Vidrio + esquinas suaves (Recomendado)"):
- **Panel** (`--radius-panel`, 14px): plates, sheets, glass panels, the phone's sheet, method cards, the contact card, the event log.
- **Control** (`--radius-control`, 10px): composer topic rows, the disclosure summary, estate plots on the home and the case pages.
- **Inner** (`--radius-inner`, 6px): a picture on a plate's mat, so its corner runs parallel to the plate's.
- **Pill** (`--radius-pill`, 999px): every `.btn` (the quiet one included), the header's three pills, its links, the scrollspy chip and the ES · EN targets.
- **Circles** stay for drawn marks: list dots, check ticks, cable stations, the composer's radio rings, the disclosure's ring, the padel register's stations, survey scale dots, contract day stations, the compass ring.

Drawings keep their own geometry: the survey plans' stations and failure boxes are square in their viewBox, the envelope has a 2-unit corner, the drawn phone has its own device radii.

Lines are ink: 1.25px (`--line`) for CSS-drawn connectors, 2px (`--line-bold`) for station rings, 1–1.5 viewBox units in SVG plans. Failure is hatched at 45° in brick (7-unit pattern in SVG, 6px data-URI pattern in CSS) and drawn as a 6/6 or 6/5 dash. Tracks are pencilled in `ink-3` with a 3/7 dash. List marks are filled shapes, never boxes: a 2px dash for the old way (ink-2 or ochre), a filled dot for the new way (sage-ink or ink), a filled square for ordered steps.

Photos sit inside a plate with a paper mat (`--spacing.photo-mat`) and are toned to the page with a light sepia (0.2–0.3) and reduced saturation (0.75–0.82).

## Components

### Buttons
Flat pills, one fill, no border, no shadow; the label followed by a drawn mark.
- **Shape:** pill (`--radius-pill`), one shape on the whole page; the focus ring follows it.
- **Primary:** forest green fill, white sans 600 at body size, 44px min height, 10px × 22px padding, 10px gap. Used for the hero mailto, the composer's send, the case close.
- **Button mark** (`BtnMark.astro`): after the label, an 18 × 13 drawn envelope (actions that write an email) or arrow (the header's "down to contact"), 1.125em wide, 1.5px `currentColor` stroke with `non-scaling-stroke`, square joins; it steps 2px forward on hover (fine pointers, motion allowed).
- **Header action:** the same pill at 44px, 0 × 18px padding (12px from 860px, 10px on phones), label size, never wrapping, with the arrow mark from 1101px; flat like every button.
- **Hover / Focus / Active:** hover fills deep green (200ms, only on fine pointers); press scales to 0.97 (140ms, exponential ease-out); focus is a 3px ink outline offset 3px.
- **Quiet:** not a block of tone but ink text underlined like a link (0.07em, offset 0.22em) on the paper, 4px side padding, the underline thickening to 0.14em on hover. Used for "Copiar" beside the send button.

### Text links
Underlined at 0.07em, offset 0.22em; hover thickens the underline to 0.14em. Case links ("Ver el caso completo") are 600 weight, never wrap, and carry 6px of block padding. They close their case's text and never sit right above a heading: on the home the automation link is the last line of the "Después" column (under its list), the padel link the last line of the padel intro.

### Navigation (floating glass pills)
After the "Mist" reference: a transparent sticky bar (`pointer-events: none`, so the page shows and works between the pills) holding three pills, 8px apart.
- **Wordmark pill:** glass, 44px, 16px side padding (10px on phones), the full name on one line in serif 400 at title size (body size up to 1100px), never cut; the serif "LG" monogram stands in at 389px and below and between 721 and 820px, with the full name kept as the link's accessible name. Its rim of light is drawn by a `::before` layer (same `--glass-rim`, `border-radius: inherit`), because a box-shadow on a link, even inset light, reads as a button effect to the taste inspector.
- **Nav pill:** glass, 4px inside padding: four sans links at label size in ink (44px, 12px side padding, 10px from 860px; hover `rgb(255 255 255 / 0.4)` on fine pointers), then ES · EN: the two codes in the sans at label size, both in ink (the muted ink falls to 4:1 on glass over the darkest strokes), a 3px `ink-2` dot drawn between them, the current one underlined, 44 × 44 targets (40px wide from 860px). Hidden links below 720px; ES · EN stays in the pill.
- **Action pill:** the green header action at the far end.
- **Scrollspy:** a lighter chip (`rgb(255 255 255 / 0.72)` with a 1px white rim, pill, 4px inside the nav pill, `aria-hidden`) slides under the link of the section being read (420ms, `--ease-out`); an IntersectionObserver band at 40% of the screen decides it: the hero marks none, `#automation` and `#padel` mark "Casos", `#method` "Cómo trabajo", `#offer` "Qué hago", `#contact` "Contacto"; on case pages only "Contacto". The current link carries `aria-current="true"`.
- **Hide on scroll:** past the hero, reading down slides the bar up past its own height and 16px more (`translateY(calc(-100% - 16px))`, 360ms); any upward scroll, focus inside the bar or a jump to an anchor (held until the scroll settles, plus 160ms) brings it back. Under reduced motion it never hides and the chip does not slide. External script `src/scripts/header.js`.
- A skip link appears in ink on plate on focus, at the inset.

### Plates and sheets (signature)
A figure on a sheet of mica: fluid padding, panel radius, rim of light; `plate--sage` and `plate--straw` lay it on a wash's mica. A sheet adds a sans 600 title on top and the italic serif caption under it. Plates hold the photos (with a mat and the inner radius), the case pages' process maps, glossaries, decision records and contract days.

### The "Después" phone
The generated "Alta de alumno" screen in the drawn phone (308:628 frame), on a sheet of mica over the sage wash with its italic caption ("Pantalla ilustrativa") under it. The phone's size comes from its width: `clamp(180px, 15vw, 220px)` beside the "Antes" column (180px from 721 to 1200px, 216px at 1440), `min(210px, 56vw)` on phones; the sheet grows to hold it (`aspect-ratio: auto`), so it never shrinks with the slot's height (T23: it had fallen to 55 × 113px at 721px).

### Survey plans (signature)
The automation flow is drawn twice (wide: five 232 × 88 stations in a row over the track, viewBox 1280, capped at 68rem; tall: stacked stations with the track on the left, capped at 420px) on a plate: ink stations with sans 600 labels (20 units), a dashed pencil track, a brick hatched failure box, a four-segment scale bar captioned "escala: un paso" / "scale: one step" and a compass rose with a half-inked north needle. The real workflow graph and the case-page process map follow the same grammar: straw for ends, plate for steps, sage for retries, brick outline and text for alerts, ink arrows, brick dashed failure edges, italic serif link labels. The real graph's node names are sans 600 (17 units on the wide plan, about 14.6px at its 68rem cap; 14 units on the tall plan, 16px at 420px), hatching only on failure.

### Estate plots
A system drawn as a cadastral sheet: a six-column grid of plots of different spans with 6px gaps (the paths, in the sheet's paper), each plot on the control radius. Plots are straw (sage on the automation page) with some on paper for rhythm: on the home the first plot (roles) runs across on tone and the third sits on paper; on case pages every third plot sits on paper. Sans 600 plot name at lead size, sans 400 detail at small size. On phones the home's plots stay of different sizes: roles across, two side by side, the last two across.

### Method stacking cards
"Cómo trabajo" is an `ol.stack[data-cards]` of five cards: each an opaque plate (panel radius, rim) with what happens on the left (sans 600 title-size line, sans text) and the sheet it leaves behind on the right (under it from 900px down). `src/scripts/stack.js` sets each card's sticky `top` to 88px + 20px per card, so the covered ones keep their top edge in view, or higher for a card taller than the screen (it sticks by its bottom, 16px above the edge), then marks the list `data-on`; the CSS makes the cards sticky only then and only with motion allowed. Where scroll timelines exist, each covered card sinks back from its top edge (`scale` to 0.90–0.975, a fifth of the list's exit each); the last card is never covered. Without the script, without support or with reduced motion it is a plain list of cards.

### Ledger
The offer: a single plate, one entry per benefit, the entries apart by space alone (`row-gap: clamp(1.5rem, 3vw, 2.25rem)`), no alternating rows. Each entry sits on the 12-column grid: on the left the old way, struck through in brick over `ink-2` small serif italic, above the new way's sans 600 title (columns 1–6); on the right the sentence, level with the title (columns 7–12, max 52ch). The title comes first in the markup. Below 720px: old way, title, sentence stacked.

### Padel outcome register
"Cómo terminó" is a dated register, not a boxed list: an ink line down the side with a 15px station per entry (a 2px ink ring on plate paper, like the contract's days on the case page), the line running from one station to the next; the when in sans 600 at lead size with tabular figures (a real `<time>` where a real date exists, "El mismo día" otherwise), the what beside it from a 22rem container (every when in one column) or under it. Only real dates and facts are registered; nothing is invented to fill it.

### Case facts cartouche
At the top of each case page the business and its problem sit in a cartouche: a plate with the terms in `ink-2` serif italic at small size over their sans text, two columns (1fr / 2fr) where there is room and one from 560px down, max 60ch, captioned under it ("Ficha del caso" / "The case at a glance").

### Event log
A register on a plate beside the plan: four reserved lines of 44px (52px on phones) so a new entry never moves the page; each line carries the plate's opaque paper and is the timestamp (mono, tabular, right-aligned in a 6.5rem margin), a sage check ring with an ink tick, and the event in sans 600. A new entry arrives on top every 4s and the oldest fades under the line it loses.

### Message composer (inputs)
- **Topic options:** full-width rows of mica on the control radius with the rim of light, like the segments of a control; 44px min height, 10px × 16px padding, 8px apart; hover tone; the chosen row takes the sage wash with ink text. The radio is drawn as a survey station: `appearance: none`, a 14px ring in 1.5px ink on the paper; checked, an ink dot inside a 2.5px sage band (ink ring, sage band, ink centre). Focus puts the 3px ink outline on the whole row; press scales to 0.985; under forced colours the ring and dot use `CanvasText`.
- **Draft:** the chosen message on a plate (22 × 24px padding, min 9.5em), announced politely; send (primary, envelope mark) and copy (quiet) under it, full width on phones; a status line at small size.

### Contact calling card
The close of the contact section: two lines on one sheet of mica, like a calling card, on the page's grid inside the inset. Each label ("Te respondo por acá", "Donde estudio y trabajo") is an italic serif caption in columns 1–3; the address (contacto@lautaroguebel.tech, green on hover) or the place sits beside it in columns 4–12 at headline size (title size from 900px down), baseline-aligned. Lines are `clamp(1rem, 2vw, 1.5rem)` apart; from 720px down the caption sits over its line.

### Disclosure
The real graph's summary on phones: a row of mica on the control radius, 44px, the label in sans 600 at lead size, upright, with a drawn plus inside a 14px ring (1.5px stroke, cable-station language) whose vertical bar scales away when open; hover tone. From 721px, where `::details-content` is supported, the summary hides and the graph is shown open.

### The cable
A 2px sage line in the left margin from the hero to the contact send button, drawn with the scroll; a 14px ink-ringed station (paper centre filling with sage on entry) level with each section heading; a small straw envelope rides its drawn end; a branch draws into the first station of the flow when the flow plays. Decorative and `aria-hidden`.

### Footer (pinned exception)
The user's reference footer (L67), kept as built: the plate paper ground, black text, the serif "LG", an envelope icon in a 32px box with a 1px border, 6px radius and translucent white fill (the icon drawn at 1.5px in `currentColor`, non-scaling), two link columns (sans 600 titles, sans 400 links in #504e42, black on hover), a closing row in the sans in #474640 over a 1px hairline (#ebe4d2), and the living lake-and-chapel plate filling the bottom. Its values are local to the footer and are not part of the system's palette, radius or line vocabulary; S12 left it untouched apart from the plate's scroll motion. L111 moved its column titles, links and closing row from the serif to the sans with the rest of the page (the user asked for the lighter type across the page); the "LG" keeps the serif as the wordmark.

### Motion grammar
- **Tokens:** `--ease-out` cubic-bezier(0.22, 1, 0.36, 1); `--ease-in-out` cubic-bezier(0.77, 0, 0.175, 1); press 140ms, hover 200ms, reveal 640ms, stagger 70ms; page view transitions 280ms; header hide 360ms, scrollspy chip 420ms.
- **Protagonist:** the automation plan plays a 4.7s sequence when it is half into view and re-arms when it leaves: the cable branch draws in (420ms), the envelope pops (480ms), then hops station to station on an exponential ease-out (cubic-bezier(0.16, 1, 0.3, 1)) while the ink line fills the track behind it, each station lighting sage with a small swell (520ms). Transform and opacity only.
- **Word reveal (S12):** every section heading (`data-reveal="words"`) is split at build time by `Words.astro` into one inline-block `.w` span per word, the spaces left as plain text, so the heading reads and is named exactly as written. When it enters, each word rises 0.35em out of `blur(6px)` and fades in, 640ms, 70ms after the one before.
- **Entrances:** once per element: other `data-reveal` targets rise 16px and fade (640ms, staggered by `--i`); `data-shutter` pictures fade and settle from scale 1.04 inside their clipping frame (700/1100ms). The hero lines rise from their clip (1000ms, 110ms apart); the lead and action panels fade up from a 6px blur (700ms); the promise settles back as the hero scrolls away.
- **Scroll parallax and zoom on the engravings (S12):** CSS scroll-driven animations on the longhand `translate` and `scale`, so they add to the living loops, which own `transform`. Hero (`view-timeline: --hero`, range `exit-crossing`, from the first scroll to the hero's last pixel; nothing moves on the first screen and the glass panels never move): the frame sinks 7% and grows to 1.06 from its bottom, the far mountains lag 5%, the cane in the corners grows to 1.08 from its base. Footer (`--foot`, range `entry`): the scene settles from 1.08, the far band rises from -5%, the near foliage shrinks back from 1.12, ending where the loops expect it.
- **Stacking cards (S12):** see Method stacking cards; the sink is scroll-driven, the stacking is plain `position: sticky`.
- **Living plates:** CSS and SMIL loops on copies of the same picture: camera push-in (18s hero, 16s footer), far mountains lagging, cane or foliage swaying from the base, mill smoke, a drifting gust or lake ripples (SVG displacement), a canoe crossing the lake (44s).
- **No support:** every scroll-linked rule sits inside `@supports (animation-timeline: view())`; without it the engravings keep only their loops and the method cards stack without sinking. The scroll animations are written in longhands because the minifier folds a shorthand and its timeline into one the browsers reject.
- **Reduced motion:** every animation and transition is off globally, smooth scroll and view transitions are off, the SMIL layers (gust, ripples, smoke) are removed, the scroll-linked depth is never applied, headings show whole, the method is a plain list, the header never hides, the flow is shown static and complete (all stations lit, track full, no envelope), the event log is a still register of four, and the cable is fully drawn. Content is visible by default: nothing is hidden unless the `.js` class is present and motion is allowed.

### Imagery
- Six shipping rasters, all generated with ChatGPT image generation and owned by the project, regenerated at a higher resolution in S12 (T19) in the aspect each slot uses: the hero cane-fields engraving (4100 × 1758) and the footer lake-and-chapel engraving (4100 × 1757), each drawn as three overlapping tiles and stitched; the desk ("Antes", 1448 × 1086, 4:3); the padel court (1254 × 1254, 1:1 for its 0.79:1 slot); the hardware-store owner, a synthetic person (1672 × 941, 16:9); and the illustrative "Alta de alumno" screen (883 × 1925). Each carries its generation prompt embedded in the file (`impeccable:prompt`, a PNG tEXt chunk or a JPEG comment); prompts and defects are also kept in `design/portfolio-home/assets/generated/README.md`.
- Every slot offers a candidate at least twice its widest rendered size: the engravings `widths` 640 to 4100; desk 480/720/1080 at `50vw`; court 640/1024/1440 at `40vw` (100vw from 900px down) and owner 640/960/1440 at `40vw` (100vw from 720px down); the phone screen 240/480/720 at `(max-width: 720px) 51vw, 200px`. Never upscaled: widths above the source are dropped and the source width is added.
- Engravings are decorative (`alt=""`), full bleed, with their own sky masked into the page's paper. Photos are content with written ES/EN alt text, inside a plate with a mat, toned with sepia and lowered saturation, on the inner radius, served as AVIF/WebP.
- No portrait of Lautaro, no client names, logos, people or screens that identify a client; illustrative data is labelled as such.

## Do's and Don'ts

### Do:
- **Do** set every figure on a sheet of mica (or a wash's mica), with its italic serif caption under it.
- **Do** keep forest green (#0c7866) for actions only, and give each case its wash: sage for automation, straw for padel.
- **Do** draw diagrams as survey plans: ink lines 1–1.5 units, pencilled tracks, brick hatching and dashes for failure, a compass rose and a scale bar where a plan is shown.
- **Do** use only the six size tokens for text; the serif for the hero's promise, the italic captions and the wordmark, Albert Sans for every heading, title, reading text and control.
- **Do** use the four radius tokens: panel for surfaces, control for rows and plots, inner for a picture on a mat, pill for actions and the header.
- **Do** put text over an engraving on glass, and keep glass over pictures and in the header only.
- **Do** separate sections with space and a change of ground (`--gap-section`, paper → plate → wash).
- **Do** mark list lines with filled shapes (dash, dot, square) instead of boxes or bullets.
- **Do** make every animation start from a visible, complete default, tie scroll motion to `translate` / `scale` inside `@supports (animation-timeline: view())`, and switch it all off under reduced motion; keep one protagonist (the plan).
- **Do** keep text AA on every ground: ink or ink-2 on paper, plate, sage, straw and mica; ink only on glass; brick and green-deep only where their measured contrast holds (6.1:1 and 6.0:1).
- **Do** embed the generation prompt in every new shipping raster, give each slot a 2x candidate and tone photos to the paper.

### Don't:
- **Don't** use saturated colour bands, blueprint grids or rows of same-size cards (the SaaS landing the world refuses).
- **Don't** put a label, kicker or eyebrow above a heading, number sections, or use tracked uppercase labels.
- **Don't** put a shadow on anything at rest, glass included; the drawn phone is the only floating object.
- **Don't** divide content with hairlines or outline boxes in 1px lines; the 1px rim of light on mica is inset light, not a frame, and ink linework belongs to drawings and marks.
- **Don't** invent a radius or a translucent colour: every corner is a token, every fill an existing paper or wash with alpha.
- **Don't** use monospace outside real data, or `ink-3` for any text.
- **Don't** use text glyphs ("+", "→") as icons; draw them as SVG in the 1.5px ink line.
- **Don't** name technologies, tools or frameworks, or show a GitHub link, anywhere in text, alt, aria-label or title.
- **Don't** use gradients as fills; masks are only for blending the engravings into the paper.

### User-pinned exceptions (not patterns)
- **Two hairlines:** the 1px `ink-3` separator above the real workflow graph (canvas comment if01muum), now bounded to the plan under it (`min(68rem, 100% - 2 × --plate-pad)`, 420px where the tall plan stands in), and the footer's 1px closing hairline (L67). No other rule lines.
- **The "venta" highlight:** the straw fill behind one word in the flow heading (L56).
- **The footer:** its black text, #504e42 / #474640 inks, #e9e2cf / #ebe4d2 lines and the 6px-radius icon box come from the user's reference and stay local to it. Its serif link columns were part of that pin (L67) until L111: the user asked for the lighter type across the whole page, so the columns and the closing row are now in the sans; only the "LG" stays serif.
- **System serif as the display face:** pinned by the user (artboard-02 typography). The earlier pin of the display size "up to 10rem" is superseded by the designer pass (S11, L93): the display now tops out at 6.5rem.
- **Glass and pills (S12):** the frosted surfaces and the floating pill header were asked for by the user ("Vidrio + esquinas suaves", "Header en píldoras con scrollspy") against the taste skill's "no glass, no floating pill navigation" house rule; they stay as decided.

### Superseded by the type pass (L111)
- **Serif headings and titles** ("Serif en títulos + sans moderna en UI", S12) are narrowed: section headings, the case h1 and chapters, the before/after words, method card lines, sheet, plate, plot, list and ledger titles, register dates, decision records, contract days, the contact lines, the disclosure label, the real graph's node names, the compasses' "N" and the footer's columns and closing row now use Albert Sans. The serif keeps the hero's promise, the italic captions and the wordmark.

### Superseded by the calm + modern pass (S12, L100-L101)
- **Square corners everywhere** ("Square corners on every surface, button, plate, option, plot and photo"; "Don't round corners on surfaces, buttons or photos") is replaced by the four radius tokens (panel 14px, control 10px, inner 6px, pill 999px).
- **Opaque plates as tone steps with no frame** are now sheets of mica (translucent, blurred, a 1px rim of light); the hero's veils behind the lead and action are now glass panels.
- **System sans for reading text** (system-ui) is replaced by self-hosted Albert Sans for body, lead and every control; the header's links and ES · EN moved from the serif to the sans and are all in ink.
- **The plain sticky bar on the paper** (60px, "no chrome, no border, no blur", a 36px square action) is now three floating glass pills with a scrollspy chip and hide-on-scroll, and a 44px pill action.
- **The method as five stepped columns** and, from 1100px down, the scroll-snap carousel with its tally and "Deslizá" hint, are replaced by the five stacking cards; the method tally component is gone.
- **The engravings at 1915 × 821**, the court at 2172 × 724 and the owner at 1913 × 822 (ultra-wide crops shown in other ratios) are replaced by the T19 regenerations listed under Imagery.

### Superseded by the designer pass (S11, L93)
The designer asked for a smaller scale, wider side margins and refined stock-looking components, with the palette unchanged. These earlier values no longer hold: the display up to 10rem (now 6.5rem); headline 56px, title 28px, lead 20px, body 17px (now 40 / 22 / 18 / 16px at 1440); margins 16–32px with no maximum width (now the 80rem page and `--inset`); section gap 64–120px (now 56–88px); plate padding up to 36px (now 24px); 52px primary and quiet buttons, the 40px header button, 52px composer options and disclosure (now 44px); header 72 / 64px (now 60 / 56px) and sticky top 104px (now 88px); event log lines 52 / 60px (now 44 / 52px); the quiet button as a tone block; the composer's native green radios and ink selected row; the zebra ledger; the boxed padel outcome. Kept: the Six Sizes Rule, the Georgia serif, the "venta" highlight (em-based), the hairlines, the footer and the whole palette.
