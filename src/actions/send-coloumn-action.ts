import { columnsService } from '../cms'
import { throwApiError } from './utils/throw-api-error'

type Request = {
  name: string
  email: string
  content: string
}

export async function sendColumnAction({ name, email, content }: Request) {
  const column = {
    name,
    email,
    content,
  }

  const response = await columnsService.registerColumn(column)
  if (response.isFailure) throwApiError(response)
}
