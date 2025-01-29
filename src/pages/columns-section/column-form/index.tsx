import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { Spinner } from '@/components/spinner'
import { RichTextEditor } from '@/components/rich-text-editor'
import { Toast } from '@/components/toast'
import { PrivacyPolicyWarning } from '@/components/PrivacyPolicyWarning'
import { useColumnForm } from './use-column-form'

export const ColumnForm = () => {
  const {
    formRef,
    formErrors,
    isSendingColumn,
    internalErrorMessage,
    handleFormSubmit,
    handleRichTextEditorChange,
  } = useColumnForm()

  return (
    <>
      {internalErrorMessage && <Toast type='error' message={internalErrorMessage} />}
      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        className='rounded-md max-w-2xl mx-auto space-y-8 p-6 md:p-8 shadow'
      >
        <Input
          id='name'
          name='name'
          label='Nome'
          placeholder='Seu nome'
          errorMessage={formErrors?.name}
        />
        <Input
          id='email'
          name='email'
          label='E-mail'
          placeholder='seuemail@exemplo.com'
          errorMessage={formErrors?.email}
        />

        <RichTextEditor
          errorMessage={formErrors?.content}
          onChange={handleRichTextEditorChange}
        />

        <Button type='submit' disabled={isSendingColumn} className='w-36 mx-auto'>
          {isSendingColumn ? <Spinner /> : 'Enviar'}
        </Button>

        <PrivacyPolicyWarning />
      </form>
    </>
  )
}
