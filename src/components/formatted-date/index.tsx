type Props = {
  value: string
  className?: string
}

export const FormattedDate = ({ value, className }: Props) => {
  const date = new Date(value)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear()).slice(-2)
  const hours = String(date.getHours())
  const minutes = String(date.getMinutes())

  return (
    <time className={className}>{`${day}/${month}/${year} ${hours}:${minutes}`}</time>
  )
}
