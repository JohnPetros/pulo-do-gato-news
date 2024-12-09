import { useEffect, type RefObject } from 'react'

export function useToast(
  closeButtonRef: RefObject<HTMLButtonElement>,
  isSticky: boolean,
  onClose?: VoidFunction,
) {
  function handleClose() {
    if (onClose) onClose()
  }

  useEffect(() => {
    if (isSticky) return

    setTimeout(() => {
      closeButtonRef.current?.click()
    }, 3500)
  }, [isSticky, closeButtonRef.current?.click])

  return {
    handleClose,
  }
}
