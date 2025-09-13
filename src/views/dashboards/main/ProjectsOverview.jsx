'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

const ProjectsOverview = () => {
  // Mock data
  const projectStats = {
    open: 8,
    completed: 3,
    hold: 0,
    progression: 28
  }

  const reminders = {
    today: 0,
    next: 'No reminder'
  }

  return (
    <Card>
      <CardHeader title='Projects Overview' />
      <CardContent>
        <Box className='flex flex-col gap-y-4'>
          {/* Project Status Chips */}
          <Box className='flex flex-wrap gap-2'>
            <Chip label={`${projectStats.open} Open`} color='success' variant='tonal' size='small' />
            <Chip label={`${projectStats.completed} Completed`} color='error' variant='tonal' size='small' />
            <Chip label={`${projectStats.hold} Hold`} color='warning' variant='tonal' size='small' />
          </Box>

          {/* Progress Bar */}
          <Box>
            <Box className='flex justify-between items-center mb-2'>
              <Typography variant='body2' color='text.secondary'>
                Progression {projectStats.progression}%
              </Typography>
            </Box>
            <LinearProgress
              variant='determinate'
              value={projectStats.progression}
              color='success'
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>

          {/* Reminders */}
          <Box className='flex flex-col gap-y-1'>
            <Typography variant='body2' color='text.secondary'>
              {reminders.today} Reminder Today
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Next reminder: {reminders.next}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProjectsOverview
