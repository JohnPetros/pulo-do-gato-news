import type { Post } from '../types'

export interface PostsService {
  fetchLastPosts(): Promise<Post[]>
  fetchPostSlugs(): Promise<string[]>
  fetchPostBySlug(slug: string): Promise<Post>
  fetchPosts(categoryName: string | null, search: string | null): Promise<Post[]>
}
