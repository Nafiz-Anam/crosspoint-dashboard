'use client'

// React Imports
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import AddTaskCard from './AddTaskCard'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

// Utils
import { getLocalizedUrl } from '@/utils/i18n'

const AddTask = () => {
  const router = useRouter()
  const { lang: locale } = useParams()
  const { t } = useTranslation()

  const handleTaskCreated = (taskData) => {
    if (taskData) {
      // Task created successfully - navigate to task list
      router.push(getLocalizedUrl('/apps/task/list', locale))
    } else {
      // User cancelled - navigate back to task list
      router.push(getLocalizedUrl('/apps/task/list', locale))
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AddTaskCard onTaskCreated={handleTaskCreated} />
      </Grid>
    </Grid>
  )
}

export default AddTask
