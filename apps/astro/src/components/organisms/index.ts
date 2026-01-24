/**
 * Organisms - Complex UI components
 *
 * Organisms are complex components composed of atoms and molecules.
 * They form distinct sections of an interface.
 *
 * Naming Convention (Relume-aligned):
 * - Numbered variants: Hero1, Hero2, CTA1, CTA2 (different structures)
 * - All organisms use {Category}{Number} pattern for consistency
 *
 * Numbers indicate STRUCTURE differences, not configuration.
 * Use props (size, background, paddingTop, paddingBottom) for configuration.
 *
 * Examples: headers, footers, sections, feature grids, CTAs
 */

// Re-export all organism components for easy importing
// Usage: import { Header1, Hero1, CTA1, Feature1 } from '@/components/organisms';

// Layout Organisms
export { default as Header1 } from './Header1.astro';
export { default as Footer1 } from './Footer1.astro';
export { default as Section } from './Section.astro';

// Section Organisms (aligned with Relume Figma Kit patterns)
export { default as Hero1 } from './Hero1.astro';
export { default as Feature1 } from './Feature1.astro';
export { default as Stats1 } from './Stats1.astro';
export { default as Team1 } from './Team1.astro';
export { default as Layout1 } from './Layout1.astro';
export { default as CTA1 } from './CTA1.astro';
export { default as CTA2 } from './CTA2.astro';

// Blog Organisms
export { default as Blog1 } from './Blog1.astro';
export { default as BlogPost1 } from './BlogPost1.astro';
export { default as CategoryGrid1 } from './CategoryGrid1.astro';

// FAQ Organisms
export { default as FAQ1 } from './FAQ1.astro';
