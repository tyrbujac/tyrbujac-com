import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { remarkWordCount } from './plugins/remark-word-count.mjs';

export default defineConfig({
  site: 'https://tyrbujac.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkWordCount],
  },
});
