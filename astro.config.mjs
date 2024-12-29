// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import netlify from '@astrojs/netlify';
import partytown from '@astrojs/partytown';

export default defineConfig({
  integrations: [tailwind(), react(), partytown(), sanity(
    {
      projectId: 'jlfn5obv',
      dataset: 'production',
      useCdn: true,
      studioBasePath: '/admin'
    }
  )],
  output: 'server',
  adapter: netlify(),
  image: {
    remotePatterns: [{ protocol: 'http' }, { protocol: 'https' }]
  }
});