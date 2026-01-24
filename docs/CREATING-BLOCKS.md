# Creating New Blocks

This guide walks you through creating new blocks for the visual page builder. Blocks are the building blocks (pun intended) of pages in this system - each block represents a section of a page that content editors can add, configure, and arrange in Payload CMS.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [The Complete Workflow](#the-complete-workflow)
3. [Step 1: Design Your Block](#step-1-design-your-block)
4. [Step 2: Create the Payload Block](#step-2-create-the-payload-block)
5. [Step 3: Create the Astro Component](#step-3-create-the-astro-component)
6. [Step 4: Connect via BlockRenderer](#step-4-connect-via-blockrenderer)
7. [Step 5: Add TypeScript Types](#step-5-add-typescript-types)
8. [Complete Example: Testimonial1Block](#complete-example-testimonial1block)
9. [Advanced Patterns](#advanced-patterns)
10. [Best Practices](#best-practices)

---

## Architecture Overview

The block system consists of four connected parts:

```
┌─────────────────────────────────────────────────────────────────────┐
│                        PAYLOAD CMS                                  │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Block Definition (e.g., Testimonial1Block.ts)               │   │
│  │  - Defines CMS fields (what editors can configure)           │   │
│  │  - Uses shared section fields for consistent styling         │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ JSON data via REST API
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        ASTRO FRONTEND                               │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  TypeScript Types (lib/payload.ts)                           │   │
│  │  - Type definitions matching Payload block structure         │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                │                                    │
│                                ▼                                    │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  BlockRenderer.astro                                         │   │
│  │  - Maps block types to Astro components                      │   │
│  │  - Transforms CMS data to component props                    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                │                                    │
│                                ▼                                    │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Astro Component (e.g., Testimonial1.astro)                  │   │
│  │  - Renders the visual output                                 │   │
│  │  - Uses CSS variables for customization                      │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Files

| File | Location | Purpose |
|------|----------|---------|
| Block definition | `apps/payload-cms/src/blocks/` | CMS schema |
| Block index | `apps/payload-cms/src/blocks/index.ts` | Export & register blocks |
| Shared fields | `apps/payload-cms/src/blocks/shared.ts` | Reusable field definitions |
| TypeScript types | `apps/astro/src/lib/payload.ts` | Type definitions |
| BlockRenderer | `apps/astro/src/components/BlockRenderer.astro` | Block → Component mapping |
| Astro component | `apps/astro/src/components/organisms/` | Visual rendering |

---

## The Complete Workflow

Here's the high-level process for creating a new block:

1. **Design** - Decide what the block should look like and what's configurable
2. **Payload Block** - Define the CMS fields in a new block file
3. **Astro Component** - Create the visual component (or reuse existing)
4. **BlockRenderer** - Add the mapping from block data to component
5. **TypeScript Types** - Add type definitions for type safety
6. **Test** - Try it in Payload Admin and verify rendering

---

## Step 1: Design Your Block

Before writing code, answer these questions:

### Content Questions
- What content will editors enter? (text, images, lists, rich text)
- Which fields are required vs optional?
- Should any fields have default values?

### Layout Questions
- Is this a new layout structure, or a variant of an existing block?
- What styling options should editors have?
- Does it need the standard section props (size, padding, background)?

### Naming Questions
- Does a similar component already exist? (If so, increment the number: CTA1 → CTA2)
- What category does this belong to? (Hero, CTA, Feature, Layout, Content, etc.)

### Example: Planning a Testimonial Block

```
Block: Testimonial1
Purpose: Display customer testimonials in a grid

Content fields:
- title (optional heading)
- subtitle (optional description)
- testimonials[] (array of testimonials)
  - quote (required text)
  - author (required text)
  - role (optional text)
  - company (optional text)
  - avatar (optional image)

Layout options:
- columns: 2 | 3
- cardVariant: elevated | outlined | filled
- Standard section props (size, padding, background)
```

---

## Step 2: Create the Payload Block

Create a new file in `apps/payload-cms/src/blocks/`:

### File: `apps/payload-cms/src/blocks/Testimonial1Block.ts`

```typescript
import type { Block } from 'payload';
import { sectionFields } from './shared';

export const Testimonial1Block: Block = {
  slug: 'testimonial1',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonial Sections',
  },
  // Optional: Add an image icon for the block picker
  // imageURL: '/block-icons/testimonial.svg',
  fields: [
    // ============================================
    // Header Fields (optional section heading)
    // ============================================
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Optional section heading',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      admin: {
        description: 'Optional section description',
      },
    },

    // ============================================
    // Testimonials Array
    // ============================================
    {
      name: 'testimonials',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      labels: {
        singular: 'Testimonial',
        plural: 'Testimonials',
      },
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          admin: {
            description: 'The testimonial quote',
          },
        },
        {
          name: 'author',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of the person',
          },
        },
        {
          name: 'role',
          type: 'text',
          admin: {
            description: 'Job title or role',
          },
        },
        {
          name: 'company',
          type: 'text',
          admin: {
            description: 'Company or organization',
          },
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional profile photo',
          },
        },
      ],
    },

    // ============================================
    // Layout Options
    // ============================================
    {
      name: 'columns',
      type: 'select',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
      ],
      defaultValue: '2',
      admin: {
        description: 'Number of columns on desktop',
      },
    },
    {
      name: 'cardVariant',
      type: 'select',
      options: [
        { label: 'Elevated (shadow)', value: 'elevated' },
        { label: 'Outlined (border)', value: 'outlined' },
        { label: 'Filled (background)', value: 'filled' },
      ],
      defaultValue: 'elevated',
    },
    {
      name: 'centerHeading',
      type: 'checkbox',
      label: 'Center section heading',
      defaultValue: true,
    },

    // ============================================
    // Standard Section Fields (size, padding, background)
    // ============================================
    ...sectionFields,
  ],
};
```

### Register the Block

Update `apps/payload-cms/src/blocks/index.ts`:

```typescript
// Add export
export { Testimonial1Block } from './Testimonial1Block';

// Add import
import { Testimonial1Block } from './Testimonial1Block';

// Add to allBlocks array
export const allBlocks = [
  Hero1Block,
  CTA1Block,
  // ... other blocks
  Testimonial1Block, // Add here
];
```

### Payload Field Types Reference

| Type | Use Case | Example |
|------|----------|---------|
| `text` | Short text (1 line) | Titles, names |
| `textarea` | Multi-line text | Descriptions, quotes |
| `richText` | Formatted content | Article content |
| `number` | Numeric values | Counts, prices |
| `select` | Single choice | Variants, sizes |
| `checkbox` | Boolean toggle | Enable/disable features |
| `upload` | Media files | Images, documents |
| `relationship` | Link to other collections | Categories, authors |
| `array` | Repeatable groups | List items, team members |
| `group` | Nested field group | Organize related fields |

---

## Step 3: Create the Astro Component

Create the visual component in `apps/astro/src/components/organisms/`:

### File: `apps/astro/src/components/organisms/Testimonial1.astro`

```astro
---
/**
 * Testimonial1 Component (Organism)
 *
 * Displays customer testimonials in a responsive grid layout.
 * Each testimonial includes a quote, author info, and optional avatar.
 *
 * Naming: Testimonial1 follows Relume naming convention.
 * - Testimonial1: Grid layout (this component)
 * - Testimonial2: Would be carousel/slider layout
 * - Testimonial3: Would be single featured testimonial
 *
 * @example
 * <Testimonial1
 *   title="What Our Customers Say"
 *   testimonials={testimonials}
 *   columns={3}
 * />
 *
 * @customization
 * Override these CSS variables to customize:
 * --testimonial1-gap, --testimonial1-card-padding, --testimonial1-quote-size
 */

import Section from './Section.astro';
import Card1 from '@molecules/Card1.astro';
import Avatar from '@atoms/Avatar.astro';

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
}

interface Props {
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Array of testimonials */
  testimonials: Testimonial[];
  /** Number of columns */
  columns?: 2 | 3;
  /** Card visual style */
  cardVariant?: 'elevated' | 'outlined' | 'filled';
  /** Center the section heading */
  centerHeading?: boolean;
  /** Background variant */
  background?: 'default' | 'muted' | 'primary' | 'dark';
  /** Section size (vertical padding) */
  size?: 'sm' | 'md' | 'lg';
  /** Override top padding */
  paddingTop?: 'none' | 'sm' | 'md' | 'lg';
  /** Override bottom padding */
  paddingBottom?: 'none' | 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  class?: string;
  [key: string]: any;
}

const {
  title,
  subtitle,
  testimonials,
  columns = 2,
  cardVariant = 'elevated',
  centerHeading = true,
  background = 'default',
  size = 'md',
  paddingTop,
  paddingBottom,
  class: className = '',
  ...rest
} = Astro.props;

// Build modifier classes
const gridClasses = [
  'testimonial1_grid',
  `testimonial1_grid--cols-${columns}`,
].join(' ');
---

<Section
  title={title}
  subtitle={subtitle}
  size={size}
  background={background}
  centerHeading={centerHeading}
  class={`testimonial1 ${className}`}
  {...rest}
>
  <div class={gridClasses}>
    {testimonials.map((testimonial) => (
      <Card1 variant={cardVariant} class="testimonial1_card">
        <blockquote class="testimonial1_quote">
          "{testimonial.quote}"
        </blockquote>
        
        <div class="testimonial1_author">
          {testimonial.avatar && (
            <Avatar 
              src={testimonial.avatar} 
              alt={testimonial.author}
              size="md"
            />
          )}
          <div class="testimonial1_author-info">
            <span class="testimonial1_author-name">{testimonial.author}</span>
            {(testimonial.role || testimonial.company) && (
              <span class="testimonial1_author-role">
                {testimonial.role}
                {testimonial.role && testimonial.company && ' at '}
                {testimonial.company}
              </span>
            )}
          </div>
        </div>
      </Card1>
    ))}
  </div>
</Section>

<style>
  .testimonial1_grid {
    display: grid;
    gap: var(--testimonial1-gap, var(--space-6));
  }

  .testimonial1_grid--cols-2 {
    grid-template-columns: repeat(1, 1fr);
  }

  .testimonial1_grid--cols-3 {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 768px) {
    .testimonial1_grid--cols-2 {
      grid-template-columns: repeat(2, 1fr);
    }

    .testimonial1_grid--cols-3 {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .testimonial1_grid--cols-3 {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .testimonial1_card {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .testimonial1_quote {
    font-size: var(--testimonial1-quote-size, var(--font-size-lg));
    font-style: italic;
    line-height: var(--line-height-relaxed);
    margin: 0 0 var(--space-6) 0;
    flex-grow: 1;
  }

  .testimonial1_author {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .testimonial1_author-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .testimonial1_author-name {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-base);
  }

  .testimonial1_author-role {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }

  /* Adjust colors for dark backgrounds */
  :global(.section--bg-primary) .testimonial1_author-role,
  :global(.section--bg-dark) .testimonial1_author-role {
    color: rgba(255, 255, 255, 0.7);
  }
</style>
```

### Export the Component

Update `apps/astro/src/components/organisms/index.ts`:

```typescript
export { default as Testimonial1 } from './Testimonial1.astro';
```

---

## Step 4: Connect via BlockRenderer

Update `apps/astro/src/components/BlockRenderer.astro` to handle the new block:

### Add Import

```astro
---
// At the top with other imports
import Testimonial1 from '@organisms/Testimonial1.astro';
```

### Add Type Import

```astro
---
import type {
  // ... existing types
  Testimonial1Block,
} from '@/lib/payload';
```

### Add Switch Case

Add a new case in the `blocks.map()` switch statement:

```astro
case 'testimonial1': {
  const testimonials = block as Testimonial1Block;

  // Transform testimonials to include media URLs
  const transformedTestimonials = testimonials.testimonials.map((t) => ({
    quote: t.quote,
    author: t.author,
    role: t.role,
    company: t.company,
    avatar: getMediaUrl(t.avatar),
  }));

  return (
    <Testimonial1
      title={testimonials.title}
      subtitle={testimonials.subtitle}
      testimonials={transformedTestimonials}
      columns={testimonials.columns ? parseInt(testimonials.columns) as 2 | 3 : 2}
      cardVariant={testimonials.cardVariant}
      centerHeading={testimonials.centerHeading}
      {...sectionProps}
    />
  );
}
```

---

## Step 5: Add TypeScript Types

Update `apps/astro/src/lib/payload.ts` with type definitions:

### Add Block Interface

```typescript
export interface Testimonial1Block extends BaseBlock {
  blockType: 'testimonial1';
  title?: string;
  subtitle?: string;
  testimonials: Array<{
    quote: string;
    author: string;
    role?: string;
    company?: string;
    avatar?: PayloadMedia;
  }>;
  columns?: '2' | '3';
  cardVariant?: 'elevated' | 'outlined' | 'filled';
  centerHeading?: boolean;
}
```

### Update PayloadBlock Union Type

```typescript
export type PayloadBlock =
  | Hero1Block
  | CTA1Block
  // ... other blocks
  | Testimonial1Block; // Add here
```

---

## Complete Example: Testimonial1Block

Here's the complete implementation in one place for reference:

<details>
<summary>📁 apps/payload-cms/src/blocks/Testimonial1Block.ts</summary>

```typescript
import type { Block } from 'payload';
import { sectionFields } from './shared';

export const Testimonial1Block: Block = {
  slug: 'testimonial1',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonial Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: { description: 'Optional section heading' },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      admin: { description: 'Optional section description' },
    },
    {
      name: 'testimonials',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      labels: { singular: 'Testimonial', plural: 'Testimonials' },
      fields: [
        { name: 'quote', type: 'textarea', required: true },
        { name: 'author', type: 'text', required: true },
        { name: 'role', type: 'text' },
        { name: 'company', type: 'text' },
        { name: 'avatar', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
      ],
      defaultValue: '2',
    },
    {
      name: 'cardVariant',
      type: 'select',
      options: [
        { label: 'Elevated', value: 'elevated' },
        { label: 'Outlined', value: 'outlined' },
        { label: 'Filled', value: 'filled' },
      ],
      defaultValue: 'elevated',
    },
    {
      name: 'centerHeading',
      type: 'checkbox',
      label: 'Center section heading',
      defaultValue: true,
    },
    ...sectionFields,
  ],
};
```

</details>

<details>
<summary>📁 apps/astro/src/components/organisms/Testimonial1.astro</summary>

```astro
---
import Section from './Section.astro';
import Card1 from '@molecules/Card1.astro';
import Avatar from '@atoms/Avatar.astro';

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
}

interface Props {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
  columns?: 2 | 3;
  cardVariant?: 'elevated' | 'outlined' | 'filled';
  centerHeading?: boolean;
  background?: 'default' | 'muted' | 'primary' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  paddingTop?: 'none' | 'sm' | 'md' | 'lg';
  paddingBottom?: 'none' | 'sm' | 'md' | 'lg';
  class?: string;
  [key: string]: any;
}

const {
  title,
  subtitle,
  testimonials,
  columns = 2,
  cardVariant = 'elevated',
  centerHeading = true,
  background = 'default',
  size = 'md',
  class: className = '',
  ...rest
} = Astro.props;
---

<Section
  title={title}
  subtitle={subtitle}
  size={size}
  background={background}
  centerHeading={centerHeading}
  class={`testimonial1 ${className}`}
  {...rest}
>
  <div class={`testimonial1_grid testimonial1_grid--cols-${columns}`}>
    {testimonials.map((t) => (
      <Card1 variant={cardVariant} class="testimonial1_card">
        <blockquote class="testimonial1_quote">"{t.quote}"</blockquote>
        <div class="testimonial1_author">
          {t.avatar && <Avatar src={t.avatar} alt={t.author} size="md" />}
          <div class="testimonial1_author-info">
            <span class="testimonial1_author-name">{t.author}</span>
            {(t.role || t.company) && (
              <span class="testimonial1_author-role">
                {t.role}{t.role && t.company && ' at '}{t.company}
              </span>
            )}
          </div>
        </div>
      </Card1>
    ))}
  </div>
</Section>

<style>
  .testimonial1_grid {
    display: grid;
    gap: var(--testimonial1-gap, var(--space-6));
  }
  .testimonial1_grid--cols-2 { grid-template-columns: repeat(1, 1fr); }
  .testimonial1_grid--cols-3 { grid-template-columns: repeat(1, 1fr); }

  @media (min-width: 768px) {
    .testimonial1_grid--cols-2 { grid-template-columns: repeat(2, 1fr); }
    .testimonial1_grid--cols-3 { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 1024px) {
    .testimonial1_grid--cols-3 { grid-template-columns: repeat(3, 1fr); }
  }

  .testimonial1_card { display: flex; flex-direction: column; height: 100%; }
  .testimonial1_quote {
    font-size: var(--testimonial1-quote-size, var(--font-size-lg));
    font-style: italic;
    line-height: var(--line-height-relaxed);
    margin: 0 0 var(--space-6) 0;
    flex-grow: 1;
  }
  .testimonial1_author { display: flex; align-items: center; gap: var(--space-3); }
  .testimonial1_author-info { display: flex; flex-direction: column; gap: var(--space-1); }
  .testimonial1_author-name { font-weight: var(--font-weight-semibold); }
  .testimonial1_author-role { font-size: var(--font-size-sm); color: var(--color-text-secondary); }
</style>
```

</details>

---

## Advanced Patterns

### Using Rich Text Fields

For blocks with rich text content, use Lexical editor:

```typescript
// In Payload block
{
  name: 'content',
  type: 'richText',
  editor: lexicalEditor(), // Import from @payloadcms/richtext-lexical
}
```

In BlockRenderer, render with `set:html`:

```astro
<div set:html={block.content} />
```

### Fetching Related Data

For blocks that need to fetch additional data (like Blog1Block fetching posts):

```astro
---
// Pre-fetch data for all instances of a block type
const blockData = new Map<string, any>();

for (const block of blocks) {
  if (block.blockType === 'myBlock') {
    const data = await fetchDataForBlock(block);
    blockData.set(block.id, data);
  }
}
---

{/* Later in the switch case */}
case 'myBlock': {
  const data = blockData.get(block.id);
  return <MyComponent data={data} />;
}
```

### Reusing Existing Components

Often you don't need a new Astro component. You can:

1. **Reuse an existing organism** with different default props
2. **Compose multiple molecules** directly in BlockRenderer
3. **Use the Section component** directly for simple content

Example using Section directly:

```astro
case 'simpleContent': {
  return (
    <Section title={block.title} {...sectionProps}>
      <div set:html={block.content} />
    </Section>
  );
}
```

### Conditional Fields in Payload

Show/hide fields based on other field values:

```typescript
{
  name: 'showImage',
  type: 'checkbox',
  defaultValue: false,
},
{
  name: 'image',
  type: 'upload',
  relationTo: 'media',
  admin: {
    condition: (data, siblingData) => siblingData?.showImage === true,
  },
}
```

### Field Groups and Tabs

Organize complex blocks with groups and tabs:

```typescript
{
  type: 'tabs',
  tabs: [
    {
      label: 'Content',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      label: 'Styling',
      fields: [
        ...sectionFields,
      ],
    },
  ],
}
```

---

## Best Practices

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Block slug | camelCase, numbered | `testimonial1`, `cta2` |
| Block file | PascalCase + Block | `Testimonial1Block.ts` |
| Astro component | PascalCase, numbered | `Testimonial1.astro` |
| CSS classes | component_element | `testimonial1_quote` |
| CSS variables | --component-property | `--testimonial1-gap` |

### When to Create a New Numbered Variant

Create a **new number** (e.g., Testimonial2) when:
- The HTML structure is fundamentally different
- The layout changes significantly (grid → carousel)
- Content fields are substantially different

Use **props** instead when:
- Only styling changes (colors, sizes)
- Optional elements show/hide
- Alignment or spacing changes

### CSS Best Practices

1. **Always use CSS variables with fallbacks:**
   ```css
   gap: var(--testimonial1-gap, var(--space-6));
   ```

2. **Namespace all variables with component name:**
   ```css
   --testimonial1-gap: var(--space-8);  /* Good */
   --gap: var(--space-8);               /* Bad - too generic */
   ```

3. **Handle dark backgrounds:**
   ```css
   :global(.section--bg-dark) .testimonial1_role {
     color: rgba(255, 255, 255, 0.7);
   }
   ```

4. **Mobile-first responsive design:**
   ```css
   .grid { grid-template-columns: 1fr; }
   @media (min-width: 768px) { .grid { grid-template-columns: repeat(2, 1fr); } }
   ```

### TypeScript Best Practices

1. **Always extend BaseBlock** for block interfaces
2. **Match field types exactly** between Payload and TypeScript
3. **Use union types** for select fields: `'2' | '3'`
4. **Handle optional media** with `PayloadMedia | undefined`

### Testing Your Block

1. **Create a test page** in Payload Admin
2. **Add your block** with various configurations
3. **Check all variants** (different columns, backgrounds, etc.)
4. **Test responsive behavior** at different breakpoints
5. **Verify live preview** works correctly

---

## Troubleshooting

### Block doesn't appear in Payload Admin

- Check that the block is exported from `blocks/index.ts`
- Check that the block is included in `allBlocks` array
- Restart the Payload dev server

### Block renders as "Unknown block type"

- Verify the `blockType` in your switch case matches the block `slug`
- Check the BlockRenderer import statement
- Verify TypeScript types are updated

### Styling issues

- Check CSS class names match between Astro and CSS
- Verify CSS variables have fallback values
- Check browser dev tools for CSS specificity issues

### Type errors

- Regenerate Payload types: `npm run generate:types` (in apps/payload-cms)
- Ensure TypeScript interfaces match Payload field structure
- Check for missing optional markers (`?`) on optional fields
