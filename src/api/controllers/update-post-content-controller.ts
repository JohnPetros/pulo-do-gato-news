import { ENV } from '@/constants/env'
import { HTTP_HEADERS } from '@/constants/http-headers'
import { HTTP_STATUS_CODE } from '@/constants/http-status-code'
import type { PostsCollection } from '@/core/interfaces'
import type { Http } from '@/core/interfaces/http'

type Schema = {
  routeParams: {
    postId: string
  }
  body: {
    content: string
  }
}

export const UpdatePostContentController = (postsCollection: PostsCollection) => {
  return {
    async handle(http: Http<Schema>) {
      if (
        http.getHeader(HTTP_HEADERS.XPuloDoGatoNewsApiKey) !== ENV.puloDoGatoNewsApiKey
      ) {
        return http.send(
          {
            message: 'Unauthorized',
          },
          HTTP_STATUS_CODE.unauthorized,
        )
      }

      const { postId } = await http.getRouteParams()
      const { content } = await http.getBody()

      const isUpdated = await postsCollection.updatePostContent(postId, content)

      if (!isUpdated) {
        return http.send(
          {
            message: 'Post not found',
          },
          HTTP_STATUS_CODE.notFound,
        )
      }

      return http.send({
        message: 'Post content updated successfully',
      })
    },
  }
}
