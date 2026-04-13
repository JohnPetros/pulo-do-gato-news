import type { Post } from '../types'
import type { PostDraft } from '../types/post-draft'

type PostListParams = {
  category: string | null
  search: string | null
  page: number
  itemsPerPage: number
}

export interface PostsCollection {
  fetchLastPost(): Promise<Post>
  fetchLastPosts(): Promise<Post[]>
  fetchPostSlugs(): Promise<string[]>
  fetchPostBySlug(slug: string): Promise<Post>
  fetchPosts(params: PostListParams): Promise<{ posts: Post[]; count: number }>
  createPost(postDraft: PostDraft): Promise<void>
}
