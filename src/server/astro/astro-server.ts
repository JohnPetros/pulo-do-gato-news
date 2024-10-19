import { ActionError, actions, isInputError } from 'astro:actions'
import { navigate } from 'astro:transitions/client'

import type { Server } from '@/core/interfaces'
import { ActionResponse } from '@/core/responses'
import { AstroActionError } from './astro-action-error'
import type { Comment } from '@/core/types'

export const AstroServer = (): Server => {
  return {
    async commentAction(formData: FormData) {
      const { data, error } = await actions.comment(formData)
      if (isInputError(error)) {
        return new ActionResponse({
          error: {
            type: 'form',
            name: error.fields.name?.join(', ') ?? '',
            email: error.fields.email?.join(', ') ?? '',
            content: error.fields.content?.join(', ') ?? '',
          },
        })
      }

      if (error) {
        return AstroActionError<Comment>(error)
      }

      console.log(data)

      return new ActionResponse({
        data,
      })
    },

    redirect(route: string) {
      navigate(route)
    },

    throwInternalError(message: string) {
      throw new ActionError({ code: 'INTERNAL_SERVER_ERROR', message })
    },
  }
}
