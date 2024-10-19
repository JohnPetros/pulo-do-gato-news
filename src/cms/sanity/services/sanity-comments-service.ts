import { ENV } from '@/constants/env'
import type { ApiClient, CommentsService } from '@/core/interfaces'
import type { Comment } from '@/core/types'

export const SanityCommentsService = (apiClient: ApiClient): CommentsService => {
  return {
    async registerComment(comment: Comment) {
      const apiResponse = await apiClient.post(`/mutate/${ENV.sanityDataset}`, {
        mutations: [
          {
            create: {
              _type: 'comment',
              name: comment.name,
              email: comment.email,
              content: comment.content,
              post: {
                _type: 'reference',
                _ref: comment.postId,
              },
              createdAt: comment.date.toISOString(),
            },
          },
        ],
      })

      return apiResponse
    },
  }
}
