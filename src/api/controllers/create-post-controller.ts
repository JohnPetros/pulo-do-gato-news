import type { CategoriesService, PostsService } from '@/core/interfaces'
import type { Http } from '@/core/interfaces/http'
import type { Post, PostImage } from '@/core/types'

const AUTHOR = 'Milena Oliveira'

export const CreatePostController = (
  postsService: PostsService,
  categoriesService: CategoriesService,
) => {
  return {
    async handle(http: Http) {
      const title = await http.getFormValue('title')
      const content = await http.getFormValue('content')
      const categoryName = await http.getFormValue('category')
      const tags = await http.getFormArray('tags')
      const readingTime = await http.getFormValue('readingTime')
      const imageAlt = await http.getFormValue('imageAlt')
      const image = await http.getFormFile('image')

      console.log({ title, content, categoryName, tags, readingTime, imageAlt, image })

      const category = await categoriesService.fetchCategoryByName(categoryName)
      console.log({ category })

      const post: Omit<Post, 'id' | 'slug'> = {
        name: title,
        content,
        tags,
        image: {
          url: image.name,
          alt: imageAlt,
        },
        author: AUTHOR,
        category: category,
        readingTime: Number(readingTime),
        date: new Date().toISOString(),
      }
      const postImage: PostImage = {
        file: image,
        alt: imageAlt,
      }

      await postsService.createPost(post, postImage)

      return http.send({
        message: 'Post created successfully',
      })
    },
  }
}
