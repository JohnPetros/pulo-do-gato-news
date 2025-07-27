import type { APIRoute } from 'astro'
import { AstroApiRoute, AstroHttp } from 'src/api/astro'
import { SubscribeController } from 'src/api/controllers'
import { subscriptionsService } from 'src/cms'

export const POST: APIRoute = async (context) => {
  const apiRoute = AstroApiRoute(async () => {
    const http = await AstroHttp(context)
    const controller = SubscribeController(subscriptionsService)
    return controller.handle(http)
  })

  return apiRoute.run()
}
