import { ActionResponse } from '@/core/responses'
import type { ActionError } from 'astro:actions'

export const AstroActionError = <Data>(error: ActionError) => {
  switch (error.code) {
    case 'INTERNAL_SERVER_ERROR':
      return new ActionResponse<Data>({
        error: { type: 'internal', message: error.message },
      })
    default:
      return new ActionResponse<Data>({
        error: { type: 'internal', message: error.message },
      })
  }
}
