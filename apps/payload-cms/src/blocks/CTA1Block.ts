import type { Block } from 'payload';
import { sectionFields, buttonField } from './shared';

export const CTA1Block: Block = {
  slug: 'cta1',
  labels: {
    singular: 'CTA (Centered)',
    plural: 'CTA Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'align',
      type: 'select',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Left', value: 'left' },
      ],
      defaultValue: 'center',
    },
    buttonField,
    ...sectionFields.map((field) =>
      'name' in field && field.name === 'background' && field.type === 'select'
        ? { ...field, defaultValue: 'primary' }
        : field
    ),
  ],
};
