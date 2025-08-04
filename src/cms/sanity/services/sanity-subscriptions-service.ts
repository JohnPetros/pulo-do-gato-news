import type { ApiClient, SubscriptionsService } from '@/core/interfaces'
import { ApiResponse } from '@/core/responses'
import { ENV } from '@/constants/env'

export const SanitySubscriptionsService = (
  apiClient: ApiClient,
): SubscriptionsService => {
  return {
    async fetchSubsctiptionByEmail(email: string) {
      type SanitySubscription = {
        result: { email: string } | null
      }

      const query = `*[_type == "subscription" && email == "${email}"][0]{ email }`

      const response = await apiClient.get<SanitySubscription>(
        `query/${ENV.sanityDataset}?query=${encodeURIComponent(query)}`,
      )

      if (!response.body.result) return new ApiResponse({ body: null })

      return new ApiResponse({ body: response.body.result.email })
    },

    async registerSubscription(email: string) {
      const apiResponse = await apiClient.post(`/mutate/${ENV.sanityDataset}`, {
        mutations: [
          {
            create: {
              _type: 'subscription',
              email,
            },
          },
        ],
      })

      return apiResponse
    },
  }
}
