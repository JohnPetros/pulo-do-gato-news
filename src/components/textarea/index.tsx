import type { ComponentProps } from 'react'

type Props = {
  id: string
  label: string
  errorMessage?: string
} & ComponentProps<'textarea'>

export const Textarea = ({ id, label, errorMessage, ...textareaProps }: Props) => {
  return (
    <div data-input={id} className='flex flex-col gap-3'>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        {...textareaProps}
        className='w-full min-h-32 rounded-md bg-gray-50 border border-gray-100 placeholder:text-gray-400'
      />
      {errorMessage && (
        <p data-input='error-message' className='text-primary'>
          {errorMessage}
        </p>
      )}
    </div>
  )
}
