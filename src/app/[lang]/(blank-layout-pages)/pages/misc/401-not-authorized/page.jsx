// Component Imports
import NotAuthorized from '@views/NotAuthorized'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

// Generate static params for supported languages
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'it' }]
}

const Error401 = async () => {
  // Vars
  const mode = await getServerMode()

  return <NotAuthorized mode={mode} />
}

export default Error401
