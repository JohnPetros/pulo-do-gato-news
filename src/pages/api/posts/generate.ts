import type { APIRoute } from 'astro'

import { AxiosApiClient } from '@/api/axios'
import { NewsAiService } from '@/api/newsai/services/newsai-service'
import { SanityPostsService } from '@/cms/sanity/services'
import { ENV } from '@/constants/env'
import { AstroApiRoute, AstroHttp } from 'src/api/astro'
import { GeneratePostController } from 'src/api/controllers/generate-post-controller'

export const POST: APIRoute = async (context) => {
  const apiRoute = AstroApiRoute(async () => {
    const http = await AstroHttp(context)
    const restClient = AxiosApiClient(ENV.newsAiApiUrl)
    const newsAiService = NewsAiService(restClient)
    const postsService = SanityPostsService()
    const controller = GeneratePostController(postsService, newsAiService)
    return controller.handle(http)
  })
  return apiRoute.run()
}
