import { useCallback, useEffect, useState } from 'react'

import { useCms } from '@/hooks/use-cms'
import type { Comment } from '@/core/types'
import { PAGINATION } from '@/constants/pagination'

export function useCommentsSection(postId: string) {
  const { commentsService } = useCms()
  const [comments, setComments] = useState<Comment[]>([])
  const [page, setPage] = useState(1)
  const [commentsCount, setCommentsCount] = useState(0)
  const [isToastVisible, setIsToastVisible] = useState(false)
  const [isFetchingComments, setisFetchingComments] = useState(true)

  function handleLoadMoreButtonClick() {
    setPage((page) => page + 1)
  }

  const fetchComments = useCallback(async () => {
    const response = await commentsService.fetchComments(postId, page)
    if (response.isSuccess) {
      setComments((comments) => [...comments, ...response.body.comments])
      setCommentsCount(response.body.count)
    }
    setisFetchingComments(false)
  }, [postId, commentsService, page])

  async function handleFormSubmit(newComment: Comment) {
    setIsToastVisible(true)
    setComments((comments) => [newComment, ...comments])
  }

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
    page,
    totalPages: Math.floor(commentsCount / PAGINATION.itemsPerPage),
    isFetchingComments,
    handleFormSubmit,
    handleLoadMoreButtonClick,
  }
}
