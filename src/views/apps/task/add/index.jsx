'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import AddTaskCard from './AddTaskCard'

const AddTask = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AddTaskCard />
      </Grid>
    </Grid>
  )
}

export default AddTask
