import { createClient } from '@sanity/client'

export const sanity = createClient({
  apiVersion: '1',
  useCdn: true,
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET,
  token: import.meta.env.SANITY_API_TOKEN,
})
