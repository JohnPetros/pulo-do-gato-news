import type { Post } from '../types'

export interface PostsService {
  getLastPosts(): Promise<Post[]>
  getPostSlugs(): Promise<string[]>
  getPostBySlug(slug: string): Promise<Post>
}
