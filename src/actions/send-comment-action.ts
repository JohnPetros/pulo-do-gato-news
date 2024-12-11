import { commentsService } from '../cms'
import { throwApiError } from './utils/throw-api-error'

type Request = {
  name: string
  email: string
  content: string
  postId: string
}

export async function sendCommentAction({ name, email, content, postId }: Request) {
  const comment = {
    name,
    email,
    content,
    postId,
    date: new Date(),
  }

  const response = await commentsService.registerComment(comment)
  if (response.isFailure) throwApiError(response)

  return comment
}
