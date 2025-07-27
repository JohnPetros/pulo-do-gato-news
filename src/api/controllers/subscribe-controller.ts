import type { SubscriptionsService } from '@/core/interfaces'
import type { Http } from '@/core/interfaces/http'
import { EMAIL_REGEX } from '@/constants/email-regex'

export const SubscribeController = (service: SubscriptionsService) => {
  return {
    async handle(http: Http) {
      const email = await http.getFormValue('email')
      const pageOrigin = await http.getFormValue('page-origin', '/')

      const isValidEmail = EMAIL_REGEX.test(email)
      if (!isValidEmail) {
        return http.redirect(`${pageOrigin}?subscribe-error=invalidEmail`)
      }

      const emailReponse = await service.fetchSubsctiptionByEmail(email)

      if (emailReponse.isFailure) {
        return http.redirect(`${pageOrigin}?subscribe-error=server`)
      }

      const emailAlreadyExists = Boolean(emailReponse.body)

      if (emailAlreadyExists) {
        return http.redirect(`${pageOrigin}?subscribe-error=emailAlreasyExists`)
      }

      const subscriptionResponse = await service.registerSubscription(email)

      if (subscriptionResponse.isFailure) {
        return http.redirect(`${pageOrigin}?subscribe-error=server`)
      }

      return http.redirect(`${pageOrigin}?subscribe-success=success`)
    },
  }
}
