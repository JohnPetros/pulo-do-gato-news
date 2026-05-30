import { AxiosApiClient } from '@/api/axios'

const apiClient = AxiosApiClient('')

export function useApi() {
  return apiClient
}
