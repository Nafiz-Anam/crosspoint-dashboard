'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel
} from '@mui/material'
// Simple date input approach without complex date picker dependencies

const AttendanceReportDialog = ({ open, onClose, onGenerate, loading = false, employeeName = '' }) => {
  const [reportType, setReportType] = useState('currentMonth')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [error, setError] = useState('')

  const handleClose = () => {
    if (!loading) {
      setReportType('currentMonth')
      setStartDate(null)
      setEndDate(null)
      setSelectedMonth(new Date())
      setError('')
      onClose()
    }
  }

  const handleGenerate = () => {
    setError('')

    let reportData = {
      type: reportType
    }

    switch (reportType) {
      case 'currentMonth':
        const now = new Date()
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        reportData.startDate = currentMonthStart
        reportData.endDate = currentMonthEnd
        break

      case 'previousMonth':
        const prevMonth = new Date()
        prevMonth.setMonth(prevMonth.getMonth() - 1)
        const prevMonthStart = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), 1)
        const prevMonthEnd = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0)
        reportData.startDate = prevMonthStart
        reportData.endDate = prevMonthEnd
        break

      case 'specificMonth':
        if (!selectedMonth) {
          setError('Please select a month')
          return
        }
        const monthStart = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1)
        const monthEnd = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0)
        reportData.startDate = monthStart
        reportData.endDate = monthEnd
        break

      case 'customRange':
        if (!startDate || !endDate) {
          setError('Please select both start and end dates')
          return
        }
        if (startDate > endDate) {
          setError('Start date cannot be after end date')
          return
        }
        reportData.startDate = startDate
        reportData.endDate = endDate
        break

      default:
        setError('Please select a report type')
        return
    }

    onGenerate(reportData)
  }

  const getReportTypeLabel = () => {
    switch (reportType) {
      case 'currentMonth':
        return 'Current Month'
      case 'previousMonth':
        return 'Previous Month'
      case 'specificMonth':
        return 'Specific Month'
      case 'customRange':
        return 'Custom Date Range'
      default:
        return ''
    }
  }

  const formatDateRange = () => {
    if (reportType === 'currentMonth') {
      const now = new Date()
      const start = new Date(now.getFullYear(), now.getMonth(), 1)
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
    } else if (reportType === 'previousMonth') {
      const prevMonth = new Date()
      prevMonth.setMonth(prevMonth.getMonth() - 1)
      const start = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), 1)
      const end = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0)
      return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
    } else if (reportType === 'specificMonth' && selectedMonth) {
      const start = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1)
      const end = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0)
      return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
    } else if (reportType === 'customRange' && startDate && endDate) {
      return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
    }
    return ''
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth disableEscapeKeyDown={loading}>
      <DialogTitle>
        <Box display='flex' alignItems='center' gap={1}>
          <i className='tabler-file-download text-2xl text-blue-500' />
          <Typography variant='h6'>Download Attendance Report</Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
            Generate an Excel report for {employeeName ? `${employeeName}'s` : 'employee'} attendance data.
          </Typography>

          {error && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <FormControl component='fieldset' sx={{ mb: 3 }}>
            <FormLabel component='legend' sx={{ mb: 2, fontWeight: 600 }}>
              Select Report Period
            </FormLabel>
            <RadioGroup value={reportType} onChange={e => setReportType(e.target.value)} disabled={loading}>
              <FormControlLabel value='currentMonth' control={<Radio />} label='Current Month' />
              <FormControlLabel value='previousMonth' control={<Radio />} label='Previous Month' />
              <FormControlLabel value='specificMonth' control={<Radio />} label='Specific Month' />
              <FormControlLabel value='customRange' control={<Radio />} label='Custom Date Range' />
            </RadioGroup>
          </FormControl>

          {reportType === 'specificMonth' && (
            <Box sx={{ mb: 3 }}>
              <TextField
                label='Select Month'
                type='month'
                value={selectedMonth ? selectedMonth.toISOString().slice(0, 7) : ''}
                onChange={e => setSelectedMonth(new Date(e.target.value + '-01'))}
                disabled={loading}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          )}

          {reportType === 'customRange' && (
            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
              <TextField
                label='Start Date'
                type='date'
                value={startDate ? startDate.toISOString().slice(0, 10) : ''}
                onChange={e => setStartDate(new Date(e.target.value))}
                disabled={loading}
                sx={{ flex: 1 }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label='End Date'
                type='date'
                value={endDate ? endDate.toISOString().slice(0, 10) : ''}
                onChange={e => setEndDate(new Date(e.target.value))}
                disabled={loading}
                sx={{ flex: 1 }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          )}

          {formatDateRange() && (
            <Alert severity='info' sx={{ mb: 2 }}>
              <Typography variant='body2'>
                <strong>Report Period:</strong> {formatDateRange()}
              </Typography>
            </Alert>
          )}

          <Typography variant='caption' color='text.secondary' sx={{ mt: 1, display: 'block' }}>
            The report will include employee details, daily attendance records, clock-in/out times, work notes, and
            calculated hours for the selected period.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose} disabled={loading} color='inherit'>
          Cancel
        </Button>
        <Button
          onClick={handleGenerate}
          variant='contained'
          color='primary'
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} /> : <i className='tabler-file-download' />}
        >
          {loading ? 'Generating...' : 'Download Report'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AttendanceReportDialog
