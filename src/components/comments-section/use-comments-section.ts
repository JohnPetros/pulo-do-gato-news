import { useCallback, useEffect, useState } from 'react'

import type { Comment } from '@/core/types'
import { commentsService } from '@/cms/index'
import { PAGINATION } from '@/constants/pagination'

export function useCommentsSection(postId: string) {
  const [comments, setComments] = useState<Comment[]>([])
  const [page, setPage] = useState(1)
  const [commentsCount, setCommentsCount] = useState(0)
  const [isToastVisible, setIsToastVisible] = useState(false)
  const [isFetchingComments, setisFetchingComments] = useState(true)

  function handleFormSubmit() {
    setIsToastVisible(true)
  }

  function handleLoadMoreButtonClick() {
    setPage((page) => page + 1)
  }

  const fetchComments = useCallback(async () => {
    const response = await commentsService.fetchComments(postId, page)
    if (response.isSuccess) {
      setComments((comments) => [...comments, ...response.body.comments])
      setCommentsCount(response.body.count)
      setisFetchingComments(false)
    }
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
    page,
    totalPages: Math.floor(commentsCount / PAGINATION.itemsPerPage),
    isFetchingComments,
    handleFormSubmit,
    handleLoadMoreButtonClick,
  }
}
