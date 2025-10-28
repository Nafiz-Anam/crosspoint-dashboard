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

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

const AddBankAccountDrawer = ({ open, onClose, onAdd }) => {
  // Hooks
  const { t } = useTranslation()

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
      newErrors.bankName = t('paymentMethods.bankNameRequired')
    }

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = t('paymentMethods.accountNumberRequired')
    }

    if (!formData.accountName.trim()) {
      newErrors.accountName = t('paymentMethods.accountNameRequired')
    }

    if (formData.bankIban && (formData.bankIban.length < 15 || formData.bankIban.length > 34)) {
      newErrors.bankIban = t('paymentMethods.ibanLengthInvalid')
    }

    if (formData.bankSwiftCode && formData.bankSwiftCode.length > 11) {
      newErrors.bankSwiftCode = t('paymentMethods.swiftCodeLengthInvalid')
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
      accountNumber: '',
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
            {t('paymentMethods.addNewPaymentMethod')}
          </Typography>
          <Button variant='text' onClick={handleClose} startIcon={<i className='tabler-x' />}>
            {t('common.close')}
          </Button>
        </Box>

        {/* Form */}
        <Box component='form' onSubmit={handleSubmit} className='flex-1 p-6'>
          <Box className='space-y-4'>
            <CustomTextField
              fullWidth
              label={t('paymentMethods.fields.bankName')}
              value={formData.bankName}
              onChange={handleChange('bankName')}
              error={!!errors.bankName}
              helperText={errors.bankName}
              placeholder={t('paymentMethods.enterBankName')}
            />

            <CustomTextField
              fullWidth
              label={t('paymentMethods.fields.accountNumber')}
              value={formData.accountNumber}
              onChange={handleChange('accountNumber')}
              error={!!errors.accountNumber}
              helperText={errors.accountNumber}
              placeholder={t('paymentMethods.enterAccountNumber')}
              required
            />

            <CustomTextField
              fullWidth
              label={t('paymentMethods.fields.name')}
              value={formData.accountName}
              onChange={handleChange('accountName')}
              error={!!errors.accountName}
              helperText={errors.accountName}
              placeholder={t('paymentMethods.enterName')}
              required
            />

            <CustomTextField
              fullWidth
              label={`${t('paymentMethods.fields.iban')} (${t('paymentMethods.optional')})`}
              value={formData.bankIban}
              onChange={handleChange('bankIban')}
              error={!!errors.bankIban}
              helperText={errors.bankIban || t('paymentMethods.optionalIban')}
              placeholder={t('paymentMethods.enterIban')}
              sx={{ fontFamily: 'monospace' }}
            />

            <CustomTextField
              fullWidth
              label={`${t('paymentMethods.fields.swiftCode')} (${t('paymentMethods.optional')})`}
              value={formData.bankSwiftCode}
              onChange={handleChange('bankSwiftCode')}
              error={!!errors.bankSwiftCode}
              helperText={errors.bankSwiftCode || t('paymentMethods.optionalSwiftCode')}
              placeholder={t('paymentMethods.enterSwiftCode')}
              sx={{ fontFamily: 'monospace' }}
            />

            {/* Status defaults to Active in backend; no toggle needed */}
          </Box>
        </Box>

        {/* Footer */}
        <Box className='flex items-center justify-end gap-3 p-6 border-t'>
          <Button variant='outlined' onClick={handleClose} disabled={loading}>
            {t('paymentMethods.cancel')}
          </Button>
          <Button
            type='submit'
            variant='contained'
            onClick={handleSubmit}
            disabled={loading}
            startIcon={loading ? <i className='tabler-loader-2 animate-spin' /> : <i className='tabler-plus' />}
          >
            {loading ? t('paymentMethods.creating') : t('paymentMethods.create')}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default AddBankAccountDrawer
