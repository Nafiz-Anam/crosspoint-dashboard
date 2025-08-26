'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

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
  }, [value])

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
  const [filters, setFilters] = useState({ name: '', priceRange: '' })

  const { lang: locale } = useParams()
  const { data: session, status } = useSession()

  // Handle deleting a service
  const handleDeleteService = async serviceId => {
    if (!confirm('Are you sure you want to delete this service?')) return

    if (!session?.accessToken) {
      setFetchError('Authentication token not found. Cannot delete service.')
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/${serviceId}`, {
        method: 'DELETE',
        headers: {
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      if (response.ok) {
        fetchServices() // Re-fetch data to update the table
      } else {
        const errorData = await response.json()
        setFetchError(errorData.message || 'Failed to delete service.')
      }
    } catch (error) {
      setFetchError('Network error or unexpected issue during deletion. Please try again.')
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

  // Function to fetch service data from API
  const fetchServices = async () => {
    setFetchLoading(true)
    setFetchError(null)

    if (status === 'loading') return
    if (status === 'unauthenticated' || !session?.accessToken) {
      setFetchError('Authentication required to fetch services. Please log in.')
      setFetchLoading(false)
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
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
        const errorMessage = responseData.message || `Failed to fetch services: ${response.status}`
        setFetchError(errorMessage)
        console.error('API Error fetching services:', responseData)
      }
    } catch (error) {
      setFetchError('Network error or unexpected issue fetching services. Please try again.')
      console.error('Fetch error services:', error)
    } finally {
      setFetchLoading(false)
    }
  }

  // Effect to fetch data on component mount or when session/token changes
  useEffect(() => {
    if (status === 'authenticated') {
      fetchServices()
    } else if (status === 'unauthenticated') {
      setFetchError('Not authenticated. Please log in to view services.')
      setFetchLoading(false)
    }
  }, [status, session?.accessToken])

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

    setFilteredData(tempData)
  }, [filters, services])

  const columns = useMemo(
    () => [
      columnHelper.accessor('serviceId', {
        header: 'Service ID',
        cell: info => (
          <Typography color='text.primary' className='font-medium'>
            {info.getValue()}
          </Typography>
        )
      }),
      columnHelper.accessor('name', {
        header: 'Service Name',
        cell: info => <Typography color='text.primary'>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('price', {
        header: 'Price (€)',
        cell: info => (
          <Typography color='text.primary' className='font-medium'>
            €{parseFloat(info.getValue()).toFixed(2)}
          </Typography>
        )
      }),
      columnHelper.accessor('_count', {
        header: 'Usage',
        cell: info => {
          const count = info.getValue()
          const totalUsage = (count?.clients || 0) + (count?.invoiceItems || 0)
          return (
            <div className='flex flex-col gap-1'>
              <Typography color='text.primary' variant='body2'>
                Clients: {count?.clients || 0}
              </Typography>
              <Typography color='text.primary' variant='body2'>
                Invoices: {count?.invoiceItems || 0}
              </Typography>
            </div>
          )
        },
        enableSorting: false
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created At',
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
        header: 'Updated At',
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
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <IconButton onClick={() => handleEditClick(row.original)} size='small'>
              <i className='tabler-edit text-textSecondary' />
            </IconButton>
            <IconButton onClick={() => handleDeleteService(row.original.id)} size='small'>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    []
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
        <CardHeader title='Service Management' className='pbe-4' />

        <div className='flex flex-wrap items-end gap-4 p-6 border-bs'>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search services...'
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
            Add New Service
          </Button>
        </div>

        {fetchLoading ? (
          <div className='flex justify-center items-center p-6'>
            <CircularProgress />
            <Typography className='ml-4'>Loading Services...</Typography>
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
                      No services available
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
    </>
  )
}

export default ServiceListTable
