import {
  SanityCategoriesCollection,
  SanityPostsCollection,
} from '@/cms/sanity/collections'
import type { APIRoute } from 'astro'
import { AstroApiRoute, AstroHttp } from 'src/api/astro'
import { CreatePostController } from 'src/api/controllers'

export const POST: APIRoute = AstroApiRoute(async (context) => {
  const http = await AstroHttp({ context })
  const postsCollection = SanityPostsCollection()
  const categoriesService = SanityCategoriesCollection()
  const controller = CreatePostController(postsCollection, categoriesService)
  return controller.handle(http)
})
