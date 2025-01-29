export const ROUTES = {
  home: '/',
  posts: '/posts',
  post: (postSlug: string) => `/posts/${postSlug}`,
  about: '/about',
  columnsSection: '/columns-section',
  privacyPolicy: '/privacy-policy',
  termsOfUse: '/terms-of-use',
} as const
