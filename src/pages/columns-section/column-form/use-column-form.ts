import { useRef, type FormEvent } from 'react'

import { NAV_LINKS } from '@/constants/nav-links'
import { useSendColumnAction } from './use-send-column-action'
import { useNavigation } from '@/hooks/index'

export function useColumnForm() {
  const navigation = useNavigation()
  const formRef = useRef<HTMLFormElement>(null)
  const contentRef = useRef('')
  const { sendColumn, internalErrorMessage, formErrors, isSendingColumn } =
    useSendColumnAction(() =>
      navigation.redirect(`${NAV_LINKS[0].route}?sent-column-success=true`),
    )

  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    formData.append('content', contentRef.current)

    await sendColumn(formData)
  }

  function handleRichTextEditorChange(value: string) {
    contentRef.current = value
  }

  return {
    formRef,
    formErrors,
    isSendingColumn,
    internalErrorMessage,
    handleFormSubmit,
    handleRichTextEditorChange,
  }
}
