import type { Category } from '../types'

export interface CategoriesService {
  fetchAllCategories(): Promise<Category[]>
}
