'use client'

import React from 'react'
import { Button, Box, Typography, Grid } from '@mui/material'
import toastService from '@/services/toastService'

/**
 * Example component demonstrating how to use the toast system
 * This can be used as a reference for implementing toasts in other components
 */
const ToastExample = () => {
  const handleSuccessToast = () => {
    toastService.showSuccess('This is a success message!')
  }

  const handleErrorToast = () => {
    toastService.showError('This is an error message!')
  }

  const handleWarningToast = () => {
    toastService.showWarning('This is a warning message!')
  }

  const handleInfoToast = () => {
    toastService.showInfo('This is an info message!')
  }

  const handleApiError = async () => {
    // Simulate an API error
    const mockError = {
      response: {
        data: {
          message: 'This is a simulated API error message'
        }
      }
    }

    await toastService.handleApiError(mockError, 'Failed to fetch data')
  }

  const handleAuthError = async () => {
    // Simulate an authentication error
    const mockAuthError = {
      message: 'Please authenticate'
    }

    await toastService.handleApiError(mockAuthError, 'Authentication failed')
  }

  const handleApiSuccess = () => {
    toastService.handleApiSuccess('created', 'User')
  }

  const handleAsyncOperation = async () => {
    const mockApiCall = () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ data: 'Success!' })
        }, 2000)
      })
    }

    try {
      await toastService.handleAsyncOperation(mockApiCall, {
        loadingMessage: 'Processing your request...',
        successMessage: 'Operation completed successfully!',
        errorMessage: 'Operation failed',
        showLoading: true
      })
    } catch (error) {
      // Error is already handled by handleAsyncOperation
    }
  }

  const clearAllToasts = () => {
    toastService.clearAllToasts()
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant='h4' gutterBottom>
        Toast System Examples
      </Typography>

      <Typography variant='body1' sx={{ mb: 4 }}>
        Click the buttons below to see different types of toast notifications.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Button variant='contained' color='success' fullWidth onClick={handleSuccessToast}>
            Success Toast
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Button variant='contained' color='error' fullWidth onClick={handleErrorToast}>
            Error Toast
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Button variant='contained' color='warning' fullWidth onClick={handleWarningToast}>
            Warning Toast
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Button variant='contained' color='info' fullWidth onClick={handleInfoToast}>
            Info Toast
          </Button>
        </Grid>

         <Grid item xs={12} sm={6} md={3}>
           <Button variant='outlined' color='error' fullWidth onClick={handleApiError}>
             API Error Toast
           </Button>
         </Grid>

         <Grid item xs={12} sm={6} md={3}>
           <Button variant='outlined' color='warning' fullWidth onClick={handleAuthError}>
             Auth Error Toast
           </Button>
         </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Button variant='outlined' color='success' fullWidth onClick={handleApiSuccess}>
            API Success Toast
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Button variant='outlined' color='primary' fullWidth onClick={handleAsyncOperation}>
            Async Operation
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Button variant='outlined' color='secondary' fullWidth onClick={clearAllToasts}>
            Clear All Toasts
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant='h6' gutterBottom>
          Usage Examples:
        </Typography>

        <Typography
          variant='body2'
          component='pre'
          sx={{
            backgroundColor: '#f5f5f5',
            p: 2,
            borderRadius: 1,
            overflow: 'auto'
          }}
        >
          {`// Basic toast notifications
import { toastService } from '@/services/toastService'

// Success
toastService.showSuccess('Operation completed successfully!')

// Error
toastService.showError('Something went wrong!')

// Warning
toastService.showWarning('Please check your input!')

// Info
toastService.showInfo('Here is some information!')

// Handle API errors
await toastService.handleApiError(error, 'Failed to fetch data')

// Handle API success
toastService.handleApiSuccess('created', 'User')

// Async operations with loading
await toastService.handleAsyncOperation(apiCall, {
  loadingMessage: 'Processing...',
  successMessage: 'Success!',
  errorMessage: 'Failed!',
  showLoading: true
})`}
        </Typography>
      </Box>
    </Box>
  )
}

export default ToastExample
