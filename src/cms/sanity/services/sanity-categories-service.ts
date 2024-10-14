import { sanityClient } from 'sanity:client'

import type { CategoriesService } from '@/core/interfaces'

export const SanityCategoriesService = (): CategoriesService => {
  return {
    async fetchAllCategories() {
      const sanityCategories = await sanityClient.fetch(
        'array::unique(*[_type == "post"].category)',
      )
      return (sanityCategories as string[]).map((category) => ({
        name: category,
      }))
    },
  }
}
