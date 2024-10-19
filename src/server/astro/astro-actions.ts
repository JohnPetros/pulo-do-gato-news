import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'

import { CommentAction } from '../actions'
import { AstroServer } from './astro-server'

const astroServer = AstroServer()
export const commentAction = CommentAction(astroServer)

export const astroActions = {
  comment: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string({ message: 'Nome é obrigatório' }),
      email: z.string({ message: 'E-mail é obrigatório' }).email(),
      content: z.string({ message: 'Conteúdo é obrigatório' }),
      postId: z.string(),
    }),
    handler: commentAction.handle,
  }),
}
