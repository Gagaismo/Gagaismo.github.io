---
name: Lautaro Guebel
description: A hand-coloured atlas of Tucumán in which a business is surveyed and put in order.
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
    fontSize: "min(clamp(3.5rem, 10vw, 10rem), var(--fit, 100vw))"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Georgia, \"Iowan Old Style\", \"Times New Roman\", serif"
    fontSize: "clamp(2.125rem, 1.4rem + 2.4vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Georgia, \"Iowan Old Style\", \"Times New Roman\", serif"
    fontSize: "clamp(1.5rem, 1.2rem + 0.4vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  sheet-title:
    fontFamily: "Georgia, \"Iowan Old Style\", \"Times New Roman\", serif"
    fontSize: "clamp(1.1875rem, 1.1rem + 0.25vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.25
  lead:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: "clamp(1.1875rem, 1.1rem + 0.25vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
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
  none: "0"
  mark: "50%"
spacing:
  margin: "clamp(1rem, 2.2vw, 2rem)"
  gutter: "clamp(0.75rem, 1.4vw, 1.5rem)"
  section: "clamp(4rem, 8vw, 7.5rem)"
  plate: "clamp(1rem, 2.6vw, 2.25rem)"
  photo-mat: "clamp(0.625rem, 1.4vw, 1rem)"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.on-green}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "14px 26px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.green-deep}"
    textColor: "{colors.on-green}"
  button-header:
    backgroundColor: "{colors.green}"
    textColor: "{colors.on-green}"
    rounded: "{rounded.none}"
    padding: "8px 26px"
    height: "40px"
  button-quiet:
    backgroundColor: "{colors.tone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "14px 26px"
    height: "52px"
  button-quiet-hover:
    backgroundColor: "{colors.tone-strong}"
  plate:
    backgroundColor: "{colors.plate}"
    rounded: "{rounded.none}"
    padding: "{spacing.plate}"
  plate-sage:
    backgroundColor: "{colors.sage}"
    rounded: "{rounded.none}"
    padding: "{spacing.plate}"
  plate-straw:
    backgroundColor: "{colors.straw}"
    rounded: "{rounded.none}"
    padding: "{spacing.plate}"
  composer-option:
    backgroundColor: "{colors.tone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "10px 16px"
    height: "52px"
  composer-option-hover:
    backgroundColor: "{colors.tone-strong}"
  composer-option-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-green}"
  estate-plot:
    backgroundColor: "{colors.straw}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "14px 16px 16px"
  disclosure-summary:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
    height: "52px"
  disclosure-summary-hover:
    backgroundColor: "{colors.tone}"
---

# Design System: Lautaro Guebel

## Overview

**Creative North Star: "The Hand-Coloured Atlas of Tucumán"**

The site reads as a bound atlas. Two engraved landscape plates open and close it: the cane fields and sugar mill under the hero's promise, the lake and chapel under the footer. Between them, the engineering work is drawn as surveyor's plans in the same green-black ink: a flow of five stations on a pencilled track with a compass rose and a scale bar, an estate of plots for the club's system, a ledger for what a business can do on its own. A small business is mapped and put in order the way a cane estate is surveyed. The world was pinned by the user ("Me gusta muchos los colores (beige) y estetica tranquila que tiene el hero y footer. Quiero poder plasmar eso en el resto de la pagina"), so the build extends the plates' palette and calm to every section.

Density is low and the tempo is slow. Each section has its own composition, and a section is separated from the next by space and by a step in paper tone, never by a rule. Colour is watercolour wash on rag paper: a cream ground, a brighter plate paper for figures, a sage wash for the automation case, a straw wash for the padel case, and brick only where something fails or is struck out. The one saturated colour on the page is the forest-green action, kept from earlier versions on purpose so the action is never mistaken for decoration.

The world explicitly refuses the SaaS landing: saturated colour bands, blueprint grids and rows of same-size cards (direction contract, THESIS).

**Key Characteristics:**
- Cream paper ground with plates as tone steps, never as ruled frames.
- Green-black ink for text and for every drawn line; washes carry case identity (sage = automation, straw = padel).
- Serif headings and italic serif captions, as in an atlas; system sans for reading text.
- Diagrams in 1–1.5px ink linework with hatching, a compass rose and a scale bar where a plan is shown.
- Square corners everywhere; circles only for drawn marks and stations.
- One protagonist animation (the automation plan drawing itself); everything else is quiet. Static and complete without JS or with reduced motion.

## Colors

A watercolour palette on rag paper: two papers, one ink in three strengths, two case washes each with its own ink, one failure colour and one action green.

### Primary
- **Forest Action Green** (#0c7866): the action and nothing else: every `.btn` fill (hero, header, composer, case close), the radio accent in the composer, the caret, and the hover colour of the contact email row. White on it.
- **Deep Action Green** (#095c4e): the button's hover fill, and the written state of a decision record ("aceptada") on the sage wash (6.0:1).

### Secondary
- **Sage Wash** (#dce3d0): the automation case's field. The "Después" column, lit stations of the flow plan, retry nodes in the real graph, sage plates in the method and case chapters (`chapter--sage`).
- **Sage Ink** (#4f6b4a): lines and marks of the automation case. The cable through the page (5.3:1 on paper), the "Después" list dots, the health-check ticks, the method carousel scrollbar, the event log's check ring.

### Tertiary
- **Harvest Straw** (#ebdcae): the padel estate's whole field (`[data-case="padel"]`; ink 10.9:1, ink-2 5.6:1 on it), its plots, start/end nodes of plans, the travelling envelope, text selection, and the "venta" highlight (a pinned exception, see Typography).
- **Ochre Ink** (#8a5e17): the padel case's line marks (the 2px dash before each list line) and the booked-slot outline in the grill week.
- **Mill Brick** (#9c4127): failure and the old way. Hatched failure boxes and dashed failure paths in every plan, alert nodes, the strike-through on the offer ledger, the "how it was done" notes in surveys (6.1:1 on plate paper).

### Neutral
- **Rag Paper** (#f4f1ea): the body ground, the sticky header, the `theme-color`, alternate ledger rows on plate paper.
- **Plate Paper** (#fbf6e6): the brighter paper a figure sits on: plates, the event log, the composer draft, case closing band, the footer's ground (the engravings' own sky).
- **Green-Black Ink** (#1f2a22): all running text and headings, every drawn line in plans, the focus ring, the selected composer option.
- **Faded Ink** (#4d564c): secondary text (5.5:1 or more on paper, plate and both washes): "Antes" column, captions, inactive language, legends.
- **Pencil** (#8a9183): non-text lines only. The dashed track under the flow stations and the one user-requested separator above the real graph. Never text.
- **Tone** (#eae5d8) and **Tone Strong** (#ddd6c4): the quiet button, composer options and their hover, the odd contact rows, the default image slot.

### Named Rules
**The One Saturated Colour Rule.** Forest green is the only saturated colour, and it only ever means "act". Washes carry case identity; brick carries failure; nothing else gets colour.

**The Wash Is the Case Rule.** Sage belongs to the automation case and straw to the padel case. A wash appears outside its case only as a small node fill inside a plan (straw for ends and the envelope, sage for retries and lit stations).

**The Pencil Is Not Ink Rule.** `ink-3` draws non-text lines only; any text uses `ink` or `ink-2`.

## Typography

**Display Font:** Georgia (with Iowan Old Style, Times New Roman, serif)
**Body Font:** system-ui (with -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif)
**Label/Mono Font:** ui-monospace (with Cascadia Code, SF Mono, Consolas, monospace), for real data only

**Character:** An atlas serif for every heading, title and caption, at weight 400 with slightly tightened tracking; a plain system sans for reading. Both are system faces with nothing to download. This pairing was pinned by the user (artboard 02) and is recorded here as a user decision, not as a general license to use system faces as a display voice.

### Hierarchy
Six size tokens are the only sizes text uses (`--fs-display`, `--fs-head`, `--fs-sub`, `--fs-lead`, `--fs-body`, `--fs-small`). Drawings (SVG plans, the real graph) set their own sizes in viewBox units.
- **Display** (serif 400, `--fs-display`, line-height 1, tracking -0.025em): the hero promise on two lines, and the "Antes" / "Después" specimen words (line-height 0.9). Capped by `--fit`, computed from the longer hero line, so the hero and the before/after words are one size per language; `min(19vw, var(--fit))` at 720px and below.
- **Headline** (serif 400, `--fs-head`, 1.1, -0.02em): one per section (`.head`), the case page's single `h1` (1.08), the contact email and place rows.
- **Title** (serif 400, `--fs-sub`, 1.15, -0.01em): chapter headings on case pages (`.subhead`), method step lines, offer ledger titles, the footer "LG", the contact rows at 900px and below.
- **Sheet title / Lead** (`--fs-lead`): in serif 400 at 1.25 for plate titles, plot names, list titles and footer column titles; in the sans at 1.5 for lead paragraphs (max 38–52ch). The wordmark is serif 700 at this size.
- **Body** (sans 400, `--fs-body`, 1.65): running text, measure 34–62ch depending on the column; buttons are sans 700 at this size.
- **Label** (`--fs-small`): nav links, language switch (sans 600), plot and ledger detail text, status text.
- **Caption** (serif italic 400, `--fs-small`, 1.45, `ink-2`): under every plate and sheet, 10px below it, like an atlas caption. Plan legends inside SVGs use the same italic serif.
- **Data** (mono 400, `--fs-small`, tabular figures, `ink-2`): event-log timestamps only.

### Named Rules
**The Six Sizes Rule.** Text uses the six size tokens and nothing else. A new size is a design change, not a tweak.

**The Atlas Caption Rule.** A figure's caption sits under it in small serif italic, never above it, never in tracked capitals.

**The Mono Is Data Rule.** Monospace appears only on real measured data (the timestamps of the event log), with tabular figures. Never as a "technical" costume.

### Pinned exception
**The "venta" highlight.** In the flow heading, the word "venta" sits on a straw fill (`padding-inline: 0.1em`, `box-decoration-break: clone`), requested by the user (L56). It is the only styled word inside a heading on the site and stays a single exception, not a pattern.

## Layout

One 12-column grid (`.grid`, `minmax(0, 1fr)` columns) inside equal outer margins (`--margin`, 16–32px) with a fluid gutter (`--gutter`, 12–24px). Sections are separated by `--gap-section` (64–120px) and by a change of ground (paper, sage, straw, plate), never by lines. Large figures (hero plate, footer plate, before/after pair, contact rows) run full bleed; text blocks share a few left edges.

Compositions change from section to section: hero (promise across, lead bottom-left, action bottom-right), before/after as two half-width fields, the flow plan full width with the event log under it on seven columns and the legend on the last four, the method as five stepped columns (each 1.25rem lower than the one before), the padel estate as intro + photo + plan + three lists, the offer as a ledger, the contact as a composer and two full-width rows. Case pages alternate chapter layouts: `aside` (text 6 cols, sheets from col 8), `below` (text 7 cols, sheets across in `auto-fit, minmax(300px, 1fr)`), `flip` (sheets left 5 cols, text right); beside tall sheets the text is sticky under the header (top 104px) from 901px.

The page margin is a reserved lane: the cable (a 2px sage line with an ink-ringed station level with each section heading) runs there and content never enters it; each such heading keeps ≥12px of paper from the station.

**Responsive rules (breakpoints in the code):**
- **1199px:** the hero's action drops under the lead on the left; the hero plate is sized from the hero's height.
- **1100px:** the method row becomes a sideways scroll-snap carousel (two steps from 601px, one below), the next step hidden behind a short soft edge, a "Deslizá" hint with a drawn arrow, keyboard-focusable region; the offer ledger stacks title and sentence.
- **900px:** two-column heads, padel, offer, contact and case chapters collapse to one column; padel photo becomes 3:2.
- **720px:** phone. Header hides the nav (wordmark, ES|EN, action remain; height 64px instead of 72px); hero is promise, lead, full-width action, then the plate shown clear below; flow plan and real graph switch to their tall drawings, the graph waits behind a disclosure; before/after stack; lists and plots pair up; footer columns go to two and the bar stacks.
- **600 / 560 / 480 / 420px:** method carousel shows one step; contract days and supply states run down the side; case facts stack; plots go to one column.
- Usable at 390px with no horizontal overflow (`overflow-x: clip` on `body` and on `.hero`).

### Named Rules
**The Margin Lane Rule.** The outer margin belongs to the cable. Nothing else is placed in it.

**The Tone Step Rule.** Surfaces are separated by a step in paper tone or a wash, never by a line or a shadow.

## Elevation & Depth

Flat. Depth comes from tone steps between papers (paper → plate → wash) and from the engravings themselves, which recede through masks into the page's own ground so no picture has an edge. There are no shadows at rest.

### Shadow Vocabulary
- **Floating phone** (`filter: drop-shadow(0 18px 28px rgb(0 0 0 / 0.28))`): the drawn phone that holds the illustrative "Alta de alumno" screen, on the "Después" column and on the automation case page. It is the one object that floats over a plate; the direction contract names it as the only exception.

Inset `box-shadow` rings on case-page marks (contract day stations, survey scale dots, grill-week slots) are drawn ink linework, not elevation.

### Named Rules
**The Only Floating Thing Rule.** Only the phone casts a shadow. Everything else is paper on paper.

## Shapes

Square corners on every surface, button, plate, option, plot and photo. Circles are reserved for drawn marks: list dots, check ticks, cable stations, survey scale dots, contract day stations, the compass ring. The envelope in the plan has a 2-unit corner in its drawing; the drawn phone has its own device radii.

Lines are ink: 1.25px (`--line`) for CSS-drawn connectors, 2px (`--line-bold`) for station rings, 1–1.5 viewBox units in SVG plans. Failure is hatched at 45° in brick (7-unit pattern in SVG, 6px data-URI pattern in CSS) and drawn as a 6/6 or 6/5 dash. Tracks are pencilled in `ink-3` with a 3/7 dash. List marks are filled shapes, never boxes: a 2px dash for the old way (ink-2 or ochre), a filled dot for the new way (sage-ink or ink), a filled square for ordered steps.

Photos sit inside a plate with a paper mat (`--spacing.photo-mat`) and are toned to the page with a light sepia (0.2–0.3) and reduced saturation (0.75–0.82).

## Components

### Buttons
Flat, square and decisive; one fill, no border, no shadow.
- **Shape:** square corners (0).
- **Primary:** forest green fill, white sans 700 at body size, 52px min height, 14px × 26px padding. Used for the hero mailto, the composer's send, the case close.
- **Header action:** the same button at 40px min height, 8px vertical padding (16px horizontal on phones), never wrapping.
- **Hover / Focus / Active:** hover fills deep green (200ms, only on fine pointers); press scales to 0.97 (140ms, exponential ease-out); focus is a 3px ink outline offset 3px.
- **Quiet:** tone fill with ink text (hover tone strong). Used for "Copiar" beside the send button.

### Text links
Underlined at 0.07em, offset 0.22em; hover thickens the underline to 0.14em. Case links ("Ver el caso completo") are 600 weight and never wrap.

### Navigation
A plain sticky bar on the page's paper, continuous with the hero: serif 700 wordmark on the left, four sans links at label size pushed right (underline on hover), the ES | EN switch (current one in ink and underlined, the other in faded ink that darkens on hover; 44 × 40px targets), and the header action. No chrome, no border, no blur. Below 720px the links hide. A skip link appears in ink on plate on focus.

### Plates and sheets (signature)
A figure on the brighter paper: `plate` background, fluid padding, no frame; `plate--sage` and `plate--straw` lay it on a wash. A sheet adds a serif title on top and the italic caption under it. Plates hold the photos (with a mat), the method's artifacts, the case pages' process maps, glossaries, decision records and contract days.

### Survey plans (signature)
The automation flow is drawn twice (wide: five 232 × 88 stations in a row over the track; tall: stacked stations with the track on the left) on plate paper: ink stations with sans 600 labels, a dashed pencil track, a brick hatched failure box, a four-segment scale bar ("one station to the next") and a compass rose with a half-inked north needle. The real workflow graph and the case-page process map follow the same grammar: straw for ends, plate for steps, sage for retries, brick outline and text for alerts, ink arrows, brick dashed failure edges, italic serif link labels.

### Estate plots
A system drawn as a cadastral sheet: a six-column grid of plots of different spans with 6px gaps (the paths, in the sheet's paper). Plots are straw (sage on the automation page) with some on paper for rhythm: on the home the first plot (roles) runs across on tone and the third sits on paper; on case pages every third plot sits on paper. Serif plot name at lead size, sans detail at small size. Pairs up at 720px.

### Ledger
The offer: a plate with one line per benefit, every other line on paper ("a ruled book without the rules"). Wide: the old way struck through in brick on the left (ink-2 text), the serif title, then the sentence. Below 720px: title, old way, sentence stacked.

### Event log
A register on plate paper beside the plan: four reserved lines of 52px (60px on phones) so a new entry never moves the page; each line is the timestamp (mono, tabular, right-aligned in a 6.5rem margin), a sage check ring with an ink tick, and the event in sans 600. A new entry arrives on top every 4s and the oldest fades under the line it loses.

### Message composer (inputs)
- **Topic options:** full-width radio rows on tone, 52px min height, 20px radio in green accent; hover tone strong; selected is ink with white text; focus puts the 3px ink outline on the row; press scales to 0.985.
- **Draft:** the chosen message on plate paper (22 × 24px padding, min 9.5em), announced politely; send (primary) and copy (quiet) under it, full width on phones; a status line at small size.

### Disclosure
The real graph's summary on phones: a plate row, 52px, sans 600, with a drawn plus (1.5px stroke) whose vertical bar scales away when open; hover tone. From 721px, where `::details-content` is supported, the summary hides and the graph is shown open.

### The cable
A 2px sage line in the left margin from the hero to the contact send button, drawn with the scroll; a 14px ink-ringed station (paper centre filling with sage on entry) level with each section heading; a small straw envelope rides its drawn end; a branch draws into the first station of the flow when the flow plays. Decorative and `aria-hidden`.

### Footer (pinned exception)
The user's reference footer (L67), kept as built: the plate paper ground, black text, the serif "LG", an envelope icon in a 36px box with a 1px border, 6px radius and translucent white fill, two serif link columns (links in #504e42, black on hover), a closing row in #474640 over a 1px hairline (#ebe4d2), and the living lake-and-chapel plate filling the bottom. Its values are local to the footer and are not part of the system's palette, radius or line vocabulary.

### Motion grammar
- **Tokens:** `--ease-out` cubic-bezier(0.22, 1, 0.36, 1); `--ease-in-out` cubic-bezier(0.77, 0, 0.175, 1); press 140ms, hover 200ms, reveal 640ms, stagger 70ms; page view transitions 280ms.
- **Protagonist:** the automation plan plays a 4.7s sequence when it is half into view and re-arms when it leaves: the cable branch draws in (420ms), the envelope pops (480ms), then hops station to station on an exponential ease-out (cubic-bezier(0.16, 1, 0.3, 1)) while the ink line fills the track behind it, each station lighting sage with a small swell (520ms). Transform and opacity only.
- **Entrances:** few on purpose, once per element: section headings and one main picture (`data-reveal`: 16px rise and fade, no blur; `data-shutter`: picture fades and settles from scale 1.04 inside its clipping frame, 700/1100ms). The hero lines rise from their clip (1000ms, 110ms apart); the lead and action fade up from a 6px blur (700ms); the promise settles back as the hero scrolls away (scroll-driven, where supported).
- **Living plates:** CSS and SMIL loops on copies of the same picture: camera push-in (18s hero, 16s footer), far mountains lagging, cane or foliage swaying from the base, mill smoke, a drifting gust or lake ripples (SVG displacement), a canoe crossing the lake (44s).
- **Reduced motion:** every animation and transition is off globally, smooth scroll and view transitions are off, the SMIL layers (gust, ripples, smoke) are removed, the flow is shown static and complete (all stations lit, track full, no envelope), the event log is a still register of four, and the cable is fully drawn. Content is visible by default: nothing is hidden unless the `.js` class is present and motion is allowed.

### Imagery
- Six shipping rasters, all generated with ChatGPT image generation and owned by the project: the hero cane-fields engraving, the footer lake-and-chapel engraving, the desk ("Antes"), the padel court, the hardware-store owner (a synthetic person), and the illustrative "Alta de alumno" screen. Each carries its generation prompt embedded in the file (`impeccable:prompt`, a PNG tEXt chunk or a JPEG comment); prompts and defects are also kept in `design/portfolio-home/assets/generated/README.md`.
- Engravings are decorative (`alt=""`), full bleed, with their own sky masked into the page's paper. Photos are content with written ES/EN alt text, inside a plate with a mat, toned with sepia and lowered saturation, square-cornered, served as AVIF/WebP and never upscaled.
- No portrait of Lautaro, no client names, logos, people or screens that identify a client; illustrative data is labelled as such.

## Do's and Don'ts

### Do:
- **Do** set every figure on plate paper or a wash as a tone step, with its italic serif caption under it.
- **Do** keep forest green (#0c7866) for actions only, and give each case its wash: sage for automation, straw for padel.
- **Do** draw diagrams as survey plans: ink lines 1–1.5 units, pencilled tracks, brick hatching and dashes for failure, a compass rose and a scale bar where a plan is shown.
- **Do** use only the six size tokens for text; serif for headings, titles and captions, sans for reading.
- **Do** separate sections with space and a change of ground (`--gap-section`, paper → plate → wash).
- **Do** mark list lines with filled shapes (dash, dot, square) instead of boxes or bullets.
- **Do** make every animation start from a visible, complete default and switch it off under reduced motion; keep one protagonist (the plan).
- **Do** keep text AA on every ground: ink or ink-2 on paper, plate, sage and straw; brick and green-deep only where their measured contrast holds (6.1:1 and 6.0:1).
- **Do** embed the generation prompt in every new shipping raster and tone photos to the paper.

### Don't:
- **Don't** use saturated colour bands, blueprint grids or rows of same-size cards (the SaaS landing the world refuses).
- **Don't** put a label, kicker or eyebrow above a heading, number sections, or use tracked uppercase labels.
- **Don't** put a shadow on anything at rest; the drawn phone is the only floating object.
- **Don't** divide content with hairlines or outline boxes in 1px lines; ink linework belongs to drawings and marks.
- **Don't** round corners on surfaces, buttons or photos.
- **Don't** use monospace outside real data, or `ink-3` for any text.
- **Don't** use text glyphs ("+", "→") as icons; draw them as SVG in the 1.5px ink line.
- **Don't** name technologies, tools or frameworks, or show a GitHub link, anywhere in text, alt, aria-label or title.
- **Don't** use gradients as fills; masks are only for blending the engravings into the paper and for the carousel's soft edge.

### User-pinned exceptions (not patterns)
- **Two hairlines:** the 1px `ink-3` separator above the real workflow graph (canvas comment if01muum) and the footer's 1px closing hairline (L67). No other rule lines.
- **The "venta" highlight:** the straw fill behind one word in the flow heading (L56).
- **The footer:** its black text, #504e42 / #474640 inks, #e9e2cf / #ebe4d2 lines and the 6px-radius icon box come from the user's reference and stay local to it.
- **System serif as the display face** and the display size up to 10rem: pinned by the user (artboard-02 typography, unchanged hero).
