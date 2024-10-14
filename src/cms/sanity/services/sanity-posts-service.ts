import { sanityClient } from 'sanity:client'

import type { PostsService } from '@/core/interfaces'
import type { Post } from '@/core/types'

export const SanityPostsService = (): PostsService => {
  return {
    async fetchPosts(categoryName: string, search: string) {
      const categoryFilter =
        categoryName && categoryName !== 'all' ? '&& category == $category' : ''
      const searchFilter = search
        ? '&& lower(name) match $search || array::join(tags, " ") match $search'
        : ''

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
          ...(search && { search: search.toLocaleLowerCase() }),
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
