import type { Post } from '../types'

type PostListParams = {
  category: string | null
  search: string | null
  page: number
  itemsPerPage: number
}

export interface PostsService {
  fetchLastPosts(): Promise<Post[]>
  fetchPostSlugs(): Promise<string[]>
  fetchPostBySlug(slug: string): Promise<Post>
  fetchPosts(params: PostListParams): Promise<{ posts: Post[]; count: number }>
}
