import { sanityClient } from 'sanity:client'
import type { PostsService } from '../../../@core/interfaces'
import type { Post } from '../../../@core/types'

export const SanityPostsService = (): PostsService => {
  return {
    async getLastPosts() {
      const posts = await sanityClient.fetch(
        '*[_type == "post"] | order(_createdAt desc){"slug": slug.current, name, author, date, category, "image": image.asset->url, content}',
      )
      return posts as Post[]
    },
  }
}
