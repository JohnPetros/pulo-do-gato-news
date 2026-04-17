import type { APIRoute } from 'astro'
import { z } from 'astro:schema'

import { UpdatePostImageController } from '@/api/controllers'
import { SanityPostsCollection } from '@/cms/sanity/collections'
import { AstroApiRoute, AstroHttp } from 'src/api/astro'

const schema = z.object({
  routeParams: z.object({
    postId: z.string(),
  }),
})

type Schema = z.infer<typeof schema>

export const PATCH: APIRoute = AstroApiRoute(async (context) => {
  const http = await AstroHttp<Schema>({ context, schema })
  const postsCollection = SanityPostsCollection()
  const controller = UpdatePostImageController(postsCollection)
  return controller.handle(http)
})
