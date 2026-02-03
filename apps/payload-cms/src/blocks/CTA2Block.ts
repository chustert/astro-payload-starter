import type { Block } from 'payload';
import { sectionFields, buttonField } from './shared';

export const CTA2Block: Block = {
  slug: 'cta2',
  labels: {
    singular: 'CTA (With Image)',
    plural: 'CTA With Image Sections',
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Image displayed beside the content',
      },
    },
    {
      name: 'reverse',
      type: 'checkbox',
      label: 'Reverse layout (image on left)',
      defaultValue: false,
    },
    {
      name: 'verticalAlign',
      type: 'select',
      options: [
        { label: 'Top', value: 'start' },
        { label: 'Center', value: 'center' },
        { label: 'Bottom', value: 'end' },
      ],
      defaultValue: 'center',
    },
    buttonField,
    ...sectionFields.map((field) =>
      field.name === 'background' && field.type === 'select'
        ? { ...field, defaultValue: 'muted' }
        : field
    ),
  ],
};
