import { ApiResponse } from '@/core/responses'
import { isAxiosError } from 'axios'

export const AxiosError = <Response>(error: unknown) => {
  if (isAxiosError(error)) {
    console.error('Axios error', error.response?.data)
    return new ApiResponse<Response>({
      errorMessage: error.message,
      statusCode: error.status,
    })
  }

  return new ApiResponse<Response>({ errorMessage: 'Unkown api error', statusCode: 500 })
}
