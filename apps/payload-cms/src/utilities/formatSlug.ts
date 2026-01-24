/**
 * Converts a string to a URL-friendly slug
 * 
 * @example
 * formatSlug('Hello World!') // 'hello-world'
 * formatSlug('About Us') // 'about-us'
 */
export const formatSlug = (val: string): string => {
  return val
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};
