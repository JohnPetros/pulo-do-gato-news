import { ROUTES } from '@/constants/routes'

export const PrivacyPolicyWarning = () => {
  return (
    <p>
      Ao enviar você concorda com nossa{' '}
      <a href={ROUTES.privacyPolicy} className='text-primary font-semibold'>
        Política de privacidade
      </a>
      .
    </p>
  )
}
