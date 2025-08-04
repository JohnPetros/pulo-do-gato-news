export const ENV = {
  sanityApiToken: import.meta.env.SANITY_API_TOKEN,
  sanityDataset: import.meta.env.SANITY_DATASET,
  sanityProjectId: import.meta.env.SANITY_PROJECT_ID,
  newsAiApiUrl: import.meta.env.NEWS_AI_API_URL,
} as const
