import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { livePreview } from '@payloadcms/live-preview';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Collections
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Pages } from './collections/Pages';
import { Posts } from './collections/Posts';
import { Categories } from './collections/Categories';

// Globals
import { Navigation } from './globals/Navigation';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
      collections: ['pages', 'posts'],
      url: ({ data, collectionConfig }) => {
        const baseUrl = process.env.ASTRO_URL || 'http://localhost:4321';
        if (collectionConfig?.slug === 'pages') {
          return `${baseUrl}/preview/${data?.slug || ''}`;
        }
        if (collectionConfig?.slug === 'posts') {
          return `${baseUrl}/preview/blog/${data?.slug || ''}`;
        }
        return baseUrl;
      },
    },
  },

  collections: [Users, Media, Pages, Posts, Categories],
  
  globals: [Navigation],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-me',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/payload-cms',
  }),

  sharp,

  cors: [
    'http://localhost:4321',
    'http://localhost:3000',
    process.env.ASTRO_URL || '',
  ].filter(Boolean),
});
