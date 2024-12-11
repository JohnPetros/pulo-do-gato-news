import { actions, isInputError } from 'astro:actions'
import { useState } from 'react'

type FormErrors = {
  name: string
  email: string
  content: string
}

export function useSendColumnAction(onSendColumn: VoidFunction) {
  const [isSendingColumn, setIsSendingColumn] = useState(false)
  const [formErrors, setFormErrors] = useState<FormErrors | null>(null)
  const [internalErrorMessage, setInternalErrorMessage] = useState('')

  async function sendColumn(formData: FormData) {
    setIsSendingColumn(true)
    const { error } = await actions.sendColumn(formData)

    if (error) {
      if (isInputError(error)) {
        setFormErrors({
          name: error.fields.name?.join(', ') ?? '',
          email: error.fields.email?.join(', ') ?? '',
          content: error.fields.content?.join(', ') ?? '',
        })
        setIsSendingColumn(false)
        return
      }

      setInternalErrorMessage(error.message)
      setIsSendingColumn(false)
      return
    }

    onSendColumn()
  }

  return {
    isSendingColumn,
    formErrors,
    internalErrorMessage,
    sendColumn,
  }
}
