import { sanityClient } from 'sanity:client'

import type { CategoriesService } from '@/core/interfaces'
import type { Category } from '@/core/types'

export const SanityCategoriesService = (): CategoriesService => {
  return {
    async fetchAllCategories() {
      return await sanityClient.fetch<Category[]>(
        `*[_type == "category"] |
        order(_createdAt desc)
        {
          name      
        }`,
      )
    },
  }
}
