import type { Block } from 'payload';
import { sectionFields } from './shared';

export const Team1Block: Block = {
  slug: 'team1',
  labels: {
    singular: 'Team',
    plural: 'Team Sections',
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
      name: 'members',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'bio',
          type: 'textarea',
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
      name: 'avatarSize',
      type: 'select',
      options: [
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
      defaultValue: 'xl',
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
