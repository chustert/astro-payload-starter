# Astro Starter with Payload CMS

A monorepo featuring an Astro frontend with an atomic design component library and Payload CMS for visual page building. Uses MongoDB Atlas for cloud database hosting.

## Architecture

```
astro-starter/
├── apps/
│   ├── astro/           # Astro frontend (port 4321)
│   └── payload-cms/     # Payload CMS backend on Next.js (port 3000)
├── docs/                # Additional documentation
├── docker-compose.yml   # Optional local MongoDB (disabled by default)
└── package.json         # Workspace configuration
```

## Features

- **Visual Page Builder** - Build pages by composing components in Payload CMS
- **Live Preview** - See changes in real-time while editing in Payload Admin
- **Atomic Design Architecture** - Components organized into atoms, molecules, organisms, and templates
- **Vanilla CSS Design System** - No Tailwind, no CSS-in-JS, just pure CSS with custom properties
- **CMS-Managed Navigation** - Header and footer navigation configurable through Payload
- **MongoDB Atlas** - Cloud-hosted database for easy deployment and scalability
- **Type-Safe** - TypeScript throughout with Payload-generated types
- **SSR Support** - Server-side rendering for dynamic CMS content

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Astro 5.x |
| CMS | Payload CMS 3.x (on Next.js 15) |
| Database | MongoDB Atlas (cloud) |
| Rich Text | Lexical Editor |
| Image Processing | Sharp |

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (free tier available)

### 1. Set Up MongoDB Atlas

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a database user with read/write access
3. Add your IP address to the network access list (or use 0.0.0.0/0 for development)
4. Get your connection string (looks like `mongodb+srv://user:password@cluster.mongodb.net/payload-cms`)

### 2. Configure Environment

Create `apps/payload-cms/.env`:

```env
MONGODB_URI=mongodb+srv://your-connection-string
PAYLOAD_SECRET=your-secret-key-min-32-chars
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
ASTRO_URL=http://localhost:4321
PORT=3000
```

Create `apps/astro/.env`:

```env
PAYLOAD_URL=http://localhost:3000
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Servers

```bash
# Terminal 1: Start Payload CMS
npm run dev:payload

# Terminal 2: Start Astro
npm run dev:astro
```

- Or run both in one command:
```bash
npm run dev:both
```

- **Astro Frontend**: http://localhost:4321
- **Payload Admin**: http://localhost:3000/admin

### 5. Create First Admin User

1. Open http://localhost:3000/admin
2. Create your admin account
3. Start building pages!

## Project Structure

### Astro Frontend (`apps/astro/`)

```
apps/astro/
├── src/
│   ├── components/
│   │   ├── atoms/           # Button, Input, Badge, Avatar, Text
│   │   ├── molecules/       # Card1-3, BlogCard1, NavLink, etc.
│   │   ├── organisms/       # Hero1, CTA1-2, Feature1, Blog1, etc.
│   │   ├── templates/       # BaseLayout, MinimalLayout
│   │   └── BlockRenderer.astro  # Maps Payload blocks to Astro components
│   ├── lib/
│   │   └── payload.ts       # Payload API client with TypeScript types
│   ├── content/             # Local content collections (blog, categories)
│   ├── pages/
│   │   ├── [...slug].astro      # Dynamic pages from Payload (root-level)
│   │   ├── p/[...slug].astro    # Alternative route for Payload pages
│   │   ├── blog/[...slug].astro # Blog post pages
│   │   ├── category/[...slug].astro # Category archive pages
│   │   └── preview/             # Live preview routes
│   │       ├── [...slug].astro
│   │       ├── p/[...slug].astro
│   │       └── blog/[...slug].astro
│   └── styles/
│       ├── design-system/   # CSS tokens, typography, spacing, layout
│       └── base/            # Reset and global styles
```

### Payload CMS (`apps/payload-cms/`)

```
apps/payload-cms/
├── src/
│   ├── app/(payload)/       # Next.js App Router for Payload Admin
│   ├── collections/
│   │   ├── Pages.ts         # Visual page builder with blocks
│   │   ├── Posts.ts         # Blog posts with rich text
│   │   ├── Categories.ts    # Blog categories
│   │   ├── Media.ts         # Image/file uploads
│   │   └── Users.ts         # Admin users
│   ├── globals/
│   │   └── Navigation.ts    # Site-wide header/footer navigation
│   ├── blocks/              # Visual page builder blocks
│   │   ├── Hero1Block.ts
│   │   ├── CTA1Block.ts
│   │   ├── CTA2Block.ts
│   │   ├── Feature1Block.ts
│   │   ├── Layout1Block.ts
│   │   ├── Stats1Block.ts
│   │   ├── Team1Block.ts
│   │   ├── Blog1Block.ts
│   │   ├── CategoryGrid1Block.ts
│   │   ├── SectionBlock.ts
│   │   └── shared.ts        # Common block fields
│   ├── fields/
│   │   └── slugField.ts     # Reusable slug field with auto-generation
│   └── payload.config.ts    # Main Payload configuration
```

## Available Blocks

| Block | Description | Astro Component |
|-------|-------------|-----------------|
| `hero1` | Hero section with optional media | `Hero1.astro` |
| `cta1` | Centered call-to-action | `CTA1.astro` |
| `cta2` | Two-column CTA with image | `CTA2.astro` |
| `feature1` | Features grid with cards | `Feature1.astro` |
| `layout1` | Two-column content with media/code | `Layout1.astro` |
| `stats1` | Statistics/metrics display | `Stats1.astro` |
| `team1` | Team members grid | `Team1.astro` |
| `blog1` | Blog posts grid (latest, by category, or specific) | `Blog1.astro` |
| `categoryGrid1` | Category cards grid | `CategoryGrid1.astro` |
| `section` | Rich text content section | `Section.astro` |

### Common Block Props

All blocks support these styling options:
- `size`: sm | md | lg (overall vertical padding)
- `paddingTop` / `paddingBottom`: none | sm | md | lg (override individual padding)
- `background`: default | muted | primary | dark

## Content Workflow

### Building Pages

1. **Create a Page** in Payload Admin → Content → Pages
2. **Add Blocks** using the visual block editor
3. **Configure** each block's content and styling options
4. **Use Live Preview** to see changes in real-time
5. **Publish** when ready (change status from Draft to Published)
6. **View** at the root URL `/your-slug` or `/p/your-slug`

### Managing Navigation

1. Go to Settings → Site Navigation in Payload Admin
2. Add header and footer navigation items
3. Link to internal pages or custom URLs
4. Changes reflect immediately on the frontend

### Blog Posts

- Create posts in Content → Posts
- Assign categories and authors
- Rich text content with Lexical editor
- Support for hero images and SEO metadata

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage (page with slug "home") |
| `/[slug]` | Dynamic pages from Payload CMS |
| `/p/[slug]` | Alternative route for Payload pages |
| `/blog` | Blog listing page |
| `/blog/[slug]` | Individual blog posts |
| `/category/[slug]` | Posts filtered by category |
| `/preview/*` | Live preview routes (draft content) |
| `/404` | Custom 404 page |

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Astro dev server |
| `npm run dev:payload` | Start Payload CMS |
| `npm run dev:astro` | Start Astro (alias) |
| `npm run dev:both` | Start Payload and Astro together |
| `npm run build` | Build Astro for production |
| `npm run build:payload` | Build Payload for production |
| `npm run preview` | Preview Astro production build |

### Payload-Specific Commands

Run these from `apps/payload-cms/`:

| Command | Description |
|---------|-------------|
| `npm run generate:types` | Regenerate TypeScript types from collections |
| `npm run seed` | Run database seed script |

## Environment Variables

### Astro (`apps/astro/.env`)

```env
PAYLOAD_URL=http://localhost:3000
```

### Payload CMS (`apps/payload-cms/.env`)

```env
# Database (required)
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/payload-cms

# Security (required - min 32 characters)
PAYLOAD_SECRET=your-super-secret-key-here-min-32-chars

# URLs
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
ASTRO_URL=http://localhost:4321

# Port (optional, defaults to 3000)
PORT=3000
```

## Deployment

### Astro Frontend (Vercel/Netlify/Cloudflare)

1. Set the build command: `npm run build`
2. Set the output directory: `apps/astro/dist`
3. Configure environment variable: `PAYLOAD_URL` pointing to your Payload server

Note: The Astro app uses SSR for CMS pages, so ensure your hosting platform supports server-side rendering (Vercel with Node.js runtime, Netlify with serverless functions, etc.)

### Payload CMS (Railway/Render/Fly.io)

1. Build command: `npm run build:payload`
2. Start command: `npm run start` (in apps/payload-cms)
3. Configure environment variables:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `PAYLOAD_SECRET` - Secure secret key (32+ characters)
   - `PAYLOAD_PUBLIC_SERVER_URL` - Your deployed Payload URL
   - `ASTRO_URL` - Your deployed Astro URL (for CORS and live preview)

### Database (MongoDB Atlas)

MongoDB Atlas is the recommended database solution:

1. Create a free M0 cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Configure network access for your deployment platform
3. Use the connection string in `MONGODB_URI`

Alternatively, uncomment the docker-compose.yml services for local MongoDB.

## Adding New Blocks

Creating a new block involves four connected parts: a Payload block definition, an Astro component, the BlockRenderer mapping, and TypeScript types.

### Quick Start

1. **Create the Payload block** in `apps/payload-cms/src/blocks/MyBlock.ts`:

   ```typescript
   import type { Block } from 'payload';
   import { sectionFields } from './shared';

   export const MyBlock: Block = {
     slug: 'myBlock',
     labels: { singular: 'My Block', plural: 'My Blocks' },
     fields: [
       { name: 'heading', type: 'text', required: true },
       { name: 'description', type: 'textarea' },
       // Add more fields as needed...
       ...sectionFields, // Adds size, padding, background options
     ],
   };
   ```

2. **Register the block** in `apps/payload-cms/src/blocks/index.ts`:

   ```typescript
   export { MyBlock } from './MyBlock';
   import { MyBlock } from './MyBlock';
   
   export const allBlocks = [
     // ...existing blocks
     MyBlock,
   ];
   ```

3. **Add TypeScript types** in `apps/astro/src/lib/payload.ts`:

   ```typescript
   export interface MyBlock extends BaseBlock {
     blockType: 'myBlock';
     heading: string;
     description?: string;
   }
   
   // Add to PayloadBlock union
   export type PayloadBlock = /* ... */ | MyBlock;
   ```

4. **Add render case** in `apps/astro/src/components/BlockRenderer.astro`:

   ```astro
   case 'myBlock': {
     const myBlock = block as MyBlock;
     return (
       <Section title={myBlock.heading} {...sectionProps}>
         <p>{myBlock.description}</p>
       </Section>
     );
   }
   ```

5. **(Optional) Create a dedicated Astro component** in `apps/astro/src/components/organisms/`

### Shared Block Fields

All blocks can use `sectionFields` from `shared.ts` which provides:
- `size` - Vertical padding (sm | md | lg)
- `paddingTop` / `paddingBottom` - Override individual padding
- `background` - Background color (default | muted | primary | dark)

Additional shared fields available:
- `buttonField` - Array of CTA buttons with label, href, and variant

### Detailed Tutorial

For a comprehensive guide including:
- Complete step-by-step workflow
- Full example (Testimonial1Block)
- Advanced patterns (rich text, data fetching, conditional fields)
- Best practices and troubleshooting

See **[docs/CREATING-BLOCKS.md](docs/CREATING-BLOCKS.md)**

## Design System

The design system uses vanilla CSS with CSS custom properties (variables) organized in three layers:

1. **Primitive Tokens** - Raw values (colors, spacing scale, font sizes)
2. **Semantic Tokens** - Purpose-based mapping (`--color-text-primary`)
3. **Component Tokens** - Component-specific variables with fallbacks

## Documentation

See the `/docs` folder for detailed guides:

| Document | Description |
|----------|-------------|
| [CREATING-BLOCKS.md](docs/CREATING-BLOCKS.md) | Complete tutorial for creating new visual page builder blocks |
| [ATOMIC-DESIGN.md](docs/ATOMIC-DESIGN.md) | Component architecture guidelines (atoms, molecules, organisms) |
| [CSS-VARIABLES.md](docs/CSS-VARIABLES.md) | Design token reference and customization guide |
| [CONTRIBUTING.md](docs/CONTRIBUTING.md) | Development workflow and contribution guidelines |

## Live Preview

Payload CMS supports live preview, allowing editors to see changes in real-time:

1. Edit a page or post in Payload Admin
2. Click the "Live Preview" button in the sidebar
3. Changes appear instantly in the preview pane
4. Toggle between Mobile, Tablet, and Desktop breakpoints

Preview URLs:
- Pages: `/preview/[slug]`
- Blog posts: `/preview/blog/[slug]`

## License

MIT License
