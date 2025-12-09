'use client'

// React Imports
import { useRouter, useParams } from 'next/navigation'

// Component Imports
import EditTaskCard from './EditTaskCard'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

// Utils
import { getLocalizedUrl } from '@/utils/i18n'

const EditTask = ({ taskId }) => {
  const router = useRouter()
  const { lang: locale } = useParams()
  const { t } = useTranslation()

  const handleTaskUpdated = (taskData) => {
    if (taskData) {
      // Task updated successfully - navigate to task list
      router.push(getLocalizedUrl('/apps/task/list', locale))
    } else {
      // User cancelled - navigate back to task list
      router.push(getLocalizedUrl('/apps/task/list', locale))
    }
  }

  return <EditTaskCard taskId={taskId} onTaskUpdated={handleTaskUpdated} />
}

export default EditTask
