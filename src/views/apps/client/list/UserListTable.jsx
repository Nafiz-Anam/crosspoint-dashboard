'use client'

import { useEffect, useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
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

const columnHelper = createColumnHelper()
const clientStatusObj = {
  ACTIVE: 'success',
  PENDING: 'warning',
  PROCESSING: 'info',
  CANCELLED: 'error',
  COMPLETED: 'success'
}

// Fuzzy filter for search
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

const ClientListTable = () => {
  // States for Drawer
  const [addClientOpen, setAddClientOpen] = useState(false)
  const [editingClient, setEditingClient] = useState(null)

  // States for Table Data and API Operations
  const [clients, setClients] = useState([])
  const [fetchLoading, setFetchLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  // States for Filtering and Search
  const [filteredData, setFilteredData] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [filters, setFilters] = useState({ status: '', service: '', branch: '' })

  // States for row selection
  const [rowSelection, setRowSelection] = useState({})

  // Hooks
  const { lang: locale } = useParams()
  const { data: session, status: sessionStatus } = useSession()

  // Function to fetch client data from API
  const fetchClients = useCallback(async () => {
    setFetchLoading(true)
    setFetchError(null)

    if (sessionStatus === 'loading') return
    if (sessionStatus === 'unauthenticated' || !session?.accessToken) {
      setFetchError('Authentication required to fetch clients. Please log in.')
      setFetchLoading(false)
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      const responseData = await response.json()

      if (response.ok) {
        setClients(responseData.data?.clients || responseData.data || [])
      } else {
        const errorMessage = responseData.message || `Failed to fetch clients: ${response.status}`
        setFetchError(errorMessage)
        console.error('API Error fetching clients:', responseData)
      }
    } catch (error) {
      setFetchError('Network error or unexpected issue fetching clients. Please try again.')
      console.error('Fetch error clients:', error)
    } finally {
      setFetchLoading(false)
    }
  }, [sessionStatus, session?.accessToken])

  // Effect to fetch data on component mount or when session/token changes
  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      fetchClients()
    } else if (sessionStatus === 'unauthenticated') {
      setFetchError('Not authenticated. Please log in to view clients.')
      setFetchLoading(false)
    }
  }, [sessionStatus, session?.accessToken])

  // Effect for client-side filtering
  useEffect(() => {
    let tempData = [...clients]

    if (filters.status) {
      tempData = tempData.filter(row => row.status === filters.status)
    }

    if (filters.service) {
      tempData = tempData.filter(row => row.service?.name === filters.service)
    }

    if (filters.branch) {
      tempData = tempData.filter(row => row.branch?.name === filters.branch)
    }

    setFilteredData(tempData)
  }, [filters, clients])

  // Function to handle client deletion
  const handleDeleteClient = useCallback(
    async clientId => {
      if (!confirm('Are you sure you want to delete this client?')) {
        return
      }

      if (!session?.accessToken) {
        setFetchError('Authentication token not found. Cannot delete client.')
        return
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/${clientId}`, {
          method: 'DELETE',
          headers: {
            'x-client-type': 'web',
            Authorization: `Bearer ${session.accessToken}`
          }
        })

        if (response.ok) {
          console.log(`Client ${clientId} deleted successfully.`)
          fetchClients()
        } else {
          const errorData = await response.json()
          const errorMessage = errorData.message || `Failed to delete client: ${response.status}`
          setFetchError(errorMessage)
          console.error('API Error deleting client:', errorData)
        }
      } catch (error) {
        setFetchError('Network error or unexpected issue during deletion. Please try again.')
        console.error('Fetch error deleting client:', error)
      }
    },
    [session?.accessToken, fetchClients]
  )

  // Function to open drawer for editing
  const handleEditClick = useCallback(client => {
    setEditingClient(client)
    setAddClientOpen(true)
  }, [])

  // Function to close drawer and clear editing state
  const handleDrawerClose = () => {
    setAddClientOpen(false)
    setEditingClient(null)
  }

  // Derive unique values for filter dropdowns from the fetched data
  const services = useMemo(
    () => Array.from(new Set(clients.map(item => item.service?.name).filter(Boolean))),
    [clients]
  )
  const branches = useMemo(() => Array.from(new Set(clients.map(item => item.branch?.name).filter(Boolean))), [clients])
  const statuses = useMemo(() => Array.from(new Set(clients.map(item => item.status))), [clients])

  // Column definitions
  const columns = useMemo(
    () => [
      columnHelper.accessor('clientId', {
        header: 'Client ID',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.clientId || '-'}
          </Typography>
        )
      }),
      columnHelper.accessor('name', {
        header: 'Client',
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
        )
      }),
      columnHelper.accessor('phone', {
        header: 'Phone',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.phone || '-'}</Typography>
      }),
      columnHelper.accessor('address', {
        header: 'Address',
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
        }
      }),
      columnHelper.accessor('service', {
        header: 'Service',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.service?.name || '-'}</Typography>
      }),
      columnHelper.accessor('branch', {
        header: 'Branch',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.branch?.name || '-'}</Typography>
      }),
      columnHelper.accessor('assignedEmployee', {
        header: 'Employee',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.assignedEmployee?.name || '-'}</Typography>
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Chip
              variant='tonal'
              label={row.original.status}
              size='small'
              color={clientStatusObj[row.original.status]}
              className='capitalize'
            />
          </div>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'View',
                  icon: 'tabler-eye',
                  menuItemProps: {
                    component: Link,
                    href: getLocalizedUrl(`/apps/client/view/${row.original.id}`, locale),
                    className: 'flex items-center gap-2 text-textSecondary'
                  }
                },
                {
                  text: 'Edit',
                  icon: 'tabler-edit',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => handleEditClick(row.original)
                  }
                },
                {
                  text: 'Delete',
                  icon: 'tabler-trash',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => handleDeleteClient(row.original.id)
                  }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    [handleDeleteClient, handleEditClick, locale]
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { rowSelection, globalFilter },
    initialState: { pagination: { pageSize: 10 } },
    enableRowSelection: true,
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

  return (
    <>
      <Card>
        <CardHeader title='Client Management' className='pbe-4' />
        <div className='flex flex-wrap items-end gap-4 p-6 border-bs'>
          {/* Status Filter */}
          <CustomTextField
            select
            label='Status'
            value={filters.status}
            onChange={e => setFilters({ ...filters, status: e.target.value })}
            className='min-w-[180px]'
          >
            <MenuItem value=''>All</MenuItem>
            {statuses.map(status => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </CustomTextField>

          {/* Service Filter */}
          <CustomTextField
            select
            label='Service'
            value={filters.service}
            onChange={e => setFilters({ ...filters, service: e.target.value })}
            className='min-w-[180px]'
          >
            <MenuItem value=''>All</MenuItem>
            {services.map(service => (
              <MenuItem key={service} value={service}>
                {service}
              </MenuItem>
            ))}
          </CustomTextField>

          {/* Branch Filter */}
          <CustomTextField
            select
            label='Branch'
            value={filters.branch}
            onChange={e => setFilters({ ...filters, branch: e.target.value })}
            className='min-w-[180px]'
          >
            <MenuItem value=''>All</MenuItem>
            {branches.map(branch => (
              <MenuItem key={branch} value={branch}>
                {branch}
              </MenuItem>
            ))}
          </CustomTextField>

          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search Client...'
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
            Add New Client
          </Button>
        </div>

        {fetchLoading ? (
          <div className='flex justify-center items-center p-6'>
            <CircularProgress />
            <Typography className='ml-4'>Loading Clients...</Typography>
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
                      No clients available
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
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </Card>
      <AddClientDrawer
        open={addClientOpen}
        handleClose={handleDrawerClose}
        currentClient={editingClient}
        onClientAdded={fetchClients}
      />
    </>
  )
}

export default ClientListTable
