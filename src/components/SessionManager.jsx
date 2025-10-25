// Session Management Component
import React, { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Box,
  Alert
} from '@mui/material'
import { Delete, Computer, PhoneAndroid, Tablet } from '@mui/icons-material'
import sessionService from '@/services/sessionService'

const SessionManager = ({ open, onClose }) => {
  const { data: session } = useSession()
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (open && session) {
      fetchSessions()
    }
  }, [open, session])

  const fetchSessions = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await sessionService.getActiveSessions()
      setSessions(response.sessions || [])
    } catch (err) {
      setError('Failed to fetch active sessions')
      console.error('Error fetching sessions:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleTerminateSession = async sessionId => {
    try {
      await sessionService.terminateSession(sessionId)
      await fetchSessions() // Refresh the list
    } catch (err) {
      setError('Failed to terminate session')
      console.error('Error terminating session:', err)
    }
  }

  const handleTerminateAllSessions = async () => {
    try {
      await sessionService.terminateAllSessions()
      await fetchSessions() // Refresh the list
    } catch (err) {
      setError('Failed to terminate all sessions')
      console.error('Error terminating all sessions:', err)
    }
  }

  const getDeviceIcon = userAgent => {
    if (!userAgent) return <Computer />

    if (/Mobile|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      return <PhoneAndroid />
    } else if (/iPad|Android/i.test(userAgent)) {
      return <Tablet />
    }
    return <Computer />
  }

  const getDeviceName = userAgent => {
    if (!userAgent) return 'Unknown Device'

    if (/Mobile|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      return 'Mobile Device'
    } else if (/iPad|Android/i.test(userAgent)) {
      return 'Tablet'
    }
    return 'Desktop'
  }

  const formatDate = dateString => {
    return new Date(dateString).toLocaleString()
  }

  const isCurrentSession = sessionId => {
    if (typeof window === 'undefined') return false
    const currentSessionId = localStorage.getItem('sessionId')
    return currentSessionId === sessionId
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>
        <Typography variant='h6'>Active Sessions</Typography>
        <Typography variant='body2' color='text.secondary'>
          Manage your active login sessions across different devices
        </Typography>
      </DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box display='flex' justifyContent='center' p={3}>
            <Typography>Loading sessions...</Typography>
          </Box>
        ) : sessions.length === 0 ? (
          <Box display='flex' justifyContent='center' p={3}>
            <Typography color='text.secondary'>No active sessions found</Typography>
          </Box>
        ) : (
          <List>
            {sessions.map(session => (
              <ListItem key={session.id} divider>
                <Box display='flex' alignItems='center' mr={2}>
                  {getDeviceIcon(session.userAgent)}
                </Box>
                <ListItemText
                  primary={
                    <Box display='flex' alignItems='center' gap={1}>
                      <Typography variant='subtitle1'>{getDeviceName(session.userAgent)}</Typography>
                      {isCurrentSession(session.sessionId) && <Chip label='Current' color='primary' size='small' />}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant='body2' color='text.secondary'>
                        {session.deviceInfo || 'Unknown Device'}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        IP: {session.ipAddress || 'Unknown'} • Last active: {formatDate(session.createdAt)}
                      </Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  {!isCurrentSession(session.sessionId) && (
                    <IconButton
                      edge='end'
                      aria-label='terminate session'
                      onClick={() => handleTerminateSession(session.sessionId)}
                      color='error'
                    >
                      <Delete />
                    </IconButton>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {sessions.length > 1 && (
          <Button onClick={handleTerminateAllSessions} color='error' variant='outlined'>
            Terminate All Other Sessions
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default SessionManager
