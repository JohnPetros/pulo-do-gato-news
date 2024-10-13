import type { Post } from '../types'

export interface PostsService {
  getLastPosts(): Promise<Post[]>
}
