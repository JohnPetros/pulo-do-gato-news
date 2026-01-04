import type { APIRoute } from 'astro'
import { AstroApiRoute, AstroHttp } from 'src/api/astro'

export const GET: APIRoute = AstroApiRoute(async (context) => {
  const http = await AstroHttp({ context })
  return http.send({ message: 'healthy' })
})
