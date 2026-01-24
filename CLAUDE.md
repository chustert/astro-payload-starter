# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a **monorepo** with two apps:
- `apps/astro/` - Astro frontend (port 4321)
- `apps/payload-cms/` - Payload CMS backend on Next.js (port 3000)

Database: **MongoDB Atlas** (cloud-hosted)

## Commands

```bash
# Development (from root)
npm run dev           # Start Astro dev server at localhost:4321
npm run dev:astro     # Same as above
npm run dev:payload   # Start Payload CMS at localhost:3000

# Building
npm run build         # Build Astro for production
npm run build:payload # Build Payload for production

# Preview
npm run preview       # Preview Astro production build

# From apps/payload-cms/
npm run generate:types  # Regenerate Payload TypeScript types
npm run seed            # Run database seed script
```

## Architecture Overview

This is an **Astro starter with Payload CMS** using an **atomic design component architecture** and a **vanilla CSS design system**. Key architectural principles:

1. **Visual Page Builder** - Content editors build pages in Payload Admin using blocks that map to Astro components
2. **Server-Side Rendering** - Astro pages fetch content from Payload CMS API at request time
3. **Live Preview** - Payload Admin shows real-time preview of pages being edited
4. **CSS Variables** - All components are customizable through CSS custom properties without framework dependencies

### Atomic Design Structure

Components in `apps/astro/` are organized by complexity level:

- **Atoms** (`src/components/atoms/`) - Basic building blocks with variant props (Button, Input, Badge, Avatar, Text)
- **Molecules** (`src/components/molecules/`) - Combinations of atoms, numbered for structural variants (Card1-3, BlogCard1, CategoryCard1, NavLink, TeamMember1)
- **Organisms** (`src/components/organisms/`) - Complex UI sections, always numbered (Header1, Footer1, Hero1, CTA1-2, Feature1, Layout1, Stats1, Team1, Blog1, CategoryGrid1, Section)
- **Templates** (`src/components/templates/`) - Page-level layouts (BaseLayout, MinimalLayout)

### Payload CMS Block Architecture

Blocks in `apps/payload-cms/src/blocks/` define the CMS schema. Each block maps to an Astro organism:

| Payload Block | Astro Component | Purpose |
|---------------|-----------------|---------|
| `Hero1Block` | `Hero1.astro` | Hero sections with optional media |
| `CTA1Block` | `CTA1.astro` | Centered call-to-action |
| `CTA2Block` | `CTA2.astro` | Two-column CTA with image |
| `Feature1Block` | `Feature1.astro` | Feature cards grid |
| `Layout1Block` | `Layout1.astro` | Two-column content/media layout |
| `Stats1Block` | `Stats1.astro` | Statistics display |
| `Team1Block` | `Team1.astro` | Team members grid |
| `Blog1Block` | `Blog1.astro` | Blog posts grid |
| `CategoryGrid1Block` | `CategoryGrid1.astro` | Category cards grid |
| `SectionBlock` | `Section.astro` | Rich text content section |

The `BlockRenderer.astro` component maps Payload blocks to Astro components at runtime.

### Relume-Aligned Naming Convention

This project follows **Relume naming conventions** for Figma-to-code workflow:

**Numbers vs Props Rule:**
- **Numbers** = Different STRUCTURE/LAYOUT (different HTML arrangement)
- **Props** = Different CONFIGURATION (same structure, different styling)

**Naming by Level:**
- Atoms: Base name + variant props (`Button variant="primary"`)
- Molecules: `{Type}{Number}` (`Card1`, `Card2`, `Card3`)
- Organisms: `{Category}{Number}` (`Header1`, `Hero1`, `CTA1`)

**CSS Class Pattern:** `{component}{number}_{element}` (underscore separator)
```css
.hero1_heading { }
.cta2_grid { }
.card1_body { }
```

**When to create a new numbered variant:**
- Different HTML structure
- Different visual layout (centered vs split, single vs two-column)
- Different content arrangement

**When to use props instead:**
- Padding/spacing variations (`size`, `paddingTop`, `paddingBottom`)
- Background color changes (`background`)
- Alignment options (`align`, `centered`)
- Container width (`containerWidth`)

### Design System Architecture

The design system in `apps/astro/` uses a **three-layer token architecture**:

1. **Primitive tokens** (`src/styles/design-system/tokens.css`) - Raw color scales, spacing scale, font sizes
2. **Semantic tokens** - Map primitives to usage contexts (`--color-text-primary`, `--color-bg-secondary`)
3. **Component tokens** - Component-specific variables that reference semantic tokens (`--btn-primary-bg`, `--card-padding`)

All components expose CSS variables for customization with fallbacks:
```css
background: var(--btn-bg, var(--color-primary-600));
```

CSS files in `apps/astro/src/styles/`:
- `design-system/tokens.css` - All design tokens (colors, spacing, typography, shadows, radii)
- `design-system/typography.css` - Text styles and prose formatting
- `design-system/spacing.css` - Margin, padding, gap utilities
- `design-system/layout.css` - Flexbox, grid, container utilities
- `base/reset.css` - Modern CSS reset
- `base/global.css` - Base element styles
- `main.css` - Entry point that imports all styles

### Content Management

Content is managed through **two systems**:

#### Payload CMS Collections (`apps/payload-cms/src/collections/`)

Primary content management through Payload Admin:

- **Pages** - Visual page builder with block-based layouts
- **Posts** - Blog posts with Lexical rich text editor
- **Categories** - Blog categories with name, slug, description, color
- **Media** - Image and file uploads
- **Users** - Admin user accounts

#### Astro Content Collections (`apps/astro/src/content/`)

Local Markdown-based content (optional, can work alongside CMS):

- **Blog collection** (`src/content/blog/`) - Markdown posts with frontmatter
- **Categories collection** (`src/content/categories/`) - Category metadata

#### Payload Globals (`apps/payload-cms/src/globals/`)

Site-wide settings managed in Payload:

- **Navigation** - Header and footer navigation items (internal pages or custom URLs)

### Routing

The Astro app uses **server-side rendering** for CMS pages:

- `apps/astro/src/pages/[...slug].astro` - Dynamic pages from Payload (root-level routing)
- `apps/astro/src/pages/p/[...slug].astro` - Alternative route for Payload pages
- `apps/astro/src/pages/blog/[...slug].astro` - Blog posts (can use CMS or local content)
- `apps/astro/src/pages/category/[...slug].astro` - Category archive pages
- `apps/astro/src/pages/preview/` - Live preview routes for Payload editing

### Path Aliases

TypeScript aliases defined in `apps/astro/tsconfig.json`:

```typescript
@/*           → src/*
@components/* → src/components/*
@atoms/*      → src/components/atoms/*
@molecules/*  → src/components/molecules/*
@organisms/*  → src/components/organisms/*
@templates/*  → src/components/templates/*
@styles/*     → src/styles/*
@lib/*        → src/lib/*
```

Use in imports:
```astro
import Button from '@atoms/Button.astro';
import { Hero1, CTA1 } from '@organisms';
import { getPageBySlug } from '@lib/payload';
```

### Section Organism Pattern

All section organisms accept standard props for layout control:

```typescript
interface SectionProps {
  // Padding
  size?: 'sm' | 'md' | 'lg';
  paddingTop?: 'none' | 'sm' | 'md' | 'lg';
  paddingBottom?: 'none' | 'sm' | 'md' | 'lg';

  // Background
  background?: 'default' | 'muted' | 'primary' | 'dark';

  // Container
  contained?: boolean;
  containerWidth?: 'small' | 'medium' | 'large' | 'full';
}
```

These props override defaults set by the `Section` base component, allowing fine-grained layout control.

## Component Development Workflow

### Adding a New Astro Component

1. **Determine the atomic level** - Atom (basic), Molecule (composite), or Organism (section)

2. **Check if a numbered variant is needed** - Only if structure differs significantly

3. **Create the .astro file** in `apps/astro/src/components/[level]/`:
   ```astro
   ---
   interface Props {
     variant?: 'default' | 'outlined';
     class?: string;
     [key: string]: any;
   }

   const { variant = 'default', class: className = '', ...rest } = Astro.props;
   ---

   <div class={`component1 component1--${variant} ${className}`} {...rest}>
     <slot />
   </div>

   <style>
     .component1 {
       /* Use CSS variables with fallbacks */
       padding: var(--component1-padding, var(--space-4));
     }
   </style>
   ```

4. **Export from index.ts** in the same directory:
   ```typescript
   export { default as Component1 } from './Component1.astro';
   ```

### Adding a New Payload Block

Full tutorial: **[docs/CREATING-BLOCKS.md](docs/CREATING-BLOCKS.md)**

**Quick workflow:**

1. **Create Payload block** (`apps/payload-cms/src/blocks/NewBlock.ts`):
   ```typescript
   import type { Block } from 'payload';
   import { sectionFields, buttonField } from './shared';

   export const NewBlock: Block = {
     slug: 'newBlock',
     labels: { singular: 'New Block', plural: 'New Blocks' },
     fields: [
       { name: 'heading', type: 'text', required: true },
       { name: 'description', type: 'textarea' },
       buttonField, // Optional: adds CTA buttons
       ...sectionFields, // Adds size, padding, background
     ],
   };
   ```

2. **Register block** in `apps/payload-cms/src/blocks/index.ts`:
   ```typescript
   export { NewBlock } from './NewBlock';
   import { NewBlock } from './NewBlock';
   export const allBlocks = [...existingBlocks, NewBlock];
   ```

3. **Add TypeScript types** in `apps/astro/src/lib/payload.ts`:
   ```typescript
   export interface NewBlock extends BaseBlock {
     blockType: 'newBlock';
     heading: string;
     description?: string;
     buttons?: PayloadButton[];
   }
   // Add to PayloadBlock union type
   ```

4. **Add BlockRenderer case** in `apps/astro/src/components/BlockRenderer.astro`:
   ```astro
   case 'newBlock': {
     const data = block as NewBlock;
     return <MyOrganism heading={data.heading} {...sectionProps} />;
   }
   ```

5. **(Optional) Create Astro organism** if block needs custom rendering

**Shared fields from `shared.ts`:**
- `sectionFields` - size, paddingTop, paddingBottom, background
- `buttonField` - array of buttons with label, href, variant

**Common Payload field types:**
- `text` - Single line input
- `textarea` - Multi-line input
- `richText` - Lexical editor (formatted content)
- `select` - Dropdown with options
- `checkbox` - Boolean toggle
- `upload` - Media file (use `relationTo: 'media'`)
- `relationship` - Link to other collections
- `array` - Repeatable field groups
- `group` - Nested field organization

### Component Best Practices

- **Always accept a `class` prop** for custom classes
- **Namespace CSS variables** with component name (`--card1-padding`, not `--padding`)
- **Provide fallback values** for all CSS variables
- **Use slots** for flexibility (named slots: header, footer, media)
- **Follow BEM-like class naming** with underscore separator (`component1_element`)
- **Include section props** for organisms (size, paddingTop, paddingBottom, background)

### Customization Approach

Three levels of customization:

1. **Global tokens** - Override in `tokens.css` or create new file imported after it
2. **Component defaults** - Override component CSS variables globally in `:root`
3. **Per-instance** - Override inline via `style` attribute

## Static Assets

In `apps/astro/`:
- `public/` directory is served at root path
- Images should go in `public/images/` subdirectories
- Favicon: `public/favicon.svg`

**Media Uploads:** Images uploaded through Payload CMS are stored and served from the Payload server. Use `getMediaUrl()` from `@lib/payload` to get the full URL.

## Dark Mode

Dark mode tokens are prepared but commented out in `apps/astro/src/styles/design-system/tokens.css`. To enable:

- Uncomment the `@media (prefers-color-scheme: dark)` block, or
- Implement manual toggle with `.dark` class on `<html>`

## Environment Files

Required `.env` files (not committed to git):

- `apps/payload-cms/.env` - MongoDB URI, Payload secret, URLs
- `apps/astro/.env` - Payload API URL

## Browser Support

Uses modern CSS features (CSS variables, Grid, Flexbox, `aspect-ratio`, `gap` in flexbox, `:focus-visible`). All supported in evergreen browsers.
