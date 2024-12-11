import { actions, isInputError } from 'astro:actions'
import { useState } from 'react'

import type { Comment } from '@/core/types'

type FormErrors = {
  name: string
  email: string
  content: string
}

export function useSendCommentAction(onSendComment: (comment: Comment) => void) {
  const [isSendingComment, setIsSendingComment] = useState(false)
  const [formErrors, setFormErrors] = useState<FormErrors | null>(null)
  const [internalErrorMessage, setInternalErrorMessage] = useState('')

  async function sendComment(formData: FormData) {
    setIsSendingComment(true)
    const { data, error } = await actions.sendComment(formData)

    if (error) {
      if (isInputError(error)) {
        setFormErrors({
          name: error.fields.name?.join(', ') ?? '',
          email: error.fields.email?.join(', ') ?? '',
          content: error.fields.content?.join(', ') ?? '',
        })
        setIsSendingComment(false)
        return
      }

      setInternalErrorMessage(error.message)
      setIsSendingComment(false)
      return
    }

    onSendComment(data)
  }

  return {
    formErrors,
    internalErrorMessage,
    isSendingComment,
    sendComment,
  }
}
