import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { useColumnForm } from './use-column-form'
import { Spinner } from '@/components/spinner'
import { RichTextEditor } from '@/components/rich-text-editor'

export const ColumnForm = () => {
  const {
    formRef,
    formErrors,
    isFormSubmitting,
    handleRichTextEditorChange,
    handleFormSubmit,
  } = useColumnForm()

  return (
    <form
      ref={formRef}
      onSubmit={handleFormSubmit}
      className='rounded-md max-w-2xl mx-auto space-y-8 p-6 md:p-8 shadow'
    >
      <Input
        id='name'
        name='name'
        label='Nome'
        placeholder='Vitor Spinneli'
        value='vitor'
        errorMessage={formErrors?.name}
      />
      <Input
        id='email'
        name='email'
        label='E-mail'
        placeholder='vitor@gmail.com'
        value='vitor@gmail.com'
        errorMessage={formErrors?.email}
      />

      <RichTextEditor
        errorMessage={formErrors?.content}
        onChange={handleRichTextEditorChange}
      />

      <Button type='submit' className='w-36 mx-auto'>
        {isFormSubmitting ? <Spinner /> : 'Enviar'}
      </Button>
    </form>
  )
}
