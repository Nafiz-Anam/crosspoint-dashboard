'use client'

// React Imports
import { useState, useEffect, useMemo, useCallback, useRef } from 'react'

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
import { useSession } from 'next-auth/react'

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
import useRoleBasedAccess from '@/hooks/useRoleBasedAccess'
import { canDelete } from '@/utils/roleBasedAccess'

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

// Removed DebouncedInput component - using manual debouncing instead

// Vars
const invoiceStatusObj = {
  UNPAID: { color: 'warning', icon: 'tabler-clock' },
  PAID: { color: 'success', icon: 'tabler-check' },
  OVERDUE: { color: 'error', icon: 'tabler-alert-circle' },
  CANCELLED: { color: 'error', icon: 'tabler-x' }
}

// Column Definitions
const columnHelper = createColumnHelper()

const InvoiceListTable = ({ invoiceData, onFilterChange, onInvoiceAction, filters, branches = [], branchesLoading = false }) => {
  console.log('🔄 InvoiceListTable component rendered')

  // States for Table Data and API Operations
  const [invoices, setInvoices] = useState(invoiceData || []) // Stores fetched invoice data
  const [fetchLoading, setFetchLoading] = useState(false) // Loading state for data fetch
  const [fetchError, setFetchError] = useState(null) // Error state for data fetch

  // States for Pagination
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  })

  // States for Filtering and Search
  const [globalFilter, setGlobalFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [branchFilter, setBranchFilter] = useState('')
  const [rowSelection, setRowSelection] = useState({})

  // States for Delete Dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [invoiceToDelete, setInvoiceToDelete] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [exportLoading, setExportLoading] = useState(false)

  // Ref to track if initial fetch has been made
  const hasInitiallyFetched = useRef(false)

  // Refs to store current values without causing re-renders
  const currentGlobalFilter = useRef('')
  const currentPagination = useRef({ page: 1, limit: 10 })

  // Hooks
  const { lang: locale } = useParams()
  const { data: session, status: sessionStatus } = useSession()
  const { t } = useTranslation()
  const { userRole, userPermissions } = useRoleBasedAccess()

  // Function to fetch invoice data from API with pagination
  const fetchInvoices = async (
    page = 1,
    search = '',
    sortBy = 'createdAt',
    sortType = 'desc',
    limit = 10,
    status = ''
  ) => {
    console.log('🔄 fetchInvoices called with:', { page, search, sortBy, sortType, limit, status })
    console.log('🔄 Current status:', sessionStatus)
    console.log('🔄 Has initially fetched:', hasInitiallyFetched.current)

    setFetchLoading(true)
    setFetchError(null)

    if (sessionStatus === 'loading') return // Wait for session to load
    if (sessionStatus === 'unauthenticated' || !session?.accessToken) {
      setFetchError('Authentication required')
      setFetchLoading(false)
      return
    }

    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
        sortType
      })

      if (search) {
        queryParams.append('search', search)
      }

      if (status) {
        queryParams.append('status', status)
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      const responseData = await response.json()

      if (response.ok) {
        console.log('🔄 API Response data:', responseData.data)
        console.log('🔄 API Response pagination:', responseData.pagination)
        setInvoices(responseData.data || [])
        setPagination(prev => ({
          ...prev,
          page: responseData.pagination?.page || page,
          total: responseData.pagination?.total || 0,
          totalPages: responseData.pagination?.totalPages || 0,
          hasNext: responseData.pagination?.hasNext || false,
          hasPrev: responseData.pagination?.hasPrev || false
        }))
        console.log('🔄 Invoices state updated:', responseData.data || [])
        console.log('🔄 Pagination state updated:', {
          page: responseData.pagination?.page || page,
          total: responseData.pagination?.total || 0,
          totalPages: responseData.pagination?.totalPages || 0,
          hasNext: responseData.pagination?.hasNext || false,
          hasPrev: responseData.pagination?.hasPrev || false
        })
      } else {
        const errorMessage = responseData.message || `Failed to fetch invoices: ${response.status}`
        setFetchError(errorMessage)
        console.error('API Error fetching invoices:', responseData)
      }
    } catch (error) {
      const errorMessage = 'Network error or unexpected issue fetching invoices. Please try again.'
      setFetchError(errorMessage)
      console.error('Fetch error invoices:', error)
    } finally {
      setFetchLoading(false)
    }
  }

  // Handlers for pagination, search, and sorting
  const handlePageChange = useCallback(
    (event, newPage) => {
      console.log('🔄 handlePageChange called with:', { event, newPage, currentPage: pagination.page })
      const page = newPage + 1
      currentPagination.current = { ...currentPagination.current, page }
      setPagination(prev => ({ ...prev, page }))
      fetchInvoices(
        page,
        currentGlobalFilter.current,
        'createdAt',
        'desc',
        currentPagination.current.limit,
        statusFilter || ''
      )
    },
    [pagination.page, statusFilter]
  )

  const handleRowsPerPageChange = useCallback(
    event => {
      console.log('🔄 handleRowsPerPageChange called with:', event.target.value)
      const newLimit = parseInt(event.target.value, 10)
      currentPagination.current = { page: 1, limit: newLimit }
      setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }))
      fetchInvoices(1, currentGlobalFilter.current, 'createdAt', 'desc', newLimit, statusFilter || '')
    },
    [statusFilter]
  )

  const handleSearch = useCallback(
    value => {
      console.log('🔄 handleSearch called with:', value)
      currentGlobalFilter.current = value
      currentPagination.current = { ...currentPagination.current, page: 1 }
      setGlobalFilter(value)
      setPagination(prev => ({ ...prev, page: 1 }))
      fetchInvoices(1, value, 'createdAt', 'desc', currentPagination.current.limit, statusFilter || '')
    },
    [statusFilter]
  )

  const handleSort = useCallback(
    (columnId, direction) => {
      console.log('🔄 handleSort called with:', { columnId, direction })
      const sortBy = columnId || 'createdAt'
      const sortType = direction || 'desc'
      fetchInvoices(
        currentPagination.current.page,
        currentGlobalFilter.current,
        sortBy,
        sortType,
        currentPagination.current.limit,
        statusFilter || ''
      )
    },
    [statusFilter]
  )

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
      // Re-fetch data after deletion
      fetchInvoices(
        currentPagination.current.page,
        currentGlobalFilter.current,
        'createdAt',
        'desc',
        currentPagination.current.limit,
        statusFilter || ''
      )
      setDeleteDialogOpen(false)
      setInvoiceToDelete(null)
      // Success toast is already shown in handleInvoiceAction
    } catch (error) {
      console.error('Error deleting invoice:', error)
      // Error toast is already shown in handleInvoiceAction
      // Don't close dialog on error so user can retry
    } finally {
      setDeleteLoading(false)
    }
  }

  // Export handler
  const handleExportReport = useCallback(async () => {
    try {
      setExportLoading(true)
      
      // Build query parameters based on current filters
      const queryParams = new URLSearchParams()
      
      if (statusFilter) {
        queryParams.append('status', statusFilter)
      }
      
      if (branchFilter) {
        queryParams.append('branchId', branchFilter)
      }
      
      if (globalFilter) {
        queryParams.append('search', globalFilter)
      }
      
      // Add format parameter
      queryParams.append('format', 'excel')
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/invoices/export-revenue-report?${queryParams.toString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-client-type': 'web',
            Authorization: `Bearer ${session.accessToken}`
          }
        }
      )

      if (!response.ok) {
        throw new Error(`Export failed: ${response.status}`)
      }

      // Get the blob from response
      const blob = await response.blob()
      
      // Create download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      
      // Get filename from response headers or use default
      const contentDisposition = response.headers.get('Content-Disposition')
      let filename = 'revenue-report.xlsx'
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/)
        if (filenameMatch) {
          filename = filenameMatch[1]
        }
      }
      
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
    } catch (error) {
      console.error('Error exporting report:', error)
      // You can add a toast notification here if you have a toast service
    } finally {
      setExportLoading(false)
    }
  }, [statusFilter, branchFilter, globalFilter, session?.accessToken])

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
        ),
        enableSorting: true
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
        ),
        enableSorting: true
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
        ),
        enableSorting: true
      }),
      columnHelper.accessor('items', {
        header: t('invoices.serviceName'),
        cell: ({ row }) => {
          const services = row.original.items?.map(item => item.service?.name).filter(Boolean) || []
          return <Typography variant='body2'>{services.length > 0 ? services.join(', ') : 'N/A'}</Typography>
        },
        enableSorting: false
      }),
      columnHelper.accessor('totalAmount', {
        header: t('invoices.fields.amount'),
        cell: ({ row }) => <Typography>{`€${row.original.totalAmount?.toLocaleString() || '0'}`}</Typography>,
        enableSorting: true
      }),
      columnHelper.accessor('issuedDate', {
        header: t('invoices.fields.date'),
        cell: ({ row }) => <Typography>{new Date(row.original.issuedDate).toLocaleDateString()}</Typography>,
        enableSorting: true
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
                // Only show delete option if user has DELETE permission (employees cannot delete)
                ...(canDelete('INVOICE', userRole, userPermissions)
                  ? [
                      {
                        text: t('invoices.delete'),
                        icon: 'tabler-trash',
                        onClick: () => handleDeleteClick(row.original),
                        menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                      }
                    ]
                  : [])
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [invoices]
  )

  // Effect to fetch data on component mount or when session/token changes
  useEffect(() => {
    console.log('🔄 useEffect triggered with:', {
      sessionStatus,
      hasInitiallyFetched: hasInitiallyFetched.current,
      invoiceData
    })

    if (sessionStatus === 'authenticated' && !hasInitiallyFetched.current) {
      console.log('🔄 Making initial fetch...')
      hasInitiallyFetched.current = true
      fetchInvoices(1, '', 'createdAt', 'desc', 10, '')
    } else if (sessionStatus === 'unauthenticated') {
      console.log('🔄 User not authenticated')
      setFetchError('Not authenticated')
      setFetchLoading(false)
      hasInitiallyFetched.current = false
    }

    // Cleanup timeout on unmount
    return () => {
      if (window.searchTimeout) {
        clearTimeout(window.searchTimeout)
      }
    }
  }, [sessionStatus, session?.accessToken]) // Re-fetch if session status or token changes

  // Effect to handle status filter changes
  useEffect(() => {
    console.log('🔄 Status filter effect triggered with:', {
      statusFilter,
      hasInitiallyFetched: hasInitiallyFetched.current
    })

    // Only run if we have fetched data at least once
    if (!hasInitiallyFetched.current) {
      console.log('🔄 Status filter effect: Skipping because not initially fetched yet')
      return
    }

    console.log('🔄 Status filter changed to:', statusFilter)
    currentPagination.current = { ...currentPagination.current, page: 1 }
    setPagination(prev => ({ ...prev, page: 1 }))
    fetchInvoices(
      1,
      currentGlobalFilter.current,
      'createdAt',
      'desc',
      currentPagination.current.limit,
      statusFilter || ''
    )
  }, [statusFilter])

  console.log('🔄 Table data (invoices):', invoices)
  console.log('🔄 Pagination state:', pagination)
  console.log('🔄 Filter states:', { statusFilter, globalFilter })
  console.log('🔄 Has initially fetched:', hasInitiallyFetched.current)

  const table = useReactTable({
    data: invoices, // Use invoices directly instead of filteredData
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
    manualPagination: true, // Enable manual pagination
    manualSorting: true, // Enable manual sorting
    pageCount: pagination.totalPages,
    onSortingChange: updater => {
      if (typeof updater === 'function') {
        const newSorting = updater(table.getState().sorting)
        if (newSorting.length > 0) {
          const sort = newSorting[0]
          handleSort(sort.id, sort.desc ? 'desc' : 'asc')
        }
      }
    }
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

  // Note: Removed useEffect for external invoiceData since we're using server-side pagination

  return (
    <>
      <Card>
        <CardHeader title={t('invoices.invoiceManagement')} className='pbe-4' />

        <div className='flex flex-wrap items-end gap-4 p-6 border-bs'>
          <CustomTextField
            select
            label={t('invoices.fields.status')}
            value={statusFilter}
            onChange={e => {
              console.log('🔄 Status filter changed to:', e.target.value)
              setStatusFilter(e.target.value)
            }}
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
            label={t('invoices.fields.branch')}
            value={branchFilter}
            onChange={e => {
              console.log('🔄 Branch filter changed to:', e.target.value)
              setBranchFilter(e.target.value)
              onFilterChange({ branchId: e.target.value })
            }}
            className='min-w-[180px]'
            disabled={branchesLoading}
          >
            <MenuItem value=''>{t('invoices.allBranches')}</MenuItem>
            {branches.map(branch => (
              <MenuItem key={branch.id} value={branch.id}>
                {branch.name}
              </MenuItem>
            ))}
          </CustomTextField>

          <CustomTextField
            value={globalFilter ?? ''}
            onChange={e => {
              const value = e.target.value
              console.log('🔄 Search input changed to:', value)
              setGlobalFilter(value)
              // Debounce the search manually
              clearTimeout(window.searchTimeout)
              window.searchTimeout = setTimeout(() => {
                console.log('🔄 Debounced search triggered with:', value)
                handleSearch(value)
              }, 500)
            }}
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

          <Button
            variant='outlined'
            startIcon={<i className='tabler-file-export' />}
            onClick={handleExportReport}
            disabled={exportLoading}
            className='ml-2 h-[40px]'
          >
            {exportLoading ? t('invoices.exporting') : t('invoices.exportReport')}
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
            {invoices.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    {t('invoices.noDataAvailable')}
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table.getRowModel().rows.map(row => {
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
          component={() => (
            <TablePaginationComponent
              table={table}
              totalCount={pagination.total}
              currentPage={pagination.page - 1}
              pageSize={pagination.limit}
              onPageChange={handlePageChange}
            />
          )}
          count={pagination.total}
          rowsPerPage={pagination.limit}
          page={pagination.page - 1} // MUI uses 0-based indexing
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25, 50]}
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
