// React Imports
import { cookies } from 'next/headers'

// Component Imports
import EditTask from '@views/apps/task/edit'

// Util Imports
import { getServerMode } from '@core/utils/serverHelpers'

const EditTaskApp = ({ params }) => {
  // Vars
  const direction = cookies().get('direction')?.value || 'ltr'
  const mode = getServerMode()

  return <EditTask mode={mode} direction={direction} taskId={params.id} />
}

export default EditTaskApp
