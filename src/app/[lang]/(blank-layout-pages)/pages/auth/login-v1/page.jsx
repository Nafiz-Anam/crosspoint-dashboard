// Component Imports
import LoginV1 from '@views/pages/auth/LoginV1'

// Generate static params for supported languages
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'it' }]
}

const LoginV1Page = () => {
  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] p-6'>
      <LoginV1 />
    </div>
  )
}

export default LoginV1Page
