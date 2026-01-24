/**
 * Molecules - Simple component groups
 *
 * Molecules are combinations of atoms that form simple,
 * reusable component groups with a single purpose.
 *
 * Naming Convention:
 * - Numbered variants: Card1, Card2, Card3 (different structures)
 * - Base names: NavLink, FormField (single implementation)
 *
 * Examples: cards, form fields, nav links, team members
 */

// Re-export all molecule components for easy importing
// Usage: import { Card1, Card2, FormField, NavLink } from '@/components/molecules';

// Card variants (numbered for different structures)
export { default as Card1 } from './Card1.astro';
export { default as Card2 } from './Card2.astro';
export { default as Card3 } from './Card3.astro';

// Blog molecules
export { default as BlogCard1 } from './BlogCard1.astro';
export { default as CategoryCard1 } from './CategoryCard1.astro';

// Single-implementation molecules
export { default as FormField } from './FormField.astro';
export { default as NavLink } from './NavLink.astro';
export { default as TeamMember1 } from './TeamMember1.astro';
