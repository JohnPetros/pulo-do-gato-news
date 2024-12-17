import type { APIRoute } from 'astro'
import { AstroApiRoute, AstroHttp } from 'src/api/astro'
import { SubscribeController } from 'src/api/controllers'
import { subscriptionsService } from 'src/cms'

export const POST: APIRoute = async ({ request, redirect }) => {
  const apiRoute = AstroApiRoute(async () => {
    const http = AstroHttp({
      request,
      redirect,
    })
    const controller = SubscribeController(subscriptionsService)
    return controller.handle(http)
  })

  return apiRoute.run()
}
