import { AxiosApiClient } from '@/api/axios'
import { ENV } from '../constants'

const apiClient = AxiosApiClient(ENV.appUrl)

export function useApi() {
  return apiClient
}
