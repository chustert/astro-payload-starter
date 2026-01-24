---
title: Building a Design System with CSS Variables
description: Discover how to create a flexible and maintainable design system using CSS custom properties.
pubDate: 2026-01-18
category: tutorials
author: Admin
heroImage: /images/blog/css-variables.jpg
---

CSS custom properties (variables) are a powerful tool for building maintainable design systems. Let's explore how to leverage them effectively.

## The Power of CSS Variables

CSS variables allow you to:

- Define reusable values across your stylesheet
- Create themes with minimal effort
- Enable runtime customization
- Reduce code duplication

## Setting Up Design Tokens

Start by defining your design tokens in a root selector:

```css
:root {
  /* Colors */
  --color-primary: #6366f1;
  --color-secondary: #64748b;
  --color-accent: #f59e0b;
  
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-8: 2rem;
  
  /* Typography */
  --font-sans: system-ui, sans-serif;
  --font-mono: 'Fira Code', monospace;
}
```

## Component-Level Variables

Each component can define its own variables that cascade from the global tokens:

```css
.button {
  --btn-bg: var(--color-primary);
  --btn-color: white;
  --btn-padding: var(--space-2) var(--space-4);
  
  background: var(--btn-bg);
  color: var(--btn-color);
  padding: var(--btn-padding);
}
```

## Theming Made Easy

Switch between themes by overriding variables:

```css
[data-theme="dark"] {
  --color-bg: #1a1a1a;
  --color-text: #ffffff;
}
```

## Conclusion

CSS variables provide the foundation for scalable, maintainable design systems. Start small and build up your token library over time.
