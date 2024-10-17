import Axios from 'axios'

import type { ApiClient } from '@/core/interfaces'
import { ApiResponse } from '@/core/responses'
import { AxiosError } from './axios-error'

export const AxiosApiClient = (baseUrl: string): ApiClient => {
  const axios = Axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return {
    async get<Response>(endpoint: string) {
      try {
        const response = await axios.get(endpoint)

        return new ApiResponse<Response>({
          body: response.data,
          statusCode: response.status,
        })
      } catch (error) {
        return AxiosError<Response>(error)
      }
    },

    async post(endpoint: string, body: unknown) {
      try {
        const response = await axios.post(endpoint, body)
        return new ApiResponse({
          statusCode: response.status,
        })
      } catch (error) {
        return AxiosError(error)
      }
    },

    setHeader(key, value) {
      axios.defaults.headers[key] = value
    },
  }
}
