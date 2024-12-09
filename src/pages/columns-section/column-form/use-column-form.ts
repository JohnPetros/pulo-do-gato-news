import { NAV_LINKS } from '@/constants/nav-links'
import { server } from '@/server/index'
import { useRef, useState, type FormEvent } from 'react'

type FormErrors = {
  name: string
  email: string
  content: string
}

export function useColumnForm() {
  const [formErrors, setFormErrors] = useState<FormErrors | null>(null)
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const contentRef = useRef('')

  async function handleFormSubmit(event: FormEvent) {
    setIsFormSubmitting(true)
    event.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    formData.append('content', contentRef.current)

    const response = await server.sendColumnAction(formData)

    if (response.hasError) {
      if (response.error.type === 'form')
        setFormErrors({
          name: response.error.name,
          email: response.error.email,
          content: response.error.content,
        })
      setIsFormSubmitting(false)
      return
    }

    server.redirect(`${NAV_LINKS[0].route}?sent-column-success=true`)
  }

  function handleRichTextEditorChange(value: string) {
    contentRef.current = value
  }

  return {
    formRef,
    formErrors,
    isFormSubmitting,
    handleFormSubmit,
    handleRichTextEditorChange,
  }
}
