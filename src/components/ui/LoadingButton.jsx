'use client'

// React Imports
import { forwardRef } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

// Component Imports
import { styled } from '@mui/material/styles'

// Styled Button with enhanced states
const StyledButton = styled(Button)(({ theme, variant, color }) => ({
  position: 'relative',
  minHeight: '40px',
  transition: 'all 0.2s ease-in-out',

  // Normal state
  '&:not(:disabled)': {
    boxShadow: variant === 'contained' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
  },

  // Hover state
  '&:hover:not(:disabled)': {
    transform: 'translateY(-1px)',
    boxShadow: variant === 'contained' ? '0 4px 8px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)'
  },

  // Active state
  '&:active:not(:disabled)': {
    transform: 'translateY(0)',
    boxShadow: variant === 'contained' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
  },

  // Loading state - using data attribute
  '&[data-loading="true"]': {
    '& .MuiButton-startIcon, & .MuiButton-endIcon': {
      opacity: 0
    },
    '& .MuiButton-startIcon + .MuiButton-endIcon': {
      opacity: 0
    }
  },

  // Disabled state
  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: 'none'
  },

  // Color-specific hover effects
  ...(color === 'primary' && {
    '&:hover:not(:disabled)': {
      backgroundColor: variant === 'contained' ? theme.palette.primary.dark : theme.palette.primary.light
    }
  }),

  ...(color === 'error' && {
    '&:hover:not(:disabled)': {
      backgroundColor: variant === 'contained' ? theme.palette.error.dark : theme.palette.error.light
    }
  }),

  ...(color === 'success' && {
    '&:hover:not(:disabled)': {
      backgroundColor: variant === 'contained' ? theme.palette.success.dark : theme.palette.success.light
    }
  }),

  ...(color === 'warning' && {
    '&:hover:not(:disabled)': {
      backgroundColor: variant === 'contained' ? theme.palette.warning.dark : theme.palette.warning.light
    }
  })
}))

// Loading Spinner Component
const LoadingSpinner = ({ size = 20, color = 'inherit' }) => (
  <Box
    sx={{
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <CircularProgress size={size} color={color} thickness={4} />
  </Box>
)

// Main LoadingButton Component
const LoadingButton = forwardRef(
  (
    {
      loading = false,
      loadingText = 'Loading...',
      children,
      disabled = false,
      startIcon,
      endIcon,
      size = 'medium',
      variant = 'contained',
      color = 'primary',
      fullWidth = false,
      sx = {},
      ...props
    },
    ref
  ) => {
    // Determine if button should be disabled
    const isDisabled = disabled || loading

    // Get spinner color based on variant
    const getSpinnerColor = () => {
      if (variant === 'contained') {
        return 'inherit'
      }
      return color === 'inherit' ? 'primary' : color
    }

    // Get spinner size based on button size
    const getSpinnerSize = () => {
      switch (size) {
        case 'small':
          return 16
        case 'large':
          return 24
        default:
          return 20
      }
    }

    // Destructure loading from props to prevent it from being passed to DOM
    const { loading: _, ...buttonProps } = props

    return (
      <StyledButton
        ref={ref}
        disabled={isDisabled}
        variant={variant}
        color={color}
        size={size}
        fullWidth={fullWidth}
        startIcon={!loading ? startIcon : undefined}
        endIcon={!loading ? endIcon : undefined}
        data-loading={loading.toString()}
        sx={{
          ...sx,
          // Ensure text is visible during loading
          ...(loading && {
            color: variant === 'contained' ? 'inherit' : 'text.primary'
          })
        }}
        {...buttonProps}
      >
        {loading && <LoadingSpinner size={getSpinnerSize()} color={getSpinnerColor()} />}
        <Box
          sx={{
            opacity: loading ? 0 : 1,
            transition: 'opacity 0.2s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          {loading ? loadingText : children}
        </Box>
      </StyledButton>
    )
  }
)

// Set display name for debugging
LoadingButton.displayName = 'LoadingButton'

export default LoadingButton
