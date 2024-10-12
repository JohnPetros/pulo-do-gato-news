// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sanity from '@sanity/astro';

import dotenv from 'dotenv'

dotenv.config()

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.SANITY_DATASET;

console.log({ SANITY_PROJECT_ID })

// https://astro.build/config
export default defineConfig({
  experimental: {

  },
  integrations: [tailwind(), react(), sanity(
    {
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      useCdn: true,
      studioBasePath: '/admin'
    }
  )],
  output: 'server',
});