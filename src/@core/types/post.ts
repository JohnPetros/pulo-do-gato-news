import type { Category } from './category'

export type Post = {
  id: string
  slug: string
  name: string
  content: any
  author: string
  category: Category
  image: string
  date: string
  tags: string[]
  readingTime: number
}
