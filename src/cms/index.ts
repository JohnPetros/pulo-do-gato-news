import { AxiosApiClient } from 'src/api/axios'
import {
  SanityPostsService,
  SanityCategoriesService,
  SanitySubscriptionsService,
} from './sanity/services'
import { ENV } from '../constants'

const apiClient = AxiosApiClient(
  `https://${ENV.sanityProjectId}.api.sanity.io/v2021-06-07/data`,
)
apiClient.setHeader('Authorization', `Bearer ${ENV.sanityToken}`)

export const postsService = SanityPostsService()
export const categoriesService = SanityCategoriesService()
export const subscriptionsService = SanitySubscriptionsService(apiClient)
