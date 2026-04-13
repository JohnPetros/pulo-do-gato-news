import type { CategoriesService, PostsCollection } from '@/core/interfaces'
import type { Http } from '@/core/interfaces/http'
import type { PostDraft } from '@/core/types/post-draft'

const AUTHOR = 'Milena Oliveira'

export const CreatePostController = (
  PostsCollection: PostsCollection,
  categoriesService: CategoriesService,
) => {
  return {
    async handle(http: Http) {
      const title = await http.getFormValue('title')
      const content = await http.getFormValue('content')
      const categoryName = await http.getFormValue('category')
      const tags = await http.getFormArray('tags')
      const readingTime = await http.getFormValue('readingTime')

      const category = await categoriesService.fetchCategoryByName(categoryName)

      const post: PostDraft = {
        name: title,
        content,
        tags,
        author: AUTHOR,
        category: category,
        isAvailable: false,
        readingTime: Number(readingTime),
        date: new Date().toISOString(),
      }

      await PostsCollection.createPost(post)

      return http.send({
        message: 'Post created successfully',
      })
    },
  }
}
