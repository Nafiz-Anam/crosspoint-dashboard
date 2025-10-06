'use client'

// React Imports
import { useEffect, useState, useMemo, useCallback } from 'react'

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

const BranchListTable = () => {
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

  // States for Filtering and Search
  const [filteredData, setFilteredData] = useState([]) // Data after client-side filters
  const [globalFilter, setGlobalFilter] = useState('')
  const [filters, setFilters] = useState({ city: '', province: '', isActive: '' })

  const { lang: locale } = useParams()
  const { data: session, status } = useSession() // Get session and status
  const { t } = useTranslation()

  // Function to fetch branch data from API
  const fetchBranches = useCallback(async () => {
    setFetchLoading(true)
    setFetchError(null)

    if (status === 'loading') return // Wait for session to load
    if (status === 'unauthenticated' || !session?.accessToken) {
      setFetchError(t('branches.authenticationRequired'))
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
        // Show error toast for fetch errors
        await toastService.handleApiError(response, t('branches.failedToCreateBranch'))
        console.error('API Error fetching branches:', responseData)
      }
    } catch (error) {
      const errorMessage = 'Network error or unexpected issue fetching branches. Please try again.'
      setFetchError(errorMessage)
      // Show error toast for network errors
      await toastService.handleApiError(error, errorMessage)
      console.error('Fetch error branches:', error)
    } finally {
      setFetchLoading(false)
    }
  }, [status, session?.accessToken])

  // Effect to fetch data on component mount or when session/token changes
  useEffect(() => {
    if (status === 'authenticated') {
      fetchBranches()
    } else if (status === 'unauthenticated') {
      setFetchError(t('branches.notAuthenticated'))
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
        fetchBranches() // Re-fetch data to update the table
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
  }, [session?.accessToken, fetchBranches, branchToDelete])

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
        )
      }),
      columnHelper.accessor('name', {
        header: t('branches.fields.name'),
        cell: info => (
          <Typography color='text.primary' className='font-medium'>
            {info.getValue()}
          </Typography>
        )
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
        )
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
        <CardHeader title={t('branches.branchManagement')} className='pbe-4' />

        <div className='flex flex-wrap items-end gap-4 p-6 border-bs'>
          <CustomTextField
            select
            label={t('branches.fields.city')}
            value={filters.city}
            onChange={e => setFilters({ ...filters, city: e.target.value })}
            className='min-w-[180px]'
          >
            <MenuItem value=''>{t('branches.all')}</MenuItem>
            {cities.map(city => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </CustomTextField>

          <CustomTextField
            select
            label={t('branches.fields.province')}
            value={filters.province}
            onChange={e => setFilters({ ...filters, province: e.target.value })}
            className='min-w-[180px]'
          >
            <MenuItem value=''>{t('branches.all')}</MenuItem>
            {provinces.map(province => (
              <MenuItem key={province} value={province}>
                {province}
              </MenuItem>
            ))}
          </CustomTextField>

          <CustomTextField
            select
            label={t('branches.fields.status')}
            value={filters.isActive}
            onChange={e => setFilters({ ...filters, isActive: e.target.value })}
            className='min-w-[180px]'
          >
            <MenuItem value=''>{t('branches.all')}</MenuItem>
            <MenuItem value='true'>{t('branches.status.active')}</MenuItem>
            <MenuItem value='false'>{t('branches.status.inactive')}</MenuItem>
          </CustomTextField>

          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
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
