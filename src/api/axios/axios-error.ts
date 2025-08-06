import { ApiResponse } from '@/core/responses'
import { isAxiosError } from 'axios'

export const AxiosError = <Response>(error: unknown) => {
  console.error('Axios error', error)
  if (isAxiosError(error)) {
    return new ApiResponse<Response>({
      errorMessage: error.message,
      statusCode: error.status,
    })
  }

  return new ApiResponse<Response>({ errorMessage: 'Unkown api error', statusCode: 500 })
}
