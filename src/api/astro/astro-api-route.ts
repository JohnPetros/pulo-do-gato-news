import type { APIContext, APIRoute } from 'astro'
import { ZodError } from 'zod'

export const AstroApiRoute = (
  apiRoute: (context: APIContext) => Promise<Response>,
): APIRoute => {
  return async (context: APIContext) => {
    try {
      return await apiRoute(context)
    } catch (error) {
      console.error('AstroApiRoute error', error)
      if (error instanceof ZodError) {
        return new Response(
          JSON.stringify({
            title: 'Zod Validation Error',
            ...error.errors,
          }),
          { status: 500 },
        )
      }
      return new Response(
        JSON.stringify({
          title: (error as Error).name,
          message: (error as Error).message,
        }),
        { status: 500 },
      )
    }
  }
}
