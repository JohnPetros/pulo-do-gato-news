import { ROUTES } from './routes'

export const NAV_LINKS = [
  {
    title: 'Home',
    route: ROUTES.home,
  },
  {
    title: 'Notícias',
    route: ROUTES.posts,
  },
  {
    title: 'Sobre',
    route: ROUTES.about,
  },
  {
    title: 'Seção de colunistas',
    route: ROUTES.columnsSection,
  },
] as const
