import type { Block } from 'payload';
import { sectionFields } from './shared';

export const Stats1Block: Block = {
  slug: 'stats1',
  labels: {
    singular: 'Statistics',
    plural: 'Statistics Sections',
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
      name: 'stats',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 8,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'The number or value (e.g., "100+", "99%")',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Description of the stat',
          },
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
      defaultValue: '4',
    },
    {
      name: 'centered',
      type: 'checkbox',
      label: 'Center content',
      defaultValue: true,
    },
    ...sectionFields,
  ],
};
