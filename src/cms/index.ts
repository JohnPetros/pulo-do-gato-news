import { AxiosApiClient } from 'src/api/axios'
import {
  SanityPostsCollection,
  SanityCategoriesCollection,
  SanitySubscriptionsCollection,
  SanityCommentsCollection,
  SanityColumnsCollection,
} from './sanity/collections'
import { ENV } from '../constants'

const apiClient = AxiosApiClient(
  `https://${ENV.sanityProjectId}.api.sanity.io/v2021-06-07/data`,
)
apiClient.setHeader('Authorization', `Bearer ${ENV.sanityApiToken}`)

export const PostsCollection = SanityPostsCollection()
export const categoriesService = SanityCategoriesCollection()
export const commentsService = SanityCommentsCollection(apiClient)
export const columnsService = SanityColumnsCollection(apiClient)
export const subscriptionsService = SanitySubscriptionsCollection(apiClient)
