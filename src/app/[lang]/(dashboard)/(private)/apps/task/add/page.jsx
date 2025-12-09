// React Imports
import { cookies } from 'next/headers'

// Component Imports
import AddTask from '@views/apps/task/add'

// Util Imports
import { getServerMode } from '@core/utils/serverHelpers'

const AddTaskApp = async () => {
  // Vars
  const cookieStore = await cookies()
  const direction = cookieStore.get('direction')?.value || 'ltr'
  const mode = await getServerMode()

  return <AddTask mode={mode} direction={direction} />
}

export default AddTaskApp
