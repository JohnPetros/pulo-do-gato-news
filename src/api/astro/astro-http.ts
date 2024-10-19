import type { ValidRedirectStatus } from 'astro'

import type { Http } from '@/core/interfaces/http'

type AstroHttpProps = {
  request: Request
  redirect: (path: string, status?: ValidRedirectStatus) => Response
}

export const AstroHttp = ({ request, redirect }: AstroHttpProps): Http => {
  let formData: FormData

  return {
    async getFormData(key, fallback = '') {
      if (!formData) formData = await request.formData()
      return formData.get(key)?.toString() ?? fallback
    },

    async getBodyData<Data>() {
      return request.body as Data
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
