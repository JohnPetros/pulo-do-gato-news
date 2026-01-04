import type { Controller, Http } from '@/core/interfaces'

import { HTTP_HEADERS } from '@/constants/http-headers'

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https://cdn.sanity.io https://www.googletagmanager.com",
  "connect-src 'self' https://*.api.sanity.io https://www.google-analytics.com https://stats.g.doubleclick.net",
  "object-src 'none'",
  "base-uri 'self'",
].join('; ')

export const SetSecurityHeadersController = (): Controller => {
  return {
    async handle(http: Http) {
      http.setHeader(HTTP_HEADERS.ContentSecurityPolicy, CSP)
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
