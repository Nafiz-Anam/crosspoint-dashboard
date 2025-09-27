'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Component Imports
import DialogCloseButton from './DialogCloseButton'

const DeleteConfirmationDialog = ({ open, setOpen, onConfirm, title, message, itemName, loading = false }) => {
  const handleClose = () => {
    if (!loading) {
      setOpen(false)
    }
  }

  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      scroll='body'
      open={open}
      onClose={handleClose}
      closeAfterTransition={false}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={handleClose} disableRipple disabled={loading}>
        <i className='tabler-x' />
      </DialogCloseButton>

      <DialogTitle
        variant='h4'
        className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'
        sx={{ color: '#000000' }}
      >
        <Box className='flex justify-center mb-2'>
          <Box
            className='flex items-center justify-center w-16 h-16 rounded-full'
            sx={{
              backgroundColor: '#f44336',
              color: '#ffffff'
            }}
          >
            <i className='tabler-trash text-2xl' />
          </Box>
        </Box>
        {title || 'Delete Confirmation'}
        <Typography component='span' className='flex flex-col text-center text-textSecondary'>
          {message || `Are you sure you want to delete "${itemName}"? This action cannot be undone.`}
        </Typography>
      </DialogTitle>

      <DialogContent className='pbs-0 sm:pli-16'>
        <Box
          className='flex flex-col items-center gap-4 p-4 rounded-lg'
          sx={{
            backgroundColor: 'rgba(255, 171, 29, 0.1)',
            color: '#FFAB1D',
            border: '1px solid rgba(255, 171, 29, 0.3)'
          }}
        >
          <Typography variant='body2' className='text-center font-medium flex items-center gap-2'>
            <i className='tabler-alert-triangle text-lg' />
            This action is permanent and cannot be reversed.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions className='pbs-0 sm:pbe-16 sm:pli-16 flex justify-center gap-3'>
        <Button variant='tonal' color='secondary' onClick={handleClose} disabled={loading} className='capitalize'>
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={handleConfirm}
          disabled={loading}
          startIcon={loading ? <i className='tabler-loader-2 animate-spin' /> : <i className='tabler-trash' />}
          className='capitalize'
          sx={{
            backgroundColor: '#f44336',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#d32f2f'
            },
            '&:disabled': {
              backgroundColor: 'rgba(244, 67, 54, 0.3)',
              color: 'rgba(255, 255, 255, 0.3)'
            }
          }}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirmationDialog
