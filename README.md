# portfolio-lautaro

Bilingual (ES/EN) personal portfolio of Lautaro Guebel, built with Astro as a static site.

## Commands

- `npm run dev` — local dev server (`/` redirects to `/es/`)
- `npm run check` — `astro check` (TypeScript strict)
- `npm test` — unit tests (Vitest)
- `npm run test:build` — builds to `dist/` and checks the output
- `npm run preview` — serves the built site

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which verifies, builds and publishes `dist/` to GitHub Pages at https://lautaroguebel.tech.
