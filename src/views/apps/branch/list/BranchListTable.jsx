'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

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

const BranchListTable = () => {
  // States for Drawer
  const [addBranchOpen, setAddBranchOpen] = useState(false)
  const [editingBranch, setEditingBranch] = useState(null) // New state to hold branch data for editing

  // States for Table Data and API Operations
  const [branches, setBranches] = useState([]) // Stores fetched branch data
  const [fetchLoading, setFetchLoading] = useState(true) // Loading state for data fetch
  const [fetchError, setFetchError] = useState(null) // Error state for data fetch

  // States for Filtering and Search
  const [filteredData, setFilteredData] = useState([]) // Data after client-side filters
  const [globalFilter, setGlobalFilter] = useState('')
  const [filters, setFilters] = useState({ city: '', province: '', isActive: '' })

  const { lang: locale } = useParams()
  const { data: session, status } = useSession() // Get session and status

  // Function to fetch branch data from API
  const fetchBranches = async () => {
    setFetchLoading(true)
    setFetchError(null)

    if (status === 'loading') return // Wait for session to load
    if (status === 'unauthenticated' || !session?.accessToken) {
      setFetchError('Authentication required to fetch branches. Please log in.')
      setFetchLoading(false)
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/branches`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      const responseData = await response.json()

      if (response.ok) {
        // Assuming your API returns an array of branches directly or within a 'data' property
        setBranches(responseData.data || responseData) // Adjust based on your API's GET response structure
      } else {
        const errorMessage = responseData.message || `Failed to fetch branches: ${response.status}`
        setFetchError(errorMessage)
        console.error('API Error fetching branches:', responseData)
      }
    } catch (error) {
      setFetchError('Network error or unexpected issue fetching branches. Please try again.')
      console.error('Fetch error branches:', error)
    } finally {
      setFetchLoading(false)
    }
  }

  // Effect to fetch data on component mount or when session/token changes
  useEffect(() => {
    if (status === 'authenticated') {
      fetchBranches()
    } else if (status === 'unauthenticated') {
      setFetchError('Not authenticated. Please log in to view branches.')
      setFetchLoading(false)
    }
  }, [status, session?.accessToken]) // Re-fetch if session status or token changes

  // Effect for client-side filtering
  useEffect(() => {
    let tempData = [...branches] // Start with the full fetched data

    if (filters.city) {
      tempData = tempData.filter(row => row.city === filters.city)
    }

    if (filters.province) {
      tempData = tempData.filter(row => row.province === filters.province)
    }

    if (filters.isActive !== '') {
      const activeFlag = filters.isActive === 'true'
      tempData = tempData.filter(row => row.isActive === activeFlag)
    }

    setFilteredData(tempData)
  }, [filters, branches]) // Re-filter when filters or raw branches data changes

  // Derive unique cities and provinces for filter dropdowns from the fetched data
  const cities = useMemo(() => Array.from(new Set(branches.map(item => item.city))), [branches])
  const provinces = useMemo(() => Array.from(new Set(branches.map(item => item.province))), [branches])

  // Function to handle branch deletion
  const handleDeleteBranch = async branchId => {
    if (!confirm('Are you sure you want to delete this branch?')) {
      return
    }

    if (!session?.accessToken) {
      setFetchError('Authentication token not found. Cannot delete branch.')
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/branches/${branchId}`, {
        method: 'DELETE',
        headers: {
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      if (response.ok) {
        console.log(`Branch ${branchId} deleted successfully.`)
        fetchBranches() // Re-fetch data to update the table
      } else {
        const errorData = await response.json()
        const errorMessage = errorData.message || `Failed to delete branch: ${response.status}`
        setFetchError(errorMessage)
        console.error('API Error deleting branch:', errorData)
      }
    } catch (error) {
      setFetchError('Network error or unexpected issue during deletion. Please try again.')
      console.error('Fetch error deleting branch:', error)
    }
  }

  // Function to open drawer for editing
  const handleEditClick = branch => {
    setEditingBranch(branch) // Set the branch data to be edited
    setAddBranchOpen(true) // Open the drawer
  }

  // Function to close drawer and clear editing state
  const handleDrawerClose = () => {
    setAddBranchOpen(false) // Close the drawer
    setEditingBranch(null) // Clear editing branch data, important for "Add New"
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('branchId', {
        header: 'Branch ID',
        cell: info => <Typography color='text.primary'>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('name', {
        header: 'Branch Name',
        cell: info => <Typography color='text.primary'>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('address', {
        header: 'Address',
        cell: info => <Typography color='text.primary'>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('city', {
        header: 'City',
        cell: info => <Typography color='text.primary'>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('postalCode', {
        header: 'Postal Code',
        cell: info => <Typography color='text.primary'>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('province', {
        header: 'Province',
        cell: info => <Typography color='text.primary'>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('phone', {
        header: 'Phone',
        cell: info => <Typography color='text.primary'>{info.getValue() || '-'}</Typography> // Display '-' if null
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: info => <Typography color='text.primary'>{info.getValue() || '-'}</Typography> // Display '-' if null
      }),
      columnHelper.accessor('isActive', {
        header: 'Status',
        cell: info => (
          <Chip
            label={info.getValue() ? 'Active' : 'Inactive'}
            color={info.getValue() ? 'success' : 'default'}
            variant='tonal'
            size='small'
          />
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <IconButton onClick={() => handleDeleteBranch(row.original.id)}>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
            <IconButton onClick={() => handleEditClick(row.original)}>
              {' '}
              {/* Call handleEditClick */}
              <i className='tabler-edit text-textSecondary' /> {/* Changed icon to edit */}
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    [handleDeleteBranch, handleEditClick] // Depend on handleDeleteBranch and handleEditClick
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
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <>
      <Card>
        <CardHeader title='Branch Filters' className='pbe-4' />

        <div className='flex flex-wrap items-end gap-4 p-6 border-bs'>
          <CustomTextField
            select
            label='City'
            value={filters.city}
            onChange={e => setFilters({ ...filters, city: e.target.value })}
            className='min-w-[180px]'
          >
            <MenuItem value=''>All</MenuItem>
            {cities.map(city => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </CustomTextField>

          <CustomTextField
            select
            label='Province'
            value={filters.province}
            onChange={e => setFilters({ ...filters, province: e.target.value })}
            className='min-w-[180px]'
          >
            <MenuItem value=''>All</MenuItem>
            {provinces.map(province => (
              <MenuItem key={province} value={province}>
                {province}
              </MenuItem>
            ))}
          </CustomTextField>

          <CustomTextField
            select
            label='Status'
            value={filters.isActive}
            onChange={e => setFilters({ ...filters, isActive: e.target.value })}
            className='min-w-[180px]'
          >
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='true'>Active</MenuItem>
            <MenuItem value='false'>Inactive</MenuItem>
          </CustomTextField>

          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search branch...'
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
            Add New Branch
          </Button>
        </div>

        {fetchLoading ? (
          <div className='flex justify-center items-center p-6'>
            <CircularProgress />
            <Typography className='ml-4'>Loading Branches...</Typography>
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
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </Card>

      <AddBranchDrawer
        open={addBranchOpen}
        handleClose={handleDrawerClose} // Use the new handler
        currentBranch={editingBranch} // Pass the branch data for editing
        onBranchAdded={fetchBranches} // Callback to re-fetch data after adding/editing a branch
      />
    </>
  )
}

export default BranchListTable
