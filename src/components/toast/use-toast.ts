import { useEffect, type RefObject } from 'react'

export function useToast(
  closeButtonRef: RefObject<HTMLButtonElement>,
  isSticky: boolean,
) {
  useEffect(() => {
    if (isSticky) return

    setTimeout(() => {
      closeButtonRef.current?.click()
    }, 3000)
  }, [isSticky, closeButtonRef.current?.click])
}
