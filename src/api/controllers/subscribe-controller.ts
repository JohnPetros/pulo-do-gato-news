import { EMAIL_REGEX } from '@/constants/email-regex'
import type { Http } from '@/core/interfaces/http'

export const SubscribeController = () => {
  return {
    async handle(http: Http) {
      const email = await http.getFormData('email')
      const pageOrigin = await http.getFormData('page-origin', '/')

      const isValidEmail = EMAIL_REGEX.test(email)
      if (!isValidEmail) {
        return http.redirect(`${pageOrigin}?subscribe-error=email`)
      }

      return http.redirect(pageOrigin)
    },
  }
}

// joaopcarvalho.cds@gmail.com
