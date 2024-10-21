import { useCallback, useEffect, useState } from 'react'

import type { Comment } from '@/core/types'
import { commentsService } from '@/cms/index'

export function useCommentsSection(postId: string) {
  const [comments, setComments] = useState<Comment[]>([])
  const [page, setPage] = useState(1)
  const [isToastVisible, setIsToastVisible] = useState(false)

  function handleFormSubmit(comment: Comment) {
    setIsToastVisible(true)
  }

  function handleLoadMoreButtonClick() {
    setPage(page + 1)
  }

  const fetchComments = useCallback(async () => {
    const response = await commentsService.fetchComments(postId, page)
    if (response.isSuccess) setComments(response.body.comments)
  }, [postId, page])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  useEffect(() => {
    if (isToastVisible) {
      setTimeout(() => {
        setIsToastVisible(false)
      }, 3000)
    }
  }, [isToastVisible])

  return {
    comments,
    isToastVisible,
    handleFormSubmit,
    handleLoadMoreButtonClick,
  }
}
