import type { Post, PostImage } from '../types'

type PostListParams = {
  category: string | null
  search: string | null
  page: number
  itemsPerPage: number
}

export interface PostsService {
  fetchLastPost(): Promise<Post>
  fetchLastPosts(): Promise<Post[]>
  fetchPostSlugs(): Promise<string[]>
  fetchPostBySlug(slug: string): Promise<Post>
  fetchPosts(params: PostListParams): Promise<{ posts: Post[]; count: number }>
  createPost(post: Omit<Post, 'id' | 'slug'>, image: PostImage): Promise<void>
}
