import { HTTP_STATUS_CODE } from '@/constants/http-status-code'
import type { NewsAiService, PostsService } from '@/core/interfaces'
import type { Http } from '@/core/interfaces/http'

const POST_CATEGORIES = [
  'economia',
  'politica',
  'tecnologia',
  'cultura',
  'educação',
  'esportes',
]

export const GeneratePostController = (
  postsService: PostsService,
  newsAiService: NewsAiService,
) => {
  return {
    async handle(http: Http) {
      const lastPost = await postsService.fetchLastPost()
      let postCategoryIndex = POST_CATEGORIES.findIndex(
        (category) => category === lastPost.category.name.toLowerCase(),
      )
      if (postCategoryIndex === -1) {
        return http.send(
          {
            message: 'Category not found',
          },
          HTTP_STATUS_CODE.internalServerError,
        )
      }
      if (postCategoryIndex === POST_CATEGORIES.length - 1) {
        postCategoryIndex = 0
      } else {
        postCategoryIndex++
      }
      const postCategory = POST_CATEGORIES[postCategoryIndex]
      const response = await newsAiService.generatePost(postCategory)
      if (response.isFailure) response.throwError()

      return http.send({
        message: 'Post generated successfully',
      })
    },
  }
}
