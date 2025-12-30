'use client'

// React Imports
import { useEffect, useState, useMemo, useCallback, useRef } from 'react'

// Next Imports
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
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import { useSession } from 'next-auth/react'

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'
import AddServiceDrawer from './AddServiceDrawer'
import CustomTextField from '@core/components/mui/TextField'
import DeleteConfirmationDialog from '@components/dialogs/DeleteConfirmationDialog'
import toastService from '@/services/toastService'
import apiClient from '@/services/apiClient'

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

const ServiceListTable = () => {
  console.log('🔄 ServiceListTable component rendered')

  // States for Drawer
  const [addServiceOpen, setAddServiceOpen] = useState(false)
  const [editingService, setEditingService] = useState(null)

  // States for Table Data and API Operations
  const [services, setServices] = useState([]) // Stores fetched service data
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
  const [categoryFilter, setCategoryFilter] = useState('')

  // States for Delete Confirmation Modal
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // Ref to track if initial fetch has been made
  const hasInitiallyFetched = useRef(false)

  // Refs to store current values without causing re-renders
  const currentGlobalFilter = useRef('')
  const currentPagination = useRef({ page: 1, limit: 10 })

  const { lang: locale } = useParams()
  const { data: session, status } = useSession()
  const { t } = useTranslation()

  // Function to fetch service data from API with pagination
  const fetchServices = async (
    page = 1,
    search = '',
    sortBy = 'createdAt',
    sortType = 'desc',
    limit = 10,
    category = ''
  ) => {
    console.log('🔄 fetchServices called with:', { page, search, sortBy, sortType, limit, category })

    setFetchLoading(true)
    setFetchError(null)

    try {
      const response = await apiClient.get('/services', {
        params: {
          page: page.toString(),
          limit: limit.toString(),
          sortBy,
          sortType,
          ...(search && { search }),
          ...(category && { category })
        }
      })

      const responseData = response.data

      setServices(responseData.data || [])
      setPagination(prev => ({
        ...prev,
        page: responseData.pagination?.page || page,
        total: responseData.pagination?.total || 0,
        totalPages: responseData.pagination?.totalPages || 0,
        hasNext: responseData.pagination?.hasNext || false,
        hasPrev: responseData.pagination?.hasPrev || false
      }))
    } catch (error) {
      const errorMessage = 'Network error or unexpected issue fetching services. Please try again.'
      setFetchError(errorMessage)
      await toastService.handleApiError(error, errorMessage)
      console.error('Fetch error services:', error)
    } finally {
      setFetchLoading(false)
    }
  }

  // Handle delete click
  const handleDeleteClick = useCallback(service => {
    setServiceToDelete(service)
    setDeleteDialogOpen(true)
  }, [])

  // Handlers for pagination, search, and sorting
  const handlePageChange = useCallback(
    (event, newPage) => {
      console.log('🔄 handlePageChange called with:', { event, newPage, currentPage: pagination.page })
      const page = newPage + 1
      currentPagination.current = { ...currentPagination.current, page }
      setPagination(prev => ({ ...prev, page }))
      fetchServices(
        page,
        currentGlobalFilter.current,
        'createdAt',
        'desc',
        currentPagination.current.limit,
        categoryFilter
      )
    },
    [pagination.page, categoryFilter]
  )

  const handleRowsPerPageChange = useCallback(
    event => {
      console.log('🔄 handleRowsPerPageChange called with:', event.target.value)
      const newLimit = parseInt(event.target.value, 10)
      currentPagination.current = { page: 1, limit: newLimit }
      setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }))
      fetchServices(1, currentGlobalFilter.current, 'createdAt', 'desc', newLimit, categoryFilter)
    },
    [categoryFilter]
  )

  const handleSearch = useCallback(
    value => {
      console.log('🔄 handleSearch called with:', value)
      currentGlobalFilter.current = value
      currentPagination.current = { ...currentPagination.current, page: 1 }
      setGlobalFilter(value)
      setPagination(prev => ({ ...prev, page: 1 }))
      fetchServices(1, value, 'createdAt', 'desc', currentPagination.current.limit, categoryFilter)
    },
    [categoryFilter]
  )

  const handleSort = useCallback(
    (columnId, direction) => {
      console.log('🔄 handleSort called with:', { columnId, direction })
      const sortBy = columnId || 'createdAt'
      const sortType = direction || 'desc'
      fetchServices(
        currentPagination.current.page,
        currentGlobalFilter.current,
        sortBy,
        sortType,
        currentPagination.current.limit,
        categoryFilter
      )
    },
    [categoryFilter]
  )

  // Effect to fetch data on component mount or when session/token changes
  useEffect(() => {
    console.log('🔄 useEffect triggered with:', { status, hasInitiallyFetched: hasInitiallyFetched.current })

    if (status === 'authenticated' && !hasInitiallyFetched.current) {
      console.log('🔄 Making initial fetch...')
      hasInitiallyFetched.current = true
      fetchServices(1, '', 'createdAt', 'desc', 10, '')
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
  }, [status]) // Re-fetch if session status changes

  // Handle delete confirmation
  const handleDeleteConfirm = useCallback(async () => {
    if (!serviceToDelete) return

    setDeleteLoading(true)
    try {
      await apiClient.delete(`/services/${serviceToDelete.id}`)

      toastService.handleApiSuccess('deleted', 'Service')
      // Re-fetch data after deletion
      fetchServices(
        currentPagination.current.page,
        currentGlobalFilter.current,
        'createdAt',
        'desc',
        currentPagination.current.limit,
        categoryFilter
      )
      setDeleteDialogOpen(false)
      setServiceToDelete(null)
    } catch (error) {
      await toastService.handleApiError(error, 'Failed to delete service')
    } finally {
      setDeleteLoading(false)
    }
  }, [serviceToDelete, currentPagination.current.page, currentGlobalFilter.current, categoryFilter])

  const handleEditClick = service => {
    setEditingService(service)
    setAddServiceOpen(true)
  }

  const handleDrawerClose = () => {
    setAddServiceOpen(false)
    setEditingService(null)
  }

  // Effect to handle category filter changes
  useEffect(() => {
    // Only run if we have fetched data at least once
    if (!hasInitiallyFetched.current) {
      return
    }

    console.log('🔄 Category filter changed to:', categoryFilter)
    currentPagination.current = { ...currentPagination.current, page: 1 }
    setPagination(prev => ({ ...prev, page: 1 }))
    fetchServices(
      1,
      currentGlobalFilter.current,
      'createdAt',
      'desc',
      currentPagination.current.limit,
      categoryFilter || ''
    )
  }, [categoryFilter])

  const columns = useMemo(
    () => [
      columnHelper.accessor('serviceId', {
        header: t('common.serviceId'),
        cell: info => {
          const serviceId = info.getValue()
          // Handle cases where serviceId might be invalid or NaN
          const displayId = serviceId && serviceId !== 'SRV-NaN' ? serviceId : 'SRV-000'
          return (
            <Typography color='text.primary' className='font-medium'>
              {displayId}
            </Typography>
          )
        },
        enableSorting: true
      }),
      columnHelper.accessor('name', {
        header: t('services.fields.name'),
        cell: info => <Typography color='text.primary'>{info.getValue()}</Typography>,
        enableSorting: true
      }),
      columnHelper.accessor('price', {
        header: t('services.fields.price'),
        cell: info => (
          <Typography color='text.primary' className='font-medium'>
            €{parseFloat(info.getValue()).toFixed(2)}
          </Typography>
        ),
        enableSorting: true
      }),
      columnHelper.accessor('category', {
        header: t('services.fields.category'),
        cell: info => {
          const category = info.getValue()
          if (!category) {
            return <Typography color='text.secondary'>-</Typography>
          }
          return (
            <Chip
              label={category}
              size='small'
              sx={{
                backgroundColor:
                  category === 'CAF'
                    ? '#e3f2fd' // Light blue
                    : category === 'Patronato'
                      ? '#f3e5f5' // Light purple
                      : category === 'Immigrazione'
                        ? '#fff3e0' // Light orange
                        : category === 'Partita IVA'
                          ? '#e8f5e8' // Light green
                          : category === 'Reparto Legale'
                            ? '#fce4ec' // Light pink
                            : category === 'Varie pratiche'
                              ? '#f1f8e9' // Light lime
                              : '#f5f5f5', // Default light gray
                color:
                  category === 'CAF'
                    ? '#1976d2' // Blue text
                    : category === 'Patronato'
                      ? '#9c27b0' // Purple text
                      : category === 'Immigrazione'
                        ? '#f57c00' // Orange text
                        : category === 'Partita IVA'
                          ? '#388e3c' // Green text
                          : category === 'Reparto Legale'
                            ? '#c2185b' // Pink text
                            : category === 'Varie pratiche'
                              ? '#689f38' // Lime text
                              : '#757575', // Default gray text
                fontWeight: 'medium'
              }}
            />
          )
        },
        enableSorting: true
      }),
      columnHelper.accessor('_count', {
        header: t('common.usage'),
        cell: info => {
          const count = info.getValue()
          return (
            <Typography color='text.primary' variant='body2'>
              Invoices: {count?.invoiceItems || 0}
            </Typography>
          )
        },
        enableSorting: false
      }),
      columnHelper.accessor('createdAt', {
        header: t('common.createdAt'),
        cell: info => {
          const date = new Date(info.getValue())
          return (
            <div className='flex flex-col'>
              <Typography color='text.primary' variant='body2'>
                {date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </Typography>
              <Typography color='text.secondary' variant='caption'>
                {date.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </Typography>
            </div>
          )
        },
        enableSorting: true
      }),
      columnHelper.accessor('updatedAt', {
        header: t('common.updatedAt'),
        cell: info => {
          const date = new Date(info.getValue())
          return (
            <div className='flex flex-col'>
              <Typography color='text.primary' variant='body2'>
                {date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </Typography>
              <Typography color='text.secondary' variant='caption'>
                {date.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </Typography>
            </div>
          )
        }
      }),
      columnHelper.accessor('action', {
        header: t('services.fields.action'),
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <IconButton onClick={() => handleEditClick(row.original)} size='small'>
              <i className='tabler-edit text-textSecondary' />
            </IconButton>
            <IconButton onClick={() => handleDeleteClick(row.original)} size='small'>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    [handleDeleteClick, t]
  )

  const table = useReactTable({
    data: services, // Use services directly instead of filteredData
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
        <CardHeader title={t('services.serviceManagement')} className='pbe-4' />

        <div className='flex flex-wrap items-end gap-4 p-6 border-bs'>
          <FormControl className='min-w-[180px]' size='small'>
            <InputLabel>{t('services.fields.category')}</InputLabel>
            <Select
              value={categoryFilter}
              label={t('services.fields.category')}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              <MenuItem value=''>{t('services.all')}</MenuItem>
              <MenuItem value='CAF'>{t('services.categories.caf')}</MenuItem>
              <MenuItem value='Patronato'>{t('services.categories.patronato')}</MenuItem>
              <MenuItem value='Immigrazione'>{t('services.categories.immigrazione')}</MenuItem>
              <MenuItem value='Partita IVA'>{t('services.categories.partitaIva')}</MenuItem>
              <MenuItem value='Reparto Legale'>{t('services.categories.repartoLegale')}</MenuItem>
              <MenuItem value='Varie pratiche'>{t('services.categories.variePratiche')}</MenuItem>
            </Select>
          </FormControl>

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
            placeholder={t('services.searchService')}
            className='min-w-[200px]'
          />

          <Button
            variant='contained'
            startIcon={<i className='tabler-plus' />}
            onClick={() => {
              setEditingService(null)
              setAddServiceOpen(true)
            }}
            className='ml-auto h-[40px]'
          >
            {t('services.addNewService')}
          </Button>
        </div>

        {fetchLoading ? (
          <div className='flex justify-center items-center p-6'>
            <CircularProgress />
            <Typography className='ml-4'>{t('services.loadingServices')}</Typography>
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
                      {t('services.noServicesAvailable')}
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

      <AddServiceDrawer
        open={addServiceOpen}
        handleClose={handleDrawerClose}
        currentService={editingService}
        onServiceAdded={() => {
          // Refresh data after service is added/updated
          fetchServices(
            currentPagination.current.page,
            currentGlobalFilter.current,
            'createdAt',
            'desc',
            currentPagination.current.limit,
            categoryFilter
          )
        }}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title={t('services.deleteConfirmation.title')}
        message={t('services.deleteConfirmation.message')}
        itemName={serviceToDelete?.name}
        loading={deleteLoading}
      />
    </>
  )
}

export default ServiceListTable
