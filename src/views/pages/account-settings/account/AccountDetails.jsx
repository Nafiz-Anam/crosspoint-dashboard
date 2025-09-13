'use client'

// React Imports
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Service Imports
import { profileService } from '@/services/profileService'

// Vars
const initialData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  organization: 'Pixinvent',
  phoneNumber: '+1 (917) 543-9876',
  address: '123 Main St, New York, NY 10001',
  state: 'New York',
  zipCode: '634880',
  country: 'usa'
}

const AccountDetails = () => {
  const { data: session } = useSession()

  // States
  const [formData, setFormData] = useState(initialData)
  const [fileInput, setFileInput] = useState('')
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [profile, setProfile] = useState(null)

  // Fetch profile data on component mount
  useEffect(() => {
    if (session?.accessToken) {
      fetchProfile()
    }
  }, [session?.accessToken])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await profileService.getMyProfile(session.accessToken)
      if (response.success) {
        setProfile(response.data)
        // Split name into first and last name
        const nameParts = response.data.name ? response.data.name.split(' ') : ['', '']
        setFormData({
          firstName: nameParts[0] || '',
          lastName: nameParts[1] || '',
          email: response.data.email || '',
          organization: 'Pixinvent', // Keep static for now
          phoneNumber: '+1 (917) 543-9876', // Keep static for now
          address: '123 Main St, New York, NY 10001', // Keep static for now
          state: 'New York', // Keep static for now
          zipCode: '634880', // Keep static for now
          country: 'usa' // Keep static for now
        })
      }
    } catch (err) {
      console.error('Error fetching profile:', err)
      setError('Failed to fetch profile data')
    } finally {
      setLoading(false)
    }
  }

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError(null)
      setSuccess(null)

      // Combine first and last name for the API
      const fullName = `${formData.firstName} ${formData.lastName}`.trim()

      const response = await profileService.updateMyProfile(
        {
          name: fullName,
          email: formData.email
        },
        session.accessToken
      )

      if (response.success) {
        setProfile(response.data)
        setSuccess('Profile updated successfully!')
        setTimeout(() => setSuccess(null), 3000)
      }
    } catch (err) {
      console.error('Error updating profile:', err)
      setError(err.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleFileInputChange = file => {
    const reader = new FileReader()
    const { files } = file.target

    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setFileInput(reader.result)
      }
    }
  }

  const handleFileInputReset = () => {
    setFileInput('')
    setImgSrc('/images/avatars/1.png')
  }

  if (loading) {
    return (
      <Card>
        <CardContent className='flex justify-center items-center min-h-[400px]'>
          <CircularProgress size={60} />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      {error && (
        <Alert severity='error' sx={{ m: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity='success' sx={{ m: 2 }}>
          {success}
        </Alert>
      )}
      <CardContent className='mbe-4'>
        <div className='flex max-sm:flex-col items-center gap-6'>
          <img height={100} width={100} className='rounded' src={imgSrc} alt='Profile' />
          <div className='flex flex-grow flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button component='label' variant='contained' htmlFor='account-settings-upload-image'>
                Upload New Photo
                <input
                  hidden
                  type='file'
                  value={fileInput}
                  accept='image/png, image/jpeg'
                  onChange={handleFileInputChange}
                  id='account-settings-upload-image'
                />
              </Button>
              <Button variant='tonal' color='secondary' onClick={handleFileInputReset}>
                Reset
              </Button>
            </div>
            <Typography>Allowed JPG, GIF or PNG. Max size of 800K</Typography>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='First Name'
                value={formData.firstName}
                placeholder='John'
                onChange={e => handleFormChange('firstName', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Last Name'
                value={formData.lastName}
                placeholder='Doe'
                onChange={e => handleFormChange('lastName', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Email'
                value={formData.email}
                placeholder='john.doe@gmail.com'
                onChange={e => handleFormChange('email', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Organization'
                value={formData.organization}
                placeholder='Pixinvent'
                onChange={e => handleFormChange('organization', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Phone Number'
                value={formData.phoneNumber}
                placeholder='+1 (234) 567-8901'
                onChange={e => handleFormChange('phoneNumber', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Address'
                value={formData.address}
                placeholder='Address'
                onChange={e => handleFormChange('address', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='State'
                value={formData.state}
                placeholder='New York'
                onChange={e => handleFormChange('state', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                type='number'
                label='Zip Code'
                value={formData.zipCode}
                placeholder='123456'
                onChange={e => handleFormChange('zipCode', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                select
                fullWidth
                label='Country'
                value={formData.country}
                onChange={e => handleFormChange('country', e.target.value)}
              >
                <MenuItem value='usa'>USA</MenuItem>
                <MenuItem value='uk'>UK</MenuItem>
                <MenuItem value='australia'>Australia</MenuItem>
                <MenuItem value='germany'>Germany</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid size={{ xs: 12 }} className='flex gap-4 flex-wrap'>
              <Button
                variant='contained'
                onClick={handleSave}
                disabled={saving}
                startIcon={saving ? <CircularProgress size={16} /> : null}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                variant='tonal'
                type='reset'
                color='secondary'
                onClick={() => {
                  if (profile) {
                    const nameParts = profile.name ? profile.name.split(' ') : ['', '']
                    setFormData({
                      firstName: nameParts[0] || '',
                      lastName: nameParts[1] || '',
                      email: profile.email || '',
                      organization: 'Pixinvent',
                      phoneNumber: '+1 (917) 543-9876',
                      address: '123 Main St, New York, NY 10001',
                      state: 'New York',
                      zipCode: '634880',
                      country: 'usa'
                    })
                  }
                }}
                disabled={saving}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default AccountDetails
