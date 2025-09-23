// React Imports
import { cookies } from 'next/headers'

// Component Imports
import TaskList from '@views/apps/task/list'

// Util Imports
import { getServerMode } from '@core/utils/serverHelpers'

const TaskListApp = () => {
  // Vars
  const direction = cookies().get('direction')?.value || 'ltr'
  const mode = getServerMode()

  return <TaskList mode={mode} direction={direction} />
}

export default TaskListApp
