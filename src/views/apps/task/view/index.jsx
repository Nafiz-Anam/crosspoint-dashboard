'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import TaskViewCard from './TaskViewCard'

const TaskView = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TaskViewCard />
      </Grid>
    </Grid>
  )
}

export default TaskView
