'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useSearchParams, useRouter } from 'next/navigation'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

// Third-party Imports
import classnames from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, minLength, string, pipe, nonEmpty, length } from 'valibot'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'
import { useTranslation } from '@/hooks/useTranslation'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Validation Schema
const getSchema = t =>
  object({
    otp: pipe(string(), nonEmpty(t('auth.otpRequired')), length(6, t('auth.otpLength')))
  })

// Styled Custom Components
const VerifyOTPIllustration = styled('img')(({ theme }) => ({
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
  maxBlockSize: 330,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const VerifyOTP = ({ mode }) => {
  // States
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)

  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-reset-password-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-reset-password-light.png'

  // Hooks
  const { lang: locale } = useParams()
  const searchParams = useSearchParams()
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
      otp: ''
    }
  })

  // Get email from URL params
  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(emailParam)
    } else {
      setError(t('auth.emailRequired'))
    }
  }, [searchParams, t])

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const onSubmit = async data => {
    if (!email) {
      setError(t('auth.emailRequired'))
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web'
        },
        body: JSON.stringify({ email, otp: data.otp })
      })

      if (response.ok) {
        setSuccess(true)
        setError(null)
        // Redirect to reset password page after 2 seconds
        setTimeout(() => {
          router.push(
            getLocalizedUrl(`/pages/auth/reset-password-otp?email=${encodeURIComponent(email)}&otp=${data.otp}`, locale)
          )
        }, 2000)
      } else {
        const errorData = await response.json()
        setError(errorData.message || t('auth.otpVerificationError'))
      }
    } catch (err) {
      setError(t('auth.unexpectedError'))
    } finally {
      setIsLoading(false)
    }
  }

  const resendOTP = async () => {
    if (!email) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web'
        },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        setTimeLeft(600) // 10 minutes
        setError(null)
      } else {
        const errorData = await response.json()
        setError(errorData.message || t('auth.resendOTPError'))
      }
    } catch (err) {
      setError(t('auth.unexpectedError'))
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
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
        <VerifyOTPIllustration src={characterIllustration} alt='character-illustration' />
        {!hidden && (
          <MaskImg
            alt='mask'
            src={authBackground}
            className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
          />
        )}
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link
          href={getLocalizedUrl('/', locale)}
          className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'
        >
          <Logo />
        </Link>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>{t('auth.verifyOTPTitle')}</Typography>
            <Typography>{t('auth.verifyOTPMessage')}</Typography>
            {email && (
              <Typography variant='body2' color='text.secondary'>
                {t('auth.otpSentTo')}: {email}
              </Typography>
            )}
          </div>

          {success && (
            <Alert severity='success' className='bg-[var(--mui-palette-success-lightOpacity)]'>
              <Typography variant='body2' color='success.main'>
                {t('auth.otpVerifiedSuccess')}
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
              name='otp'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  autoFocus
                  fullWidth
                  label={t('auth.enterOTP')}
                  placeholder='123456'
                  type='text'
                  inputProps={{ maxLength: 6 }}
                  onChange={e => {
                    // Only allow numbers
                    const value = e.target.value.replace(/\D/g, '')
                    field.onChange(value)
                    error && setError(null)
                  }}
                  {...(errors.otp && { error: true, helperText: errors.otp.message })}
                />
              )}
            />

            <Box className='flex flex-col gap-4'>
              <Button
                fullWidth
                variant='contained'
                type='submit'
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={16} /> : null}
              >
                {isLoading ? t('auth.verifying') : t('auth.verifyOTP')}
              </Button>

              <Box className='flex items-center justify-between'>
                <Button
                  variant='text'
                  onClick={resendOTP}
                  disabled={isLoading || timeLeft > 0}
                  startIcon={timeLeft > 0 ? <CircularProgress size={16} /> : null}
                >
                  {timeLeft > 0 ? `${t('auth.resendIn')} ${formatTime(timeLeft)}` : t('auth.resendOTP')}
                </Button>
              </Box>
            </Box>

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

export default VerifyOTP
