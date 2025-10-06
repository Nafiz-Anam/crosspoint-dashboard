// Component Imports
import ForgotPasswordV1 from '@views/pages/auth/ForgotPasswordV1'

// Generate static params for supported languages
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'it' }]
}

const ForgotPasswordV1Page = () => {
  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] p-6'>
      <ForgotPasswordV1 />
    </div>
  )
}

export default ForgotPasswordV1Page
