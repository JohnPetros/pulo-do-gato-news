import {
  SanityCategoriesCollection,
  SanityPostsCollection,
} from '@/cms/sanity/collections'
import type { APIRoute } from 'astro'
import { z } from 'astro:schema'
import { AstroApiRoute, AstroHttp } from 'src/api/astro'
import { CreatePostController } from 'src/api/controllers'

const schema = z.object({
  body: z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    category: z.string().min(1),
    tags: z.array(z.string()).min(1),
    readingTime: z.number().positive(),
  }),
})

type Schema = z.infer<typeof schema>

export const POST: APIRoute = AstroApiRoute(async (context) => {
  const http = await AstroHttp<Schema>({ context, schema })
  const postsCollection = SanityPostsCollection()
  const categoriesService = SanityCategoriesCollection()
  const controller = CreatePostController(postsCollection, categoriesService)
  return controller.handle(http)
})
