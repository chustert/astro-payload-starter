import type { Block } from 'payload';
import { sectionFields, buttonField } from './shared';

export const Layout1Block: Block = {
  slug: 'layout1',
  labels: {
    singular: 'Two Column Layout',
    plural: 'Two Column Layouts',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      admin: {
        description: 'Small text above heading',
      },
    },
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
      name: 'contentText',
      type: 'richText',
      admin: {
        description: 'Additional content below description',
      },
    },
    {
      name: 'mediaType',
      type: 'select',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Code Block', value: 'code' },
      ],
      defaultValue: 'image',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.mediaType === 'image',
      },
    },
    {
      name: 'codeBlock',
      type: 'code',
      admin: {
        condition: (_, siblingData) => siblingData?.mediaType === 'code',
        language: 'css',
      },
    },
    {
      name: 'reverse',
      type: 'checkbox',
      label: 'Reverse layout (media on left)',
      defaultValue: false,
    },
    buttonField,
    ...sectionFields,
  ],
};
