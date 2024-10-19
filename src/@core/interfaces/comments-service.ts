import type { ApiResponse } from '../responses'
import type { Comment } from '../types'

export interface CommentsService {
  registerComment(comment: Comment): Promise<ApiResponse<void>>
}
