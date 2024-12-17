import type { ValidRedirectStatus } from 'astro'

import type { Http, HttpSchema } from '@/core/interfaces/http'

type AstroHttpProps = {
  request: Request
  schema?: HttpSchema
  redirect: (path: string, status?: ValidRedirectStatus) => Response
}

export const AstroHttp = <AstroSchema extends HttpSchema>({
  request,
  schema,
  redirect,
}: AstroHttpProps): Http<AstroSchema> => {
  let formData: FormData

  return {
    async getFormData(key, fallback = '') {
      if (!formData) formData = await request.formData()
      return formData.get(key)?.toString() ?? fallback
    },

    async getBody() {
      if (!schema?.body) throw Error()

      return schema.body
    },

    async getRouteParams() {
      if (!schema?.routeParams) throw Error()

      return schema.routeParams
    },

    async getQueryParams() {
      if (!schema?.queryParams) throw Error()

      return schema.queryParams
    },

    async redirect(route) {
      return redirect(route)
    },

    async send(data: unknown, statusCode = 200) {
      return new Response(JSON.stringify(data), {
        status: statusCode,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    },
  }
}
