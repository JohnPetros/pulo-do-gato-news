import { defineMiddleware, sequence } from 'astro:middleware'
import { AstroHttp } from './api/astro'
import { SetSecurityHeadersController } from './api/controllers'

const SetSecurityHeadersMiddleware = defineMiddleware(async (context, next) => {
  const http = await AstroHttp({ context, next })
  const constroller = SetSecurityHeadersController()
  return constroller.handle(http)
})

export const onRequest = sequence(SetSecurityHeadersMiddleware)
