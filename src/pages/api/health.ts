import type { APIRoute } from 'astro'
import { AstroApiRoute, AstroHttp } from 'src/api/astro'

export const GET: APIRoute = async (context) => {
  const apiRoute = AstroApiRoute(async () => {
    const http = await AstroHttp(context)
    return http.send({ message: 'healthy' })
  })

  return apiRoute.run()
}
