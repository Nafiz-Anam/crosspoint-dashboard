'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

// Component Imports
import LoadingButton from '@/components/ui/LoadingButton'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { useSession } from 'next-auth/react' // Import useSession to get token

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import toastService from '@/services/toastService'

const AddBranchDrawer = props => {
  // Props
  const { open, handleClose, currentBranch, onBranchAdded } = props

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
      name: '',
      address: '',
      city: '',
      postalCode: '',
      province: '',
      phone: '',
      email: '',
      isActive: true
    }
  })

  // Effect to populate form fields when currentBranch changes (for edit mode)
  useEffect(() => {
    if (currentBranch) {
      resetForm({
        name: currentBranch.name || '',
        address: currentBranch.address || '',
        city: currentBranch.city || '',
        postalCode: currentBranch.postalCode || '',
        province: currentBranch.province || '',
        phone: currentBranch.phone || '',
        email: currentBranch.email || '',
        isActive: currentBranch.isActive ?? true
      })
    } else {
      // Reset form to default values when switching to add mode
      resetForm({
        name: '',
        address: '',
        city: '',
        postalCode: '',
        province: '',
        phone: '',
        email: '',
        isActive: true
      })
    }
    // Clear any previous state when drawer opens/mode changes
  }, [open, currentBranch, resetForm])

  const onSubmit = async data => {
    setLoading(true)

    if (!session?.accessToken) {
      toastService.showError('Authentication token not found. Please log in again.')
      setLoading(false)
      return
    }

    const payload = {
      name: data.name,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      province: data.province,
      phone: data.phone || null,
      email: data.email || null,
      isActive: data.isActive
    }

    const isEditMode = !!currentBranch
    const apiMethod = isEditMode ? 'PUT' : 'POST'
    const apiUrl = isEditMode
      ? `${process.env.NEXT_PUBLIC_API_URL}/branches/${currentBranch.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/branches`

    try {
      console.log(`Making API call to: ${apiUrl} with method: ${apiMethod}`)
      const response = await fetch(apiUrl, {
        method: apiMethod,
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const responseData = await response.json()
        // Show success toast
        toastService.handleApiSuccess(isEditMode ? 'updated' : 'created', 'Branch')
        console.log(`Branch ${isEditMode ? 'updated' : 'created'} successfully:`, responseData)
        onBranchAdded()
        handleReset()
      } else {
        // Show error toast - pass the response object before consuming it
        await toastService.handleApiError(response, `Failed to ${isEditMode ? 'update' : 'create'} branch`)
      }
    } catch (error) {
      // Show error toast
      await toastService.handleApiError(error, 'Network error or unexpected issue. Please try again.')
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    handleClose()
    resetForm({
      name: '',
      address: '',
      city: '',
      postalCode: '',
      province: '',
      phone: '',
      email: '',
      isActive: true
    })
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>{currentBranch ? 'Edit Branch' : 'Add New Branch'}</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          {/* Branch ID field, display only if editing, and make it disabled */}
          {currentBranch && (
            <CustomTextField
              fullWidth
              label='Branch ID'
              value={currentBranch.branchId || ''} // Display existing branchId
              disabled={true} // <--- Made the field disabled
              sx={{ mb: 2 }}
            />
          )}

          <Controller
            name='name'
            control={control}
            rules={{ required: 'Branch Name is required.' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Branch Name'
                placeholder='Main Branch'
                {...(errors.name && { error: true, helperText: errors.name.message })}
              />
            )}
          />
          <Controller
            name='address'
            control={control}
            rules={{ required: 'Address is required.' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Address'
                placeholder='123 Main St'
                {...(errors.address && { error: true, helperText: errors.address.message })}
              />
            )}
          />
          <Controller
            name='city'
            control={control}
            rules={{ required: 'City is required.' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='City'
                placeholder='Rome'
                {...(errors.city && { error: true, helperText: errors.city.message })}
              />
            )}
          />
          <Controller
            name='postalCode'
            control={control}
            rules={{ required: 'Postal Code is required.' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Postal Code'
                placeholder='00100'
                {...(errors.postalCode && { error: true, helperText: errors.postalCode.message })}
              />
            )}
          />
          <Controller
            name='province'
            control={control}
            rules={{ required: 'Province is required.' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Province (2-letter code)'
                placeholder='RM'
                {...(errors.province && { error: true, helperText: errors.province.message })}
              />
            )}
          />
          <Controller
            name='phone'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                type='tel'
                label='Phone (Optional)'
                placeholder='+39 123 456 7890'
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            rules={{ pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address.' } }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                type='email'
                label='Email (Optional)'
                placeholder='branch@example.com'
              />
            )}
          />
          <Controller
            name='isActive'
            control={control}
            render={({ field }) => (
              <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label='Is Active' />
            )}
          />

          <div className='flex items-center gap-4'>
            <LoadingButton
              variant='contained'
              type='submit'
              loading={loading}
              loadingText={currentBranch ? 'Updating...' : 'Creating...'}
              disabled={loading}
            >
              {currentBranch ? 'Update' : 'Submit'}
            </LoadingButton>
            <LoadingButton variant='tonal' color='error' type='reset' onClick={handleReset} disabled={loading}>
              Cancel
            </LoadingButton>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddBranchDrawer
