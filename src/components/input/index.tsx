import type { ComponentProps } from 'react'

type Props = {
  id: string
  label: string
  errorMessage?: string
} & ComponentProps<'input'>

export const Input = ({ id, label, errorMessage, ...inputProps }: Props) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type='text'
        {...inputProps}
        className='border-none bg-gray-50 border border-gray-100 p-3 mt-1 w-full rounded-md placeholder:text-gray-300 outline-none focus:ring focus:ring-gray-100'
      />
      {errorMessage && <p className='mt-1 text-primary'>{errorMessage}</p>}
    </div>
  )
}
