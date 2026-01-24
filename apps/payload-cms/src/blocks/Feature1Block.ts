import type { Block } from 'payload';
import { sectionFields } from './shared';

export const Feature1Block: Block = {
  slug: 'feature1',
  labels: {
    singular: 'Features Grid',
    plural: 'Features Grids',
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
      name: 'features',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Emoji or symbol (e.g., "✦", "◈")',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
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
      defaultValue: 'outlined',
    },
    {
      name: 'centerHeading',
      type: 'checkbox',
      label: 'Center section heading',
      defaultValue: true,
    },
    {
      name: 'centerCards',
      type: 'checkbox',
      label: 'Center card content',
      defaultValue: true,
    },
    ...sectionFields,
  ],
};
