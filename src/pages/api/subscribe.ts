import type { APIRoute } from 'astro'
import { AstroApiRoute, AstroHttp } from 'src/api/astro'
import { SubscribeController } from 'src/api/controllers'
import { subscriptionsService } from 'src/cms'

export const POST: APIRoute = AstroApiRoute(async (context) => {
  const http = await AstroHttp(context)
  const controller = SubscribeController(subscriptionsService)
  return controller.handle(http)
})
