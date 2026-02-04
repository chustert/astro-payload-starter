// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  // Static output with on-demand SSR routes (preview)
  output: 'static',
  adapter: vercel(),

  // Configure site URL for production
  // site: 'https://your-site.com',

  // Vite configuration
  vite: {
    // Allow access to environment variables
    envPrefix: 'PAYLOAD_',
    // Path aliases
    resolve: {
      alias: {
        '@lib': path.resolve(__dirname, './src/lib'),
      },
    },
  },
});
