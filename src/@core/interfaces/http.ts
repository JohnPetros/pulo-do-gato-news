export interface Http {
  getFormData(key: string, fallback?: string): Promise<string>
  redirect(route: string): Promise<Response>
}
