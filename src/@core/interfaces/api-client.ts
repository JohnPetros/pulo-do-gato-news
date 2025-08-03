import type { ApiResponse } from '../responses'

export interface ApiClient {
  setHeader(key: string, value: string): void
  get<Reponse>(endpoint: string): Promise<ApiResponse<Reponse>>
  post<Reponse>(endpoint: string, body: unknown): Promise<ApiResponse<Reponse>>
}
