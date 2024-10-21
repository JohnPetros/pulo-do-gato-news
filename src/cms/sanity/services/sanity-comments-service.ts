import { sanityClient } from 'sanity:client'

import type { ApiClient, CommentsService } from '@/core/interfaces'
import type { Comment } from '@/core/types'
import { ApiResponse } from '@/core/responses'
import { ENV } from '@/constants/env'

const ITEMS_PER_PAGE = 6

export const SanityCommentsService = (apiClient: ApiClient): CommentsService => {
  return {
    async fetchComments(postId: string, page: number) {
      const comments = await sanityClient.fetch(
        `*[_type == 'comment' && post._ref == $postId && isApproved == true] | order(date desc) 
      {
        "id": _id,
        name,
        content,
        date
      }
      [${page - 1}..${page + ITEMS_PER_PAGE - 2}]
      `,
        { postId },
      )

      const count = await sanityClient.fetch(
        "count(*[_type == 'comment' && post._ref == $postId && isApproved == true] | order(date desc))",
        { postId },
      )

      return new ApiResponse({
        body: {
          comments: comments as Comment[],
          count: Number(count),
        },
      })
    },

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
              date: comment.date.toISOString(),
            },
          },
        ],
      })

      return apiResponse
    },
  }
}
