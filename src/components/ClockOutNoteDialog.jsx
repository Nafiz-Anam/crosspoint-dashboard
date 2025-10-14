'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material'

const ClockOutNoteDialog = ({ open, onClose, onConfirm, loading = false }) => {
  const [note, setNote] = useState('')
  const [error, setError] = useState('')
  const [currentTime] = useState(new Date().toLocaleString())

  const handleClose = () => {
    if (!loading) {
      setNote('')
      setError('')
      onClose()
    }
  }

  const handleConfirm = () => {
    const trimmedNote = note.trim()

    if (!trimmedNote) {
      setError('Please enter a work summary note before clocking out')
      return
    }

    if (trimmedNote.length < 10) {
      setError('Please provide a more detailed work summary (at least 10 characters)')
      return
    }

    // Check for meaningful content (not just repeated characters or single words)
    const words = trimmedNote.split(/\s+/).filter(word => word.length > 0)
    if (words.length < 2) {
      setError('Please provide a more detailed summary with multiple words')
      return
    }

    setError('')
    onConfirm(trimmedNote)
  }

  const handleNoteChange = event => {
    setNote(event.target.value)
    if (error) {
      setError('')
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='sm'
      fullWidth
      disableEscapeKeyDown={loading}
      sx={{
        '& .MuiDialog-paper': {
          overflow: 'hidden',
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ overflow: 'hidden' }}>
        <Box display='flex' alignItems='center' gap={1}>
          <i className='tabler-clock-off text-2xl text-red-500' />
          <Typography variant='h6'>Clock Out - Work Summary</Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ overflow: 'hidden', overflowY: 'auto' }}>
        <Box sx={{ pt: 1, overflow: 'hidden', width: '100%' }}>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
            Please provide a summary of your work completed today. This will be used as your daily work summary.
          </Typography>
          <Typography variant='caption' color='text.primary' sx={{ mb: 2, display: 'block', fontWeight: 500 }}>
            Clocking out at: {currentTime}
          </Typography>

          {error && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            autoFocus
            fullWidth
            multiline
            rows={4}
            variant='outlined'
            label='Work Summary'
            placeholder='Describe what you accomplished today, tasks completed, meetings attended, etc.'
            value={note}
            onChange={handleNoteChange}
            disabled={loading}
            error={!!error}
            helperText={`${note.length}/500 characters (minimum 10 required)`}
            inputProps={{
              maxLength: 500
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2'
                }
              }
            }}
          />

          <Typography variant='caption' color='text.secondary' sx={{ mt: 1, display: 'block' }}>
            This information will be stored as part of your attendance record and can be used for reporting and
            performance tracking.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, overflow: 'hidden' }}>
        <Button onClick={handleClose} disabled={loading} color='inherit'>
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant='contained'
          color='error'
          disabled={loading || !note.trim()}
          startIcon={loading ? <CircularProgress size={16} /> : <i className='tabler-clock-off' />}
        >
          {loading ? 'Processing...' : 'Clock Out'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ClockOutNoteDialog
