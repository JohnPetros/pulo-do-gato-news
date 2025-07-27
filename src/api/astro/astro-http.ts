import type { APIContext } from 'astro'

import type { Http, HttpSchema } from '@/core/interfaces/http'
import type { ZodSchema } from 'astro:schema'

export const AstroHttp = async <AstroSchema extends HttpSchema>(
  context: APIContext,
  schema?: ZodSchema,
): Promise<Http<AstroSchema>> => {
  let formData: FormData
  let astroSchema: AstroSchema

  if (context.request && schema) {
    let body: HttpSchema['body']
    let queryParams: HttpSchema['queryParams']
    let routeParams: HttpSchema['routeParams']

    // @ts-ignore
    const keys = schema.keyof().options

    if (keys.includes('queryParams')) {
      queryParams = Object.fromEntries(
        context.request.url
          .split('?')[1]
          .split('&')
          .map((param) => param.split('=')),
      )
    }

    if (keys.includes('body')) {
      body = await context.request?.json()
    }

    astroSchema = schema.parse({ body, queryParams, routeParams })
  }

  return {
    async getFormValue(key, fallback = '') {
      if (!formData) formData = await context.request.formData()
      return formData.get(key)?.toString() ?? fallback
    },

    async getFormArray(key) {
      if (!formData) formData = await context.request.formData()
      const array = formData.getAll(`${key}[]`)
      return array.map((item) => item.toString())
    },

    async getFormFile(key) {
      if (!formData) formData = await context.request.formData()
      return formData.get(key) as File
    },

    async getBody() {
      if (!astroSchema?.body) throw Error()

      return astroSchema.body
    },

    async getRouteParams() {
      if (!astroSchema?.routeParams) throw Error()

      return astroSchema.routeParams
    },

    async getQueryParams() {
      if (!astroSchema?.queryParams) throw Error()

      return astroSchema.queryParams
    },

    async redirect(route) {
      return context.redirect(route)
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
