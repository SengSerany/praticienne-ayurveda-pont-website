import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    titre: z.string(),
    chapitre: z.number().int().positive(),
    resume: z.string(),
    datePublication: z.coerce.date(),
    conditionLiee: z.string().optional(),
    brouillon: z.boolean().default(false),
  }),
});

const conditions = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/conditions' }),
  schema: z.object({
    titre: z.string(),
    slug: z.string(),
    resume: z.string(),
    star: z.boolean().default(false),
    ordre: z.number().int().positive(),
  }),
});

const temoignages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/temoignages' }),
  schema: z.object({
    texte: z.string(),
    prenom: z.string(),
    ville: z.string(),
    conditionLiee: z.string().optional(),
  }),
});

export const collections = { articles, conditions, temoignages };
