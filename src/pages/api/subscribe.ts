import type { APIRoute } from 'astro'
import { AstroHttp } from 'src/api/astro'
import { SubscribeController } from 'src/api/controllers'

export const POST: APIRoute = async ({ request, redirect }) => {
  const http = AstroHttp({ request, redirect })
  const controller = SubscribeController()

  return controller.handle(http)
}
