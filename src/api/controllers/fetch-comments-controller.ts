import { HTTP_STATUS_CODE } from '@/constants/http-status-code'
import type { CommentsService, PostsService } from '@/core/interfaces'
import type { Http } from '@/core/interfaces/http'

type Schema = {
  routeParams: {
    postId: string
  }
  queryParams: {
    page: number
  }
}

export const FetchCommentsController = (commentsService: CommentsService) => {
  return {
    async handle(http: Http<Schema>) {
      const { postId } = await http.getRouteParams()
      const { page } = await http.getQueryParams()
      const comments = await commentsService.fetchComments(postId, page)
      return http.send(comments.body)
    },
  }
}
