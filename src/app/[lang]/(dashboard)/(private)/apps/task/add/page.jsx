// React Imports
import { cookies } from 'next/headers'

// Component Imports
import AddTask from '@views/apps/task/add'

// Util Imports
import { getServerMode } from '@core/utils/serverHelpers'

const AddTaskApp = () => {
  // Vars
  const direction = cookies().get('direction')?.value || 'ltr'
  const mode = getServerMode()

  return <AddTask mode={mode} direction={direction} />
}

export default AddTaskApp
