import { defineConfig } from "vitest/config";

// `npm test` runs the "unit" project; `npm run test:build` builds first and runs "build".
export default defineConfig({
  test: {
    projects: [
      { test: { name: "unit", include: ["tests/unit/**/*.test.ts"] } },
      { test: { name: "build", include: ["tests/build/**/*.test.ts"] } },
    ],
  },
});
