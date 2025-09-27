'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import toastService from '@/services/toastService'

const AddBankAccountDrawer = ({ open, onClose, onAdd }) => {
  // States
  const [formData, setFormData] = useState({
    bankName: '',
    bankCountry: '',
    bankIban: '',
    bankSwiftCode: '',
    accountName: '',
    isActive: true
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Handle input change
  const handleChange = field => event => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Bank name is required'
    }

    if (!formData.bankCountry.trim()) {
      newErrors.bankCountry = 'Bank country is required'
    }

    if (!formData.bankIban.trim()) {
      newErrors.bankIban = 'IBAN is required'
    } else if (formData.bankIban.length < 15 || formData.bankIban.length > 34) {
      newErrors.bankIban = 'IBAN must be between 15 and 34 characters'
    }

    if (formData.bankSwiftCode && formData.bankSwiftCode.length < 8) {
      newErrors.bankSwiftCode = 'SWIFT code must be at least 8 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submit
  const handleSubmit = async event => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      await onAdd(formData)
      handleClose()
    } catch (error) {
      console.error('Error adding bank account:', error)
      await toastService.handleApiError(error, 'Failed to add bank account')
    } finally {
      setLoading(false)
    }
  }

  // Handle close
  const handleClose = () => {
    setFormData({
      bankName: '',
      bankCountry: '',
      bankIban: '',
      bankSwiftCode: '',
      accountName: '',
      isActive: true
    })
    setErrors({})
    onClose()
  }

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor='right'
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 } }
      }}
    >
      <Box className='flex flex-col h-full'>
        {/* Header */}
        <Box className='flex items-center justify-between p-6 border-b'>
          <Typography variant='h5' sx={{ fontWeight: 600 }}>
            Add Bank Account
          </Typography>
          <Button variant='text' onClick={handleClose} startIcon={<i className='tabler-x' />}>
            Close
          </Button>
        </Box>

        {/* Form */}
        <Box component='form' onSubmit={handleSubmit} className='flex-1 p-6'>
          <Box className='space-y-4'>
            <CustomTextField
              fullWidth
              label='Bank Name'
              value={formData.bankName}
              onChange={handleChange('bankName')}
              error={!!errors.bankName}
              helperText={errors.bankName}
              placeholder='Enter bank name'
            />

            <CustomTextField
              fullWidth
              label='Bank Country'
              value={formData.bankCountry}
              onChange={handleChange('bankCountry')}
              error={!!errors.bankCountry}
              helperText={errors.bankCountry}
              placeholder='Enter country'
            />

            <CustomTextField
              fullWidth
              label='IBAN'
              value={formData.bankIban}
              onChange={handleChange('bankIban')}
              error={!!errors.bankIban}
              helperText={errors.bankIban || 'International Bank Account Number'}
              placeholder='Enter IBAN'
              sx={{ fontFamily: 'monospace' }}
            />

            <CustomTextField
              fullWidth
              label='SWIFT Code'
              value={formData.bankSwiftCode}
              onChange={handleChange('bankSwiftCode')}
              error={!!errors.bankSwiftCode}
              helperText={errors.bankSwiftCode || 'Optional - Bank Identifier Code'}
              placeholder='Enter SWIFT code'
              sx={{ fontFamily: 'monospace' }}
            />

            <CustomTextField
              fullWidth
              label='Account Name'
              value={formData.accountName}
              onChange={handleChange('accountName')}
              error={!!errors.accountName}
              helperText={errors.accountName || 'Optional - Account holder name'}
              placeholder='Enter account holder name'
            />

            <Divider />

            <FormControl>
              <FormControlLabel
                control={<Switch checked={formData.isActive} onChange={handleChange('isActive')} color='primary' />}
                label='Active'
              />
            </FormControl>
          </Box>
        </Box>

        {/* Footer */}
        <Box className='flex items-center justify-end gap-3 p-6 border-t'>
          <Button variant='outlined' onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type='submit'
            variant='contained'
            onClick={handleSubmit}
            disabled={loading}
            startIcon={loading ? <i className='tabler-loader-2 animate-spin' /> : <i className='tabler-plus' />}
          >
            {loading ? 'Adding...' : 'Add Bank Account'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default AddBankAccountDrawer
