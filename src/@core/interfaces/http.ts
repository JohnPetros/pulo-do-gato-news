export type HttpSchema = {
  body?: unknown
  routeParams?: unknown
  queryParams?: unknown
}

export interface Http<Schema extends HttpSchema = HttpSchema> {
  getFormValue(key: string, fallback?: string): Promise<string>
  getFormArray(key: string, fallback?: string): Promise<string[]>
  getFormFile(key: string): Promise<File>
  getBody(): Promise<Schema['body']>
  getRouteParams(): Promise<Schema['routeParams']>
  getQueryParams(): Promise<Schema['queryParams']>
  setHeader(key: string, value: string): void
  next(): Promise<Response>
  send(data: unknown, statusCode?: number): Promise<Response>
  redirect(route: string): Promise<Response>
}
