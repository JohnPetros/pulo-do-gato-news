import type { NewsAIPost } from '@/api/newsai/types'
import type { ApiResponse } from '../responses'

export interface NewsAiService {
  generatePost(postCategory: string): Promise<ApiResponse<NewsAIPost>>
}
