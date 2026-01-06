import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('AI Resume Advisor'),
    image: z.string(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'zh-TW']).default('en'),
    alternateSlug: z.string().optional(),
  }),
});

export const collections = { blog };
