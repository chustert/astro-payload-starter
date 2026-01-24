import type { Block } from 'payload';
import { sectionFields } from './shared';

export const CategoryGrid1Block: Block = {
  slug: 'categoryGrid1',
  labels: {
    singular: 'Category Grid',
    plural: 'Category Grids',
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
      name: 'categorySource',
      type: 'select',
      options: [
        { label: 'All Categories', value: 'all' },
        { label: 'Specific Categories', value: 'specific' },
      ],
      defaultValue: 'all',
      admin: {
        description: 'How to select which categories to display',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.categorySource === 'specific',
        description: 'Select specific categories to display',
      },
    },
    {
      name: 'showPostCount',
      type: 'checkbox',
      label: 'Show post count',
      defaultValue: true,
      admin: {
        description: 'Display the number of posts in each category',
      },
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
        { label: 'Elevated (Shadow)', value: 'elevated' },
        { label: 'Outlined (Border)', value: 'outlined' },
        { label: 'Filled (Background)', value: 'filled' },
      ],
      defaultValue: 'outlined',
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
