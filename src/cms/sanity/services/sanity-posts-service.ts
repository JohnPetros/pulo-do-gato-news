import { sanityClient } from 'sanity:client'

import type { PostsService } from '@/core/interfaces'
import type { Post } from '@/core/types'

export const SanityPostsService = (): PostsService => {
  return {
    async getLastPosts() {
      const sanityPosts = await sanityClient.fetch(`
        *[_type == "post"] | order(_createdAt desc)
        {
          name,
          "slug": slug.current,
          date,
          category,
          tags,
          author,
          content,
          "image": image.asset->url
        }
        [0..3]
        `)
      return sanityPosts as Post[]
    },

    async getPostSlugs() {
      const sanitySlugs = await sanityClient.fetch(
        '*[_type == "post"]{"slug": slug.current}',
      )
      return (sanitySlugs as { slug: string }[]).map(({ slug }) => slug)
    },

    async getPostBySlug(slug: string) {
      const sanityPost = await sanityClient.fetch(
        `*[_type == "post" && slug.current == $slug][0]
        {
          name,
          "slug": slug.current,
          date,
          category,
          tags,
          author,
          content,
          "image": image.asset->url
        }
        `,
        { slug },
      )

      return sanityPost as Post
    },
  }
}
