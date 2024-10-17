import type { APIRoute } from 'astro'
import { AstroHttp } from 'src/api/astro'
import { SubscribeController } from 'src/api/controllers'
import { subscriptionsService } from 'src/cms'

export const POST: APIRoute = async ({ request, redirect }) => {
  const http = AstroHttp({ request, redirect })
  const controller = SubscribeController(subscriptionsService)

  return controller.handle(http)
}
