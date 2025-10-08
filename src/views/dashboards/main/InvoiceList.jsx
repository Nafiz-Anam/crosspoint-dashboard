'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'
import { getInvoiceDueDateColor, getInvoiceTimeRemaining } from '@/utils/dateColorUtils'

const InvoiceList = () => {
  // Hooks
  const { t } = useTranslation()
  // Mock data for invoice list
  const invoices = [
    {
      id: 'INV-BR-001-20250910-001',
      clientName: 'Alpha OBS LLP',
      email: 'test23@gmail.com',
      service: 'SGA Marketing ltd.',
      amount: '$269.1',
      status: 'Unpaid',
      dueDate: '9/30/2025'
    }
  ]

  const getStatusColor = status => {
    switch (status) {
      case 'Paid':
        return 'success'
      case 'Unpaid':
        return 'warning'
      case 'Overdue':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <Card>
      <CardHeader
        title='Invoice List'
        action={
          <TextField
            size='small'
            placeholder='Search Invoice'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <i className='tabler-search' />
                </InputAdornment>
              )
            }}
            sx={{ minWidth: 250 }}
          />
        }
      />
      <CardContent>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>INVOICE ID</TableCell>
                <TableCell>CLIENT NAME</TableCell>
                <TableCell>EMAIL</TableCell>
                <TableCell>SERVICE</TableCell>
                <TableCell>AMOUNT</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>DUE DATE</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant='body2' fontWeight={600}>
                      {invoice.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>{invoice.clientName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>{invoice.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>{invoice.service}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' fontWeight={600}>
                      {invoice.amount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={invoice.status} color={getStatusColor(invoice.status)} size='small' variant='tonal' />
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col'>
                      <Typography variant='body2' color={getInvoiceDueDateColor(invoice.dueDate, invoice.status)}>
                        {invoice.dueDate}
                      </Typography>
                      {getInvoiceTimeRemaining(invoice.dueDate, invoice.status) && (
                        <Typography variant='caption' color={getInvoiceDueDateColor(invoice.dueDate, invoice.status)}>
                          {getInvoiceTimeRemaining(invoice.dueDate, invoice.status)}
                        </Typography>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <IconButton size='small'>
                      <i className='tabler-eye' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box className='flex justify-between items-center mt-4'>
          <Typography variant='body2' color='text.secondary'>
            {`${t('common.pagination.showing')} 1 ${t('common.pagination.to')} 1 ${t('common.pagination.of')} 1 ${t('common.pagination.entries')}`}
          </Typography>
          <Pagination count={1} page={1} color='primary' size='small' showFirstButton showLastButton />
        </Box>
      </CardContent>
    </Card>
  )
}

export default InvoiceList
