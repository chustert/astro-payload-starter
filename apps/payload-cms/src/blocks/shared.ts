import type { Field } from 'payload';

/**
 * Shared section fields that all blocks inherit
 * Maps to the Section organism props in Astro
 */
export const sectionFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    options: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
    ],
    defaultValue: 'md',
    admin: {
      description: 'Vertical padding size',
    },
  },
  {
    name: 'paddingTop',
    type: 'select',
    options: [
      { label: 'Default', value: '' },
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
    ],
    admin: {
      description: 'Override top padding',
    },
  },
  {
    name: 'paddingBottom',
    type: 'select',
    options: [
      { label: 'Default', value: '' },
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
    ],
    admin: {
      description: 'Override bottom padding',
    },
  },
  {
    name: 'background',
    type: 'select',
    options: [
      { label: 'Default (White)', value: 'default' },
      { label: 'Muted (Gray)', value: 'muted' },
      { label: 'Primary (Brand)', value: 'primary' },
      { label: 'Dark', value: 'dark' },
    ],
    defaultValue: 'default',
  },
];

/**
 * Button field for CTAs
 */
export const buttonField: Field = {
  name: 'buttons',
  type: 'array',
  label: 'Buttons',
  maxRows: 3,
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'href',
      type: 'text',
      required: true,
    },
    {
      name: 'variant',
      type: 'select',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Ghost', value: 'ghost' },
      ],
      defaultValue: 'primary',
    },
  ],
};
