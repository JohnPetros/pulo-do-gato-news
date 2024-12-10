import { Schema } from '@sanity/schema'
import { htmlToBlocks } from '@sanity/block-tools'

import type { ApiClient, ColumnsService } from '@/core/interfaces'
import type { Column } from '@/core/types'
import { ENV } from '@/constants/env'
import { schema } from '../schemas'

const compiledSchema = Schema.compile(schema)
const blockContentType = compiledSchema
  .get('column')
  .fields.find((field: any) => field.name === 'content').type

export const SanityColumnsService = (apiClient: ApiClient): ColumnsService => {
  return {
    async registerColumn(column: Column) {
      const { JSDOM } = await import('jsdom')

      const apiResponse = await apiClient.post(`/mutate/${ENV.sanityDataset}`, {
        mutations: [
          {
            create: {
              _type: 'column',
              name: column.name,
              email: column.email,
              content: htmlToBlocks(column.content, blockContentType, {
                parseHtml: (html: string) => new JSDOM(html).window.document,
              }),
            },
          },
        ],
      })

      return apiResponse
    },
  }
}
