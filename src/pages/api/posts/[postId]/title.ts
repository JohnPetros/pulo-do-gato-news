import type { APIRoute } from 'astro'
import { z } from 'astro:schema'

import { UpdatePostTitleController } from '@/api/controllers'
import { SanityPostsCollection } from '@/cms/sanity/collections'
import { AstroApiRoute, AstroHttp } from 'src/api/astro'

const schema = z.object({
  routeParams: z.object({
    postId: z.string(),
  }),
  body: z.object({
    title: z.string().min(1),
  }),
})

type Schema = z.infer<typeof schema>

export const PATCH: APIRoute = AstroApiRoute(async (context) => {
  const http = await AstroHttp<Schema>({ context, schema })
  const postsCollection = SanityPostsCollection()
  const controller = UpdatePostTitleController(postsCollection)
  return controller.handle(http)
})
