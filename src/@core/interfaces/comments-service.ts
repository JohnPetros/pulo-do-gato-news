import type { ApiResponse } from '../responses'
import type { Comment } from '../types'

export interface CommentsService {
  fetchComments(
    postId: string,
    page: number,
  ): Promise<ApiResponse<{ comments: Comment[]; count: number }>>
  registerComment(comment: Omit<Comment, 'id'>): Promise<ApiResponse>
}
