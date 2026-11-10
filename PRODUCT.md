# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Owners of small and medium businesses (pymes) and entrepreneurs in Argentina, not technical. They arrive wanting to understand quickly what Lautaro does, how it would help their business, and how to get in touch. They do not know technology names and should not need to.

## Product Purpose

A bilingual (Spanish/English) personal portfolio for Lautaro Guebel, a Systems Engineering student at UTN (Tucumán, Argentina) who builds web systems and automations for real clients. It exists to make him known and to turn a visiting business owner into an email conversation. Success: the visitor understands what can be built for their business and writes to him.

## Positioning

Two things, equally weighted: an engineering method (analyse the problem before building, then document, test and verify what is delivered) and end-to-end automation as the result (sales, collections, onboarding and reports that run without anyone doing them by hand). The method is the how; the automation is the outcome. Both are proven with real client work, not claims.

## Operating Context

The visitor reads on a phone or a laptop, often from a link someone shared. The page is the only touchpoint before an email. Contact is email only.

## Capabilities and Constraints

- Static Astro site, ES at `/es/` and EN at `/en/`, deployed to GitHub Pages at the custom domain `lautaroguebel.tech`.
- No technology, framework, database or tool names anywhere on the page (tested).
- No GitHub profile or link anywhere (tested). No phone number for now. No portrait photo.
- Contact email: `contacto@lautaroguebel.tech` (Cloudflare Email Routing forwards it to the owner's inbox).
- Motion stays CSS/SVG-first; inline JS sits just under Vite's 4 KB inline threshold. Reduced motion must be respected.

## Brand Commitments

- Name: Lautaro Guebel; mark "LG".
- Voice: plain Rioplatense Spanish (voseo) for a non-technical owner; short, concrete, no jargon. English equivalent on `/en/`.
- Tucumán identity: original engraving-style illustrations of Tucumán (cane fields and sugar mill in the hero, lake and chapel in the footer), generated with ChatGPT and owned by the project.

## Evidence on Hand

- Main case, anonymized as "Academia online de ventas" / "Online sales academy": end-to-end automation of sale -> welcome email -> platform invite -> contract e-signature, instalment reminders, reports. Quotable engineering facts only: 12 workflows, 24 decision records, 27 health checks, 417 merged PRs, 1,742 commits (2026-09-03 to 2026-11-05). No usage metrics exist; never invent them.
- Second case: a sports club and padel academy (anonymized; never its name, logos, domain, people or prices): one system with roles, stock alerts, cleaning per shift, grill bookings, Kids fees; demo approved by the client on 17/09/2026.
- Real workflow graph of the onboarding flow (generic labels), a generated illustrative "Alta de alumno" phone screen, generated photos (desk, padel court, hardware-store owner).
- No testimonials, no client logos, no metrics of outcomes. Never fabricate them.

## Product Principles

1. Explain outcomes for the owner before mechanisms; the engineering shows through artifacts and method, never through jargon.
2. Every claim is backed by a real case or a counted fact.
3. Calm and trustworthy over loud: the visitor should feel their business will be put in order.
4. Privacy of clients is absolute: anonymize everything.

## Accessibility & Inclusion

WCAG AA contrast on all text, keyboard-reachable navigation and composer, reduced-motion respected, usable on a 390 px phone.
