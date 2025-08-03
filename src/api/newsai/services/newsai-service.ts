import type { NewsAiService as INewsAiService } from '@/core/interfaces'
import type { ApiClient } from '@/core/interfaces/api-client'

export const NewsAiService = (apiClient: ApiClient): INewsAiService => {
  return {
    async generatePost(postCategory: string) {
      return await apiClient.post('/post', {
        category: postCategory,
      })
    },
  }
}
