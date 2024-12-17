export type HttpSchema = {
  body?: unknown
  routeParams?: unknown
  queryParams?: unknown
}

export interface Http<Schema extends HttpSchema = HttpSchema> {
  getFormData(key: string, fallback?: string): Promise<string>
  getBody(): Promise<Schema['body']>
  getRouteParams(): Promise<Schema['routeParams']>
  getQueryParams(): Promise<Schema['queryParams']>
  send(data: unknown, statusCode?: number): Promise<Response>
  redirect(route: string): Promise<Response>
}
