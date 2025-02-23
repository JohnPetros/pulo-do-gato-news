import { forwardRef, useImperativeHandle, useRef, type ForwardedRef } from 'react'

import { useToast } from './use-toast'
import type { ToastRef, ToastType } from './types'

type Props = {
  type: ToastType
  message: string
  isSticky?: boolean
  onClose?: VoidFunction
}

const ToastComponent = (
  { type, message, isSticky = false, onClose }: Props,
  ref: ForwardedRef<ToastRef>,
) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const { handleClose } = useToast(closeButtonRef, isSticky, onClose)
  useImperativeHandle(ref, () => {
    return {
      hide: () => closeButtonRef.current?.click(),
    }
  })

  if (type === 'success')
    return (
      <div
        id='toast-success'
        className='z-50 toast fixed top-12 left-1/2 -translate-x-1/2 flex items-center p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800'
        role='alert'
      >
        <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200'>
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
          </svg>
          <span className='sr-only'>Ícone de sucesso</span>
        </div>
        <p className='ms-3 text-sm font-medium'>{message}</p>
        <button
          ref={closeButtonRef}
          type='button'
          className='ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700'
          data-dismiss-target='#toast-success'
          aria-label='Fechar mensagem'
          onClick={handleClose}
        >
          <span className='sr-only'>Close</span>
          <svg
            className='w-3 h-3'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
            />
          </svg>
        </button>
      </div>
    )

  if (type === 'error')
    return (
      <div
        id='toast-error'
        className='z-50 toast fixed top-12 left-1/2 -translate-x-1/2 flex items-center p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800'
        role='alert'
      >
        <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200'>
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z' />
          </svg>
          <span className='sr-only'>Erro</span>
        </div>
        <p className='ms-3 text-sm font-medium'>{message}</p>
        <button
          ref={closeButtonRef}
          data-dismiss-target='#toast-error'
          type='button'
          className='ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700'
          aria-label='Fechar mensagem'
          onClick={handleClose}
        >
          <span className='sr-only'>Fechar mensagem</span>
          <svg
            className='w-3 h-3'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
            />
          </svg>
        </button>
      </div>
    )
}

export const Toast = forwardRef(ToastComponent)
