import type { Controller, Http } from '@/core/interfaces'

import { HTTP_HEADERS } from '@/constants/http-headers'

export const SetSecurityHeadersController = (): Controller => {
  return {
    async handle(http: Http) {
      http.setHeader(
        HTTP_HEADERS.StrictTransportSecurity,
        'max-age=31536000; includeSubDomains; preload',
      )
      http.setHeader(HTTP_HEADERS.XFrameOptions, 'SAMEORIGIN')
      http.setHeader(HTTP_HEADERS.XContentTypeOptions, 'nosniff')
      http.setHeader(HTTP_HEADERS.ReferrerPolicy, 'no-referrer-when-downgrade')
      http.setHeader(
        HTTP_HEADERS.PermissionsPolicy,
        'camera=(), microphone=(), geolocation=(), usb=(), payment=()',
      )
      return http.next()
    },
  }
}
