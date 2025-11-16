'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'

// Component Imports
import LoadingButton from '@/components/ui/LoadingButton'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { useSession } from 'next-auth/react'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Services
import toastService from '@/services/toastService'

const GenerateInvoiceDrawer = ({ open, handleClose, task, onInvoiceGenerated }) => {
  // States
  const [loading, setLoading] = useState(false)

  // Hooks
  const { data: session } = useSession()

  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      notes: '',
      thanksMessage: 'Thank you for your business!',
      paymentTerms: 'Payment due within 30 days',
      taxRate: 0,
      discountAmount: 0,
      paymentMethod: 'Internet Banking'
    }
  })

  const onSubmit = async data => {
    if (!task) return

    setLoading(true)

    if (!session?.accessToken) {
      toastService.showError('Authentication token not found. Please log in again.')
      setLoading(false)
      return
    }

    const payload = {
      notes: data.notes || `Invoice for task: ${task.title}`,
      thanksMessage: data.thanksMessage,
      paymentTerms: data.paymentTerms,
      taxRate: parseFloat(data.taxRate) || 0,
      discountAmount: parseFloat(data.discountAmount) || 0,
      paymentMethod: data.paymentMethod
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices/from-task/${task.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        },
        body: JSON.stringify(payload)
      })

      const responseData = await response.json()

      if (response.ok) {
        toastService.showSuccess('Invoice generated successfully!')
        onInvoiceGenerated()
        setTimeout(() => {
          handleReset()
        }, 2000)
      } else {
        const errorMessage = responseData.message || `Failed to generate invoice: ${response.status}`
        await toastService.handleApiError(response, errorMessage)
      }
    } catch (error) {
      await toastService.handleApiError(error, 'Network error or unexpected issue. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    handleClose()
    resetForm({
      notes: '',
      thanksMessage: 'Thank you for your business!',
      paymentTerms: 'Payment due within 30 days',
      taxRate: 0,
      discountAmount: 0,
      paymentMethod: 'Internet Banking'
    })
  }

  if (!task) return null

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 350, sm: 450 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Generate Invoice</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        {/* Task Information */}
        <div className='p-6 border-bs'>
          <Typography variant='h6' className='mb-4'>
            Task Details
          </Typography>
          <div className='space-y-2'>
            <div>
              <Typography variant='body2' color='text.secondary'>
                Task
              </Typography>
              <Typography variant='body1' className='font-medium'>
                {task.title}
              </Typography>
            </div>
            <div>
              <Typography variant='body2' color='text.secondary'>
                Client
              </Typography>
              <Typography variant='body1' className='font-medium'>
                {task.client?.name}
              </Typography>
            </div>
            <div>
              <Typography variant='body2' color='text.secondary'>
                Service
              </Typography>
              <Typography variant='body1' className='font-medium'>
                {task.service?.name} - €{task.service?.price}
              </Typography>
            </div>
            <div>
              <Typography variant='body2' color='text.secondary'>
                Status
              </Typography>
              <Typography variant='body1' className='font-medium text-green-600'>
                {task.status}
              </Typography>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          <Controller
            name='notes'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                multiline
                rows={3}
                label='Notes'
                placeholder={`Invoice for task: ${task.title}`}
              />
            )}
          />

          <Controller
            name='thanksMessage'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Thanks Message' placeholder='Thank you for your business!' />
            )}
          />

          <Controller
            name='paymentTerms'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Payment Terms' placeholder='Payment due within 30 days' />
            )}
          />

          <div className='flex gap-4'>
            <Controller
              name='taxRate'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  type='number'
                  label='Tax Rate (%)'
                  placeholder='0'
                  inputProps={{ min: 0, max: 100, step: 0.1 }}
                />
              )}
            />

            <Controller
              name='discountAmount'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  type='number'
                  label='Discount Amount (€)'
                  placeholder='0'
                  inputProps={{ min: 0, step: 0.01 }}
                />
              )}
            />
          </div>

          <Controller
            name='paymentMethod'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Payment Method' placeholder='Internet Banking' />
            )}
          />

          <div className='flex items-center gap-4 mt-6'>
            <LoadingButton
              variant='contained'
              type='submit'
              loading={loading}
              loadingText='Generating...'
              disabled={loading}
              startIcon={<i className='tabler-file-invoice' />}
            >
              Generate Invoice
            </LoadingButton>
            <LoadingButton variant='tonal' color='error' type='button' onClick={handleReset} disabled={loading}>
              Cancel
            </LoadingButton>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default GenerateInvoiceDrawer
