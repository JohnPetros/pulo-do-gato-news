import { commentsService } from '@/cms/index'
import type { Server } from '@/core/interfaces'

type Request = {
  name: string
  email: string
  content: string
  postId: string
}

export const CommentAction = (server: Server) => {
  return {
    async handle({ name, email, content, postId }: Request) {
      const comment = {
        name,
        email,
        content,
        postId,
        date: new Date(),
      }

      const response = await commentsService.registerComment(comment)

      if (response.isFailure) {
        server.throwInternalError('Erro ao registrar o seu comentário')
      }

      return comment
    },
  }
}
