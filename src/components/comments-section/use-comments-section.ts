import { useState } from 'react'

import type { Comment } from '@/core/types'

export function useCommentsSection() {
  const [comments, setComments] = useState<Comment[]>([])

  function handleFormSubmit(comment: Comment) {
    setComments((comments) => [...comments, comment])
  }

  return {
    comments,
    handleFormSubmit,
  }
}
