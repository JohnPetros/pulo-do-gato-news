import { sanityClient } from 'sanity:client'

import type { PostsService } from '@/core/interfaces'
import type { Post } from '@/core/types'

export const SanityPostsService = (): PostsService => {
  return {
    async fetchPosts(categoryName?: string, search?: string) {
      const categoryFilter = categoryName ? '&& category == $category[0]' : ''
      const searchFilter = search ? '&& name == $name[0]' : ''

      const sanityPosts = await sanityClient.fetch(
        `
        *[_type == "post" ${categoryFilter} ${searchFilter}] | 
        order(_createdAt desc)
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
        {
          ...(categoryName && { category: categoryName }),
          ...(search && { name: search }),
        },
      )
      return sanityPosts as Post[]
    },

    async fetchLastPosts() {
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

    async fetchPostSlugs() {
      const sanitySlugs = await sanityClient.fetch(
        '*[_type == "post"]{"slug": slug.current}',
      )
      return (sanitySlugs as { slug: string }[]).map(({ slug }) => slug)
    },

    async fetchPostBySlug(slug: string) {
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
