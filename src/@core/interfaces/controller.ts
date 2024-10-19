import type { Http } from './http'

export interface Controller {
  handle(http: Http): Promise<Response>
}
