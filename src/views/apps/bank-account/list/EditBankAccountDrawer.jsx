'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import toastService from '@/services/toastService'

const EditBankAccountDrawer = ({ open, onClose, onEdit, bankAccount, loading = false }) => {
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

  // Update form data when bankAccount prop changes
  useEffect(() => {
    if (bankAccount) {
      const newFormData = {
        bankName: bankAccount.bankName || '',
        bankCountry: bankAccount.bankCountry || '',
        bankIban: bankAccount.bankIban || '',
        bankSwiftCode: bankAccount.bankSwiftCode || '',
        accountName: bankAccount.accountName || '',
        isActive: bankAccount.isActive !== undefined ? bankAccount.isActive : true
      }
      setFormData(newFormData)
    }
  }, [bankAccount])

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

    if (formData.accountName && formData.accountName.length > 100) {
      newErrors.accountName = 'Account name cannot exceed 100 characters'
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

    try {
      await onEdit(formData)
      handleClose()
    } catch (error) {
      console.error('Error editing bank account:', error)
      await toastService.handleApiError(error, 'Failed to edit bank account')
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
            Edit Bank Account
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
              required
            />

            <CustomTextField
              fullWidth
              label='Bank Country'
              value={formData.bankCountry}
              onChange={handleChange('bankCountry')}
              error={!!errors.bankCountry}
              helperText={errors.bankCountry}
              placeholder='Enter country'
              required
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
              required
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
            startIcon={loading ? <CircularProgress size={16} /> : null}
          >
            {loading ? 'Updating...' : 'Update Bank Account'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default EditBankAccountDrawer
