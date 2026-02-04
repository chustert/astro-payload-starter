import type { Field } from 'payload';
import { formatSlug } from '../utilities/formatSlug';

/**
 * Creates a slug field that auto-generates from another field
 * 
 * @param fieldToUse - The field name to generate the slug from (default: 'title')
 * @param overrides - Additional field configuration overrides
 * 
 * @example
 * // In a collection:
 * fields: [
 *   { name: 'title', type: 'text', required: true },
 *   slugField('title'),
 * ]
 */
type TextFieldSingle = Extract<Field, { type: 'text' }> & { hasMany?: false };

export const slugField = (
  fieldToUse: string = 'title',
  overrides?: Partial<TextFieldSingle>
): TextFieldSingle => ({
  name: 'slug',
  type: 'text',
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: 'Auto-generated from title. You can edit if needed.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data, operation }) => {
        // Only auto-generate on create, or if slug is empty
        if (operation === 'create' || !value) {
          const fieldValue = data?.[fieldToUse];
          if (typeof fieldValue === 'string' && fieldValue.length > 0) {
            return formatSlug(fieldValue);
          }
        }
        return value;
      },
    ],
  },
  ...overrides,
});
