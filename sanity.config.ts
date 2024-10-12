import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { schemaTypes } from './src/cms/sanity/schema-types'

export default defineConfig({
  name: 'default',
  title: 'pulo-do-gato-news',

  projectId: 'jlfn5obv',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
