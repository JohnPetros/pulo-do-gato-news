import { HTTP_STATUS_CODE } from '@/constants/http-status-code'
import type { PostsService } from '@/core/interfaces'
import type { Http } from '@/core/interfaces/http'

const POST_CATEGORIES = [
  'economia',
  'política',
  'tecnologia',
  'cultura',
  'educação',
  'esportes',
]

export const GetNextPostCategoryController = (service: PostsService) => {
  return {
    async handle(http: Http) {
      const lastPost = await service.fetchLastPost()
      console.log(lastPost.name)
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

      return http.send({
        category: postCategory,
      })
    },
  }
}
