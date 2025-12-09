'use client'

// React Imports
import { useState } from 'react'
import { useSession } from 'next-auth/react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

//Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

// Service Imports
import { profileService } from '@/services/profileService'

const ChangePasswordCard = () => {
  const { data: session } = useSession()
  const { t } = useTranslation()

  // States
  const [isCurrentPasswordShown, setIsCurrentPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
  const [isNewPasswordShown, setIsNewPasswordShown] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleClickShowCurrentPassword = () => {
    setIsCurrentPasswordShown(!isCurrentPasswordShown)
  }

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
    setError(null)
    setSuccess(null)
  }

  const validatePassword = () => {
    if (formData.newPassword.length < 10) {
      setError(t('accountSettings.security.minCharactersError'))
      return false
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`])/.test(formData.newPassword)) {
      setError(t('accountSettings.security.passwordComplexityError'))
      return false
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError(t('accountSettings.security.passwordMismatch'))
      return false
    }
    return true
  }

  const handleSave = async () => {
    if (!validatePassword()) return

    try {
      setSaving(true)
      setError(null)
      setSuccess(null)

      const response = await profileService.changePassword(
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        },
        session.accessToken
      )

      if (response.success) {
        setSuccess(t('accountSettings.security.passwordChangedSuccess'))
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
        setTimeout(() => setSuccess(null), 3000)
      }
    } catch (err) {
      console.error('Error changing password:', err)
      setError(err.message || t('accountSettings.security.passwordChangeFailed'))
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setError(null)
    setSuccess(null)
  }

  return (
    <Card>
      <CardHeader title={t('accountSettings.security.changePassword')} />
      <CardContent>
        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity='success' sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        <form>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label={t('accountSettings.security.currentPassword')}
                type={isCurrentPasswordShown ? 'text' : 'password'}
                placeholder='············'
                value={formData.currentPassword}
                onChange={e => handleInputChange('currentPassword', e.target.value)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={e => e.preventDefault()}
                        >
                          <i className={isCurrentPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
              />
            </Grid>
          </Grid>
          <Grid container className='mbs-0 pt-4' spacing={6}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label={t('accountSettings.security.newPassword')}
                type={isNewPasswordShown ? 'text' : 'password'}
                placeholder='············'
                value={formData.newPassword}
                onChange={e => handleInputChange('newPassword', e.target.value)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={() => setIsNewPasswordShown(!isNewPasswordShown)}
                          onMouseDown={e => e.preventDefault()}
                        >
                          <i className={isNewPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                fullWidth
                label={t('accountSettings.security.confirmNewPassword')}
                type={isConfirmPasswordShown ? 'text' : 'password'}
                placeholder='············'
                value={formData.confirmPassword}
                onChange={e => handleInputChange('confirmPassword', e.target.value)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
                          onMouseDown={e => e.preventDefault()}
                        >
                          <i className={isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }} className='flex flex-col gap-4'>
              <Typography variant='h6'>{t('accountSettings.security.passwordRequirements')}:</Typography>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-2.5'>
                  <i className='tabler-circle-filled text-[8px]' />
                  {t('accountSettings.security.minCharacters')}
                </div>
                <div className='flex items-center gap-2.5'>
                  <i className='tabler-circle-filled text-[8px]' />
                  {t('accountSettings.security.caseCharacters')}
                </div>
                <div className='flex items-center gap-2.5'>
                  <i className='tabler-circle-filled text-[8px]' />
                  {t('accountSettings.security.numberSpecialCharacter')}
                </div>
              </div>
            </Grid>
            <Grid size={{ xs: 12 }} className='flex gap-4'>
              <Button
                variant='contained'
                onClick={handleSave}
                disabled={saving}
                startIcon={saving ? <CircularProgress size={16} /> : null}
              >
                {saving ? t('accountSettings.saving') : t('accountSettings.saveChanges')}
              </Button>
              <Button variant='tonal' type='reset' color='secondary' onClick={handleReset} disabled={saving}>
                {t('common.reset')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ChangePasswordCard
