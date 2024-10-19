import type { ActionResponse } from '../responses'
import type { Comment } from '../types'

export interface Server {
  redirect(route: string): void
  throwInternalError(message: string): void
  commentAction(formData: FormData): Promise<ActionResponse<Comment>>
}
