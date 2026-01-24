import type { Block } from 'payload';
import { sectionFields } from './shared';

export const Blog1Block: Block = {
  slug: 'blog1',
  labels: {
    singular: 'Blog Posts Grid',
    plural: 'Blog Posts Grids',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Section heading',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      admin: {
        description: 'Section subheading',
      },
    },
    {
      name: 'postSource',
      type: 'select',
      options: [
        { label: 'Latest Posts', value: 'latest' },
        { label: 'By Category', value: 'category' },
        { label: 'Specific Posts', value: 'specific' },
      ],
      defaultValue: 'latest',
      admin: {
        description: 'How to select which posts to display',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      admin: {
        condition: (_, siblingData) => siblingData?.postSource === 'category',
        description: 'Select category to filter posts',
      },
    },
    {
      name: 'posts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.postSource === 'specific',
        description: 'Select specific posts to display',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      admin: {
        description: 'Maximum number of posts to display',
      },
    },
    {
      name: 'columns',
      type: 'select',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
      ],
      defaultValue: '3',
    },
    {
      name: 'cardVariant',
      type: 'select',
      options: [
        { label: 'Elevated (Shadow)', value: 'elevated' },
        { label: 'Outlined (Border)', value: 'outlined' },
        { label: 'Filled (Background)', value: 'filled' },
      ],
      defaultValue: 'elevated',
    },
    {
      name: 'centerHeading',
      type: 'checkbox',
      label: 'Center section heading',
      defaultValue: false,
    },
    ...sectionFields,
  ],
};
