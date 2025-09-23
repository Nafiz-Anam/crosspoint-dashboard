'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import EditTaskCard from './EditTaskCard'

const EditTask = ({ taskId }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <EditTaskCard taskId={taskId} />
      </Grid>
    </Grid>
  )
}

export default EditTask
