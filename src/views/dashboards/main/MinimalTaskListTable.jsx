'use client'

// Component Imports
import TaskListTable from '@views/apps/task/list/TaskListTable'

const MinimalTaskListTable = () => {
  // Just render TaskListTable - it will fetch its own data from the API
  // Pass null so it knows to fetch from API instead of using provided data
  return <TaskListTable tasks={null} showTitle={false} showAddButton={false} limitActions={true} />
}

export default MinimalTaskListTable
