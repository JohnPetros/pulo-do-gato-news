import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { sendColumnAction } from './send-coloumn-action'
import { sendCommentAction } from './send-comment-action'

export const server = {
  sendComment: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string({ message: 'Nome é obrigatório' }),
      email: z.string({ message: 'E-mail é obrigatório' }).email(),
      content: z.string({ message: 'Conteúdo é obrigatório' }),
      postId: z.string(),
    }),
    handler: sendCommentAction,
  }),
  sendColumn: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string({ message: 'Nome é obrigatório' }),
      email: z.string({ message: 'E-mail é obrigatório' }).email(),
      content: z.string({ message: 'Conteúdo é obrigatório' }),
    }),
    handler: sendColumnAction,
  }),
}
