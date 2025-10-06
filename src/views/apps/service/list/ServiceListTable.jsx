'use client'

// React Imports
import { useEffect, useState, useMemo, useCallback } from 'react'

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

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, debounce, onChange])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const columnHelper = createColumnHelper()

const ServiceListTable = () => {
  // States for Drawer
  const [addServiceOpen, setAddServiceOpen] = useState(false)
  const [editingService, setEditingService] = useState(null)

  // States for Table Data and API Operations
  const [services, setServices] = useState([])
  const [fetchLoading, setFetchLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  // States for Filtering and Search
  const [filteredData, setFilteredData] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [filters, setFilters] = useState({ name: '', priceRange: '', category: '' })
  const [categoryFilter, setCategoryFilter] = useState('')

  // States for Delete Confirmation Modal
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const { lang: locale } = useParams()
  const { data: session, status } = useSession()
  const { t } = useTranslation()

  // Function to fetch service data from API
  const fetchServices = useCallback(
    async (categoryFilter = '') => {
      setFetchLoading(true)
      setFetchError(null)

      if (status === 'loading') return
      if (status === 'unauthenticated' || !session?.accessToken) {
        setFetchError(t('services.authenticationRequired'))
        setFetchLoading(false)
        return
      }

      try {
        // Build query parameters
        const queryParams = new URLSearchParams()
        if (categoryFilter) {
          queryParams.append('category', categoryFilter)
        }

        const url = `${process.env.NEXT_PUBLIC_API_URL}/services${queryParams.toString() ? `?${queryParams.toString()}` : ''}`

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-client-type': 'web',
            Authorization: `Bearer ${session.accessToken}`
          }
        })

        const responseData = await response.json()

        if (response.ok) {
          // Extract services from the nested response structure
          setServices(responseData.data || [])
        } else {
          await toastService.handleApiError(response, t('services.failedToCreateService'))
        }
      } catch (error) {
        await toastService.handleApiError(error, t('services.networkError'))
        console.error('Fetch error services:', error)
      } finally {
        setFetchLoading(false)
      }
    },
    [status, session?.accessToken]
  )

  // Handle delete click
  const handleDeleteClick = useCallback(service => {
    setServiceToDelete(service)
    setDeleteDialogOpen(true)
  }, [])

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (!serviceToDelete) return

    setDeleteLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/${serviceToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      if (response.ok) {
        toastService.handleApiSuccess('deleted', 'Service')
        fetchServices() // Re-fetch data to update the table
        setDeleteDialogOpen(false)
        setServiceToDelete(null)
      } else {
        await toastService.handleApiError(response, 'Failed to delete service')
      }
    } catch (error) {
      await toastService.handleApiError(error, 'Network error or unexpected issue during deletion. Please try again.')
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleEditClick = service => {
    setEditingService(service)
    setAddServiceOpen(true)
  }

  const handleDrawerClose = () => {
    setAddServiceOpen(false)
    setEditingService(null)
  }

  // Effect to fetch data on component mount or when session/token changes
  useEffect(() => {
    if (status === 'authenticated') {
      fetchServices()
    } else if (status === 'unauthenticated') {
      setFetchError(t('services.notAuthenticated'))
      setFetchLoading(false)
    }
  }, [status, session?.accessToken, fetchServices])

  // Effect for client-side filtering
  useEffect(() => {
    let tempData = [...services]

    // Apply additional filters if needed
    if (filters.name) {
      tempData = tempData.filter(row => row.name.toLowerCase().includes(filters.name.toLowerCase()))
    }

    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange.split('-').map(Number)
      tempData = tempData.filter(row => row.price >= minPrice && row.price <= maxPrice)
    }

    if (filters.category) {
      tempData = tempData.filter(row => row.category === filters.category)
    }

    setFilteredData(tempData)
  }, [filters, services])

  // Effect to handle category filter changes
  useEffect(() => {
    if (categoryFilter !== filters.category) {
      setFilters(prev => ({ ...prev, category: categoryFilter }))
      // Refetch data with category filter
      fetchServices(categoryFilter)
    }
  }, [categoryFilter, filters.category, fetchServices])

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
        }
      }),
      columnHelper.accessor('name', {
        header: t('services.fields.name'),
        cell: info => <Typography color='text.primary'>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('price', {
        header: t('services.fields.price'),
        cell: info => (
          <Typography color='text.primary' className='font-medium'>
            €{parseFloat(info.getValue()).toFixed(2)}
          </Typography>
        )
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
                  category === 'Consulting'
                    ? '#e3f2fd' // Light blue
                    : category === 'Development'
                      ? '#f3e5f5' // Light purple
                      : category === 'Design'
                        ? '#fff3e0' // Light orange
                        : '#f5f5f5', // Default light gray
                color:
                  category === 'Consulting'
                    ? '#1976d2' // Blue text
                    : category === 'Development'
                      ? '#9c27b0' // Purple text
                      : category === 'Design'
                        ? '#f57c00' // Orange text
                        : '#757575', // Default gray text
                fontWeight: 'medium'
              }}
            />
          )
        }
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
        }
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
    data: filteredData,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { globalFilter },
    initialState: { pagination: { pageSize: 10 } },
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
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
              <MenuItem value='Consulting'>Consulting</MenuItem>
              <MenuItem value='Development'>Development</MenuItem>
              <MenuItem value='Design'>Design</MenuItem>
            </Select>
          </FormControl>

          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
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
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </Card>

      <AddServiceDrawer
        open={addServiceOpen}
        handleClose={handleDrawerClose}
        currentService={editingService}
        onServiceAdded={fetchServices}
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
