import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Textarea } from '@/components/textarea'
import { useForm } from './use-form'
import type { Comment } from '@/core/types'

type Props = {
  postId: string
  onSubmit: (comment: Comment) => void
}

export const Form = ({ postId, onSubmit }: Props) => {
  const { formRef, formErrors, handleFormSubmit } = useForm(onSubmit)

  return (
    <form ref={formRef} className='space-y-6' onSubmit={handleFormSubmit}>
      <Input
        id='name'
        name='name'
        label='Nome'
        placeholder='Vitor Spinneli'
        errorMessage={formErrors?.name}
      />
      <Input
        id='email'
        name='email'
        label='E-mail'
        placeholder='vitor@gmail.com'
        errorMessage={formErrors?.email}
      />
      <Textarea
        id='content'
        name='content'
        label='Mensagem'
        placeholder='Insira sua menssagem aqui'
        errorMessage={formErrors?.content}
      />
      <input type='text' id='postId' name='postId' defaultValue={postId} hidden />
      <Button type='submit' className='w-36 mx-auto'>
        Enviar
      </Button>
    </form>
  )
}
