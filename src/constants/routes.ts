export const ROUTES = {
  home: '/',
  posts: '/posts',
  post: (postSlug: string) => `/posts/${postSlug}`,
  about: '/about',
  columnsSection: '/columns-section',
  privacyPolicy: '/privacy-policy',
  termsOfUse: '/terms-of-use',
  api: {
    comments: (postId: string, page: number) =>
      `/api/posts/${postId}/comments?page=${page}`,
  },
} as const
