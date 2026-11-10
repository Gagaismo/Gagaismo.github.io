import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const caseStudies = defineCollection({
  loader: glob({ pattern: "{es,en}/*.md", base: "./src/content/case-studies" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    sector: z.string(),
    problem: z.string(),
    outcomes: z.array(z.string()),
    order: z.number(),
    draft: z.boolean(),
  }),
});

export const collections = { caseStudies };
