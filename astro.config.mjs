// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://lautaroguebel.tech",
  output: "static",
  redirects: { "/": "/es/" },
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
});
