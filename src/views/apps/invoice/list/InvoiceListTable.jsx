'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import TablePagination from '@mui/material/TablePagination'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

// Component Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import DeleteConfirmationDialog from '@components/dialogs/DeleteConfirmationDialog'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import { getLocalizedUrl } from '@/utils/i18n'
import { useTranslation } from '@/hooks/useTranslation'
import { getInvoiceDueDateColor, getInvoiceTimeRemaining } from '@/utils/dateColorUtils'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Vars
const invoiceStatusObj = {
  UNPAID: { color: 'warning', icon: 'tabler-clock' },
  PAID: { color: 'success', icon: 'tabler-check' },
  OVERDUE: { color: 'error', icon: 'tabler-alert-circle' },
  CANCELLED: { color: 'error', icon: 'tabler-x' }
}

// Column Definitions
const columnHelper = createColumnHelper()

const InvoiceListTable = ({ invoiceData, onFilterChange, onInvoiceAction, filters }) => {
  // States
  const [status, setStatus] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(invoiceData || [])
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [invoiceToDelete, setInvoiceToDelete] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // Hooks
  const { lang: locale } = useParams()
  const { t } = useTranslation()

  // Delete handlers
  const handleDeleteClick = invoice => {
    setInvoiceToDelete(invoice)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!invoiceToDelete) return

    try {
      setDeleteLoading(true)
      await onInvoiceAction('delete', invoiceToDelete.id)
      setDeleteDialogOpen(false)
      setInvoiceToDelete(null)
    } catch (error) {
      console.error('Error deleting invoice:', error)
    } finally {
      setDeleteLoading(false)
    }
  }

  const columns = useMemo(
    () => [
      // {
      //   id: 'select',
      //   header: ({ table }) => (
      //     <Checkbox
      //       {...{
      //         checked: table.getIsAllRowsSelected(),
      //         indeterminate: table.getIsSomeRowsSelected(),
      //         onChange: table.getToggleAllRowsSelectedHandler()
      //       }}
      //     />
      //   ),
      //   cell: ({ row }) => (
      //     <Checkbox
      //       {...{
      //         checked: row.getIsSelected(),
      //         disabled: !row.getCanSelect(),
      //         indeterminate: row.getIsSomeSelected(),
      //         onChange: row.getToggleSelectedHandler()
      //       }}
      //     />
      //   )
      // },
      columnHelper.accessor('invoiceNumber', {
        header: t('invoices.fields.number'),
        cell: ({ row }) => (
          <Typography
            component={Link}
            href={getLocalizedUrl(`/apps/invoice/preview/${row.original.id}`, locale)}
            color='primary.main'
          >
            {row.original.invoiceNumber}
          </Typography>
        )
      }),
      columnHelper.accessor('status', {
        header: t('invoices.fields.status'),
        cell: ({ row }) => (
          <Chip
            label={(() => {
              const statusKey = row.original.status?.toLowerCase()
              let translatedStatus = row.original.status

              // Map status values to translations
              const statusTranslations = {
                paid: t('invoices.status.paid'),
                pending: t('invoices.status.pending'),
                overdue: t('invoices.status.overdue'),
                draft: t('invoices.status.draft')
              }

              if (statusTranslations[statusKey]) {
                translatedStatus = statusTranslations[statusKey]
              }

              return translatedStatus
            })()}
            color={invoiceStatusObj[row.original.status]?.color || 'default'}
            variant='tonal'
            size='small'
            sx={{
              fontWeight: 600,
              textTransform: 'capitalize'
            }}
          />
        )
      }),
      columnHelper.accessor('client', {
        header: t('invoices.fields.client'),
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            {getAvatar({ avatar: null, name: row.original.client?.name || 'N/A' })}
            <div className='flex flex-col'>
              <Typography className='font-medium' color='text.primary'>
                {row.original.client?.name || 'N/A'}
              </Typography>
              <Typography variant='body2'>{row.original.client?.email || ''}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('items', {
        header: t('invoices.serviceName'),
        cell: ({ row }) => {
          const services = row.original.items?.map(item => item.service?.name).filter(Boolean) || []
          return <Typography variant='body2'>{services.length > 0 ? services.join(', ') : 'N/A'}</Typography>
        }
      }),
      columnHelper.accessor('totalAmount', {
        header: t('invoices.fields.amount'),
        cell: ({ row }) => <Typography>{`$${row.original.totalAmount?.toLocaleString() || '0'}`}</Typography>
      }),
      columnHelper.accessor('issuedDate', {
        header: t('invoices.fields.date'),
        cell: ({ row }) => <Typography>{new Date(row.original.issuedDate).toLocaleDateString()}</Typography>
      }),
      columnHelper.accessor('dueDate', {
        header: t('invoices.fields.dueDate'),
        cell: ({ row }) => {
          const dueDate = new Date(row.original.dueDate)
          const timeRemaining = getInvoiceTimeRemaining(row.original.dueDate, row.original.status)
          return (
            <div className='flex flex-col'>
              <Typography color={getInvoiceDueDateColor(row.original.dueDate, row.original.status)}>
                {dueDate.toLocaleDateString()}
              </Typography>
              {timeRemaining && (
                <Typography variant='caption' color={getInvoiceDueDateColor(row.original.dueDate, row.original.status)}>
                  {timeRemaining}
                </Typography>
              )}
            </div>
          )
        }
      }),
      columnHelper.accessor('action', {
        header: t('invoices.action'),
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton>
              <Link href={getLocalizedUrl(`/apps/invoice/preview/${row.original.id}`, locale)} className='flex'>
                <i className='tabler-eye text-textSecondary' />
              </Link>
            </IconButton>
            <IconButton>
              <Link href={getLocalizedUrl(`/apps/invoice/edit/${row.original.id}`, locale)} className='flex'>
                <i className='tabler-pencil text-textSecondary' />
              </Link>
            </IconButton>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                // Only show "Mark as Paid" if invoice is not already paid
                ...(row.original.status !== 'PAID'
                  ? [
                      {
                        text: t('invoices.markAsPaid'),
                        icon: 'tabler-check',
                        onClick: () => {
                          console.log('Mark as Paid clicked for invoice:', row.original.id)
                          onInvoiceAction('updateStatus', row.original.id, { status: 'PAID' })
                        },
                        menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                      }
                    ]
                  : []),
                // Only show "Mark as Unpaid" if invoice is not already unpaid
                ...(row.original.status !== 'UNPAID'
                  ? [
                      {
                        text: t('invoices.markAsUnpaid'),
                        icon: 'tabler-clock',
                        onClick: () => {
                          console.log('Mark as Unpaid clicked for invoice:', row.original.id)
                          onInvoiceAction('updateStatus', row.original.id, { status: 'UNPAID' })
                        },
                        menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                      }
                    ]
                  : []),
                // Only show "Mark as Cancelled" if invoice is not already cancelled
                ...(row.original.status !== 'CANCELLED'
                  ? [
                      {
                        text: t('invoices.markAsCancelled'),
                        icon: 'tabler-x',
                        onClick: () => {
                          console.log('Mark as Cancelled clicked for invoice:', row.original.id)
                          onInvoiceAction('updateStatus', row.original.id, { status: 'CANCELLED' })
                        },
                        menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                      }
                    ]
                  : []),
                // Always show delete option
                {
                  text: t('invoices.delete'),
                  icon: 'tabler-trash',
                  onClick: () => handleDeleteClick(row.original),
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, filteredData]
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  const getAvatar = params => {
    const { avatar, name } = params

    if (avatar) {
      return <CustomAvatar src={avatar} skin='light' size={34} />
    } else {
      return (
        <CustomAvatar skin='light' size={34}>
          {getInitials(name)}
        </CustomAvatar>
      )
    }
  }

  // Update data when invoiceData prop changes
  useEffect(() => {
    setData(invoiceData || [])
    setFilteredData(invoiceData || [])
  }, [invoiceData])

  useEffect(() => {
    const filteredData = data?.filter(invoice => {
      if (status && invoice.status !== status) return false
      return true
    })

    setFilteredData(filteredData)
  }, [status, data])

  // Handle status filter change
  const handleStatusChange = newStatus => {
    setStatus(newStatus)
    onFilterChange({ status: newStatus || undefined })
  }

  return (
    <>
      <Card>
        <CardHeader title={t('invoices.invoiceManagement')} className='pbe-4' />

        <div className='flex flex-wrap items-end gap-4 p-6 border-bs'>
          <CustomTextField
            select
            label={t('invoices.fields.status')}
            value={status}
            onChange={e => handleStatusChange(e.target.value)}
            className='min-w-[180px]'
          >
            <MenuItem value=''>{t('invoices.all')}</MenuItem>
            <MenuItem value='UNPAID'>{t('invoices.unpaid')}</MenuItem>
            <MenuItem value='PAID'>{t('invoices.paid')}</MenuItem>
            <MenuItem value='OVERDUE'>{t('invoices.overdue')}</MenuItem>
            <MenuItem value='CANCELLED'>{t('invoices.cancelled')}</MenuItem>
          </CustomTextField>

          <CustomTextField
            select
            label={t('invoices.fields.client')}
            value={filters.client || ''}
            onChange={e => onFilterChange({ ...filters, client: e.target.value })}
            className='min-w-[180px]'
          >
            <MenuItem value=''>{t('invoices.all')}</MenuItem>
            {/* Add client options here if needed */}
          </CustomTextField>

          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder={t('invoices.searchInvoice')}
            className='min-w-[200px]'
          />

          <Button
            variant='contained'
            component={Link}
            startIcon={<i className='tabler-plus' />}
            href={getLocalizedUrl('apps/invoice/add', locale)}
            className='ml-auto h-[40px]'
          >
            {t('invoices.createInvoice')}
          </Button>
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='tabler-chevron-up text-xl' />,
                              desc: <i className='tabler-chevron-down text-xl' />
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    {t('invoices.noDataAvailable')}
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
          onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
        />
      </Card>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title={t('invoices.deleteConfirmation.title')}
        message={t('invoices.deleteConfirmation.message')}
        itemName={invoiceToDelete?.invoiceNumber || `Invoice #${invoiceToDelete?.id}`}
        loading={deleteLoading}
      />
    </>
  )
}

export default InvoiceListTable
