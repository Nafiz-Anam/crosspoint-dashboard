'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Avatar,
  Alert
} from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import { useTranslation } from '@/hooks/useTranslation'

const CompanyInfoSection = ({ companyInfo, onCompanyInfoChange, isEditable = false, showEditButton = true, onResetCompanyInfo = null }) => {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(companyInfo || {})
  const [logoPreview, setLogoPreview] = useState(null)
  const fileInputRef = useRef(null)

  const defaultCompanyInfo = {
    companyName: 'Crosspoint',
    tagline: t('common.toMakeABetterCommunity'),
    address: 'Office 149, 450 South Brand Brooklyn',
    city: 'San Diego County, CA 91905, USA',
    phone: '+1 (123) 456 7891, +44 (876) 543 2198',
    email: 'info@crosspoint.com',
    website: 'www.crosspoint.com',
    logo: '/images/logos/main_logo.png' // Keep default local logo
  }

  // Only use companyInfo if it has actual values, otherwise use defaults
  const hasCompanyInfo = companyInfo && Object.keys(companyInfo).length > 0 && companyInfo.companyName
  const currentInfo = hasCompanyInfo ? { ...defaultCompanyInfo, ...companyInfo } : defaultCompanyInfo

  // Debug logging
  console.log('CompanyInfoSection - companyInfo prop:', companyInfo)
  console.log('CompanyInfoSection - hasCompanyInfo:', hasCompanyInfo)
  console.log('CompanyInfoSection - defaultCompanyInfo:', defaultCompanyInfo)
  console.log('CompanyInfoSection - currentInfo:', currentInfo)
  console.log('CompanyInfoSection - currentInfo.logo:', currentInfo.logo)

  // Update editData when companyInfo prop changes
  useEffect(() => {
    console.log('CompanyInfoSection - Received companyInfo:', companyInfo)
    setEditData(companyInfo || {})
  }, [companyInfo])

  const handleEdit = () => {
    setEditData(currentInfo)
    setIsEditing(true)
  }

  const handleSave = () => {
    onCompanyInfoChange(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset edit data to current info (discard unsaved changes in dialog)
    setEditData(currentInfo)
    setIsEditing(false)
    setLogoPreview(null)
    // Note: This only cancels the dialog edit, not the saved company info
    // If user wants to reset to defaults, they can use the "Reset to Defaults" button
    // Or navigate away and come back (which will reset to defaults on mount)
  }
  
  // Handle reset to defaults - resets company info to default values
  const handleResetToDefaults = () => {
    if (onResetCompanyInfo) {
      onResetCompanyInfo()
      // Update edit data to show defaults in the dialog
      setEditData(defaultCompanyInfo)
      setLogoPreview(null)
    }
  }

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleLogoUpload = event => {
    const file = event.target.files[0]
    if (file) {
      // Simple file reader - no processing
      const reader = new FileReader()
      reader.onload = e => {
        setLogoPreview(e.target.result)
        setEditData(prev => ({
          ...prev,
          logo: e.target.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogoClick = () => {
    if (isEditing) {
      fileInputRef.current?.click()
    }
  }

  return (
    <>
      <Box className='flex flex-col gap-6'>
        {/* Logo Section */}
        <Box className='flex items-center gap-2.5'>
          {currentInfo.logo ? (
            <img
              src={currentInfo.logo}
              alt={`${currentInfo.companyName} logo`}
              style={{
                maxWidth: 80,
                maxHeight: 80,
                cursor: isEditing ? 'pointer' : 'default',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                display: 'block',
                objectFit: 'contain'
              }}
              onClick={handleLogoClick}
            />
          ) : (
            <Box
              sx={{
                width: 80,
                height: 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed #ccc',
                borderRadius: 1,
                cursor: isEditing ? 'pointer' : 'default',
                backgroundColor: '#f5f5f5',
                '&:hover': isEditing ? { opacity: 0.8 } : {}
              }}
              onClick={handleLogoClick}
            >
              <Typography variant='h6' color='text.secondary'>
                {currentInfo.companyName?.charAt(0) || 'C'}
              </Typography>
            </Box>
          )}
          {isEditing && (
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handleLogoUpload}
              style={{ display: 'none' }}
            />
          )}
        </Box>

        {/* Company Information */}
        <Box>
          <Typography variant='h6' color='text.primary' sx={{ mb: 1 }}>
            {currentInfo.companyName}
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
            {currentInfo.tagline}
          </Typography>
          <Typography color='text.primary' sx={{ mb: 0.5 }}>
            {currentInfo.address}
          </Typography>
          <Typography color='text.primary' sx={{ mb: 0.5 }}>
            {currentInfo.city}
          </Typography>
          <Typography color='text.primary' sx={{ mb: 0.5 }}>
            {currentInfo.phone}
          </Typography>
          {currentInfo.email && (
            <Typography color='text.primary' sx={{ mb: 0.5 }}>
              {currentInfo.email}
            </Typography>
          )}
          {currentInfo.website && <Typography color='text.primary'>{currentInfo.website}</Typography>}
        </Box>

        {/* Edit Button */}
        {showEditButton && !isEditing && (
          <Button
            variant='outlined'
            size='small'
            startIcon={<i className='tabler-edit' />}
            onClick={handleEdit}
            sx={{ alignSelf: 'flex-start' }}
          >
            {t('common.editCompanyInfo')}
          </Button>
        )}
      </Box>

      {/* Edit Dialog */}
      <Dialog 
        open={isEditing} 
        onClose={handleCancel} 
        maxWidth='md' 
        fullWidth
        scroll='body'
        closeAfterTransition={false}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogCloseButton onClick={handleCancel} disableRipple>
          <i className='tabler-x' />
        </DialogCloseButton>
        <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-6'>
          <Box display='flex' alignItems='center' justifyContent='center' gap={1}>
            <i className='tabler-building text-2xl text-primary' />
            <Typography variant='h4'>{t('common.editCompanyInfo')}</Typography>
          </Box>
        </DialogTitle>

        <DialogContent className='pbs-0 sm:pli-6'>
          <Grid container spacing={6}>
            {/* Logo Upload Section */}
            <Grid size={{ xs: 12 }}>
              <Typography variant='subtitle2' sx={{ mb: 2, fontWeight: 600 }}>
                {t('common.companyLogo')}
              </Typography>
              <Box display='flex' alignItems='flex-start' gap={3} flexWrap='wrap'>
                {logoPreview || editData.logo ? (
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      cursor: 'pointer',
                      overflow: 'hidden',
                      backgroundColor: 'background.paper',
                      '&:hover': {
                        opacity: 0.8
                      }
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <img
                      src={logoPreview || editData.logo}
                      alt='Company logo'
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        display: 'block'
                      }}
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px dashed',
                      borderColor: 'divider',
                      borderRadius: 2,
                      cursor: 'pointer',
                      backgroundColor: 'action.hover',
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'action.selected'
                      }
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Typography variant='h4' color='text.secondary'>
                      {editData.companyName?.charAt(0) || 'C'}
                    </Typography>
                  </Box>
                )}
                <Box display='flex' flexDirection='column' gap={1}>
                  <Button
                    variant='outlined'
                    startIcon={<i className='tabler-upload' />}
                    onClick={() => fileInputRef.current?.click()}
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    {t('common.uploadLogo')}
                  </Button>
                  <Typography variant='caption' color='text.secondary'>
                    {t('common.recommendedSize')}
                  </Typography>
                </Box>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  onChange={handleLogoUpload}
                  style={{ display: 'none' }}
                />
              </Box>
            </Grid>

            {/* Company Details */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label={t('common.companyName')}
                value={editData.companyName || ''}
                onChange={e => handleInputChange('companyName', e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label={t('common.tagline')}
                value={editData.tagline || ''}
                onChange={e => handleInputChange('tagline', e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <CustomTextField
                fullWidth
                label={t('common.address')}
                value={editData.address || ''}
                onChange={e => handleInputChange('address', e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label={t('common.cityStateZip')}
                value={editData.city || ''}
                onChange={e => handleInputChange('city', e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label={t('common.phoneNumbers')}
                value={editData.phone || ''}
                onChange={e => handleInputChange('phone', e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label={t('common.email')}
                type='email'
                value={editData.email || ''}
                onChange={e => handleInputChange('email', e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label={t('common.website')}
                value={editData.website || ''}
                onChange={e => handleInputChange('website', e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions className='flex gap-2 justify-end pbs-0 sm:pbe-6 sm:pli-6'>
          <Button onClick={handleCancel} color='inherit' variant='outlined'>
            {t('common.cancel')}
          </Button>
          {onResetCompanyInfo && (
            <Button onClick={handleResetToDefaults} color='warning' variant='outlined'>
              {t('common.resetToDefaults')}
            </Button>
          )}
          <Button onClick={handleSave} variant='contained' color='primary'>
            {t('common.saveChanges')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CompanyInfoSection
