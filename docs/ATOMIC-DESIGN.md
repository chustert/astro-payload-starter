# Atomic Design in This Project

This document explains how the atomic design methodology is applied in this Astro starter template, including the Relume-aligned naming convention.

## What is Atomic Design?

Atomic Design is a methodology for creating design systems, introduced by Brad Frost. It breaks down interfaces into fundamental building blocks and organizes them into five distinct levels:

1. **Atoms** - Basic building blocks
2. **Molecules** - Simple groups of atoms
3. **Organisms** - Complex components
4. **Templates** - Page-level layouts
5. **Pages** - Specific instances of templates

This project uses four levels (atoms through templates), with pages handled by Astro's built-in routing.

---

## Naming Convention (Relume-Aligned)

This project follows a naming convention aligned with the Relume Figma Kit for seamless Figma-to-code workflow.

### Core Principle: Numbers vs Props

```
Numbers = Different STRUCTURE (different HTML/layout)
Props   = Different CONFIGURATION (same structure, different styling)
```

### When to Create a NEW Numbered Variant

- Different HTML structure
- Different visual layout (centered vs split)
- Different content arrangement

### When to Use PROPS on Existing Component

- Padding/spacing variations
- Background color changes
- Alignment options
- Container width

### Naming Rules by Level

| Level | Convention | Example |
|-------|------------|---------|
| **Atoms** | Base name + variant props | `Button variant="primary"` |
| **Molecules** | `{Type}{Number}` | `Card1`, `Card2`, `Card3` |
| **Organisms** | `{Category}{Number}` | `Header1`, `Hero1`, `CTA1` |

### CSS Class Naming

Pattern: `{category}{number}_{element}`

```css
/* Hero1 - Centered layout */
.hero1_content { }
.hero1_heading { }
.hero1_description { }
.hero1_actions { }

/* Hero2 - With side image */
.hero2_grid { }
.hero2_content { }
.hero2_image-wrapper { }

/* Card molecules */
.card1_image { }
.card1_content { }
.card2_image-wrapper { }
```

---

## Levels in This Project

### Atoms

**Location:** `src/components/atoms/`

Atoms are the smallest, most fundamental components. They cannot be broken down further without losing their meaning as UI elements.

**Characteristics:**
- Single-purpose
- No child components (other than slot content)
- Highly reusable
- Style-agnostic (customizable via CSS variables)
- **No numbered variants** - use props for variations

**Current Atoms:**
| Component | Purpose |
|-----------|---------|
| `Button` | Clickable action element |
| `Input` | Text input and textarea |
| `Badge` | Status label or tag |
| `Text` | Typography wrapper |
| `Avatar` | User profile image |

### Molecules

**Location:** `src/components/molecules/`

Molecules are simple combinations of atoms that work together as a unit. They have a single responsibility but are composed of multiple parts.

**Characteristics:**
- Combines 2-3 atoms
- Single responsibility
- Self-contained
- **Numbered variants for structural differences**

**Current Molecules:**
| Component | Description | Purpose |
|-----------|-------------|---------|
| `Card1` | Basic card with slots | Flexible content grouping |
| `Card2` | Card with image at top | Blog posts, products |
| `Card3` | Horizontal card layout | List items, featured content |
| `FormField` | Label + Input + helper | Complete form field |
| `NavLink` | Link with active detection | Navigation item |
| `TeamMember` | Avatar + Name + Role | Team displays |

### Organisms

**Location:** `src/components/organisms/`

Organisms are complex UI components composed of atoms, molecules, and/or other organisms. They form distinct sections of an interface.

**Characteristics:**
- Multiple responsibilities
- Self-contained sections
- Often context-aware
- Page-section level
- **Always use numbered variants** (aligned with Relume)

**Current Organisms:**
| Component | Description | Purpose |
|-----------|-------------|---------|
| `Header1` | Standard navigation header | Site header |
| `Footer1` | Standard site footer | Copyright, links, social |
| `Section` | Base section wrapper | Generic sections |
| `Hero1` | Centered hero section | Page headers |
| `Feature1` | Card grid section | Features, values, services |
| `Stats1` | Statistics grid | Achievements, metrics |
| `Team1` | Team member grid | About pages |
| `Layout1` | Two-column content + media | Story sections |
| `CTA1` | Centered call-to-action | Conversion sections |
| `CTA2` | Two-column CTA with image | Visual CTAs |

### Standard Props for Section Organisms

All section organisms accept these configuration props:

```typescript
interface SectionProps {
  // Padding control
  size?: 'sm' | 'md' | 'lg';               // Overall padding
  paddingTop?: 'none' | 'sm' | 'md' | 'lg';    // Override top
  paddingBottom?: 'none' | 'sm' | 'md' | 'lg'; // Override bottom
  
  // Background
  background?: 'default' | 'muted' | 'primary' | 'dark';
  
  // Container
  contained?: boolean;
  containerWidth?: 'small' | 'medium' | 'large' | 'full';
}
```

**Example Usage:**
```astro
<!-- Same Hero1 component, different configurations -->
<Hero1 
  heading="Welcome"
  size="lg"
  background="default"
/>

<Hero1 
  heading="Landing Page"
  size="lg"
  paddingBottom="none"  
  background="dark"
/>
```

### Templates

**Location:** `src/components/templates/`

Templates define the overall page structure and layout. They arrange organisms and provide the HTML document structure.

**Characteristics:**
- Page-level structure
- HTML document boilerplate
- Global styles injection
- Common elements (header/footer)

**Current Templates:**
| Component | Purpose |
|-----------|---------|
| `BaseLayout` | Standard page with Header1/Footer1 |

---

## File Structure

```
src/components/
├── atoms/                    # Base names, variants via props
│   ├── Avatar.astro
│   ├── Badge.astro
│   ├── Button.astro
│   ├── Input.astro
│   └── Text.astro
│
├── molecules/                # Numbered variants
│   ├── Card1.astro          # Basic card
│   ├── Card2.astro          # Card with image top
│   ├── Card3.astro          # Horizontal card
│   ├── FormField.astro      
│   ├── NavLink.astro        
│   └── TeamMember.astro     
│
├── organisms/                # Numbered sections
│   ├── Header1.astro        # Standard header
│   ├── Footer1.astro        # Standard footer
│   ├── Section.astro        # Base section wrapper
│   ├── Hero1.astro          # Centered hero
│   ├── Feature1.astro       # Feature card grid
│   ├── Stats1.astro         # Stats grid
│   ├── Team1.astro          # Team grid
│   ├── Layout1.astro        # Two-column content
│   ├── CTA1.astro           # Centered CTA
│   └── CTA2.astro           # CTA with image
│
└── templates/
    └── BaseLayout.astro
```

---

## Component Relationships

```
Templates
    └── contain → Organisms
                      └── contain → Molecules
                                        └── contain → Atoms
```

### Example: About Page

```
BaseLayout (Template)
├── Header1 (Organism)
│   ├── Logo (implicit)
│   ├── NavLink (Molecule) × 3
│   └── Button (Atom) - optional actions
├── Hero1 (Organism)
│   ├── Badge (Atom) - tagline
│   ├── Heading (implicit)
│   └── Text (implicit) - description
├── Layout1 (Organism)
│   ├── Badge (Atom) - tagline
│   ├── Content area
│   └── Card1 (Molecule) - media slot
├── Feature1 (Organism)
│   └── Card1 (Molecule) × N - features
├── Team1 (Organism)
│   └── TeamMember (Molecule) × N
├── CTA1 (Organism)
│   └── Button (Atom) × N
└── Footer1 (Organism)
    └── NavLink (Molecule) × N
```

---

## Decision Guide

### When to Create an Atom

Create an atom when:
- It's a native HTML element wrapper (button, input, img)
- It cannot be meaningfully split further
- It's used in many different contexts
- It has no awareness of its siblings
- **Use props for variants, not numbered names**

### When to Create a Molecule

Create a molecule when:
- You're combining 2-3 atoms that always go together
- The combination is reused in multiple places
- It has a single, clear purpose
- It's still relatively simple
- **Create a new number when structure differs** (Card1, Card2, Card3)

### When to Create an Organism

Create an organism when:
- It's a complete section of a page
- It combines multiple molecules/atoms
- It has its own internal logic or state
- It represents a distinct UI region
- **Always use numbered naming** aligned with Relume

### When to Create a Template

Create a template when:
- It defines overall page structure
- It includes HTML document elements (head, body)
- It provides the layout for a type of page
- It determines which organisms appear where

---

## Practical Tips

### 1. Match Relume Sections

When importing from Relume Figma Kit:
- `Layout 47` in Figma → Create `Layout47.astro` if significantly different
- Or map to existing: `Layout 47` → `Layout1` if similar structure

### 2. Use Props for Configuration

```astro
<!-- Good: Same component, different config -->
<Hero1 size="lg" background="dark" paddingBottom="none" />

<!-- Avoid: Creating new component just for padding -->
<Hero1NoPaddingBottom />
```

### 3. Keep CSS Classes Prefixed

```css
/* Good: Clear ownership */
.hero1_heading { }
.cta2_content { }

/* Avoid: Generic, could conflict */
.heading { }
.content { }
```

### 4. Use Slots for Flexibility

```astro
<!-- Good: Flexible via slots -->
<Card1>
  <img slot="media" src="..." />
  <h3>Title</h3>
  <p>Content</p>
</Card1>

<!-- Avoid: Rigid prop-based API for complex content -->
<Card1
  imageSrc="..."
  title="Title"
  content="Content"
/>
```

---

## Resources

- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/)
- [Relume Figma Kit](https://www.relume.io/)
- [Pattern Lab](https://patternlab.io/) - Tool for atomic design
