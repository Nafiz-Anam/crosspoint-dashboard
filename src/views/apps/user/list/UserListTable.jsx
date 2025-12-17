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
import CustomAutocomplete from '@core/components/mui/Autocomplete'
import CustomAvatar from '@core/components/mui/Avatar'
import AttendanceReportDialog from '@/components/AttendanceReportDialog'
import DeleteConfirmationDialog from '@components/dialogs/DeleteConfirmationDialog'
import toastService from '@/services/toastService'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import { getLocalizedUrl } from '@/utils/i18n'

// Service Imports
import { attendanceReportService } from '@/services/attendanceReportService'

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
  false: 'error'
}

// Column Definitions
const columnHelper = createColumnHelper()

const EmployeeListTable = () => {
  console.log('🔄 EmployeeListTable component rendered')

  // States for Drawer
  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)

  // States for Attendance Report
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [reportLoading, setReportLoading] = useState(false)

  // States for Table Data and API Operations
  const [employees, setEmployees] = useState([]) // Stores fetched employee data
  const [branches, setBranches] = useState([]) // All branches for filter
  const [branchesLoading, setBranchesLoading] = useState(false)
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
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [branchFilter, setBranchFilter] = useState('')

  // Corrected: Initialize rowSelection state
  const [rowSelection, setRowSelection] = useState({}) // <--- Added this line

  // States for Delete Confirmation Modal
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [employeeToDelete, setEmployeeToDelete] = useState(null)
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

  // Function to fetch all branches
  const fetchBranches = useCallback(async () => {
    if (!session?.accessToken) return

    setBranchesLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/branches/active`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setBranches(data.data || [])
      } else {
        console.error('Failed to fetch branches')
      }
    } catch (error) {
      console.error('Error fetching branches:', error)
    } finally {
      setBranchesLoading(false)
    }
  }, [session?.accessToken])

  // Function to fetch employee data from API with pagination
  const fetchEmployees = async (
    page = 1,
    search = '',
    sortBy = 'createdAt',
    sortType = 'desc',
    limit = 10,
    role = '',
    status = '',
    branch = ''
  ) => {
    console.log('🔄 fetchEmployees called with:', { page, search, sortBy, sortType, limit, role, status, branch })
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

      if (role) {
        queryParams.append('role', role)
      }

      if (status) {
        queryParams.append('isActive', status)
      }

      if (branch) {
        queryParams.append('branchId', branch)
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      const responseData = await response.json()

      if (response.ok) {
        setEmployees(responseData.data || [])
        setPagination(prev => ({
          ...prev,
          page: responseData.pagination?.page || page,
          total: responseData.pagination?.total || 0,
          totalPages: responseData.pagination?.totalPages || 0,
          hasNext: responseData.pagination?.hasNext || false,
          hasPrev: responseData.pagination?.hasPrev || false
        }))
      } else {
        const errorMessage = responseData.message || `Failed to fetch employees: ${response.status}`
        setFetchError(errorMessage)
        await toastService.handleApiError(response, 'Failed to fetch employees')
        console.error('API Error fetching employees:', responseData)
      }
    } catch (error) {
      const errorMessage = 'Network error or unexpected issue fetching employees. Please try again.'
      setFetchError(errorMessage)
      await toastService.handleApiError(error, errorMessage)
      console.error('Fetch error employees:', error)
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
      fetchEmployees(
        page,
        currentGlobalFilter.current,
        'createdAt',
        'desc',
        currentPagination.current.limit,
        roleFilter,
        statusFilter,
        branchFilter
      )
    },
    [pagination.page, roleFilter, statusFilter, branchFilter]
  )

  const handleRowsPerPageChange = useCallback(
    event => {
      console.log('🔄 handleRowsPerPageChange called with:', event.target.value)
      const newLimit = parseInt(event.target.value, 10)
      currentPagination.current = { page: 1, limit: newLimit }
      setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }))
      fetchEmployees(1, currentGlobalFilter.current, 'createdAt', 'desc', newLimit, roleFilter, statusFilter, branchFilter)
    },
    [roleFilter, statusFilter, branchFilter]
  )

  const handleSearch = useCallback(
    value => {
      console.log('🔄 handleSearch called with:', value)
      currentGlobalFilter.current = value
      currentPagination.current = { ...currentPagination.current, page: 1 }
      setGlobalFilter(value)
      setPagination(prev => ({ ...prev, page: 1 }))
      fetchEmployees(1, value, 'createdAt', 'desc', currentPagination.current.limit, roleFilter, statusFilter, branchFilter)
    },
    [roleFilter, statusFilter, branchFilter]
  )

  const handleSort = useCallback(
    (columnId, direction) => {
      console.log('🔄 handleSort called with:', { columnId, direction })
      const sortBy = columnId || 'createdAt'
      const sortType = direction || 'desc'
      fetchEmployees(
        currentPagination.current.page,
        currentGlobalFilter.current,
        sortBy,
        sortType,
        currentPagination.current.limit,
        roleFilter,
        statusFilter,
        branchFilter
      )
    },
    [roleFilter, statusFilter, branchFilter]
  )

  // Effect to fetch data on component mount or when session/token changes
  useEffect(() => {
    console.log('🔄 useEffect triggered with:', { sessionStatus, hasInitiallyFetched: hasInitiallyFetched.current })

    if (sessionStatus === 'authenticated' && !hasInitiallyFetched.current) {
      console.log('🔄 Making initial fetch...')
      hasInitiallyFetched.current = true
      fetchEmployees(1, '', 'createdAt', 'desc', 10, '', '', '')
      fetchBranches()
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

  // Effect to handle role filter changes
  useEffect(() => {
    // Only run if we have fetched data at least once
    if (!hasInitiallyFetched.current) {
      return
    }

    console.log('🔄 Role filter changed to:', roleFilter)
    currentPagination.current = { ...currentPagination.current, page: 1 }
    setPagination(prev => ({ ...prev, page: 1 }))
    fetchEmployees(
      1,
      currentGlobalFilter.current,
      'createdAt',
      'desc',
      currentPagination.current.limit,
      roleFilter || '',
      statusFilter || '',
      branchFilter || ''
    )
  }, [roleFilter])

  // Effect to handle status filter changes
  useEffect(() => {
    // Only run if we have fetched data at least once
    if (!hasInitiallyFetched.current) {
      return
    }

    console.log('🔄 Status filter changed to:', statusFilter)
    currentPagination.current = { ...currentPagination.current, page: 1 }
    setPagination(prev => ({ ...prev, page: 1 }))
    fetchEmployees(
      1,
      currentGlobalFilter.current,
      'createdAt',
      'desc',
      currentPagination.current.limit,
      roleFilter || '',
      statusFilter || '',
      branchFilter || ''
    )
  }, [statusFilter])

  // Effect to handle branch filter changes
  useEffect(() => {
    // Only run if we have fetched data at least once
    if (!hasInitiallyFetched.current) {
      return
    }

    console.log('🔄 Branch filter changed to:', branchFilter)
    currentPagination.current = { ...currentPagination.current, page: 1 }
    setPagination(prev => ({ ...prev, page: 1 }))
    fetchEmployees(
      1,
      currentGlobalFilter.current,
      'createdAt',
      'desc',
      currentPagination.current.limit,
      roleFilter || '',
      statusFilter || '',
      branchFilter || ''
    )
  }, [branchFilter])

  // Define all possible roles (static list, not derived from filtered data)
  const allRoles = ['ADMIN', 'HR', 'EMPLOYEE', 'MANAGER']

  // Handle delete click
  const handleDeleteClick = useCallback(employee => {
    setEmployeeToDelete(employee)
    setDeleteDialogOpen(true)
  }, [])

  // Handle delete confirmation
  const handleDeleteConfirm = useCallback(async () => {
    if (!employeeToDelete) return

    setDeleteLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/${employeeToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      if (response.ok) {
        toastService.handleApiSuccess('deleted', 'Employee')
        // Re-fetch data after deletion
        fetchEmployees(
          currentPagination.current.page,
          currentGlobalFilter.current,
          'createdAt',
          'desc',
          currentPagination.current.limit,
          roleFilter,
          statusFilter,
          branchFilter
        )
        setDeleteDialogOpen(false)
        setEmployeeToDelete(null)
      } else {
        await toastService.handleApiError(response, 'Failed to delete employee')
      }
    } catch (error) {
      await toastService.handleApiError(error, 'Network error or unexpected issue during deletion. Please try again.')
    } finally {
      setDeleteLoading(false)
    }
  }, [employeeToDelete, currentPagination.current.page, currentGlobalFilter.current, roleFilter, statusFilter, branchFilter])

  // Function to open drawer for editing
  const handleEditClick = useCallback(employee => {
    setEditingEmployee(employee)
    setAddEmployeeOpen(true)
  }, [])

  // Function to close drawer and clear editing state
  const handleDrawerClose = () => {
    setAddEmployeeOpen(false)
    setEditingEmployee(null)
  }

  // Function to handle attendance report download
  const handleDownloadReport = useCallback(employee => {
    setSelectedEmployee(employee)
    setReportDialogOpen(true)
  }, [])

  // Function to generate attendance report
  const handleGenerateReport = useCallback(
    async reportData => {
      if (!selectedEmployee || !session?.accessToken) {
        setFetchError(t('employees.authenticationRequired'))
        return
      }

      try {
        setReportLoading(true)
        setFetchError(null)

        await attendanceReportService.downloadAttendanceReport(selectedEmployee.id, reportData, session.accessToken)

        setReportDialogOpen(false)
        setSelectedEmployee(null)
      } catch (error) {
        console.error('Error generating report:', error)
        setFetchError(error.message || t('employees.failedToGenerateReport'))
      } finally {
        setReportLoading(false)
      }
    },
    [selectedEmployee, session?.accessToken]
  )

  // Function to close report dialog
  const handleCloseReportDialog = useCallback(() => {
    if (!reportLoading) {
      setReportDialogOpen(false)
      setSelectedEmployee(null)
    }
  }, [reportLoading])

  const columns = useMemo(
    () => [
      columnHelper.accessor('employeeId', {
        header: t('employees.fields.employeeId'),
        cell: info => <Typography color='text.primary'>{info.getValue() || '-'}</Typography>,
        enableSorting: true
      }),
      columnHelper.accessor('name', {
        header: t('employees.fields.name'),
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
              {row.original.nationalIdentificationNumber && (
                <Typography variant='caption' color='text.secondary'>
                  Codice fiscale: {row.original.nationalIdentificationNumber}
                </Typography>
              )}
            </div>
          </div>
        ),
        enableSorting: true
      }),
      columnHelper.accessor('email', {
        header: t('employees.fields.email'),
        cell: info => <Typography color='text.primary'>{info.getValue()}</Typography>,
        enableSorting: true
      }),
      columnHelper.accessor('phone', {
        header: t('employees.fields.phone'),
        cell: ({ row }) => (
          <Typography color='text.primary'>
            {row.original.phone || '-'}
          </Typography>
        ),
        enableSorting: true
      }),
      columnHelper.accessor('role', {
        header: t('employees.fields.role'),
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Icon
              className={employeeRoleObj[row.original.role]?.icon || 'tabler-user'}
              sx={{ color: `var(--mui-palette-${employeeRoleObj[row.original.role]?.color || 'primary'}-main)` }}
            />
            <Typography className='capitalize' color='text.primary'>
              {t(`common.roles.${row.original.role}`) || row.original.role}
            </Typography>
          </div>
        ),
        enableSorting: true
      }),
      columnHelper.accessor('isActive', {
        header: t('employees.fields.status'),
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Chip
              variant='tonal'
              label={row.original.isActive ? t('employees.status.active') : t('employees.status.inactive')}
              size='small'
              color={employeeStatusObj[row.original.isActive]}
              className='capitalize'
            />
          </div>
        ),
        enableSorting: true
      }),
      columnHelper.accessor('action', {
        header: t('employees.fields.action'),
        cell: ({ row }) => (
          <div className='flex items-center'>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Download Report',
                  icon: 'tabler-file-download',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => handleDownloadReport(row.original)
                  }
                },
                {
                  text: t('employees.edit'),
                  icon: 'tabler-edit',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => handleEditClick(row.original)
                  }
                },
                {
                  text: t('employees.delete'),
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
    [handleDeleteClick, handleEditClick, locale]
  )

  const table = useReactTable({
    data: employees, // Use employees directly instead of filteredData
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
        <CardHeader title={t('employees.employeeManagement')} className='pbe-4' />
        <div className='flex flex-wrap items-end gap-4 p-6 border-bs'>
          {/* Role Filter */}
          <CustomTextField
            select
            label={t('employees.fields.role')}
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className='min-w-[180px]'
          >
            <MenuItem value=''>{t('employees.all')}</MenuItem>
            {allRoles.map(role => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </CustomTextField>

          {/* Status Filter (isActive) */}
          <CustomTextField
            select
            label={t('employees.fields.status')}
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className='min-w-[180px]'
          >
            <MenuItem value=''>{t('employees.all')}</MenuItem>
            <MenuItem value='true'>{t('employees.status.active')}</MenuItem>
            <MenuItem value='false'>{t('employees.status.inactive')}</MenuItem>
          </CustomTextField>

          {/* Branch Filter */}
          <CustomAutocomplete
            size='small'
            options={branches}
            loading={branchesLoading}
            value={branches.find(branch => branch.id === branchFilter) || null}
            onChange={(event, newValue) => {
              console.log('🔄 Branch filter changed to:', newValue?.id || '')
              setBranchFilter(newValue ? newValue.id : '')
            }}
            getOptionLabel={option => {
              if (typeof option === 'string') return option
              return option.name || ''
            }}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            renderInput={params => (
              <CustomTextField
                {...params}
                label={t('employees.fields.branch')}
                className='min-w-[180px]'
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.name}
              </li>
            )}
            noOptionsText={t('employees.all')}
          />

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
            placeholder={t('employees.searchEmployee')}
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
            {t('employees.addNewEmployee')}
          </Button>
        </div>
        {fetchLoading ? (
          <div className='flex justify-center items-center p-6'>
            <CircularProgress />
            <Typography className='ml-4'>{t('employees.loadingEmployees')}</Typography>
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
                      {t('employees.noEmployeesAvailable')}
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
      <AddUserDrawer
        open={addEmployeeOpen}
        handleClose={handleDrawerClose}
        currentEmployee={editingEmployee}
        onEmployeeAdded={() => {
          // Refresh data after employee is added/updated
          fetchEmployees(
            currentPagination.current.page,
            currentGlobalFilter.current,
            'createdAt',
            'desc',
            currentPagination.current.limit,
            roleFilter,
            statusFilter
          )
        }}
      />

      {/* Attendance Report Dialog */}
      <AttendanceReportDialog
        open={reportDialogOpen}
        onClose={handleCloseReportDialog}
        onGenerate={handleGenerateReport}
        loading={reportLoading}
        employeeName={selectedEmployee?.name || ''}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title={t('employees.deleteConfirmation.title')}
        message={t('employees.deleteConfirmation.message')}
        itemName={employeeToDelete?.name}
        loading={deleteLoading}
      />
    </>
  )
}

export default EmployeeListTable
