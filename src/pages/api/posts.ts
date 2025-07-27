import { SanityCategoriesService, SanityPostsService } from '@/cms/sanity/services'
import type { APIRoute } from 'astro'
import { AstroApiRoute, AstroHttp } from 'src/api/astro'
import { CreatePostController } from 'src/api/controllers'

export const POST: APIRoute = async (context) => {
  const apiRoute = AstroApiRoute(async () => {
    const http = await AstroHttp(context)
    const postsService = SanityPostsService()
    const categoriesService = SanityCategoriesService()
    const controller = CreatePostController(postsService, categoriesService)
    return controller.handle(http)
  })

  return apiRoute.run()
}
