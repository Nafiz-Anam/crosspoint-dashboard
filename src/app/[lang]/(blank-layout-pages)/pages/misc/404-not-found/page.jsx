// Component Imports
import NotFound from '@views/NotFound'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

// Generate static params for supported languages
export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'it' }
  ]
}

const Error = async () => {
  // Vars
  const mode = await getServerMode()

  return <NotFound mode={mode} />
}

export default Error
