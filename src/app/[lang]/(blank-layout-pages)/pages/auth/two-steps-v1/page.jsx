// Component Imports
import TwoStepsV1 from '@views/pages/auth/TwoStepsV1'

// Generate static params for supported languages
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'it' }]
}

const TwoStepsV1Page = () => {
  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] p-6'>
      <TwoStepsV1 />
    </div>
  )
}

export default TwoStepsV1Page
