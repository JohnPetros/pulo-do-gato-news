import { FormattedDate } from '@/components/formatted-date'

type Props = {
  author: string
  date: string
  content: string
}

export const Comment = ({ author, content, date }: Props) => {
  return (
    <div className='flex justify-start items-start gap-3 py-6 rounded-md border border-primary'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='120'
        height='64'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='inline-block -translate-4 icon icon-tabler icons-tabler-outline icon-tabler-user-circle text-gray-500'
      >
        <title>Autor do comentário</title>
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0' />
        <path d='M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' />
        <path d='M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855' />
      </svg>
      <div className='-translate-x-4'>
        <div className='space-x-3'>
          <strong className='text-gray-800 font-bold'>{author}</strong>
          <FormattedDate value={date} className='text-sm text-gray-500' />
        </div>
        <p className='text-gray-700 leading-6 mt-1 text-sm'>{content}</p>
      </div>
    </div>
  )
}
