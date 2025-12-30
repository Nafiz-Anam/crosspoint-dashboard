'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

// Third-party Imports
import classnames from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { email, object, minLength, string, pipe, nonEmpty } from 'valibot'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'
import apiClient from '@/services/apiClient'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import { useTranslation } from '@/hooks/useTranslation'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Validation Schema
const getSchema = t =>
  object({
    email: pipe(string(), minLength(1, t('auth.emailRequired')), email(t('auth.emailInvalid')))
  })

// Styled Custom Components
const ForgotPasswordIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 650,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const ForgotPassword = ({ mode }) => {
  // States
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-forgot-password-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-forgot-password-light.png'

  // Hooks
  const { lang: locale } = useParams()
  const router = useRouter()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, lightImg, darkImg)
  const characterIllustration = useImageVariant(mode, lightIllustration, darkIllustration)
  const { t } = useTranslation()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(getSchema(t)),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async data => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await apiClient.post('/auth/forgot-password-otp', { email: data.email })

      setSuccess(true)
      setError(null)
      // Redirect to OTP verification page after 2 seconds
      setTimeout(() => {
        router.push(getLocalizedUrl(`/pages/auth/verify-otp?email=${encodeURIComponent(data.email)}`, locale))
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || t('auth.forgotPasswordError'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <ForgotPasswordIllustration src={characterIllustration} alt='character-illustration' />
        {!hidden && <MaskImg alt='mask' src={authBackground} />}
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link
          href={getLocalizedUrl('/login', locale)}
          className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'
        >
          <Logo />
        </Link>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-8 sm:mbs-11 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>{t('auth.forgotPasswordTitle')}</Typography>
            <Typography>{t('auth.forgotPasswordMessage')}</Typography>
          </div>

          {success && (
            <Alert severity='success' className='bg-[var(--mui-palette-success-lightOpacity)]'>
              <Typography variant='body2' color='success.main'>
                {t('auth.resetEmailSent')}
              </Typography>
            </Alert>
          )}

          {error && (
            <Alert severity='error' className='bg-[var(--mui-palette-error-lightOpacity)]'>
              <Typography variant='body2' color='error.main'>
                {error}
              </Typography>
            </Alert>
          )}

          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  autoFocus
                  fullWidth
                  type='email'
                  label={t('auth.email')}
                  placeholder={t('auth.enterEmail')}
                  onChange={e => {
                    field.onChange(e.target.value)
                    error && setError(null)
                  }}
                  {...(errors.email && { error: true, helperText: errors.email.message })}
                />
              )}
            />
            <Button
              fullWidth
              variant='contained'
              type='submit'
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={16} /> : null}
            >
              {isLoading ? t('auth.sending') : t('auth.sendResetLink')}
            </Button>
            <Typography className='flex justify-center items-center' color='primary.main'>
              <Link href={getLocalizedUrl('/login', locale)} className='flex items-center gap-1.5'>
                <DirectionalIcon
                  ltrIconClass='tabler-chevron-left'
                  rtlIconClass='tabler-chevron-right'
                  className='text-xl'
                />
                <span>{t('auth.backToLogin')}</span>
              </Link>
            </Typography>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
