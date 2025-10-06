'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Typography,
  TextField,
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
import { useTranslation } from '@/hooks/useTranslation'

const CompanyInfoSection = ({ companyInfo, onCompanyInfoChange, isEditable = false, showEditButton = true }) => {
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
    setEditData(currentInfo)
    setIsEditing(false)
    setLogoPreview(null)
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
      <Dialog open={isEditing} onClose={handleCancel} maxWidth='md' fullWidth>
        <DialogTitle>
          <Box display='flex' alignItems='center' gap={1}>
            <i className='tabler-building text-2xl text-primary' />
            <Typography variant='h6'>{t('common.editCompanyInfo')}</Typography>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {/* Logo Upload */}
            <Grid item xs={12}>
              <Typography variant='subtitle2' sx={{ mb: 2 }}>
                {t('common.companyLogo')}
              </Typography>
              <Box display='flex' alignItems='center' gap={2}>
                {logoPreview || editData.logo ? (
                  <img
                    src={logoPreview || editData.logo}
                    alt='Company logo'
                    style={{
                      maxWidth: 80,
                      maxHeight: 80,
                      cursor: 'pointer',
                      backgroundColor: 'transparent',
                      border: 'none',
                      outline: 'none',
                      display: 'block',
                      objectFit: 'contain'
                    }}
                    onClick={() => fileInputRef.current?.click()}
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
                      cursor: 'pointer',
                      backgroundColor: '#f5f5f5'
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Typography variant='h6' color='text.secondary'>
                      {editData.companyName?.charAt(0) || 'C'}
                    </Typography>
                  </Box>
                )}
                <Box>
                  <Button
                    variant='outlined'
                    startIcon={<i className='tabler-upload' />}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {t('common.uploadLogo')}
                  </Button>
                  <Typography variant='caption' color='text.secondary' display='block' sx={{ mt: 1 }}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('common.companyName')}
                value={editData.companyName || ''}
                onChange={e => handleInputChange('companyName', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('common.tagline')}
                value={editData.tagline || ''}
                onChange={e => handleInputChange('tagline', e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('common.address')}
                value={editData.address || ''}
                onChange={e => handleInputChange('address', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('common.cityStateZip')}
                value={editData.city || ''}
                onChange={e => handleInputChange('city', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('common.phoneNumbers')}
                value={editData.phone || ''}
                onChange={e => handleInputChange('phone', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('common.email')}
                type='email'
                value={editData.email || ''}
                onChange={e => handleInputChange('email', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('common.website')}
                value={editData.website || ''}
                onChange={e => handleInputChange('website', e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCancel} color='inherit'>
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSave} variant='contained'>
            {t('common.saveChanges')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CompanyInfoSection
