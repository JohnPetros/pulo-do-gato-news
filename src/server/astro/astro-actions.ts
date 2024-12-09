import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'

import { CommentAction } from '../actions'
import { AstroServer } from './astro-server'
import { SendColumnAction } from '../actions/send-column-action'

const astroServer = AstroServer()
export const commentAction = CommentAction(astroServer)
export const sendColumnAction = SendColumnAction(astroServer)

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
  sendColumn: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string({ message: 'Nome é obrigatório' }),
      email: z.string({ message: 'E-mail é obrigatório' }).email(),
      content: z.string({ message: 'Conteúdo é obrigatório' }),
    }),
    handler: sendColumnAction.handle,
  }),
}
