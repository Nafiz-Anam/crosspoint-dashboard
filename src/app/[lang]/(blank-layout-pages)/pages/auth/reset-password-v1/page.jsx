// Component Imports
import ResetPasswordV1 from '@views/pages/auth/ResetPasswordV1'

// Generate static params for supported languages
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'it' }]
}

const ResetPasswordV1Page = () => {
  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] p-6'>
      <ResetPasswordV1 />
    </div>
  )
}

export default ResetPasswordV1Page
