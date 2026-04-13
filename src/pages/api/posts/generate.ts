import type { APIRoute } from 'astro'

import { AxiosApiClient } from '@/api/axios'
import { NewsAiService } from '@/api/newsai/services/newsai-service'
import { SanityPostsCollection } from '@/cms/sanity/collections'
import { ENV } from '@/constants/env'
import { AstroApiRoute, AstroHttp } from 'src/api/astro'
import { GeneratePostController } from 'src/api/controllers/generate-post-controller'

export const POST: APIRoute = AstroApiRoute(async (context) => {
  const http = await AstroHttp({ context })
  const restClient = AxiosApiClient(ENV.newsAiApiUrl)
  const newsAiService = NewsAiService(restClient)
  const postsCollection = SanityPostsCollection()
  const controller = GeneratePostController(postsCollection, newsAiService)
  return controller.handle(http)
})
