import type { APIRoute } from 'astro'
import { AstroHttp } from 'src/api/astro'

export const POST: APIRoute = async ({ request, redirect }) => {
  const http = AstroHttp({ request, redirect })

  return http.send({
    name: 'oi',
  })
}
