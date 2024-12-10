import { sanityClient } from 'sanity:client'

import type { PostsService } from '@/core/interfaces'
import type { Post } from '@/core/types'

export const SanityPostsService = (): PostsService => {
  return {
    async fetchPosts({ category, search, page, itemsPerPage }) {
      const categoryFilter =
        category && category !== 'all' ? '&& category[0]->name == $category' : ''
      const searchFilter = search
        ? '&& lower(name) match $search || array::join(tags, " ") match $search'
        : ''

      const sanityPosts = await sanityClient.fetch<Post[]>(
        `
        *[_type == "post" ${categoryFilter} ${searchFilter}] |
        order(_createdAt desc)
        {
          "id": _id,
          name,
          "slug": slug.current,
          date,
          category,
          tags,
          author,
          content,
          "image": image.asset -> url,
          category[0] -> {
            name
          }
        }
        [${page - 1}..${page + itemsPerPage - 2}]
        `,
        {
          ...(category && { category }),
          ...(search && { search: search.toLocaleLowerCase() }),
        },
      )

      const count = await sanityClient.fetch(
        `
          count(*[_type == "post" ${categoryFilter} ${searchFilter}] | order(_createdAt desc))`,
        {
          ...(category && { category: category }),
          ...(search && { search: search.toLocaleLowerCase() }),
        },
      )

      return {
        posts: sanityPosts,
        count: Number(count),
      }
    },

    async fetchLastPosts() {
      const sanityPosts = await sanityClient.fetch(`
        *[_type == "post"] | order(_createdAt desc)
        {
          "_id": id,
          name,
          "slug": slug.current,
          date,
          category,
          tags,
          author,
          content,
          "image": image.asset->url,
          category[0] -> {
            name
          }
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
          "id": _id,
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
