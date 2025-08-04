import { useMemo } from 'react'

import { AxiosApiClient } from '@/api/axios'
import { SanityCommentsService } from '@/cms/sanity/services/sanity-comments-service'
import { ENV } from '../constants'

const apiClient = AxiosApiClient(
  `https://${ENV.sanityProjectId}.api.sanity.io/v2021-06-07/data`,
)
apiClient.setHeader('Authorization', `Bearer ${ENV.sanityApiToken}`)

export function useCms() {
  return useMemo(
    () => ({
      commentsService: SanityCommentsService(apiClient),
    }),
    [],
  )
}
