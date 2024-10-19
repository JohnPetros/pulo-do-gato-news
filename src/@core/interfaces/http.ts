export interface Http {
  getFormData(key: string, fallback?: string): Promise<string>
  getBodyData<Data>(): Promise<Data>
  send(data: unknown, statusCode?: number): Promise<Response>
  redirect(route: string): Promise<Response>
}
