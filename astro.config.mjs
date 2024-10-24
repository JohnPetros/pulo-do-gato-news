// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sanity from '@sanity/astro';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), sanity(
    {
      projectId: 'jlfn5obv',
      dataset: 'production',
      useCdn: true,
      studioBasePath: '/admin'
    }
  )],

  output: 'server',
  adapter: netlify(),
});