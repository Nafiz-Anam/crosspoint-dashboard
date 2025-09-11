'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const InvoiceForm = ({ clients, services, branches, bankAccounts, onSubmit, loading }) => {
  // States
  const [formData, setFormData] = useState({
    clientId: '',
    branchId: '',
    employeeId: '',
    invoiceNumber: '',
    dueDate: '',
    notes: '',
    thanksMessage: 'Thank you for your business!',
    paymentTerms: 'Payment due within 30 days',
    taxRate: 0,
    discountAmount: 0,
    paymentMethod: 'Internet Banking',
    bankAccountId: '',
    items: []
  })
  const [errors, setErrors] = useState({})
  const [currentItem, setCurrentItem] = useState({
    serviceId: '',
    description: '',
    rate: 0,
    discount: 0
  })

  // Calculate totals
  const calculateTotals = () => {
    const subTotal = formData.items.reduce((total, item) => {
      const itemTotal = item.rate - (item.discount || 0)
      return total + itemTotal
    }, 0)

    const taxAmount = (subTotal * formData.taxRate) / 100
    const totalAmount = subTotal - formData.discountAmount + taxAmount

    return {
      subTotal,
      taxAmount,
      totalAmount
    }
  }

  const totals = calculateTotals()

  // Handle input change
  const handleChange = field => event => {
    const value = event.target.value
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

  // Handle item change
  const handleItemChange = field => event => {
    const value = event.target.value
    setCurrentItem(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Add item to invoice
  const handleAddItem = () => {
    if (!currentItem.serviceId || !currentItem.description || !currentItem.rate) {
      setErrors(prev => ({
        ...prev,
        items: 'Please fill in all required item fields'
      }))
      return
    }

    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { ...currentItem }]
    }))

    setCurrentItem({
      serviceId: '',
      description: '',
      rate: 0,
      discount: 0
    })

    setErrors(prev => ({
      ...prev,
      items: ''
    }))
  }

  // Remove item from invoice
  const handleRemoveItem = index => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }))
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!formData.clientId) newErrors.clientId = 'Client is required'
    if (!formData.branchId) newErrors.branchId = 'Branch is required'
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required'
    if (!formData.thanksMessage) newErrors.thanksMessage = 'Thank you message is required'
    if (formData.items.length === 0) newErrors.items = 'At least one item is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submit
  const handleSubmit = event => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    const invoiceData = {
      ...formData,
      dueDate: new Date(formData.dueDate).toISOString(),
      items: formData.items.map(item => ({
        ...item,
        rate: Number(item.rate),
        discount: Number(item.discount || 0)
      }))
    }

    onSubmit(invoiceData)
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            {/* Basic Information */}
            <Grid size={{ xs: 12 }}>
              <Typography variant='h6' sx={{ mb: 3 }}>
                Basic Information
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth error={!!errors.clientId}>
                <InputLabel>Client *</InputLabel>
                <Select value={formData.clientId} onChange={handleChange('clientId')} label='Client *'>
                  {clients.map(client => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.name} ({client.email})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.clientId && (
                <Typography variant='caption' color='error' sx={{ mt: 0.5 }}>
                  {errors.clientId}
                </Typography>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth error={!!errors.branchId}>
                <InputLabel>Branch *</InputLabel>
                <Select value={formData.branchId} onChange={handleChange('branchId')} label='Branch *'>
                  {branches.map(branch => (
                    <MenuItem key={branch.id} value={branch.id}>
                      {branch.name} - {branch.city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.branchId && (
                <Typography variant='caption' color='error' sx={{ mt: 0.5 }}>
                  {errors.branchId}
                </Typography>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                fullWidth
                label='Invoice Number'
                value={formData.invoiceNumber}
                onChange={handleChange('invoiceNumber')}
                placeholder='Auto-generated if empty'
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                fullWidth
                type='date'
                label='Due Date *'
                value={formData.dueDate}
                onChange={handleChange('dueDate')}
                error={!!errors.dueDate}
                helperText={errors.dueDate}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Items Section */}
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 2 }} />
              <Typography variant='h6' sx={{ mb: 3 }}>
                Invoice Items
              </Typography>
            </Grid>

            {/* Add Item Form */}
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Service</InputLabel>
                <Select value={currentItem.serviceId} onChange={handleItemChange('serviceId')} label='Service'>
                  {services.map(service => (
                    <MenuItem key={service.id} value={service.id}>
                      {service.name} - ${service.price}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <CustomTextField
                fullWidth
                label='Description'
                value={currentItem.description}
                onChange={handleItemChange('description')}
                placeholder='Item description'
              />
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <CustomTextField
                fullWidth
                type='number'
                label='Rate'
                value={currentItem.rate}
                onChange={handleItemChange('rate')}
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <Box display='flex' alignItems='end' height='100%'>
                <Button variant='contained' onClick={handleAddItem} startIcon={<i className='tabler-plus' />} fullWidth>
                  Add Item
                </Button>
              </Box>
            </Grid>

            {/* Items Table */}
            {formData.items.length > 0 && (
              <Grid size={{ xs: 12 }}>
                <TableContainer component={Paper} variant='outlined'>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell align='right'>Rate</TableCell>
                        <TableCell align='right'>Discount</TableCell>
                        <TableCell align='right'>Total</TableCell>
                        <TableCell align='center'>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {formData.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell align='right'>${item.rate.toFixed(2)}</TableCell>
                          <TableCell align='right'>${(item.discount || 0).toFixed(2)}</TableCell>
                          <TableCell align='right'>${(item.rate - (item.discount || 0)).toFixed(2)}</TableCell>
                          <TableCell align='center'>
                            <IconButton size='small' onClick={() => handleRemoveItem(index)} color='error'>
                              <i className='tabler-trash' />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {errors.items && (
                  <Typography variant='caption' color='error' sx={{ mt: 1 }}>
                    {errors.items}
                  </Typography>
                )}
              </Grid>
            )}

            {/* Payment Information */}
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 2 }} />
              <Typography variant='h6' sx={{ mb: 3 }}>
                Payment Information
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                fullWidth
                label='Payment Method'
                value={formData.paymentMethod}
                onChange={handleChange('paymentMethod')}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Bank Account</InputLabel>
                <Select value={formData.bankAccountId} onChange={handleChange('bankAccountId')} label='Bank Account'>
                  {bankAccounts.map(account => (
                    <MenuItem key={account.id} value={account.id}>
                      {account.bankName} - {account.bankIban}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                fullWidth
                type='number'
                label='Tax Rate (%)'
                value={formData.taxRate}
                onChange={handleChange('taxRate')}
                inputProps={{ min: 0, max: 100, step: 0.01 }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                fullWidth
                type='number'
                label='Discount Amount'
                value={formData.discountAmount}
                onChange={handleChange('discountAmount')}
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>

            {/* Additional Information */}
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 2 }} />
              <Typography variant='h6' sx={{ mb: 3 }}>
                Additional Information
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <CustomTextField
                fullWidth
                multiline
                rows={3}
                label='Notes'
                value={formData.notes}
                onChange={handleChange('notes')}
                placeholder='Additional notes for the invoice'
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <CustomTextField
                fullWidth
                multiline
                rows={2}
                label='Thank You Message *'
                value={formData.thanksMessage}
                onChange={handleChange('thanksMessage')}
                error={!!errors.thanksMessage}
                helperText={errors.thanksMessage}
                placeholder='Thank you message for the client'
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <CustomTextField
                fullWidth
                multiline
                rows={2}
                label='Payment Terms'
                value={formData.paymentTerms}
                onChange={handleChange('paymentTerms')}
                placeholder='Payment terms and conditions'
              />
            </Grid>

            {/* Totals */}
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 2 }} />
              <Box display='flex' justifyContent='flex-end'>
                <Box sx={{ minWidth: 300 }}>
                  <Box display='flex' justifyContent='space-between' mb={1}>
                    <Typography>Subtotal:</Typography>
                    <Typography>${totals.subTotal.toFixed(2)}</Typography>
                  </Box>
                  <Box display='flex' justifyContent='space-between' mb={1}>
                    <Typography>Discount:</Typography>
                    <Typography>-${formData.discountAmount.toFixed(2)}</Typography>
                  </Box>
                  <Box display='flex' justifyContent='space-between' mb={1}>
                    <Typography>Tax ({formData.taxRate}%):</Typography>
                    <Typography>${totals.taxAmount.toFixed(2)}</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box display='flex' justifyContent='space-between'>
                    <Typography variant='h6'>Total:</Typography>
                    <Typography variant='h6'>${totals.totalAmount.toFixed(2)}</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Submit Button */}
            <Grid size={{ xs: 12 }}>
              <Box display='flex' justifyContent='flex-end' gap={2}>
                <Button variant='outlined' onClick={() => window.history.back()} disabled={loading}>
                  Cancel
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={loading}
                  startIcon={loading ? <i className='tabler-loader-2 animate-spin' /> : <i className='tabler-check' />}
                >
                  {loading ? 'Creating...' : 'Create Invoice'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default InvoiceForm
