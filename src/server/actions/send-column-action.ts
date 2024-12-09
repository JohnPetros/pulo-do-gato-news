import { columnsService } from '@/cms/index'
import type { Server } from '@/core/interfaces'

type Request = {
  name: string
  email: string
  content: string
}

export const SendColumnAction = (server: Server) => {
  return {
    async handle({ name, email, content }: Request) {
      const column = {
        name,
        email,
        content,
      }

      console.log({ column })

      const response = await columnsService.registerColumn(column)

      if (response.isFailure) {
        server.throwInternalError('Erro ao registrar o seu comentário')
      }
    },
  }
}
