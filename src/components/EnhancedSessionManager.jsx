import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip,
  Alert,
  Card,
  CardContent,
  Grid,
  Divider,
  Tooltip,
  Switch,
  FormControlLabel,
  Slider,
  TextField,
  MenuItem,
  Badge,
  Avatar
} from '@mui/material'
import {
  Computer,
  PhoneAndroid,
  Tablet,
  Delete,
  Refresh,
  Security,
  LocationOn,
  AccessTime,
  Warning,
  CheckCircle,
  Error,
  Info,
  Settings,
  Notifications,
  Shield
} from '@mui/icons-material'
import sessionService from '../services/sessionService'
import idleSessionManager from '../services/idleSessionManager'

const EnhancedSessionManager = ({ open, onClose }) => {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [securitySettings, setSecuritySettings] = useState({
    idleTimeout: 30, // minutes
    enableNotifications: true,
    enableAutoLogout: true,
    enableSecurityAlerts: true
  })
  const [showSecuritySettings, setShowSecuritySettings] = useState(false)

  useEffect(() => {
    if (open) {
      fetchSessions()
      loadSecuritySettings()
    }
  }, [open])

  const fetchSessions = async () => {
    setLoading(true)
    try {
      const sessionsData = await sessionService.getActiveSessions()
      setSessions(sessionsData || [])
    } catch (err) {
      setError('Failed to fetch sessions')
      console.error('Error fetching sessions:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadSecuritySettings = () => {
    const saved = localStorage.getItem('securitySettings')
    if (saved) {
      setSecuritySettings(JSON.parse(saved))
    }
  }

  const saveSecuritySettings = newSettings => {
    setSecuritySettings(newSettings)
    localStorage.setItem('securitySettings', JSON.stringify(newSettings))

    // Apply settings
    if (window.idleSessionManager) {
      window.idleSessionManager.updateTimeout(newSettings.idleTimeout * 60 * 1000)
    }
  }

  const handleTerminateSession = async sessionId => {
    try {
      await sessionService.terminateSession(sessionId)
      await fetchSessions()
    } catch (err) {
      setError('Failed to terminate session')
    }
  }

  const handleTerminateAllSessions = async () => {
    try {
      await sessionService.terminateAllSessions()
      await fetchSessions()
    } catch (err) {
      setError('Failed to terminate sessions')
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

  const getLocationFromIP = ipAddress => {
    // In a real implementation, you'd use a geolocation service
    if (ipAddress === '127.0.0.1' || ipAddress === '::1') {
      return 'Local Development'
    }
    return `IP: ${ipAddress}`
  }

  const formatDate = dateString => {
    return new Date(dateString).toLocaleString()
  }

  const isCurrentSession = sessionId => {
    if (typeof window === 'undefined') return false
    const currentSessionId = localStorage.getItem('sessionId')
    return currentSessionId === sessionId
  }

  const getSessionStatus = session => {
    if (isCurrentSession(session.sessionId)) {
      return { status: 'current', color: 'primary', icon: <CheckCircle /> }
    }

    const now = new Date()
    const lastActivity = new Date(session.updatedAt || session.createdAt)
    const timeDiff = now - lastActivity

    if (timeDiff > 30 * 60 * 1000) {
      // 30 minutes
      return { status: 'inactive', color: 'warning', icon: <Warning /> }
    }

    return { status: 'active', color: 'success', icon: <CheckCircle /> }
  }

  const getTimeUntilTimeout = () => {
    if (window.idleSessionManager) {
      const timeMs = window.idleSessionManager.getTimeUntilTimeout()
      const minutes = Math.floor(timeMs / (1000 * 60))
      return minutes
    }
    return 0
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='lg' fullWidth>
      <DialogTitle>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box>
            <Typography variant='h6'>Session Management</Typography>
            <Typography variant='body2' color='text.secondary'>
              Manage your active login sessions and security settings
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={() => setShowSecuritySettings(!showSecuritySettings)}>
              <Settings />
            </IconButton>
            <IconButton onClick={fetchSessions} disabled={loading}>
              <Refresh />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity='error' sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Security Settings Panel */}
        {showSecuritySettings && (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                <Security sx={{ mr: 1, verticalAlign: 'middle' }} />
                Security Settings
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography gutterBottom>Idle Timeout (minutes)</Typography>
                  <Slider
                    value={securitySettings.idleTimeout}
                    onChange={(e, value) => saveSecuritySettings({ ...securitySettings, idleTimeout: value })}
                    min={5}
                    max={120}
                    step={5}
                    marks={[
                      { value: 5, label: '5m' },
                      { value: 30, label: '30m' },
                      { value: 60, label: '1h' },
                      { value: 120, label: '2h' }
                    ]}
                  />
                  <Typography variant='caption' color='text.secondary'>
                    Current timeout: {getTimeUntilTimeout()} minutes remaining
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={securitySettings.enableNotifications}
                        onChange={e =>
                          saveSecuritySettings({ ...securitySettings, enableNotifications: e.target.checked })
                        }
                      />
                    }
                    label='Enable Notifications'
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={securitySettings.enableAutoLogout}
                        onChange={e =>
                          saveSecuritySettings({ ...securitySettings, enableAutoLogout: e.target.checked })
                        }
                      />
                    }
                    label='Auto Logout on Idle'
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={securitySettings.enableSecurityAlerts}
                        onChange={e =>
                          saveSecuritySettings({ ...securitySettings, enableSecurityAlerts: e.target.checked })
                        }
                      />
                    }
                    label='Security Alerts'
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Sessions List */}
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
            {sessions.map((session, index) => {
              const sessionStatus = getSessionStatus(session)
              return (
                <React.Fragment key={session.id}>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>{getDeviceIcon(session.userAgent)}</Avatar>
                    </ListItemIcon>

                    <ListItemText
                      primary={
                        <Box display='flex' alignItems='center' gap={1}>
                          <Typography variant='subtitle1'>{getDeviceName(session.userAgent)}</Typography>
                          <Chip
                            label={sessionStatus.status}
                            color={sessionStatus.color}
                            size='small'
                            icon={sessionStatus.icon}
                          />
                          {isCurrentSession(session.sessionId) && <Chip label='Current' color='primary' size='small' />}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant='body2' color='text.secondary'>
                            {session.deviceInfo || 'Unknown Device'}
                          </Typography>
                          <Box display='flex' alignItems='center' gap={1} mt={0.5}>
                            <LocationOn fontSize='small' color='action' />
                            <Typography variant='caption'>{getLocationFromIP(session.ipAddress)}</Typography>
                            <AccessTime fontSize='small' color='action' />
                            <Typography variant='caption'>
                              Last active: {formatDate(session.updatedAt || session.createdAt)}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />

                    <Box display='flex' alignItems='center' gap={1}>
                      <Tooltip title='Session Details'>
                        <IconButton size='small'>
                          <Info />
                        </IconButton>
                      </Tooltip>

                      {!isCurrentSession(session.sessionId) && (
                        <Tooltip title='Terminate Session'>
                          <IconButton
                            size='small'
                            onClick={() => handleTerminateSession(session.sessionId)}
                            color='error'
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </ListItem>
                  {index < sessions.length - 1 && <Divider />}
                </React.Fragment>
              )
            })}
          </List>
        )}

        {/* Security Summary */}
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              <Shield sx={{ mr: 1, verticalAlign: 'middle' }} />
              Security Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box textAlign='center'>
                  <Typography variant='h4' color='primary'>
                    {sessions.length}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Active Sessions
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box textAlign='center'>
                  <Typography variant='h4' color='success.main'>
                    {sessions.filter(s => isCurrentSession(s.sessionId)).length}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Current Device
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box textAlign='center'>
                  <Typography variant='h4' color='warning.main'>
                    {getTimeUntilTimeout()}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Minutes Until Timeout
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {sessions.length > 1 && (
          <Button onClick={handleTerminateAllSessions} color='error' variant='outlined' startIcon={<Delete />}>
            Terminate All Other Sessions
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default EnhancedSessionManager
