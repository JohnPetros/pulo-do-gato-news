import { sanity } from '../sanity'

import type { CategoriesService } from '@/core/interfaces'
import type { Category } from '@/core/types'

export const SanityCategoriesService = (): CategoriesService => {
  return {
    async fetchAllCategories() {
      return await sanity.fetch<Category[]>(
        `*[_type == "category"] |
        order(_createdAt desc)
        {
          "id": _id,
          name      
        }`,
      )
    },

    async fetchCategoryByName(name: string) {
      return await sanity.fetch<Category>(
        `*[_type == "category" && name == $name] |
        order(_createdAt desc) [0]
        {
          "id": _id,
          name
        }`,
        { name },
      )
    },
  }
}
