import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://airesumeadvisor.com',
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          'zh-TW': 'zh-Hant-TW',
        },
      },
    }),
    mdx(),
  ],
  i18n: {
    locales: ['en', 'zh-TW'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  redirects: {
    '/blog/resume-diagnosis-2026-zh': {
      status: 301,
      destination: '/zh-TW/blog/resume-diagnosis-2026',
    },
    '/blog/best-jobscan-alternatives-2026-zh': {
      status: 301,
      destination: '/zh-TW/blog/best-jobscan-alternatives-2026',
    },
    '/blog/best-linkedin-chrome-extensions-job-seekers-2026-zh': {
      status: 301,
      destination: '/zh-TW/blog/best-linkedin-chrome-extensions-job-seekers-2026',
    },
    '/blog/how-to-tailor-resume-to-job-description-zh': {
      status: 301,
      destination: '/zh-TW/blog/how-to-tailor-resume-to-job-description',
    },
  },
  output: 'static',
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'esbuild',
    },
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
