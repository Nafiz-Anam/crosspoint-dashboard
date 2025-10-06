'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'

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
import useRoleBasedAccess from '@/hooks/useRoleBasedAccess'

const MinimalTaskListTable = ({ taskData = [] }) => {
  // States
  const [data, setData] = useState([...taskData])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Hooks
  const { t } = useTranslation()
  const { data: session } = useSession()
  const { userRole } = useRoleBasedAccess()

  // Filter tasks based on user role
  const filterTasksByRole = useCallback(
    tasks => {
      if (!tasks || tasks.length === 0) return tasks

      console.log('MinimalTaskListTable - Filtering tasks for role:', userRole)
      console.log('MinimalTaskListTable - Total tasks before filtering:', tasks.length)

      // For employees, only show tasks assigned to them
      if (userRole === 'EMPLOYEE') {
        const filteredTasks = tasks.filter(task => task.assignedTo?.id === session?.user?.id)
        console.log('MinimalTaskListTable - Employee filtered tasks:', filteredTasks.length)
        return filteredTasks
      }

      // For other roles (ADMIN, HR, MANAGER), show all tasks
      console.log('MinimalTaskListTable - Showing all tasks for role:', userRole)
      return tasks
    },
    [userRole, session?.user?.id]
  )

  // Handle task data - either filter provided data or fetch from API
  useEffect(() => {
    const handleTaskData = async () => {
      // If taskData is provided, filter it based on role
      if (taskData.length > 0) {
        const filteredTasks = filterTasksByRole(taskData)
        setData(filteredTasks)
        return
      }

      // If no taskData provided, fetch from API
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
          const filteredTasks = filterTasksByRole(tasks)
          setData(filteredTasks)
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

    handleTaskData()
  }, [taskData, session?.accessToken, filterTasksByRole])

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
