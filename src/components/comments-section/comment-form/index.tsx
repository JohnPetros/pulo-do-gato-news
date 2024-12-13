import type { Comment } from '@/core/types'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Textarea } from '@/components/textarea'
import { Spinner } from '@/components/spinner'
import { Toast } from '@/components/toast'
import { useForm } from './use-comment-form'

type Props = {
  postId: string
  onSubmit: (comment: Comment) => void
}

export const Form = ({ postId, onSubmit }: Props) => {
  const {
    formRef,
    formErrors,
    internalErrorMessage,
    isSendingComment,
    handleFormSubmit,
  } = useForm(onSubmit)

  return (
    <>
      {internalErrorMessage && <Toast type='error' message={internalErrorMessage} />}
      <form ref={formRef} className='space-y-6' onSubmit={handleFormSubmit}>
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
        <Textarea
          id='content'
          name='content'
          label='Comentário'
          placeholder='Insira sua comentário aqui'
          errorMessage={formErrors?.content}
        />
        <input type='text' id='postId' name='postId' defaultValue={postId} hidden />
        <Button type='submit' className='w-36 mx-auto'>
          {isSendingComment ? <Spinner /> : 'Enviar'}
        </Button>
      </form>
    </>
  )
}
