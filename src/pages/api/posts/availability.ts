import type { APIRoute } from 'astro'

import { SanityPostsService } from '@/cms/sanity/services'
import { AstroApiRoute, AstroHttp } from 'src/api/astro'
import { MakePostsAvailableController } from 'src/api/controllers/make-posts-available-controller'

export const POST: APIRoute = AstroApiRoute(async (context) => {
  const http = await AstroHttp(context)
  const postsService = SanityPostsService()
  const controller = MakePostsAvailableController(postsService)
  return await controller.handle(http)
})
