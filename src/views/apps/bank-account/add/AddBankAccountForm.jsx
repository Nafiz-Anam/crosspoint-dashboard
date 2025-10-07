'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

const AddBankAccountForm = ({ onSubmit, loading = false }) => {
  // States
  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    bankIban: '',
    bankSwiftCode: '',
    accountName: '',
    isActive: true
  })
  const [errors, setErrors] = useState({})

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

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required'
    }

    if (!formData.accountName.trim()) {
      newErrors.accountName = 'Account name is required'
    }

    if (formData.bankIban && (formData.bankIban.length < 15 || formData.bankIban.length > 34)) {
      newErrors.bankIban = 'IBAN must be between 15 and 34 characters'
    }

    if (formData.bankSwiftCode && formData.bankSwiftCode.length > 11) {
      newErrors.bankSwiftCode = 'SWIFT code cannot exceed 11 characters'
    }

    if (formData.accountName && formData.accountName.length > 100) {
      newErrors.accountName = 'Account name cannot exceed 100 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = event => {
    event.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' sx={{ mb: 4 }}>
          Bank Account Information
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            {/* Bank Name */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label='Bank Name'
                value={formData.bankName}
                onChange={handleChange('bankName')}
                error={!!errors.bankName}
                helperText={errors.bankName}
                required
              />
            </Grid>

            {/* Account Name */}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label='Account Name'
                value={formData.accountName}
                onChange={handleChange('accountName')}
                error={!!errors.accountName}
                helperText={errors.accountName}
                placeholder='John Doe'
                required
              />
            </Grid>

            {/* Account Number */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label='Account Number'
                value={formData.accountNumber}
                onChange={handleChange('accountNumber')}
                error={!!errors.accountNumber}
                helperText={errors.accountNumber || 'Bank account number'}
                placeholder='Enter account number'
                required
              />
            </Grid>

            {/* Bank IBAN */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label='Bank IBAN (Optional)'
                value={formData.bankIban}
                onChange={handleChange('bankIban')}
                error={!!errors.bankIban}
                helperText={errors.bankIban || 'Optional - International Bank Account Number'}
                placeholder='GB82WEST12345698765432'
              />
            </Grid>

            {/* Bank SWIFT Code */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label='Bank SWIFT Code (Optional)'
                value={formData.bankSwiftCode}
                onChange={handleChange('bankSwiftCode')}
                error={!!errors.bankSwiftCode}
                helperText={errors.bankSwiftCode || 'Optional - Bank Identifier Code'}
                placeholder='DEUTDEFF'
              />
            </Grid>

            {/* Active Status */}
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={<Switch checked={formData.isActive} onChange={handleChange('isActive')} color='primary' />}
                label='Active Account'
              />
            </Grid>

            {/* Submit Buttons */}
            <Grid size={{ xs: 12 }}>
              <Box display='flex' gap={2} justifyContent='flex-end'>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <i className='tabler-check' />}
                >
                  {loading ? 'Adding...' : 'Add Bank Account'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default AddBankAccountForm
