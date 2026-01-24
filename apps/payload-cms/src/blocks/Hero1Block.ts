import type { Block } from 'payload';
import { sectionFields, buttonField } from './shared';

export const Hero1Block: Block = {
  slug: 'hero1',
  labels: {
    singular: 'Hero (Centered)',
    plural: 'Hero Sections',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      admin: {
        description: 'Small badge text above heading',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Main headline (use <br /> for line breaks)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Subheading text',
      },
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
    {
      name: 'contentWidth',
      type: 'select',
      options: [
        { label: 'Narrow', value: 'narrow' },
        { label: 'Medium', value: 'medium' },
        { label: 'Wide', value: 'wide' },
      ],
      defaultValue: 'medium',
    },
    buttonField,
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional hero image',
      },
    },
    ...sectionFields,
  ],
};
