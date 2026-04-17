import type { Post } from '../types'
import type { PostDraft } from '../types/post-draft'
import type { PostImage } from '../types/post-image'

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
  updatePostContent(postId: string, content: string): Promise<boolean>
  updatePostTitle(postId: string, title: string): Promise<boolean>
  updatePostReviewStatus(postId: string, isReviewed: boolean): Promise<boolean>
  updatePostImage(postId: string, postImage: PostImage): Promise<boolean>
}
