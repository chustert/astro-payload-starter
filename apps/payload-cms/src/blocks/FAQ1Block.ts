import type { Block } from 'payload';
import { sectionFields, buttonField } from './shared';

/**
 * FAQ1 Block
 * 
 * A FAQ section with accordion-style questions and answers,
 * optional section title/subtitle, and an optional bottom CTA.
 * 
 * Follows Relume naming convention - FAQ1 is the single-column accordion layout.
 */
export const FAQ1Block: Block = {
  slug: 'faq1',
  labels: {
    singular: 'FAQ Section',
    plural: 'FAQ Sections',
  },
  fields: [
    // ============================================
    // Header Fields
    // ============================================
    {
      name: 'title',
      type: 'text',
      defaultValue: 'FAQs',
      admin: {
        description: 'Section heading (e.g., "FAQs", "Frequently Asked Questions")',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      admin: {
        description: 'Optional section description below the heading',
      },
    },

    // ============================================
    // FAQ Items
    // ============================================
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 20,
      labels: {
        singular: 'FAQ Item',
        plural: 'FAQ Items',
      },
      admin: {
        description: 'Questions and answers for the accordion',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          admin: {
            description: 'The question text',
          },
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
          admin: {
            description: 'The answer text (supports line breaks)',
          },
        },
      ],
    },

    // ============================================
    // Bottom CTA (Optional)
    // ============================================
    {
      name: 'showBottomCta',
      type: 'checkbox',
      label: 'Show bottom CTA section',
      defaultValue: true,
      admin: {
        description: 'Display a "Still have questions?" section below the FAQs',
      },
    },
    {
      name: 'bottomCta',
      type: 'group',
      admin: {
        condition: (data, siblingData) => siblingData?.showBottomCta === true,
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Still have questions?',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        buttonField,
      ],
    },

    // ============================================
    // Layout Options
    // ============================================
    {
      name: 'centerHeading',
      type: 'checkbox',
      label: 'Center section heading',
      defaultValue: true,
    },
    {
      name: 'maxWidth',
      type: 'select',
      options: [
        { label: 'Small (560px)', value: 'small' },
        { label: 'Medium (768px)', value: 'medium' },
        { label: 'Large (1024px)', value: 'large' },
      ],
      defaultValue: 'medium',
      admin: {
        description: 'Maximum width of the FAQ accordion',
      },
    },
    {
      name: 'defaultOpenFirst',
      type: 'checkbox',
      label: 'Open first item by default',
      defaultValue: false,
    },
    {
      name: 'allowMultipleOpen',
      type: 'checkbox',
      label: 'Allow multiple items open at once',
      defaultValue: false,
      admin: {
        description: 'If unchecked, opening one item closes others',
      },
    },

    // ============================================
    // Standard Section Fields
    // ============================================
    ...sectionFields,
  ],
};
