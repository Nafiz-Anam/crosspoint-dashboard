'use client'

// React Imports
import { useState, useEffect, useCallback, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

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
  firstName: '',
  lastName: '',
  email: '',
  employeeId: '',
  nationalIdentificationNumber: '',
  dateOfBirth: '',
  role: '',
  branch: '',
  isEmailVerified: false,
  isActive: true
}

const AccountDetails = () => {
  const { data: session } = useSession()
  const router = useRouter()

  // States
  const [formData, setFormData] = useState(initialData)
  const [fileInput, setFileInput] = useState('')
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [profile, setProfile] = useState(null)
  const [userId, setUserId] = useState(null)
  const [currentUserRole, setCurrentUserRole] = useState(null)
  const [isOwnProfile, setIsOwnProfile] = useState(false)

  // Refs
  const fileInputRef = useRef(null)

  // Helper functions for role-based field restrictions
  const canEditEmail = () => {
    if (!profile) return false

    // Get the current user's role (from session or profile if viewing own profile)
    const loggedInUserRole = currentUserRole || (isOwnProfile ? profile.role : null)

    console.log('canEditEmail debug:', {
      currentUserRole,
      profileRole: profile.role,
      isOwnProfile,
      sessionUserRole: session?.user?.roles,
      loggedInUserRole
    })

    // Only Admin can edit email (for everyone including themselves)
    if (loggedInUserRole === 'ADMIN') return true

    // Everyone else cannot edit email
    return false
  }

  const canEditRole = () => {
    if (!profile) return false

    // Get the current user's role (from session or profile if viewing own profile)
    const loggedInUserRole = currentUserRole || (isOwnProfile ? profile.role : null)

    console.log('canEditRole debug:', {
      currentUserRole,
      profileRole: profile.role,
      isOwnProfile,
      sessionUserRole: session?.user?.roles,
      loggedInUserRole
    })

    // Only Admin can edit role (for everyone including themselves)
    if (loggedInUserRole === 'ADMIN') return true

    // Everyone else cannot edit role
    return false
  }

  // Get user ID from URL parameters or use logged-in user's ID
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('userId') || urlParams.get('id')
    if (id) {
      setUserId(id)
      setIsOwnProfile(false) // Viewing another user's profile
    } else if (session?.user?.id) {
      // If no userId in URL, use the logged-in user's ID
      setUserId(session.user.id)
      setIsOwnProfile(true) // Viewing own profile
    }
  }, [session?.user?.id])

  // Set current user role from session or profile data
  useEffect(() => {
    console.log('Session debug:', {
      session: session,
      user: session?.user,
      roles: session?.user?.roles,
      role: session?.user?.role
    })

    if (session?.user?.roles) {
      setCurrentUserRole(session.user.roles)
    } else if (session?.user?.role) {
      setCurrentUserRole(session.user.role)
    } else if (profile && isOwnProfile) {
      // If we're viewing our own profile and role is not in session, get it from profile
      setCurrentUserRole(profile.role)
    }
  }, [session?.user?.roles, session?.user?.role, profile, isOwnProfile])

  // Also set role when profile is loaded and we're viewing own profile
  useEffect(() => {
    if (profile && isOwnProfile && !currentUserRole) {
      setCurrentUserRole(profile.role)
    }
  }, [profile, isOwnProfile, currentUserRole])

  // Fetch profile data on component mount
  useEffect(() => {
    if (session?.accessToken && userId) {
      fetchProfile()
    }
  }, [session?.accessToken, userId])

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch specific user data by ID
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/${userId}`, {
        method: 'GET',
        headers: {
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      if (response.ok) {
        const responseData = await response.json()
        setProfile(responseData)

        // Split name into first and last name
        const nameParts = responseData.name ? responseData.name.split(' ') : ['', '']
        setFormData({
          firstName: nameParts[0] || '',
          lastName: nameParts[1] || '',
          email: responseData.email || '',
          employeeId: responseData.employeeId || '',
          nationalIdentificationNumber: responseData.nationalIdentificationNumber || '',
          dateOfBirth: responseData.dateOfBirth ? new Date(responseData.dateOfBirth).toISOString().split('T')[0] : '',
          role: responseData.role || '',
          branch: responseData.branch?.name || '',
          isEmailVerified: responseData.isEmailVerified || false,
          isActive: responseData.isActive !== undefined ? responseData.isActive : true
        })

        // Set profile image if available
        if (responseData.profileImage) {
          setImgSrc(responseData.profileImage)
        }
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to fetch user data')
      }
    } catch (err) {
      console.error('Error fetching profile:', err)
      setError('Failed to fetch profile data')
    } finally {
      setLoading(false)
    }
  }, [session?.accessToken, userId])

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

      // Prepare the update data
      const updateData = {
        name: fullName,
        employeeId: formData.employeeId,
        nationalIdentificationNumber: formData.nationalIdentificationNumber,
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : null,
        isEmailVerified: formData.isEmailVerified,
        isActive: formData.isActive
      }

      // Include email and role only if user has permission to edit them
      if (canEditEmail()) {
        updateData.email = formData.email
      }

      if (canEditRole()) {
        updateData.role = formData.role
      }

      // Update employee profile
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        },
        body: JSON.stringify(updateData)
      })

      if (response.ok) {
        const responseData = await response.json()
        setProfile({ ...profile, ...responseData })
        setSuccess('Profile updated successfully!')
        setTimeout(() => setSuccess(null), 3000)
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to update profile')
      }
    } catch (err) {
      console.error('Error updating profile:', err)
      setError(err.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleFileInputChange = async file => {
    const reader = new FileReader()
    const { files } = file.target

    if (files && files.length !== 0) {
      const selectedFile = files[0]

      // Check file size (800KB limit)
      if (selectedFile.size > 800 * 1024) {
        setError('File size must be less than 800KB')
        return
      }

      // Check file type
      if (!selectedFile.type.startsWith('image/')) {
        setError('Please select a valid image file')
        return
      }

      reader.onload = () => {
        setImgSrc(reader.result)
        setFileInput(reader.result)

        // Upload the image immediately
        uploadProfileImage(selectedFile)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const uploadProfileImage = async file => {
    try {
      setSaving(true)
      setError(null)

      // Create FormData for file upload
      const formData = new FormData()
      formData.append('profileImage', file)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/upload-profile-image`, {
        method: 'POST',
        headers: {
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        },
        body: formData
      })

      if (response.ok) {
        const responseData = await response.json()
        const profileImageUrl = responseData.data.profileImageUrl

        // Update the employee's profile image in the database
        const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/${userId}/profile-image`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'x-client-type': 'web',
            Authorization: `Bearer ${session.accessToken}`
          },
          body: JSON.stringify({
            profileImage: profileImageUrl
          })
        })

        if (updateResponse.ok) {
          setSuccess('Profile image updated successfully!')
          setTimeout(() => setSuccess(null), 3000)
          // Update the profile image display
          setImgSrc(profileImageUrl)
          setProfile({ ...profile, profileImage: profileImageUrl })
        } else {
          const errorData = await updateResponse.json()
          setError(errorData.message || 'Failed to update profile image')
        }
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to upload profile image')
      }
    } catch (err) {
      console.error('Error uploading profile image:', err)
      setError('Failed to upload profile image')
    } finally {
      setSaving(false)
    }
  }

  const handleFileInputReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setFileInput('')
    setImgSrc('/images/avatars/1.png')
  }

  if (!userId && !session?.user?.id) {
    return (
      <Card>
        <CardContent className='flex justify-center items-center min-h-[400px]'>
          <div className='text-center'>
            <Typography variant='h6' color='text.secondary' className='mb-4'>
              Authentication Required
            </Typography>
            <Typography color='text.secondary'>
              Please log in to view your profile or provide a user ID in the URL parameters (?userId=USER_ID)
            </Typography>
          </div>
        </CardContent>
      </Card>
    )
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
                  ref={fileInputRef}
                  hidden
                  type='file'
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
                disabled={!canEditEmail()}
                helperText={
                  !canEditEmail()
                    ? isOwnProfile
                      ? 'You cannot change your own email'
                      : 'You do not have permission to change this email'
                    : ''
                }
                onChange={canEditEmail() ? e => handleFormChange('email', e.target.value) : undefined}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Employee ID'
                value={formData.employeeId}
                placeholder='EMP-BR-001-001'
                onChange={e => handleFormChange('employeeId', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='National ID Number'
                value={formData.nationalIdentificationNumber}
                placeholder='1234567890'
                onChange={e => handleFormChange('nationalIdentificationNumber', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                type='date'
                label='Date of Birth'
                value={formData.dateOfBirth}
                onChange={e => handleFormChange('dateOfBirth', e.target.value)}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                select
                label='Role'
                value={formData.role}
                disabled={!canEditRole()}
                helperText={
                  !canEditRole()
                    ? isOwnProfile
                      ? 'You cannot change your own role'
                      : 'You do not have permission to change this role'
                    : ''
                }
                onChange={canEditRole() ? e => handleFormChange('role', e.target.value) : undefined}
              >
                <MenuItem value='ADMIN'>Admin</MenuItem>
                <MenuItem value='HR'>HR</MenuItem>
                <MenuItem value='EMPLOYEE'>Employee</MenuItem>
                <MenuItem value='MANAGER'>Manager</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Branch'
                value={formData.branch}
                placeholder='Branch Name'
                onChange={e => handleFormChange('branch', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                select
                label='Email Verified'
                value={formData.isEmailVerified}
                onChange={e => handleFormChange('isEmailVerified', e.target.value === 'true')}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                select
                label='Status'
                value={formData.isActive}
                onChange={e => handleFormChange('isActive', e.target.value === 'true')}
              >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Inactive</MenuItem>
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
                      employeeId: profile.employeeId || '',
                      nationalIdentificationNumber: profile.nationalIdentificationNumber || '',
                      dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : '',
                      role: profile.role || '',
                      branch: profile.branch?.name || '',
                      isEmailVerified: profile.isEmailVerified || false,
                      isActive: profile.isActive !== undefined ? profile.isActive : true
                    })
                    if (profile.profileImage) {
                      setImgSrc(profile.profileImage)
                    } else {
                      setImgSrc('/images/avatars/1.png')
                    }
                    setFileInput('')
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
