import { Button } from '../button'
import { Toast } from '../toast'
import { Comment } from './comment'
import { Form } from './form'
import { useCommentsSection } from './use-comments-section'

type Props = {
  postId: string
}

export const CommentsSecion = ({ postId }: Props) => {
  const { comments, isToastVisible, handleFormSubmit } = useCommentsSection(postId)

  return (
    <section id='comments'>
      {isToastVisible && (
        <Toast type='success' message='Seu comentário foi levado para análise' />
      )}

      <h3 className='font-bold text-lg'>Comentários ({comments.length})</h3>
      <ul className='space-y-6 mt-3'>
        {comments.map((comment) => (
          <li key={comment.name}>
            <Comment
              author={comment.name}
              content={comment.content}
              date={comment.date.toISOString()}
            />
          </li>
        ))}
      </ul>

      <Button>Carregar mais</Button>

      <div className='mt-6'>
        <Form postId={postId} onSubmit={handleFormSubmit} />
      </div>
    </section>
  )
}
