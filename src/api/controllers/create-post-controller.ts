import { ENV } from '@/constants/env'
import { HTTP_HEADERS } from '@/constants/http-headers'
import { HTTP_STATUS_CODE } from '@/constants/http-status-code'
import type { CategoriesService, PostsCollection } from '@/core/interfaces'
import type { Http } from '@/core/interfaces/http'
import type { PostDraft } from '@/core/types/post-draft'

const AUTHOR = 'Milena Oliveira'

type Schema = {
  body: {
    title: string
    content: string
    category: string
    tags: string[]
    readingTime: number
  }
}

export const CreatePostController = (
  postsCollection: PostsCollection,
  categoriesService: CategoriesService,
) => {
  return {
    async handle(http: Http<Schema>) {
      if (
        http.getHeader(HTTP_HEADERS.XPuloDoGatoNewsApiKey) !== ENV.puloDoGatoNewsApiKey
      ) {
        return http.send(
          {
            message: 'Unauthorized',
          },
          HTTP_STATUS_CODE.unauthorized,
        )
      }

      const { title, content, category: categoryName, tags, readingTime } = await http.getBody()

      const category = await categoriesService.fetchCategoryByName(categoryName)

      const post: PostDraft = {
        name: title,
        content,
        tags,
        author: AUTHOR,
        category: category,
        isAvailable: false,
        readingTime,
        date: new Date().toISOString(),
      }

      await postsCollection.createPost(post)

      return http.send({
        message: 'Post created successfully',
      })
    },
  }
}
