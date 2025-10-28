'use client'

// React Imports
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'

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

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <EditTaskCard taskId={taskId} onTaskUpdated={handleTaskUpdated} />
      </Grid>
    </Grid>
  )
}

export default EditTask
