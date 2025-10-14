'use client'

import { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import classnames from 'classnames'
import OptionMenu from '@core/components/option-menu'
import { rankItem } from '@tanstack/match-sorter-utils' // Added missing import
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues
} from '@tanstack/react-table'
import { useSession } from 'next-auth/react' // Added session import
import CustomTextField from '@core/components/mui/TextField'
import AddClientDrawer from './AddClientDrawer'
import TablePaginationComponent from '@components/TablePaginationComponent'
import { getLocalizedUrl } from '@/utils/i18n'
import tableStyles from '@core/styles/table.module.css'

// Service Imports
import toastService from '@/services/toastService'
import enhancedClientService from '@/services/enhancedClientService'

// Component Imports
import DeleteConfirmationDialog from '@components/dialogs/DeleteConfirmationDialog'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

const columnHelper = createColumnHelper()
// Removed clientStatusObj - status not used for clients

// Fuzzy filter for search
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

// Removed DebouncedInput component - using manual debouncing instead

const ClientListTable = () => {
  console.log('🔄 ClientListTable component rendered')

  // States for Drawer
  const [addClientOpen, setAddClientOpen] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [viewingClient, setViewingClient] = useState(null)

  // States for Table Data and API Operations
  const [clients, setClients] = useState([]) // Stores fetched client data
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
  const [branchFilter, setBranchFilter] = useState('')

  // States for Delete Dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [clientToDelete, setClientToDelete] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // Ref to track if initial fetch has been made
  const hasInitiallyFetched = useRef(false)

  // Refs to store current values without causing re-renders
  const currentGlobalFilter = useRef('')
  const currentPagination = useRef({ page: 1, limit: 10 })

  // Hooks
  const { lang: locale } = useParams()
  const { data: session, status: sessionStatus } = useSession()
  const { t } = useTranslation()

  // Removed fetchInvoiceCounts - using _count.invoices from API response

  // Function to fetch client data from API with pagination
  const fetchClients = async (
    page = 1,
    search = '',
    sortBy = 'createdAt',
    sortType = 'desc',
    limit = 10,
    branch = ''
  ) => {
    console.log('🔄 fetchClients called with:', { page, search, sortBy, sortType, limit, branch })
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

      if (branch) {
        console.log('🔄 Adding branchId to query:', branch)
        queryParams.append('branchId', branch)
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      const responseData = await response.json()

      if (response.ok) {
        setClients(responseData.data || [])
        setPagination(prev => ({
          ...prev,
          page: responseData.pagination?.page || page,
          total: responseData.pagination?.total || 0,
          totalPages: responseData.pagination?.totalPages || 0,
          hasNext: responseData.pagination?.hasNext || false,
          hasPrev: responseData.pagination?.hasPrev || false
        }))
      } else {
        const errorMessage = responseData.message || `Failed to fetch clients: ${response.status}`
        setFetchError(errorMessage)
        await toastService.handleApiError(response, 'Failed to fetch clients')
        console.error('API Error fetching clients:', responseData)
      }
    } catch (error) {
      const errorMessage = 'Network error or unexpected issue fetching clients. Please try again.'
      setFetchError(errorMessage)
      await toastService.handleApiError(error, errorMessage)
      console.error('Fetch error clients:', error)
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
      fetchClients(
        page,
        currentGlobalFilter.current,
        'createdAt',
        'desc',
        currentPagination.current.limit,
        branchFilter
      )
    },
    [pagination.page, branchFilter]
  )

  const handleRowsPerPageChange = useCallback(
    event => {
      console.log('🔄 handleRowsPerPageChange called with:', event.target.value)
      const newLimit = parseInt(event.target.value, 10)
      currentPagination.current = { page: 1, limit: newLimit }
      setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }))
      fetchClients(1, currentGlobalFilter.current, 'createdAt', 'desc', newLimit, branchFilter)
    },
    [branchFilter]
  )

  const handleSearch = useCallback(
    value => {
      console.log('🔄 handleSearch called with:', value)
      currentGlobalFilter.current = value
      currentPagination.current = { ...currentPagination.current, page: 1 }
      setGlobalFilter(value)
      setPagination(prev => ({ ...prev, page: 1 }))
      fetchClients(1, value, 'createdAt', 'desc', currentPagination.current.limit, branchFilter)
    },
    [branchFilter]
  )

  const handleSort = useCallback(
    (columnId, direction) => {
      console.log('🔄 handleSort called with:', { columnId, direction })
      const sortBy = columnId || 'createdAt'
      const sortType = direction || 'desc'
      fetchClients(
        currentPagination.current.page,
        currentGlobalFilter.current,
        sortBy,
        sortType,
        currentPagination.current.limit,
        branchFilter
      )
    },
    [branchFilter]
  )

  // Effect to fetch data on component mount or when session/token changes
  useEffect(() => {
    console.log('🔄 useEffect triggered with:', { sessionStatus, hasInitiallyFetched: hasInitiallyFetched.current })

    if (sessionStatus === 'authenticated' && !hasInitiallyFetched.current) {
      console.log('🔄 Making initial fetch...')
      hasInitiallyFetched.current = true
      fetchClients(1, '', 'createdAt', 'desc', 10, '')
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

  // Effect to handle branch filter changes
  useEffect(() => {
    // Only run if we have fetched data at least once
    if (!hasInitiallyFetched.current) {
      return
    }

    console.log('🔄 Branch filter changed to:', branchFilter)
    currentPagination.current = { ...currentPagination.current, page: 1 }
    setPagination(prev => ({ ...prev, page: 1 }))
    fetchClients(
      1,
      currentGlobalFilter.current,
      'createdAt',
      'desc',
      currentPagination.current.limit,
      branchFilter || ''
    )
  }, [branchFilter])

  // Function to handle client deletion
  const handleDeleteClick = useCallback(
    clientId => {
      const client = clients.find(c => c.id === clientId)
      setClientToDelete(client)
      setDeleteDialogOpen(true)
    },
    [clients]
  )

  // Function to confirm client deletion
  const handleDeleteClient = useCallback(async () => {
    if (!clientToDelete) return

    if (!session?.accessToken) {
      toastService.showError('Authentication token not found. Cannot delete client.')
      setDeleteDialogOpen(false)
      return
    }

    setDeleteLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/${clientToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      if (response.ok) {
        // Show success toast
        toastService.handleApiSuccess('deleted', 'Client')
        console.log(`Client ${clientToDelete.id} deleted successfully.`)
        // Re-fetch data after deletion
        fetchClients(
          currentPagination.current.page,
          currentGlobalFilter.current,
          'createdAt',
          'desc',
          currentPagination.current.limit,
          branchFilter
        )
        setDeleteDialogOpen(false)
        setClientToDelete(null)
      } else {
        // Show error toast
        await toastService.handleApiError(response, 'Failed to delete client')
        console.error('API Error deleting client:', await response.json())
      }
    } catch (error) {
      // Show error toast
      await toastService.handleApiError(error, 'Network error or unexpected issue during deletion. Please try again.')
      console.error('Fetch error deleting client:', error)
    } finally {
      setDeleteLoading(false)
    }
  }, [session?.accessToken, fetchClients, clientToDelete])

  // Function to open drawer for editing
  const handleEditClick = useCallback(client => {
    setEditingClient(client)
    setViewingClient(null)
    setAddClientOpen(true)
  }, [])

  // Function to open drawer for viewing
  const handleViewClick = useCallback(client => {
    setViewingClient(client)
    setEditingClient(null)
    setAddClientOpen(true)
  }, [])

  // Function to close drawer and clear editing/viewing state
  const handleDrawerClose = () => {
    setAddClientOpen(false)
    setEditingClient(null)
    setViewingClient(null)
  }

  // Derive unique values for filter dropdowns from the fetched data
  const branches = useMemo(() => {
    const branchMap = new Map()
    clients.forEach(item => {
      if (item.branch?.id && item.branch?.name) {
        branchMap.set(item.branch.id, item.branch.name)
      }
    })
    return Array.from(branchMap.entries()).map(([id, name]) => ({ id, name }))
  }, [clients])

  // Column definitions
  const columns = useMemo(
    () => [
      columnHelper.accessor('clientId', {
        header: t('clients.fields.clientId'),
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.clientId || '-'}
          </Typography>
        ),
        enableSorting: true
      }),
      columnHelper.accessor('name', {
        header: t('clients.fields.name'),
        cell: ({ row }) => (
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
              {row.original.name || row.original.email}
            </Typography>
            <Typography variant='body2'>{row.original.email}</Typography>
            {row.original.nationalIdentificationNumber && (
              <Typography variant='caption' color='text.secondary'>
                ID: {row.original.nationalIdentificationNumber}
              </Typography>
            )}
          </div>
        ),
        enableSorting: true
      }),
      columnHelper.accessor('phone', {
        header: t('clients.fields.phone'),
        cell: ({ row }) => <Typography color='text.primary'>{row.original.phone || '-'}</Typography>,
        enableSorting: true
      }),
      columnHelper.accessor('address', {
        header: t('clients.fields.address'),
        cell: ({ row }) => {
          const address = row.original.address
          const city = row.original.city
          const postalCode = row.original.postalCode
          if (!address && !city && !postalCode) return <Typography>-</Typography>
          return (
            <div className='flex flex-col'>
              {address && (
                <Typography variant='body2' color='text.primary'>
                  {address}
                </Typography>
              )}
              {(city || postalCode) && (
                <Typography variant='caption' color='text.secondary'>
                  {city}
                  {city && postalCode ? ', ' : ''}
                  {postalCode}
                </Typography>
              )}
            </div>
          )
        },
        enableSorting: true
      }),
      columnHelper.accessor('branch', {
        header: t('clients.fields.branch'),
        cell: ({ row }) => <Typography color='text.primary'>{row.original.branch?.name || '-'}</Typography>,
        enableSorting: true
      }),
      columnHelper.accessor('_count.invoices', {
        header: 'USAGE',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Typography color='text.primary' className='font-medium'>
              Invoices: {row.original._count?.invoices || 0}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('action', {
        header: t('clients.fields.action'),
        cell: ({ row }) => {
          // Get user role from session
          const userRole = session?.user?.role

          // Create base options array
          const baseOptions = [
            {
              text: t('clients.view'),
              icon: 'tabler-eye',
              menuItemProps: {
                className: 'flex items-center gap-2 text-textSecondary',
                onClick: () => handleViewClick(row.original)
              }
            }
          ]

          // Add Create Task option only if user is not HR
          if (userRole !== 'HR') {
            baseOptions.push({
              text: 'Create Task',
              icon: 'tabler-plus',
              menuItemProps: {
                component: Link,
                href: getLocalizedUrl(`/apps/task/add?clientId=${row.original.id}`, locale),
                className: 'flex items-center gap-2 text-textSecondary'
              }
            })
          }

          // Add remaining options
          baseOptions.push(
            {
              text: t('clients.edit'),
              icon: 'tabler-edit',
              menuItemProps: {
                className: 'flex items-center gap-2 text-textSecondary',
                onClick: () => handleEditClick(row.original)
              }
            },
            {
              text: t('clients.delete'),
              icon: 'tabler-trash',
              menuItemProps: {
                className: 'flex items-center gap-2 text-textSecondary',
                onClick: () => handleDeleteClick(row.original.id)
              }
            }
          )

          return (
            <div className='flex items-center'>
              <OptionMenu
                iconButtonProps={{ size: 'medium' }}
                iconClassName='text-textSecondary'
                options={baseOptions}
              />
            </div>
          )
        },
        enableSorting: false
      })
    ],
    [handleDeleteClick, handleEditClick, handleViewClick, locale, session?.user?.role]
  )

  const table = useReactTable({
    data: clients, // Use clients directly instead of filteredData
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { globalFilter },
    initialState: { pagination: { pageSize: 10 } },
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
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

  return (
    <>
      <Card>
        <CardHeader title={t('clients.clientManagement')} className='pbe-4' />
        <div className='flex flex-wrap items-end gap-4 p-6 border-bs'>
          {/* Branch Filter */}
          <CustomTextField
            select
            label={t('clients.fields.branch')}
            value={branchFilter}
            onChange={e => setBranchFilter(e.target.value)}
            className='min-w-[180px]'
          >
            <MenuItem value=''>{t('clients.all')}</MenuItem>
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
              setGlobalFilter(value)
              // Debounce the search manually
              clearTimeout(window.searchTimeout)
              window.searchTimeout = setTimeout(() => {
                handleSearch(value)
              }, 500)
            }}
            placeholder={t('clients.searchClient')}
            className='min-w-[200px]'
          />

          <Button
            variant='contained'
            startIcon={<i className='tabler-plus' />}
            onClick={() => {
              setEditingClient(null)
              setAddClientOpen(true)
            }}
            className='ml-auto h-[40px]'
          >
            {t('clients.addNewClient')}
          </Button>
        </div>

        {fetchLoading ? (
          <div className='flex justify-center items-center p-6'>
            <CircularProgress />
            <Typography className='ml-4'>{t('clients.loadingClients')}</Typography>
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
              {table.getFilteredRowModel().rows.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                      {t('clients.noClientsAvailable')}
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              )}
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
      <AddClientDrawer
        open={addClientOpen}
        handleClose={handleDrawerClose}
        currentClient={editingClient || viewingClient}
        onClientAdded={() => {
          // Refresh data after client is added/updated
          fetchClients(
            currentPagination.current.page,
            currentGlobalFilter.current,
            'createdAt',
            'desc',
            currentPagination.current.limit,
            branchFilter
          )
        }}
        isViewMode={!!viewingClient}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        onConfirm={handleDeleteClient}
        title={t('clients.deleteConfirmation.title')}
        message={t('clients.deleteConfirmation.message')}
        itemName={clientToDelete?.name || clientToDelete?.email}
        loading={deleteLoading}
      />
    </>
  )
}

export default ClientListTable
