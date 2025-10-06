// Component Imports
import VerifyEmailV1 from '@views/pages/auth/VerifyEmailV1'

// Generate static params for supported languages
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'it' }]
}

const VerifyEmailV1Page = () => {
  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] p-6'>
      <VerifyEmailV1 />
    </div>
  )
}

export default VerifyEmailV1Page
