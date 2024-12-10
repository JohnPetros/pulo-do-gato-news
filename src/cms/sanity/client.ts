import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'jlfn5obv',
  dataset: 'production',
  apiVersion: '1',
  useCdn: true,
})
