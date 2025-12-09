// React Imports
import { cookies } from 'next/headers'

// Component Imports
import EditTask from '@views/apps/task/edit'

// Util Imports
import { getServerMode } from '@core/utils/serverHelpers'

const EditTaskApp = async ({ params }) => {
  // Vars
  const resolvedParams = await params
  const cookieStore = await cookies()
  const direction = cookieStore.get('direction')?.value || 'ltr'
  const mode = await getServerMode()

  return <EditTask mode={mode} direction={direction} taskId={resolvedParams.id} />
}

export default EditTaskApp
