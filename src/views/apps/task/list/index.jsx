'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import TaskListTable from './TaskListTable'

const TaskList = () => {
  // States
  const [taskData, setTaskData] = useState([])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TaskListTable taskData={taskData} setTaskData={setTaskData} />
      </Grid>
    </Grid>
  )
}

export default TaskList
