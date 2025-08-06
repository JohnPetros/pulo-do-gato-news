import { Schema } from '@sanity/schema'
import { htmlToBlocks } from '@sanity/block-tools'
import { JSDOM } from 'jsdom'
import { v4 as generateUuid } from 'uuid'

import { sanityClient } from '../client'

import type { PostsService } from '@/core/interfaces'
import type { Post, PostImage } from '@/core/types'
import { schema } from '../schemas'

const compiledSchema = Schema.compile(schema)
const blockContentType = compiledSchema
  .get('post')
  .fields.find((field: any) => field.name === 'content').type

export const SanityPostsService = (): PostsService => {
  return {
    async fetchPosts({ category, search, page, itemsPerPage }) {
      const categoryFilter =
        category && category !== 'all' ? '&& category[0]->name == $category' : ''
      const searchFilter = search
        ? '&& lower(name) match $search || array::join(tags, " ") match $search'
        : ''

      const sliceStart = (page - 1) * itemsPerPage

      const sanityPosts = await sanityClient.fetch<Post[]>(
        `
        *[_type == "post" && !(_id match "drafts.*") ${categoryFilter} ${searchFilter}] |
        order(_createdAt desc)
        {
          "id": _id,
          name,
          "slug": slug.current,
          date,
          readingTime,
          category,
          tags,
          author,
          content,
          "image": {
            "url": image.asset->url,
            "alt": image.alt
          },
          category[0] -> {
            name
          }
        }
        [${(page - 1) * itemsPerPage}..${sliceStart + itemsPerPage - 1}]
        `,
        {
          ...(category && { category }),
          ...(search && { search: search.toLocaleLowerCase() }),
        },
      )

      const count = await sanityClient.fetch(
        `
          count(*[_type == "post" && !(_id match "drafts.*") ${categoryFilter} ${searchFilter}] | order(_createdAt desc))`,
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
        *[_type == "post" && !(_id match "drafts.*")] | order(_createdAt desc)
        {
          "_id": id,
          name,
          "slug": slug.current,
          date,
          category,
          readingTime,
          tags,
          author,
          content,
          "image": {
            "url": image.asset->url,
            "alt": image.alt
          },
          category[0] -> {
            name
          }
        }
        [0..3]
        `)
      return sanityPosts as Post[]
    },

    async fetchLastPost() {
      const sanityPost = await sanityClient.fetch(
        `*[_type == "post" && !(_id match "drafts.*")] | order(_createdAt desc)
        {
          "_id": id,
          name,
          "slug": slug.current,
          date,
          category,
          readingTime,
          tags,
          author,
          content,
          "image": {
            "url": image.asset->url,
            "alt": image.alt
          },
          category[0] -> {
            name
          }
        }
        [0]`,
      )
      return sanityPost as Post
    },

    async fetchPostSlugs() {
      const sanitySlugs = await sanityClient.fetch(
        '*[_type == "post" && !(_id match "drafts.*")]{"slug": slug.current}',
      )
      return (sanitySlugs as { slug: string }[]).map(({ slug }) => slug).filter(Boolean)
    },

    async fetchPostBySlug(slug: string) {
      const sanityPost = await sanityClient.fetch(
        `*[_type == "post" && !(_id match "drafts.*") && slug.current == $slug][0]
        {
          "id": _id,
          name,
          "slug": slug.current,
          date,
          category,
          readingTime,
          tags,
          author,
          content,
          "image": {
            "url": image.asset->url,
            "alt": image.alt
          },
          category[0] -> {
            name
          }
        }
        `,
        { slug },
      )

      return sanityPost as Post
    },

    async createPost(post: Omit<Post, 'id' | 'slug'>, image: PostImage) {
      const id = generateUuid()
      const asset = await sanityClient.assets.upload(
        'image',
        Buffer.from(await image.file.arrayBuffer()),
        {
          filename: image.file.name,
          contentType: image.file.type,
        },
      )

      const postContent = htmlToBlocks(post.content, blockContentType, {
        parseHtml: (html: string) => new JSDOM(html).window.document,
      })

      await sanityClient.create({
        _id: 'drafts.'.concat(id),
        _type: 'post',
        name: post.name,
        content: postContent,
        tags: post.tags,
        author: post.author,
        date: post.date,
        readingTime: post.readingTime,
        category: [
          {
            _type: 'reference',
            _ref: post.category.id,
          },
        ],
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
          alt: image.alt,
        },
      })
    },
  }
}
