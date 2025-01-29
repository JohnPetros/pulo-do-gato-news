export type Post = {
  id: string
  slug: string
  name: string
  content: any
  author: string
  category: { name: string }
  image: string
  date: string
  readingTime: number
}
