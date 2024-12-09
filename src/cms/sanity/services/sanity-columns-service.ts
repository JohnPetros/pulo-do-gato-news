import { htmlToBlocks } from '@sanity/block-tools'

import type { ApiClient, ColumnsService } from '@/core/interfaces'
import type { Column } from '@/core/types'
import { ENV } from '@/constants/env'

export const SanityColumnsService = (apiClient: ApiClient): ColumnsService => {
  return {
    async registerColumn(column: Column) {
      const apiResponse = await apiClient.post(`/mutate/${ENV.sanityDataset}`, {
        mutations: [
          {
            create: {
              _type: 'column',
              name: column.name,
              email: column.email,
              content: '',
            },
          },
        ],
      })

      return apiResponse
    },
  }
}
