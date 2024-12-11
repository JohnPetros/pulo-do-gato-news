import type { ApiResponse } from '@/core/responses'
import { ActionError } from 'astro:actions'

export function throwApiError(apiResponse: ApiResponse) {
  console.error('Action Api Error', apiResponse.errorMessage)

  switch (apiResponse.statusCode) {
    case 400:
      throw new ActionError({ code: 'UNAUTHORIZED', message: apiResponse.errorMessage })
    case 404:
      throw new ActionError({ code: 'NOT_FOUND', message: apiResponse.errorMessage })
    case 500:
      throw new ActionError({
        code: 'INTERNAL_SERVER_ERROR',
        message: apiResponse.errorMessage,
      })
    default:
      throw new ActionError({
        code: 'INTERNAL_SERVER_ERROR',
        message: apiResponse.errorMessage,
      })
  }
}
