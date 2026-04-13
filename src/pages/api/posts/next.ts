import type { APIRoute } from 'astro'

import { GetNextPostCategoryController } from '@/api/controllers/get-next-post-category-controller'
import { SanityPostsCollection } from '@/cms/sanity/collections'
import { AstroApiRoute, AstroHttp } from 'src/api/astro'

export const GET: APIRoute = AstroApiRoute(async (context) => {
  const http = await AstroHttp({ context })
  const PostsCollection = SanityPostsCollection()
  const controller = GetNextPostCategoryController(PostsCollection)
  return controller.handle(http)
})
