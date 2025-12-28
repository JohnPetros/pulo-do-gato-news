import type { Controller, Http, PostsService } from '@/core/interfaces'

export const MakePostsAvailableController = (service: PostsService): Controller => {
  return {
    async handle(http: Http) {
      await service.editPostsAvailability(true)
      return http.send({
        message: 'Posts made available successfully',
      })
    },
  }
}
