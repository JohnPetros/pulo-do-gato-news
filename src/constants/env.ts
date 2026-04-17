import { z } from 'zod'

const envSchema = z.object({
  APP_URL: z.string().min(1),
  PULO_DO_GATO_NEWS_API_KEY: z.string().min(1),
  SANITY_API_TOKEN: z.string().min(1),
  SANITY_DATASET: z.string().min(1),
  SANITY_PROJECT_ID: z.string().min(1),
  NEWS_AI_API_URL: z.string().min(1),
})

const env = envSchema.parse(import.meta.env)

export const ENV = {
  appUrl: env.APP_URL,
  puloDoGatoNewsApiKey: env.PULO_DO_GATO_NEWS_API_KEY,
  sanityApiToken: env.SANITY_API_TOKEN,
  sanityDataset: env.SANITY_DATASET,
  sanityProjectId: env.SANITY_PROJECT_ID,
  newsAiApiUrl: env.NEWS_AI_API_URL,
} as const
