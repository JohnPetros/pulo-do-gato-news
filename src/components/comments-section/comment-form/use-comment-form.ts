import { useRef, type FormEvent } from 'react'

import type { Comment } from '@/core/types'
import { useSendCommentAction } from './use-comment-action'

export function useForm(onSubmit: (comment: Comment) => void) {
  const formRef = useRef<HTMLFormElement>(null)
  const { sendComment, formErrors, internalErrorMessage, isSendingComment } =
    useSendCommentAction(onSubmit)

  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    formRef.current.reset()

    await sendComment(formData)
  }

  return {
    formRef,
    formErrors,
    isSendingComment,
    internalErrorMessage,
    handleFormSubmit,
  }
}
