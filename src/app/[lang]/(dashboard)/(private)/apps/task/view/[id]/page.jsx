// React Imports
import { cookies } from 'next/headers'

// Component Imports
import TaskView from '@views/apps/task/view'

// Util Imports
import { getServerMode } from '@core/utils/serverHelpers'

const TaskViewApp = async () => {
  // Vars
  const cookieStore = await cookies()
  const direction = cookieStore.get('direction')?.value || 'ltr'
  const mode = await getServerMode()

  return <TaskView mode={mode} direction={direction} />
}

export default TaskViewApp
