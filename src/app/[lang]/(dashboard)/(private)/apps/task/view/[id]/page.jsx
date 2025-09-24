// React Imports
import { cookies } from 'next/headers'

// Component Imports
import TaskView from '@views/apps/task/view'

// Util Imports
import { getServerMode } from '@core/utils/serverHelpers'

const TaskViewApp = () => {
  // Vars
  const direction = cookies().get('direction')?.value || 'ltr'
  const mode = getServerMode()

  return <TaskView mode={mode} direction={direction} />
}

export default TaskViewApp
