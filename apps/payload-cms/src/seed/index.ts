/**
 * Seed Script
 * 
 * Populates Payload CMS with initial content including:
 * - Categories
 * - Blog posts
 * - Navigation
 * - Sample pages (Home, About)
 * 
 * Run with: npm run seed
 */

import { getPayload } from 'payload';
import type { Navigation, Page, Post } from '../payload-types';
import config from '../payload.config';
import 'dotenv/config';

const seed = async () => {
  // Initialize Payload with config (Payload 3.x pattern)
  const payload = await getPayload({
    config,
  });

  console.log('🌱 Starting seed...\n');

  // =========================================================================
  // 1. Create Categories
  // =========================================================================
  console.log('📁 Creating categories...');

  const categories = [
    {
      name: 'Tutorials',
      slug: 'tutorials',
      description: 'Step-by-step guides and how-to articles to help you learn new skills and techniques.',
      color: '#6366f1',
    },
    {
      name: 'News',
      slug: 'news',
      description: 'Stay up to date with the latest announcements, updates, and industry news.',
      color: '#10b981',
    },
    {
      name: 'Tips & Tricks',
      slug: 'tips',
      description: 'Quick tips, best practices, and clever tricks to improve your workflow.',
      color: '#f59e0b',
    },
  ];

  const createdCategories: Record<string, string> = {};

  for (const category of categories) {
    try {
      const existing = await payload.find({
        collection: 'categories',
        where: { slug: { equals: category.slug } },
      });

      if (existing.docs.length > 0) {
        createdCategories[category.slug] = String(existing.docs[0].id);
        console.log(`  ✓ Category "${category.name}" already exists`);
      } else {
        const created = await payload.create({
          collection: 'categories',
          data: category,
        });
        createdCategories[category.slug] = String(created.id);
        console.log(`  ✓ Created category: ${category.name}`);
      }
    } catch (error) {
      console.error(`  ✗ Failed to create category: ${category.name}`, error);
    }
  }

  // =========================================================================
  // 2. Create Blog Posts
  // =========================================================================
  console.log('\n📝 Creating blog posts...');

  type SeedPost = Omit<Post, 'id' | 'createdAt' | 'updatedAt' | '_status'>;
  type SeedNavigation = Omit<Navigation, 'id' | 'createdAt' | 'updatedAt'>;
  type SeedPage = Omit<Page, 'id' | 'createdAt' | 'updatedAt' | '_status'>;

  const posts: SeedPost[] = [
    {
      title: 'Getting Started with Astro',
      slug: 'getting-started-with-astro',
      description: 'Learn how to set up your first Astro project and understand the basics of this modern static site generator.',
      pubDate: '2026-01-15',
      category: createdCategories['tutorials'],
      author: 'Admin',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Astro is a modern static site generator that delivers lightning-fast performance with a developer experience you\'ll love.',
                  version: 1,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              version: 1,
              children: [{ type: 'text', text: 'Why Astro?', version: 1 }],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Astro offers zero JavaScript by default, component islands, content collections, and fast performance out of the box.',
                  version: 1,
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      status: 'published',
    },
    {
      title: 'Building a Design System with CSS Variables',
      slug: 'css-variables-design-system',
      description: 'Discover how to create a flexible and maintainable design system using CSS custom properties.',
      pubDate: '2026-01-18',
      category: createdCategories['tutorials'],
      author: 'Admin',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'CSS custom properties (variables) are a powerful tool for building maintainable design systems.',
                  version: 1,
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      status: 'published',
    },
    {
      title: 'Astro 5.0 Has Been Released',
      slug: 'astro-5-released',
      description: 'Astro 5.0 brings exciting new features including Content Layer, Server Islands, and improved performance.',
      pubDate: '2026-01-20',
      category: createdCategories['news'],
      author: 'Admin',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'The Astro team has officially released Astro 5.0, marking a significant milestone in the framework\'s evolution.',
                  version: 1,
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      status: 'published',
    },
    {
      title: 'Quick Astro Tips',
      slug: 'quick-astro-tips',
      description: 'A collection of quick tips and tricks to boost your Astro development workflow.',
      pubDate: '2026-01-22',
      category: createdCategories['tips'],
      author: 'Admin',
      content: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Here are some quick tips to improve your Astro development experience.',
                  version: 1,
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      status: 'published',
    },
  ];

  for (const post of posts) {
    try {
      const existing = await payload.find({
        collection: 'posts',
        where: { slug: { equals: post.slug } },
      });

      if (existing.docs.length > 0) {
        console.log(`  ✓ Post "${post.title}" already exists`);
      } else {
        await payload.create({
          collection: 'posts',
          data: post,
        });
        console.log(`  ✓ Created post: ${post.title}`);
      }
    } catch (error) {
      console.error(`  ✗ Failed to create post: ${post.title}`, error);
    }
  }

  // =========================================================================
  // 3. Create Navigation
  // =========================================================================
  console.log('\n🧭 Setting up navigation...');

  try {
    const navigationData: SeedNavigation = {
      header: {
        items: [
          { label: 'Home', type: 'custom', url: '/' },
          { label: 'About', type: 'custom', url: '/about' },
          { label: 'Blog', type: 'custom', url: '/blog' },
          { label: 'Categories', type: 'custom', url: '/categories' },
          { label: 'Style Guide', type: 'custom', url: '/style-guide' },
        ],
      },
      footer: {
        items: [
          { label: 'Privacy', type: 'custom', url: '/privacy' },
          { label: 'Terms', type: 'custom', url: '/terms' },
        ],
      },
    };

    await payload.updateGlobal({
      slug: 'navigation',
      data: navigationData,
    });
    console.log('  ✓ Navigation configured');
  } catch (error) {
    console.error('  ✗ Failed to configure navigation', error);
  }

  // =========================================================================
  // 4. Create Sample Pages
  // =========================================================================
  console.log('\n📄 Creating sample pages...');

  // Home Page
  const homePage: SeedPage = {
    title: 'Home',
    slug: 'home',
    status: 'published',
    blocks: [
      {
        blockType: 'hero1',
        tagline: 'Vanilla CSS Design System',
        heading: 'Build Faster with<br />Astro Components',
        description: 'A minimal, unstyled component library for Astro with an atomic design structure. Customize everything through CSS variables.',
        align: 'center',
        contentWidth: 'medium',
        buttons: [
          { label: 'Get Started', href: '#', variant: 'primary' },
          { label: 'View Style Guide', href: '/style-guide', variant: 'secondary' },
        ],
        size: 'lg',
        background: 'default',
      },
      {
        blockType: 'feature1',
        title: 'Why This Starter?',
        subtitle: 'Everything you need to build beautiful, consistent interfaces.',
        features: [
          {
            icon: '◈',
            title: 'Atomic Design',
            description: 'Components organized into atoms, molecules, organisms, and templates for maximum reusability and consistency.',
          },
          {
            icon: '✦',
            title: 'CSS Variables',
            description: 'Every component is customizable through CSS custom properties. Override tokens to match your brand instantly.',
          },
          {
            icon: '●',
            title: 'No Dependencies',
            description: 'Pure vanilla CSS with no framework dependencies. Just Astro and your creativity. No build complexity.',
          },
        ],
        columns: '3',
        cardVariant: 'elevated',
        centerHeading: true,
        centerCards: true,
        background: 'muted',
      },
      {
        blockType: 'cta1',
        heading: 'Ready to Get Started?',
        description: 'Explore the style guide to see all available components and design tokens.',
        align: 'center',
        buttons: [
          { label: 'View Style Guide', href: '/style-guide', variant: 'secondary' },
        ],
        background: 'primary',
        size: 'lg',
      },
    ],
  };

  // About Page
  const aboutPage: SeedPage = {
    title: 'About Us',
    slug: 'about',
    status: 'published',
    blocks: [
      {
        blockType: 'hero1',
        tagline: 'About Us',
        heading: 'We Build Digital<br />Experiences That Matter',
        description: 'We\'re a passionate team of designers and developers dedicated to creating beautiful, functional websites that help businesses grow.',
        align: 'center',
        contentWidth: 'medium',
        background: 'default',
      },
      {
        blockType: 'layout1',
        tagline: 'Our Story',
        heading: 'Started with a Simple Idea',
        description: 'We founded our company with a clear mission: make web development accessible and enjoyable. Too often, we saw businesses struggle with overcomplicated tools and bloated frameworks.',
        mediaType: 'code',
        codeBlock: '/* Our values in code */\nconst company = {\n  mission: "Simplify web development",\n  founded: 2020,\n  team: "Passionate creators"\n};',
        background: 'muted',
      },
      {
        blockType: 'feature1',
        title: 'Our Core Values',
        subtitle: 'The principles that guide everything we do.',
        features: [
          {
            icon: '✦',
            title: 'Simplicity First',
            description: 'We believe the best solutions are often the simplest. We cut through complexity to deliver clean, maintainable code.',
          },
          {
            icon: '◈',
            title: 'Quality Craftsmanship',
            description: 'Every line of code, every design decision is made with care. We take pride in the details that make products exceptional.',
          },
          {
            icon: '◎',
            title: 'User-Centered',
            description: 'Great products start with understanding users. We design experiences that are intuitive, accessible, and delightful.',
          },
          {
            icon: '◆',
            title: 'Continuous Learning',
            description: 'Technology evolves rapidly. We stay curious, embrace new ideas, and constantly improve our skills and processes.',
          },
          {
            icon: '▲',
            title: 'Open Collaboration',
            description: 'We believe in the power of community. We share knowledge, contribute to open source, and learn from others.',
          },
          {
            icon: '●',
            title: 'Honest Communication',
            description: 'Trust is built through transparency. We communicate clearly, set realistic expectations, and deliver on our promises.',
          },
        ],
        columns: '3',
        cardVariant: 'outlined',
        centerHeading: true,
        centerCards: true,
        background: 'default',
      },
      {
        blockType: 'team1',
        title: 'Meet Our Team',
        subtitle: 'The talented people behind our success.',
        members: [
          { name: 'Alex Rivera', role: 'Founder & CEO' },
          { name: 'Sam Chen', role: 'Lead Designer' },
          { name: 'Jordan Taylor', role: 'Senior Developer' },
          { name: 'Morgan Lee', role: 'Product Manager' },
        ],
        columns: '4',
        avatarSize: 'xl',
        centered: true,
        background: 'muted',
      },
      {
        blockType: 'cta1',
        heading: 'Ready to Start Building?',
        description: 'Join thousands of developers using our design system.',
        align: 'center',
        buttons: [
          { label: 'Get Started Free', href: '#', variant: 'primary' },
        ],
        background: 'dark',
      },
    ],
  };

  const pages: SeedPage[] = [homePage, aboutPage];

  for (const page of pages) {
    try {
      const existing = await payload.find({
        collection: 'pages',
        where: { slug: { equals: page.slug } },
      });

      if (existing.docs.length > 0) {
        console.log(`  ✓ Page "${page.title}" already exists`);
      } else {
        await payload.create({
          collection: 'pages',
          data: page,
        });
        console.log(`  ✓ Created page: ${page.title}`);
      }
    } catch (error) {
      console.error(`  ✗ Failed to create page: ${page.title}`, error);
    }
  }

  console.log('\n✅ Seed completed!\n');
  process.exit(0);
};

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
