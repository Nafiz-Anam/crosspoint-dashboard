'use client'

// React Imports
import { useEffect, useState, useMemo, useCallback, useRef } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress' // For loading indicator
import Alert from '@mui/material/Alert' // For error messages

// Component Imports
import DeleteConfirmationDialog from '@components/dialogs/DeleteConfirmationDialog'

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
import { useSession } from 'next-auth/react' // Import useSession to get token

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'
import AddBranchDrawer from './AddBranchDrawer' // Ensure this is the updated drawer
import CustomTextField from '@core/components/mui/TextField'
import toastService from '@/services/toastService'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Styled Components
const Icon = styled('i')({})

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

// Removed DebouncedInput component - using manual debouncing instead

const columnHelper = createColumnHelper()

const BranchListTable = () => {
  console.log('🔄 BranchListTable component rendered')

  // States for Drawer
  const [addBranchOpen, setAddBranchOpen] = useState(false)
  const [editingBranch, setEditingBranch] = useState(null) // New state to hold branch data for editing

  // States for Table Data and API Operations
  const [branches, setBranches] = useState([]) // Stores fetched branch data
  const [fetchLoading, setFetchLoading] = useState(true) // Loading state for data fetch
  const [fetchError, setFetchError] = useState(null) // Error state for data fetch

  // States for Delete Dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [branchToDelete, setBranchToDelete] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

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

  // Ref to track if initial fetch has been made
  const hasInitiallyFetched = useRef(false)

  // Refs to store current values without causing re-renders
  const currentGlobalFilter = useRef('')
  const currentPagination = useRef({ page: 1, limit: 10 })

  const { lang: locale } = useParams()
  const { data: session, status } = useSession() // Get session and status
  const { t } = useTranslation()

  // Function to fetch branch data from API with pagination
  const fetchBranches = async (
    page = 1,
    search = '',
    sortBy = 'createdAt',
    sortType = 'desc',
    limit = 10,
    isActive = ''
  ) => {
    console.log('🔄 fetchBranches called with:', { page, search, sortBy, sortType, limit })
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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/branches?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      const responseData = await response.json()

      if (response.ok) {
        setBranches(responseData.data || [])
        setPagination(prev => ({
          ...prev,
          page: responseData.pagination?.page || page,
          total: responseData.pagination?.total || 0,
          totalPages: responseData.pagination?.totalPages || 0,
          hasNext: responseData.pagination?.hasNext || false,
          hasPrev: responseData.pagination?.hasPrev || false
        }))
      } else {
        const errorMessage = responseData.message || `Failed to fetch branches: ${response.status}`
        setFetchError(errorMessage)
        await toastService.handleApiError(response, 'Failed to create branch')
        console.error('API Error fetching branches:', responseData)
      }
    } catch (error) {
      const errorMessage = 'Network error or unexpected issue fetching branches. Please try again.'
      setFetchError(errorMessage)
      await toastService.handleApiError(error, errorMessage)
      console.error('Fetch error branches:', error)
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
      fetchBranches(
        page,
        currentGlobalFilter.current,
        'createdAt',
        'desc',
        currentPagination.current.limit,
        statusFilter
      )
    },
    [pagination.page]
  )

  const handleRowsPerPageChange = useCallback(event => {
    console.log('🔄 handleRowsPerPageChange called with:', event.target.value)
    const newLimit = parseInt(event.target.value, 10)
    currentPagination.current = { page: 1, limit: newLimit }
    setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }))
    fetchBranches(1, currentGlobalFilter.current, 'createdAt', 'desc', newLimit, statusFilter)
  }, [])

  const handleSearch = useCallback(value => {
    console.log('🔄 handleSearch called with:', value)
    currentGlobalFilter.current = value
    currentPagination.current = { ...currentPagination.current, page: 1 }
    setGlobalFilter(value)
    setPagination(prev => ({ ...prev, page: 1 }))
    fetchBranches(1, value, 'createdAt', 'desc', currentPagination.current.limit, statusFilter)
  }, [])

  const handleSort = useCallback((columnId, direction) => {
    console.log('🔄 handleSort called with:', { columnId, direction })
    const sortBy = columnId || 'createdAt'
    const sortType = direction || 'desc'
    fetchBranches(
      currentPagination.current.page,
      currentGlobalFilter.current,
      sortBy,
      sortType,
      currentPagination.current.limit,
      statusFilter
    )
  }, [])

  // Effect to fetch data on component mount or when session/token changes
  useEffect(() => {
    console.log('🔄 useEffect triggered with:', { status, hasInitiallyFetched: hasInitiallyFetched.current })

    if (status === 'authenticated' && !hasInitiallyFetched.current) {
      console.log('🔄 Making initial fetch...')
      hasInitiallyFetched.current = true
      fetchBranches(1, '', 'createdAt', 'desc', 10, '')
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

    console.log('🔄 Status filter changed to:', statusFilter)
    currentPagination.current = { ...currentPagination.current, page: 1 }
    setPagination(prev => ({ ...prev, page: 1 }))
    fetchBranches(
      1,
      currentGlobalFilter.current,
      'createdAt',
      'desc',
      currentPagination.current.limit,
      statusFilter || ''
    )
  }, [statusFilter])

  // No client-side filtering needed since we're using server-side pagination and search

  // Function to open delete confirmation dialog
  const handleDeleteClick = useCallback(
    branchId => {
      const branch = branches.find(b => b.id === branchId)
      setBranchToDelete(branch)
      setDeleteDialogOpen(true)
    },
    [branches]
  )

  // Function to handle branch deletion
  const handleDeleteBranch = useCallback(async () => {
    if (!branchToDelete) return

    if (!session?.accessToken) {
      toastService.showError('Authentication token not found. Cannot delete branch.')
      setDeleteDialogOpen(false)
      return
    }

    setDeleteLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/branches/${branchToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      if (response.ok) {
        // Show success toast
        toastService.handleApiSuccess('deleted', 'Branch')
        console.log(`Branch ${branchToDelete.id} deleted successfully.`)
        fetchBranches(
          currentPagination.current.page,
          currentGlobalFilter.current,
          'createdAt',
          'desc',
          currentPagination.current.limit,
          statusFilter
        ) // Re-fetch data to update the table
        setDeleteDialogOpen(false)
        setBranchToDelete(null)
      } else {
        // Show error toast
        await toastService.handleApiError(response, 'Failed to delete branch')
        console.error('API Error deleting branch:', await response.json())
      }
    } catch (error) {
      // Show error toast
      await toastService.handleApiError(error, 'Network error or unexpected issue during deletion. Please try again.')
      console.error('Fetch error deleting branch:', error)
    } finally {
      setDeleteLoading(false)
    }
  }, [session?.accessToken, branchToDelete])

  // Function to open drawer for editing
  const handleEditClick = useCallback(branch => {
    setEditingBranch(branch) // Set the branch data to be edited
    setAddBranchOpen(true) // Open the drawer
  }, [])

  // Function to close drawer and clear editing state
  const handleDrawerClose = () => {
    setAddBranchOpen(false) // Close the drawer
    setEditingBranch(null) // Clear editing branch data, important for "Add New"
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('branchId', {
        header: t('common.branchId'),
        cell: info => (
          <Typography color='text.primary' className='font-medium'>
            {info.getValue()}
          </Typography>
        ),
        enableSorting: true
      }),
      columnHelper.accessor('name', {
        header: t('branches.fields.name'),
        cell: info => (
          <Typography color='text.primary' className='font-medium'>
            {info.getValue()}
          </Typography>
        ),
        enableSorting: true
      }),
      columnHelper.accessor('location', {
        header: t('common.location'),
        cell: ({ row }) => (
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
              {row.original.address}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {[row.original.city, row.original.province, row.original.postalCode].filter(Boolean).join(', ')}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('contact', {
        header: t('common.contact'),
        cell: ({ row }) => (
          <div className='flex flex-col'>
            {row.original.phone && (
              <Typography variant='body2' color='text.primary'>
                {row.original.phone}
              </Typography>
            )}
            {row.original.email && (
              <Typography variant='body2' color='text.primary'>
                {row.original.email}
              </Typography>
            )}
            {!row.original.phone && !row.original.email && (
              <Typography variant='body2' color='text.secondary'>
                No contact info
              </Typography>
            )}
          </div>
        )
      }),
      columnHelper.accessor('isActive', {
        header: t('branches.fields.status'),
        cell: info => (
          <Chip
            label={info.getValue() ? t('branches.status.active') : t('branches.status.inactive')}
            color={info.getValue() ? 'success' : 'default'}
            variant='tonal'
            size='small'
          />
        ),
        enableSorting: true
      }),
      columnHelper.accessor('action', {
        header: t('branches.fields.action'),
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <IconButton onClick={() => handleEditClick(row.original)} size='small'>
              <i className='tabler-edit text-textSecondary' />
            </IconButton>
            <IconButton onClick={() => handleDeleteClick(row.original.id)} size='small'>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    [handleDeleteClick, handleEditClick, t] // Depend on handleDeleteClick, handleEditClick, and t
  )

  const table = useReactTable({
    data: branches,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, // We're handling pagination server-side
    manualSorting: true, // We're handling sorting server-side
    pageCount: pagination.totalPages
  })

  console.log('Current pagination state before render:', pagination)

  return (
    <>
      <Card>
        <CardHeader title={t('branches.branchManagement')} className='pbe-4' />

        <div className='flex flex-wrap items-end gap-4 p-6 border-bs'>
          {/* Status Filter */}
          <CustomTextField
            select
            label={t('branches.fields.status')}
            value={statusFilter}
            onChange={e => {
              const value = e.target.value
              console.log('🔄 Status filter changed to:', value)
              setStatusFilter(value)
            }}
            className='min-w-[180px]'
          >
            <MenuItem value=''>{t('branches.all')}</MenuItem>
            <MenuItem value='true'>{t('branches.status.active')}</MenuItem>
            <MenuItem value='false'>{t('branches.status.inactive')}</MenuItem>
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
            placeholder={t('branches.searchBranch')}
            className='min-w-[200px]'
          />

          <Button
            variant='contained'
            startIcon={<i className='tabler-plus' />}
            onClick={() => {
              setEditingBranch(null) // Ensure no branch is being edited when adding new
              setAddBranchOpen(true)
            }}
            className='ml-auto h-[40px]'
          >
            {t('branches.addNewBranch')}
          </Button>
        </div>

        {fetchLoading ? (
          <div className='flex justify-center items-center p-6'>
            <CircularProgress />
            <Typography className='ml-4'>{t('branches.loadingBranches')}</Typography>
          </div>
        ) : fetchError ? (
          <Alert severity='error' sx={{ m: 6 }}>
            {fetchError}
          </Alert>
        ) : (
          <div className='overflow-x-auto'>
            <table className={tableStyles.table}>
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th key={header.id}>
                        {header.isPlaceholder ? null : (
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
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getFilteredRowModel().rows.length === 0 ? (
                  <tr>
                    <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                      No data available
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

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

      <AddBranchDrawer
        open={addBranchOpen}
        handleClose={handleDrawerClose} // Use the new handler
        currentBranch={editingBranch} // Pass the branch data for editing
        onBranchAdded={() =>
          fetchBranches(
            currentPagination.current.page,
            currentGlobalFilter.current,
            'createdAt',
            'desc',
            currentPagination.current.limit,
            statusFilter
          )
        } // Callback to re-fetch data after adding/editing a branch
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        onConfirm={handleDeleteBranch}
        title={t('branches.deleteConfirmation.title')}
        message={t('branches.deleteConfirmation.message')}
        itemName={branchToDelete?.name}
        loading={deleteLoading}
      />
    </>
  )
}

export default BranchListTable
