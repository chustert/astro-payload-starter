import type { Block } from 'payload';
import { sectionFields } from './shared';

export const SectionBlock: Block = {
  slug: 'section',
  labels: {
    singular: 'Content Section',
    plural: 'Content Sections',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Section content with rich text formatting',
      },
    },
    {
      name: 'centerContent',
      type: 'checkbox',
      label: 'Center content',
      defaultValue: true,
    },
    {
      name: 'maxWidth',
      type: 'select',
      options: [
        { label: 'Narrow (65ch)', value: 'narrow' },
        { label: 'Medium (80ch)', value: 'medium' },
        { label: 'Wide (100%)', value: 'wide' },
      ],
      defaultValue: 'narrow',
    },
    ...sectionFields,
  ],
};
