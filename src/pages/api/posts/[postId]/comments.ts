import type { APIRoute } from 'astro'
import { z } from 'astro:schema'

import { AxiosApiClient } from '@/api/axios'
import { FetchCommentsController } from '@/api/controllers'
import { ENV } from '@/constants/env'
import { SanityCommentsService } from '@/cms/sanity/services'
import { AstroApiRoute, AstroHttp } from 'src/api/astro'

const schema = z.object({
  routeParams: z.object({
    postId: z.string(),
  }),
  queryParams: z.object({
    page: z.coerce.number().default(1),
  }),
})

type Schema = z.infer<typeof schema>

export const GET: APIRoute = AstroApiRoute(async (context) => {
  const http = await AstroHttp<Schema>(context, schema)
  const restClient = AxiosApiClient(ENV.newsAiApiUrl)
  const commentsService = SanityCommentsService(restClient)
  const controller = FetchCommentsController(commentsService)
  return controller.handle(http)
})
