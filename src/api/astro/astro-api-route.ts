import { ZodError } from 'astro:schema'

export function AstroApiRoute(apiRoute: () => Promise<Response>) {
  return {
    handleApiError(error: unknown) {
      if (error instanceof ZodError) {
        const schemaErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }))

        return new Response(
          JSON.stringify({
            title: 'Validation Error',
            message: 'Invalid schema',
            schemaErrors,
          }),
          { status: 400 },
        )
      }

      return new Response(
        JSON.stringify({
          title: (error as Error).name,
          message: (error as Error).message,
        }),
        { status: 500 },
      )
    },

    async run() {
      try {
        return await apiRoute()
      } catch (error) {
        return this.handleApiError(error)
      }
    },
  }
}
