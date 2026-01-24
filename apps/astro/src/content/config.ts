/**
 * Content Collections Configuration
 * 
 * Defines schemas for blog posts and categories using Astro Content Collections.
 * This provides type-safe content with validation.
 */

import { defineCollection, z, reference } from 'astro:content';

/**
 * Categories Collection
 * 
 * Each category has a name, description, and optional color for styling.
 * The slug is derived from the filename.
 */
const categories = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    color: z.string().optional(),
  }),
});

/**
 * Blog Collection
 * 
 * Blog posts with full metadata support including:
 * - Title and description for SEO
 * - Publication and update dates
 * - Hero image for visual appeal
 * - Category reference for organization
 * - Author attribution
 * - Draft status for unpublished posts
 */
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    category: reference('categories'),
    author: z.string().default('Admin'),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
  categories,
};
