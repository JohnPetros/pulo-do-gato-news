import type { Category } from './category'
import type { Image } from './image'

export type Post = {
  id: string
  slug: string
  name: string
  content: any
  author: string
  category: Category
  image: Image
  date: string
  tags: string[]
  readingTime: number
}
