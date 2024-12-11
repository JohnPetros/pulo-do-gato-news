import { navigate } from 'astro:transitions/client'

export function useNavigation() {
  function redirect(route: string) {
    navigate(route)
  }

  return {
    redirect,
  }
}
