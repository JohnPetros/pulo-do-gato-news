import { postSchema } from './post-schema'
import { subscriptionSchema } from './subscription-schema'
import { commentSchema } from './comment-schema'
import { columnSchema } from './column-schema'

export const schema = {
  name: 'pulo-do-gato-news-schema',
  types: [postSchema, columnSchema, subscriptionSchema, commentSchema],
}
