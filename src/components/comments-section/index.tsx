import { Button } from '../button'
import { Spinner } from '../spinner'
import { Toast } from '../toast'
import { Comment } from './comment'
import { Form } from './form'
import { useCommentsSection } from './use-comments-section'

type Props = {
  postId: string
}

export const CommentsSecion = ({ postId }: Props) => {
  const {
    comments,
    isToastVisible,
    page,
    totalPages,
    isFetchingComments,
    handleFormSubmit,
    handleLoadMoreButtonClick,
  } = useCommentsSection(postId)

  return (
    <section id='comments'>
      {isToastVisible && (
        <Toast type='success' message='Seu comentário foi levado para análise' />
      )}

      {isFetchingComments ? (
        <Spinner className='mx-auto size-12 my-12 fill-primary' />
      ) : (
        <>
          <h3 className='font-bold text-lg'>Comentários ({comments.length})</h3>
          <ul className='space-y-6 mt-3'>
            {comments.map((comment) => (
              <li key={comment.id}>
                <Comment
                  author={comment.name}
                  content={comment.content}
                  date={comment.date.toString()}
                />
              </li>
            ))}
          </ul>
        </>
      )}

      {!isFetchingComments &&
        totalPages > 0 &&
        page !== totalPages &&
        comments.length > 0 && (
          <Button className='mx-auto mt-12' onClick={handleLoadMoreButtonClick}>
            Carregar mais
          </Button>
        )}

      <div className='mt-6'>
        <Form postId={postId} onSubmit={handleFormSubmit} />
      </div>
    </section>
  )
}
