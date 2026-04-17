import { ENV } from '@/constants/env'
import { HTTP_HEADERS } from '@/constants/http-headers'
import { HTTP_STATUS_CODE } from '@/constants/http-status-code'
import type { PostsCollection } from '@/core/interfaces'
import type { Http } from '@/core/interfaces/http'

type Schema = {
  routeParams: {
    postId: string
  }
}

export const UpdatePostImageController = (postsCollection: PostsCollection) => {
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
      const file = await http.getFormFile('file')
      const alt = await http.getFormValue('alt')

      if (!file || !alt) {
        return http.send(
          {
            message: 'File and alt are required',
          },
          HTTP_STATUS_CODE.badRequest,
        )
      }

      const isUpdated = await postsCollection.updatePostImage(postId, {
        file,
        alt,
      })

      if (!isUpdated) {
        return http.send(
          {
            message: 'Post not found',
          },
          HTTP_STATUS_CODE.notFound,
        )
      }

      return http.send({
        message: 'Post image updated successfully',
      })
    },
  }
}
