import type { APIRoute } from 'astro'

import { GetNextPostCategoryController } from '@/api/controllers/get-next-post-category-controller'
import { SanityPostsService } from '@/cms/sanity/services'
import { AstroApiRoute, AstroHttp } from 'src/api/astro'

export const GET: APIRoute = AstroApiRoute(async (context) => {
  const http = await AstroHttp(context)
  const postsService = SanityPostsService()
  const controller = GetNextPostCategoryController(postsService)
  return controller.handle(http)
})
