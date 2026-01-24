/**
 * Payload CMS API Client
 * 
 * Provides functions to fetch content from the Payload CMS REST API.
 * All functions handle the Payload response format and return typed data.
 */

const PAYLOAD_URL = import.meta.env.PAYLOAD_URL || 'http://localhost:3000';

/**
 * Generic fetch wrapper for Payload API
 */
async function fetchFromPayload<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${PAYLOAD_URL}/api${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Payload API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// ============================================================================
// Type Definitions (matching Payload collections)
// ============================================================================

export interface PayloadResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface PayloadMedia {
  id: string;
  alt: string;
  caption?: string;
  url: string;
  filename: string;
  mimeType: string;
  width?: number;
  height?: number;
}

export interface PayloadCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface PayloadPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  heroImage?: PayloadMedia;
  category: PayloadCategory;
  author: string;
  pubDate: string;
  updatedDate?: string;
  content: any; // Lexical rich text format
  status: 'draft' | 'published';
}

export interface PayloadButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'ghost';
}

// Block Types
export interface BaseBlock {
  id: string;
  blockType: string;
  size?: 'sm' | 'md' | 'lg';
  paddingTop?: 'none' | 'sm' | 'md' | 'lg';
  paddingBottom?: 'none' | 'sm' | 'md' | 'lg';
  background?: 'default' | 'muted' | 'primary' | 'dark';
}

export interface Hero1Block extends BaseBlock {
  blockType: 'hero1';
  tagline?: string;
  heading: string;
  description?: string;
  align?: 'center' | 'left';
  contentWidth?: 'narrow' | 'medium' | 'wide';
  buttons?: PayloadButton[];
  media?: PayloadMedia;
}

export interface CTA1Block extends BaseBlock {
  blockType: 'cta1';
  heading: string;
  description?: string;
  align?: 'center' | 'left';
  buttons?: PayloadButton[];
}

export interface CTA2Block extends BaseBlock {
  blockType: 'cta2';
  heading: string;
  description?: string;
  image?: PayloadMedia;
  reverse?: boolean;
  verticalAlign?: 'start' | 'center' | 'end';
  buttons?: PayloadButton[];
}

export interface Feature1Block extends BaseBlock {
  blockType: 'feature1';
  title?: string;
  subtitle?: string;
  features: Array<{
    icon?: string;
    title: string;
    description: string;
  }>;
  columns?: '2' | '3' | '4';
  cardVariant?: 'elevated' | 'outlined' | 'filled';
  centerHeading?: boolean;
  centerCards?: boolean;
}

export interface Stats1Block extends BaseBlock {
  blockType: 'stats1';
  title?: string;
  subtitle?: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
  columns?: '2' | '3' | '4';
  centered?: boolean;
}

export interface Team1Block extends BaseBlock {
  blockType: 'team1';
  title?: string;
  subtitle?: string;
  members: Array<{
    name: string;
    role: string;
    image?: PayloadMedia;
    bio?: string;
  }>;
  columns?: '2' | '3' | '4';
  avatarSize?: 'md' | 'lg' | 'xl';
  centered?: boolean;
}

export interface Blog1Block extends BaseBlock {
  blockType: 'blog1';
  title?: string;
  subtitle?: string;
  postSource?: 'latest' | 'category' | 'specific';
  category?: PayloadCategory;
  posts?: PayloadPost[];
  limit?: number;
  columns?: '2' | '3';
  cardVariant?: 'elevated' | 'outlined' | 'filled';
  centerHeading?: boolean;
}

export interface CategoryGrid1Block extends BaseBlock {
  blockType: 'categoryGrid1';
  title?: string;
  subtitle?: string;
  categorySource?: 'all' | 'specific';
  categories?: PayloadCategory[];
  showPostCount?: boolean;
  columns?: '2' | '3';
  cardVariant?: 'elevated' | 'outlined' | 'filled';
  centerHeading?: boolean;
}

export interface Layout1Block extends BaseBlock {
  blockType: 'layout1';
  tagline?: string;
  heading: string;
  description?: string;
  contentText?: any; // Lexical rich text
  mediaType?: 'image' | 'code';
  image?: PayloadMedia;
  codeBlock?: string;
  reverse?: boolean;
  buttons?: PayloadButton[];
}

export interface SectionBlock extends BaseBlock {
  blockType: 'section';
  content: any; // Lexical rich text
  centerContent?: boolean;
  maxWidth?: 'narrow' | 'medium' | 'wide';
}

export interface FAQ1Block extends BaseBlock {
  blockType: 'faq1';
  title?: string;
  subtitle?: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
  showBottomCta?: boolean;
  bottomCta?: {
    heading?: string;
    description?: string;
    buttons?: PayloadButton[];
  };
  centerHeading?: boolean;
  maxWidth?: 'small' | 'medium' | 'large';
  defaultOpenFirst?: boolean;
  allowMultipleOpen?: boolean;
}

export type PayloadBlock =
  | Hero1Block
  | CTA1Block
  | CTA2Block
  | Feature1Block
  | Layout1Block
  | Stats1Block
  | Team1Block
  | SectionBlock
  | Blog1Block
  | CategoryGrid1Block
  | FAQ1Block;

export interface PayloadPage {
  id: string;
  title: string;
  slug: string;
  blocks: PayloadBlock[];
  meta?: {
    title?: string;
    description?: string;
    image?: PayloadMedia;
  };
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// API Functions
// ============================================================================

/**
 * Fetch all published pages
 */
export async function getPages(): Promise<PayloadPage[]> {
  const response = await fetchFromPayload<PayloadResponse<PayloadPage>>(
    '/pages?where[status][equals]=published&depth=2'
  );
  return response.docs;
}

/**
 * Fetch a single page by slug
 */
export async function getPageBySlug(slug: string): Promise<PayloadPage | null> {
  const response = await fetchFromPayload<PayloadResponse<PayloadPage>>(
    `/pages?where[slug][equals]=${encodeURIComponent(slug)}&where[status][equals]=published&depth=2`
  );
  return response.docs[0] || null;
}

/**
 * Fetch all published blog posts
 */
export async function getPosts(limit?: number): Promise<PayloadPost[]> {
  const limitParam = limit ? `&limit=${limit}` : '';
  const response = await fetchFromPayload<PayloadResponse<PayloadPost>>(
    `/posts?where[status][equals]=published&sort=-pubDate&depth=1${limitParam}`
  );
  return response.docs;
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<PayloadPost | null> {
  const response = await fetchFromPayload<PayloadResponse<PayloadPost>>(
    `/posts?where[slug][equals]=${encodeURIComponent(slug)}&where[status][equals]=published&depth=1`
  );
  return response.docs[0] || null;
}

/**
 * Fetch posts by category slug
 */
export async function getPostsByCategory(
  categorySlug: string,
  limit?: number
): Promise<PayloadPost[]> {
  // First get the category ID
  const categoryResponse = await fetchFromPayload<PayloadResponse<PayloadCategory>>(
    `/categories?where[slug][equals]=${encodeURIComponent(categorySlug)}`
  );
  
  const category = categoryResponse.docs[0];
  if (!category) return [];

  const limitParam = limit ? `&limit=${limit}` : '';
  const response = await fetchFromPayload<PayloadResponse<PayloadPost>>(
    `/posts?where[category][equals]=${category.id}&where[status][equals]=published&sort=-pubDate&depth=1${limitParam}`
  );
  return response.docs;
}

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<PayloadCategory[]> {
  const response = await fetchFromPayload<PayloadResponse<PayloadCategory>>('/categories');
  return response.docs;
}

/**
 * Fetch a single category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<PayloadCategory | null> {
  const response = await fetchFromPayload<PayloadResponse<PayloadCategory>>(
    `/categories?where[slug][equals]=${encodeURIComponent(slug)}`
  );
  return response.docs[0] || null;
}

export interface CategoryWithPostCount extends PayloadCategory {
  postCount: number;
}

/**
 * Fetch all categories with their post counts
 */
export async function getCategoriesWithPostCounts(): Promise<CategoryWithPostCount[]> {
  // Fetch all categories
  const categories = await getCategories();
  
  // Fetch all published posts
  const postsResponse = await fetchFromPayload<PayloadResponse<PayloadPost>>(
    '/posts?where[status][equals]=published&limit=0'
  );
  const posts = postsResponse.docs;
  
  // Count posts per category
  return categories.map((category) => {
    const postCount = posts.filter(
      (post) => {
        const postCategoryId = typeof post.category === 'object' 
          ? post.category.id 
          : post.category;
        return postCategoryId === category.id;
      }
    ).length;
    
    return {
      ...category,
      postCount,
    };
  });
}

/**
 * Get the full URL for a media item
 */
export function getMediaUrl(media: PayloadMedia | undefined): string | undefined {
  if (!media?.url) return undefined;
  
  // If URL is already absolute, return as-is
  if (media.url.startsWith('http')) return media.url;
  
  // Otherwise, prepend the Payload URL
  return `${PAYLOAD_URL}${media.url}`;
}

// ============================================================================
// Navigation
// ============================================================================

export interface NavigationItem {
  label: string;
  href: string;
  newTab?: boolean;
}

export interface Navigation {
  header: {
    items: NavigationItem[];
  };
  footer: {
    items: NavigationItem[];
  };
}

// Raw navigation item from Payload (before transformation)
interface RawNavigationItem {
  type: 'internal' | 'custom';
  page?: PayloadPage | string;
  url?: string;
  label?: string;
  newTab?: boolean;
}

interface RawNavigation {
  header: {
    items?: RawNavigationItem[];
  };
  footer: {
    items?: RawNavigationItem[];
  };
}

/**
 * Transform raw navigation item from Payload into normalized format
 */
function transformNavItem(item: RawNavigationItem): NavigationItem | null {
  let href: string;
  let label: string;

  if (item.type === 'internal') {
    // Internal page link
    if (!item.page) return null;
    
    const page = typeof item.page === 'object' ? item.page : null;
    if (!page) return null;
    
    href = page.slug === 'home' ? '/' : `/${page.slug}`;
    label = item.label || page.title;
  } else {
    // Custom URL
    if (!item.url) return null;
    
    href = item.url;
    label = item.label || item.url;
  }

  return {
    label,
    href,
    newTab: item.newTab,
  };
}

/**
 * Fetch site navigation from Payload
 */
export async function getNavigation(): Promise<Navigation | null> {
  try {
    const response = await fetchFromPayload<RawNavigation>('/globals/navigation?depth=1');
    
    // Transform raw navigation items into normalized format
    const headerItems = (response.header?.items || [])
      .map(transformNavItem)
      .filter((item): item is NavigationItem => item !== null);
    
    const footerItems = (response.footer?.items || [])
      .map(transformNavItem)
      .filter((item): item is NavigationItem => item !== null);
    
    return {
      header: { items: headerItems },
      footer: { items: footerItems },
    };
  } catch (error) {
    console.error('Failed to fetch navigation:', error);
    return null;
  }
}

// ============================================================================
// Preview Mode (for Live Preview)
// ============================================================================

/**
 * Fetch a page by slug (including drafts) for preview
 */
export async function getPageBySlugPreview(slug: string): Promise<PayloadPage | null> {
  const response = await fetchFromPayload<PayloadResponse<PayloadPage>>(
    `/pages?where[slug][equals]=${encodeURIComponent(slug)}&draft=true&depth=2`
  );
  return response.docs[0] || null;
}

/**
 * Fetch a post by slug (including drafts) for preview
 */
export async function getPostBySlugPreview(slug: string): Promise<PayloadPost | null> {
  const response = await fetchFromPayload<PayloadResponse<PayloadPost>>(
    `/posts?where[slug][equals]=${encodeURIComponent(slug)}&draft=true&depth=1`
  );
  return response.docs[0] || null;
}
