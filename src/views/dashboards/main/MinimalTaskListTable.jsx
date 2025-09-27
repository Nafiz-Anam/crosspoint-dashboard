'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { useSession } from 'next-auth/react'

// Component Imports
import TaskListTable from '@views/apps/task/list/TaskListTable'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

const MinimalTaskListTable = ({ taskData = [] }) => {
  // States
  const [data, setData] = useState([...taskData])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Hooks
  const { t } = useTranslation()
  const { data: session } = useSession()

  // Fetch tasks if no data provided
  useEffect(() => {
    const fetchTasks = async () => {
      if (taskData.length > 0) return // Use provided data

      try {
        setLoading(true)
        setError(null)

        if (!session?.accessToken) {
          setError(t('dashboard.common.error'))
          return
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-client-type': 'web',
            Authorization: `Bearer ${session.accessToken}`
          }
        })

        const responseData = await response.json()

        if (response.ok) {
          const tasks = responseData.data?.results || responseData.data || []
          setData(tasks)
        } else {
          setError(t('dashboard.common.error'))
        }
      } catch (err) {
        console.error('Error fetching tasks:', err)
        setError(t('dashboard.common.error'))
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [session?.accessToken, taskData.length])

  if (loading) {
    return (
      <Card sx={{ height: '100%' }}>
        <CardHeader title={t('tasks.title')} />
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TaskListTable tasks={data} showTitle={false} showAddButton={false} limitActions={true} />
    </>
  )
}

export default MinimalTaskListTable
