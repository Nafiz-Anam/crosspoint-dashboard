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
import Checkbox from '@mui/material/Checkbox' // Added Checkbox import

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
import AddUserDrawer from './AddUserDrawer'
import OptionMenu from '@core/components/option-menu'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'
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

// Vars (Updated for Employee roles and status)
const employeeRoleObj = {
  ADMIN: { icon: 'tabler-crown', color: 'error' },
  EMPLOYEE: { icon: 'tabler-user', color: 'primary' },
  MANAGER: { icon: 'tabler-briefcase', color: 'info' }
  // Add other roles from your Role enum if applicable
}

const employeeStatusObj = {
  // Mapping for isActive boolean to Chip color
  true: 'success',
  false: 'secondary'
}

// Column Definitions
const columnHelper = createColumnHelper()

const EmployeeListTable = () => {
  // States for Drawer
  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)

  // States for Table Data and API Operations
  const [employees, setEmployees] = useState([])
  const [fetchLoading, setFetchLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  // States for Filtering and Search
  const [filteredData, setFilteredData] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [filters, setFilters] = useState({ role: '', isActive: '' })

  // Corrected: Initialize rowSelection state
  const [rowSelection, setRowSelection] = useState({}) // <--- Added this line

  // Hooks
  const { lang: locale } = useParams()
  const { data: session, status: sessionStatus } = useSession()

  // Function to fetch employee data from API
  const fetchEmployees = async () => {
    setFetchLoading(true)
    setFetchError(null)

    if (sessionStatus === 'loading') return
    if (sessionStatus === 'unauthenticated' || !session?.accessToken) {
      setFetchError('Authentication required to fetch employees. Please log in.')
      setFetchLoading(false)
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      const responseData = await response.json()

      if (response.ok) {
        setEmployees(responseData.data || responseData)
      } else {
        const errorMessage = responseData.message || `Failed to fetch employees: ${response.status}`
        setFetchError(errorMessage)
        console.error('API Error fetching employees:', responseData)
      }
    } catch (error) {
      setFetchError('Network error or unexpected issue fetching employees. Please try again.')
      console.error('Fetch error employees:', error)
    } finally {
      setFetchLoading(false)
    }
  }

  // Effect to fetch data on component mount or when session/token changes
  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      fetchEmployees()
    } else if (sessionStatus === 'unauthenticated') {
      setFetchError('Not authenticated. Please log in to view employees.')
      setFetchLoading(false)
    }
  }, [sessionStatus, session?.accessToken])

  // Effect for client-side filtering
  useEffect(() => {
    let tempData = [...employees]

    if (filters.role) {
      tempData = tempData.filter(row => row.role === filters.role)
    }

    if (filters.isActive !== '') {
      const activeFlag = filters.isActive === 'true'
      tempData = tempData.filter(row => row.isActive === activeFlag)
    }

    setFilteredData(tempData)
  }, [filters, employees])

  // Derive unique roles for filter dropdowns from the fetched data
  const roles = useMemo(() => Array.from(new Set(employees.map(item => item.role))), [employees])

  // Function to handle employee deletion
  const handleDeleteEmployee = async employeeId => {
    if (!confirm('Are you sure you want to delete this employee?')) {
      return
    }

    if (!session?.accessToken) {
      setFetchError('Authentication token not found. Cannot delete employee.')
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/${employeeId}`, {
        method: 'DELETE',
        headers: {
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      if (response.ok) {
        console.log(`Employee ${employeeId} deleted successfully.`)
        fetchEmployees()
      } else {
        const errorData = await response.json()
        const errorMessage = errorData.message || `Failed to delete employee: ${response.status}`
        setFetchError(errorMessage)
        console.error('API Error deleting employee:', errorData)
      }
    } catch (error) {
      setFetchError('Network error or unexpected issue during deletion. Please try again.')
      console.error('Fetch error deleting employee:', error)
    }
  }

  // Function to open drawer for editing
  const handleEditClick = employee => {
    setEditingEmployee(employee)
    setAddEmployeeOpen(true)
  }

  // Function to close drawer and clear editing state
  const handleDrawerClose = () => {
    setAddEmployeeOpen(false)
    setEditingEmployee(null)
  }

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('name', {
        header: 'Employee',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            {row.original.avatar ? (
              <CustomAvatar src={row.original.avatar} size={34} />
            ) : (
              <CustomAvatar size={34}>{getInitials(row.original.name || row.original.email)}</CustomAvatar>
            )}
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {row.original.name || row.original.email}
              </Typography>
              <Typography variant='body2'>{row.original.email}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('employeeId', {
        header: 'Employee ID',
        cell: info => <Typography color='text.primary'>{info.getValue() || '-'}</Typography>
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: info => <Typography color='text.primary'>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('role', {
        header: 'Role',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Icon
              className={employeeRoleObj[row.original.role]?.icon || 'tabler-user'}
              sx={{ color: `var(--mui-palette-${employeeRoleObj[row.original.role]?.color || 'primary'}-main)` }}
            />
            <Typography className='capitalize' color='text.primary'>
              {row.original.role}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('isActive', {
        header: 'Status',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Chip
              variant='tonal'
              label={row.original.isActive ? 'Active' : 'Inactive'}
              size='small'
              color={employeeStatusObj[row.original.isActive]}
              className='capitalize'
            />
          </div>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton onClick={() => handleDeleteEmployee(row.original.id)}>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
            <IconButton onClick={() => handleEditClick(row.original)}>
              <i className='tabler-edit text-textSecondary' />
            </IconButton>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'View',
                  icon: 'tabler-eye',
                  menuItemProps: {
                    component: Link,
                    href: getLocalizedUrl(`/apps/user/view/${row.original.id}`, locale),
                    className: 'flex items-center gap-2 text-textSecondary'
                  }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    [handleDeleteEmployee, handleEditClick, locale]
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection, // This is now correctly defined
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
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
        <CardHeader title='Employee Filters' className='pbe-4' />
        <div className='flex flex-wrap items-end gap-4 p-6 border-bs'>
          {/* Role Filter */}
          <CustomTextField
            select
            label='Role'
            value={filters.role}
            onChange={e => setFilters({ ...filters, role: e.target.value })}
            className='min-w-[180px]'
          >
            <MenuItem value=''>All</MenuItem>
            {roles.map(role => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </CustomTextField>

          {/* Status Filter (isActive) */}
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
            placeholder='Search Employee...'
            className='min-w-[200px]'
          />

          <Button
            variant='contained'
            startIcon={<i className='tabler-plus' />}
            onClick={() => {
              setEditingEmployee(null)
              setAddEmployeeOpen(true)
            }}
            className='ml-auto h-[40px]'
          >
            Add New Employee
          </Button>
        </div>
        {fetchLoading ? (
          <div className='flex justify-center items-center p-6'>
            <CircularProgress />
            <Typography className='ml-4'>Loading Employees...</Typography>
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
              {table.getFilteredRowModel().rows.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                      No data available
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {table
                    .getRowModel()
                    .rows.slice(0, table.getState().pagination.pageSize)
                    .map(row => {
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
      <AddUserDrawer
        open={addEmployeeOpen}
        handleClose={handleDrawerClose}
        currentEmployee={editingEmployee}
        onEmployeeAdded={fetchEmployees}
      />
    </>
  )
}

export default EmployeeListTable
