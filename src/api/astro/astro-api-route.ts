export function AstroApiRoute(apiRoute: () => Promise<Response>) {
  return {
    handleApiError(error: unknown) {
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
