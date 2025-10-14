'use client'

// React Imports
import { useState, useEffect, useMemo, useCallback, useRef } from 'react'

// Next Imports
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
import TablePaginationComponent from '@components/TablePaginationComponent'
import OptionMenu from '@core/components/option-menu'
import CustomTextField from '@core/components/mui/TextField'
import DeleteConfirmationDialog from '@components/dialogs/DeleteConfirmationDialog'
import toastService from '@/services/toastService'
import bankAccountService from '@/libs/bankAccountService'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'
import { useSession } from 'next-auth/react'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

// Removed DebouncedInput component - using manual debouncing instead

// Column Definitions
const columnHelper = createColumnHelper()

const BankAccountListTable = ({ onBankAccountAction, onAddBankAccount }) => {
  console.log('🔄 BankAccountListTable component rendered')

  // States for Table Data and API Operations
  const [bankAccounts, setBankAccounts] = useState([]) // Stores fetched bank account data
  const [fetchLoading, setFetchLoading] = useState(true) // Loading state for data fetch
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
  const [isActiveFilter, setIsActiveFilter] = useState('')

  // States for Delete Dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [bankAccountToDelete, setBankAccountToDelete] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // Ref to track if initial fetch has been made
  const hasInitiallyFetched = useRef(false)

  // Refs to store current values without causing re-renders
  const currentGlobalFilter = useRef('')
  const currentPagination = useRef({ page: 1, limit: 10 })

  // Hooks
  const { lang: locale } = useParams()
  const { data: session, status } = useSession() // Get session and status
  const { t } = useTranslation()

  // Function to fetch bank account data from API with pagination
  const fetchBankAccounts = async (
    page = 1,
    search = '',
    sortBy = 'createdAt',
    sortType = 'desc',
    limit = 10,
    isActive = ''
  ) => {
    console.log('🔄 fetchBankAccounts called with:', { page, search, sortBy, sortType, limit })
    console.log('🔄 Current status:', status)
    console.log('🔄 Has initially fetched:', hasInitiallyFetched.current)

    setFetchLoading(true)
    setFetchError(null)

    if (status === 'loading') return // Wait for session to load
    if (status === 'unauthenticated' || !session?.accessToken) {
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

      if (isActive) {
        queryParams.append('isActive', isActive)
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bank-accounts?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      const responseData = await response.json()

      if (response.ok) {
        setBankAccounts(responseData.data || [])
        setPagination(prev => ({
          ...prev,
          page: responseData.pagination?.page || page,
          total: responseData.pagination?.total || 0,
          totalPages: responseData.pagination?.totalPages || 0,
          hasNext: responseData.pagination?.hasNext || false,
          hasPrev: responseData.pagination?.hasPrev || false
        }))
      } else {
        const errorMessage = responseData.message || `Failed to fetch bank accounts: ${response.status}`
        setFetchError(errorMessage)
        await toastService.handleApiError(response, 'Failed to fetch bank accounts')
        console.error('API Error fetching bank accounts:', responseData)
      }
    } catch (error) {
      const errorMessage = 'Network error or unexpected issue fetching bank accounts. Please try again.'
      setFetchError(errorMessage)
      await toastService.handleApiError(error, errorMessage)
      console.error('Fetch error bank accounts:', error)
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
      fetchBankAccounts(
        page,
        currentGlobalFilter.current,
        'createdAt',
        'desc',
        currentPagination.current.limit,
        isActiveFilter
      )
    },
    [pagination.page]
  )

  const handleRowsPerPageChange = useCallback(event => {
    console.log('🔄 handleRowsPerPageChange called with:', event.target.value)
    const newLimit = parseInt(event.target.value, 10)
    currentPagination.current = { page: 1, limit: newLimit }
    setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }))
    fetchBankAccounts(1, currentGlobalFilter.current, 'createdAt', 'desc', newLimit, isActiveFilter)
  }, [])

  const handleSearch = useCallback(value => {
    console.log('🔄 handleSearch called with:', value)
    currentGlobalFilter.current = value
    currentPagination.current = { ...currentPagination.current, page: 1 }
    setGlobalFilter(value)
    setPagination(prev => ({ ...prev, page: 1 }))
    fetchBankAccounts(1, value, 'createdAt', 'desc', currentPagination.current.limit, isActiveFilter)
  }, [])

  const handleSort = useCallback((columnId, direction) => {
    console.log('🔄 handleSort called with:', { columnId, direction })
    const sortBy = columnId || 'createdAt'
    const sortType = direction || 'desc'
    fetchBankAccounts(
      currentPagination.current.page,
      currentGlobalFilter.current,
      sortBy,
      sortType,
      currentPagination.current.limit,
      isActiveFilter
    )
  }, [])

  // Effect to fetch data on component mount or when session/token changes
  useEffect(() => {
    console.log('🔄 useEffect triggered with:', { status, hasInitiallyFetched: hasInitiallyFetched.current })

    if (status === 'authenticated' && !hasInitiallyFetched.current) {
      console.log('🔄 Making initial fetch...')
      hasInitiallyFetched.current = true
      fetchBankAccounts(1, '', 'createdAt', 'desc', 10, '')
    } else if (status === 'unauthenticated') {
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
  }, [status, session?.accessToken]) // Re-fetch if session status or token changes

  // Effect to handle status filter changes
  useEffect(() => {
    // Only run if we have fetched data at least once
    if (!hasInitiallyFetched.current) {
      return
    }

    console.log('🔄 Status filter changed to:', isActiveFilter)
    currentPagination.current = { ...currentPagination.current, page: 1 }
    setPagination(prev => ({ ...prev, page: 1 }))
    fetchBankAccounts(
      1,
      currentGlobalFilter.current,
      'createdAt',
      'desc',
      currentPagination.current.limit,
      isActiveFilter || ''
    )
  }, [isActiveFilter])

  // Handle delete click
  const handleDeleteClick = useCallback(bankAccount => {
    setBankAccountToDelete(bankAccount)
    setDeleteDialogOpen(true)
  }, [])

  // Handle delete confirmation
  const handleDeleteConfirm = useCallback(async () => {
    if (!bankAccountToDelete) return

    setDeleteLoading(true)
    try {
      await onBankAccountAction('delete', bankAccountToDelete.id)
      toastService.handleApiSuccess('deleted', 'Bank Account')
      setDeleteDialogOpen(false)
      setBankAccountToDelete(null)
      // Re-fetch data after deletion
      fetchBankAccounts(
        currentPagination.current.page,
        currentGlobalFilter.current,
        'createdAt',
        'desc',
        currentPagination.current.limit,
        isActiveFilter
      )
    } catch (error) {
      await toastService.handleApiError(error, 'Failed to delete bank account')
    } finally {
      setDeleteLoading(false)
    }
  }, [bankAccountToDelete, onBankAccountAction, currentPagination.current.page, currentGlobalFilter.current])

  const columns = useMemo(
    () => [
      columnHelper.accessor('bankName', {
        header: t('paymentMethods.fields.bankName'),
        cell: ({ row }) => (
          <Typography className='font-medium' color='text.primary'>
            {row.original.bankName}
          </Typography>
        ),
        enableSorting: true
      }),
      columnHelper.accessor('accountName', {
        header: t('paymentMethods.fields.name'),
        cell: ({ row }) => <Typography color='text.primary'>{row.original.accountName || 'N/A'}</Typography>,
        enableSorting: true
      }),
      columnHelper.accessor('accountNumber', {
        header: t('paymentMethods.fields.accountNumber'),
        cell: ({ row }) => (
          <Typography color='text.primary' fontFamily='monospace'>
            {row.original.accountNumber || 'N/A'}
          </Typography>
        ),
        enableSorting: true
      }),
      columnHelper.accessor('bankIban', {
        header: 'IBAN',
        cell: ({ row }) => (
          <Typography color='text.primary' fontFamily='monospace'>
            {row.original.bankIban || 'N/A'}
          </Typography>
        ),
        enableSorting: true
      }),
      columnHelper.accessor('bankSwiftCode', {
        header: t('common.swiftCode'),
        cell: ({ row }) => (
          <Typography color='text.primary' fontFamily='monospace'>
            {row.original.bankSwiftCode || 'N/A'}
          </Typography>
        ),
        enableSorting: true
      }),
      columnHelper.accessor('isActive', {
        header: t('paymentMethods.fields.status'),
        cell: ({ row }) => (
          <Chip
            label={row.original.isActive ? t('paymentMethods.status.active') : t('paymentMethods.status.inactive')}
            color={row.original.isActive ? 'success' : 'default'}
            size='small'
            variant='tonal'
          />
        ),
        enableSorting: true
      }),
      columnHelper.accessor('createdAt', {
        header: t('common.created'),
        cell: ({ row }) => (
          <Typography color='text.primary'>{new Date(row.original.createdAt).toLocaleDateString()}</Typography>
        ),
        enableSorting: true
      }),
      columnHelper.accessor('action', {
        header: t('paymentMethods.fields.action'),
        cell: ({ row }) => (
          <div className='flex items-center'>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: t('paymentMethods.edit'),
                  icon: 'tabler-pencil',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => onBankAccountAction('edit', row.original.id, row.original)
                  }
                },
                {
                  text: row.original.isActive ? t('paymentMethods.deactivate') : t('paymentMethods.activate'),
                  icon: row.original.isActive ? 'tabler-eye-off' : 'tabler-eye',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () =>
                      onBankAccountAction('update', row.original.id, {
                        isActive: !row.original.isActive
                      })
                  }
                },
                {
                  text: t('paymentMethods.delete'),
                  icon: 'tabler-trash',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => handleDeleteClick(row.original)
                  }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    [onBankAccountAction, t]
  )

  const table = useReactTable({
    data: bankAccounts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, // We're handling pagination server-side
    manualSorting: true, // We're handling sorting server-side
    pageCount: pagination.totalPages
  })

  console.log('Current pagination state before render:', pagination)

  return (
    <Card>
      <CardHeader title={t('paymentMethods.paymentMethodManagement')} className='pbe-4' />

      <div className='flex flex-wrap items-end gap-4 p-6 border-bs'>
        <CustomTextField
          select
          label={t('common.status')}
          value={isActiveFilter}
          onChange={e => {
            const value = e.target.value
            console.log('🔄 Status filter changed to:', value)
            setIsActiveFilter(value)
          }}
          className='min-w-[180px]'
        >
          <MenuItem value=''>{t('paymentMethods.all')}</MenuItem>
          <MenuItem value='true'>{t('paymentMethods.status.active')}</MenuItem>
          <MenuItem value='false'>{t('paymentMethods.status.inactive')}</MenuItem>
        </CustomTextField>

        <CustomTextField
          value={globalFilter ?? ''}
          onChange={e => {
            const value = e.target.value
            setGlobalFilter(value)
            // Debounce the search manually
            clearTimeout(window.searchTimeout)
            window.searchTimeout = setTimeout(() => {
              handleSearch(value)
            }, 500)
          }}
          placeholder={t('paymentMethods.searchPaymentMethod')}
          className='min-w-[200px]'
        />

        <Button
          variant='contained'
          startIcon={<i className='tabler-plus' />}
          onClick={onAddBankAccount}
          className='ml-auto h-[40px]'
        >
          {t('paymentMethods.addNewPaymentMethod')}
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
          {fetchLoading ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  Loading...
                </td>
              </tr>
            </tbody>
          ) : fetchError ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  {fetchError}
                </td>
              </tr>
            </tbody>
          ) : table.getRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  {t('paymentMethods.noPaymentMethodsAvailable')}
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
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

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title={t('paymentMethods.deleteConfirmation.title')}
        message={t('paymentMethods.deleteConfirmation.message')}
        itemName={bankAccountToDelete?.bankName}
        loading={deleteLoading}
      />
    </Card>
  )
}

export default BankAccountListTable
