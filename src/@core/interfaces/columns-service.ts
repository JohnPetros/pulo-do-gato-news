import type { ApiResponse } from '../responses'
import type { Column } from '../types'

export interface ColumnsService {
  registerColumn(column: Column): Promise<ApiResponse>
}
