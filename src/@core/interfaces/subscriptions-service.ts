import type { ApiResponse } from '../responses'

export interface SubscriptionsService {
  fetchSubsctiptionByEmail(email: string): Promise<ApiResponse<string | null>>
  registerSubscription(email: string): Promise<ApiResponse<void>>
}
