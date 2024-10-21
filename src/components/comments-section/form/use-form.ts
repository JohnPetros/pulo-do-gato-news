import type { Comment } from '@/core/types'
import { server } from '@/server/index'
import { useRef, useState, type FormEvent } from 'react'

type FormErrors = {
  name: string
  email: string
  content: string
}

export function useForm(onSubmit: (comment: Comment) => void) {
  const [formErrors, setFormErrors] = useState<FormErrors | null>(null)
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleFormSubmit(event: FormEvent) {
    setIsFormSubmitting(true)
    event.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)

    const response = await server.commentAction(formData)

    setIsFormSubmitting(false)

    if (response.hasError) {
      if (response.error.type === 'form')
        setFormErrors({
          name: response.error.name,
          email: response.error.email,
          content: response.error.content,
        })
      return
    }

    onSubmit(response.data)
  }

  return {
    formRef,
    formErrors,
    isFormSubmitting,
    handleFormSubmit,
  }
}
