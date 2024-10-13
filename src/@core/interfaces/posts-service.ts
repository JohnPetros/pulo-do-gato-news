import type { Post } from '../types'

export interface PostsService {
  fetchLastPosts(): Promise<Post[]>
  fetchPostSlugs(): Promise<string[]>
  fetchPostBySlug(slug: string): Promise<Post>
  fetchPosts(categoryName?: string, search?: string): Promise<Post[]>
}
