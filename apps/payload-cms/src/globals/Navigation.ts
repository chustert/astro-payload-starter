import type { Field, GlobalConfig } from 'payload';

// Reusable link fields for navigation items
const linkFields: Field[] = [
  {
    name: 'type',
    type: 'radio',
    options: [
      { label: 'Internal Page', value: 'internal' },
      { label: 'Custom URL', value: 'custom' },
    ],
    defaultValue: 'internal',
    admin: {
      layout: 'horizontal',
    },
  },
  {
    name: 'page',
    type: 'relationship',
    relationTo: 'pages',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'internal',
      description: 'Select a page to link to',
    },
    validate: (value, { siblingData }) => {
      if (siblingData?.type === 'internal' && !value) {
        return 'Please select a page';
      }
      return true;
    },
  },
  {
    name: 'url',
    type: 'text',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'custom',
      description: 'Enter a custom URL (e.g., "/blog" or "https://example.com")',
    },
    validate: (value, { siblingData }) => {
      if (siblingData?.type === 'custom' && !value) {
        return 'Please enter a URL';
      }
      return true;
    },
  },
  {
    name: 'label',
    type: 'text',
    admin: {
      description: 'Optional: Override the page title or provide a custom label',
    },
  },
  {
    name: 'newTab',
    type: 'checkbox',
    label: 'Open in new tab',
    defaultValue: false,
  },
];

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Site Navigation',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'header',
      type: 'group',
      label: 'Header Navigation',
      fields: [
        {
          name: 'items',
          type: 'array',
          label: 'Menu Items',
          fields: linkFields,
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Footer Navigation',
      fields: [
        {
          name: 'items',
          type: 'array',
          label: 'Footer Links',
          fields: linkFields,
        },
      ],
    },
  ],
};
