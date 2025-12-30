'use client'

import { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import Chip from '@mui/material/Chip'
import classnames from 'classnames'
import OptionMenu from '@core/components/option-menu'
import { rankItem } from '@tanstack/match-sorter-utils'
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
import { useSession } from 'next-auth/react'
import CustomTextField from '@core/components/mui/TextField'
import CustomAutocomplete from '@core/components/mui/Autocomplete'
import TablePaginationComponent from '@components/TablePaginationComponent'
import { getLocalizedUrl } from '@/utils/i18n'
import tableStyles from '@core/styles/table.module.css'

// Services
import apiClient from '@/services/apiClient'
import toastService from '@/services/toastService'
import enhancedTaskService from '@/services/enhancedTaskService'

// Component Imports
import DeleteConfirmationDialog from '@components/dialogs/DeleteConfirmationDialog'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'
import { getTaskDueDateColor, getTaskTimeRemaining } from '@/utils/dateColorUtils'
import useRoleBasedAccess from '@/hooks/useRoleBasedAccess'
import { canDelete } from '@/utils/roleBasedAccess'

const columnHelper = createColumnHelper()

const taskStatusObj = {
  PENDING: 'warning',
  IN_PROGRESS: 'info',
  COMPLETED: 'success',
  CANCELLED: 'error',
  ON_HOLD: 'secondary'
}

// Fuzzy filter for search
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

// Removed DebouncedInput component - using manual debouncing instead

const TaskListTable = ({
  tasks: externalTasks = null,
  showTitle = true,
  showAddButton = true,
  limitActions = false
}) => {
  console.log('🔄 TaskListTable component rendered')

  // States for Table Data and API Operations
  const [tasks, setTasks] = useState(externalTasks || []) // Stores fetched task data
  const [branches, setBranches] = useState([])
  const [allEmployees, setAllEmployees] = useState([]) // All employees for filter
  const [employeesLoading, setEmployeesLoading] = useState(false)
  const [branchesLoading, setBranchesLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(externalTasks ? false : true) // Loading state for data fetch
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
  const [statusFilter, setStatusFilter] = useState('')
  const [assignedEmployeeFilter, setAssignedEmployeeFilter] = useState('')
  const [branchFilter, setBranchFilter] = useState('')

  // States for Delete Dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // States for Export
  const [exportLoading, setExportLoading] = useState(false)

  // Ref to track if initial fetch has been made
  const hasInitiallyFetched = useRef(false)
  const isUsingExternalData = useRef(false)

  // Refs to store current values without causing re-renders
  const currentGlobalFilter = useRef('')
  const currentPagination = useRef({ page: 1, limit: 10 })

  // Hooks
  const { lang: locale } = useParams()
  const router = useRouter()
  const { data: session, status: sessionStatus } = useSession()
  const { t } = useTranslation()
  const { userRole, userPermissions } = useRoleBasedAccess()

  // Determine if we're rendering with externally provided data (dashboard) or fetching from API (management page)
  // Only treat as external if it's actually an array (not null/undefined)
  const isExternalData = Array.isArray(externalTasks)

  // When external data is provided, use it. Otherwise, fetch from API (handled by normal useEffect)
  useEffect(() => {
    if (isExternalData && externalTasks) {
      isUsingExternalData.current = true
      setTasks(externalTasks)
      setFetchLoading(false)
      hasInitiallyFetched.current = true // Mark as fetched so the normal useEffect doesn't run
    } else {
      isUsingExternalData.current = false
    }
    // If externalTasks is null/undefined, don't do anything - let the normal fetch logic handle it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalTasks]) // Only depend on externalTasks, not isExternalData (which is derived from it)

  // Function to fetch all employees
  const fetchAllEmployees = useCallback(async () => {
    if (!session?.accessToken) return

    setEmployeesLoading(true)
    try {
      const response = await apiClient.get('/employees/list/all')

      if (response.status === 200) {
        const data = response.data
        // Filter only active employees
        const activeEmployees = (data.data || []).filter(emp => emp.isActive !== false)
        setAllEmployees(activeEmployees)
      } else {
        console.error('Failed to fetch employees')
      }
    } catch (error) {
      console.error('Error fetching employees:', error)
    } finally {
      setEmployeesLoading(false)
    }
  }, [session?.accessToken])

  // Function to fetch branches
  const fetchBranches = useCallback(async () => {
    if (!session?.accessToken) return

    setBranchesLoading(true)
    try {
      const response = await apiClient.get('/branches/active')

      if (response.status === 200) {
        const data = response.data
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

  // Function to fetch task data from API with pagination
  const fetchTasks = async (
    page = 1,
    search = '',
    sortBy = 'createdAt',
    sortType = 'desc',
    limit = 10,
    status = '',
    assignedEmployee = '',
    branch = ''
  ) => {
    console.log('🔄 fetchTasks called with:', {
      page,
      search,
      sortBy,
      sortType,
      limit,
      status,
      assignedEmployee,
      branch
    })
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
      const params = {
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
        sortType
      }

      if (search) params.search = search
      if (status) params.status = status
      if (assignedEmployee) params.assignedEmployeeId = assignedEmployee
      if (branch) params.branchId = branch

      const response = await apiClient.get('/tasks', { params })
      const responseData = response.data

      if (response.status === 200) {
        setTasks(responseData.data || [])
        setPagination(prev => ({
          ...prev,
          page: responseData.pagination?.page || page,
          total: responseData.pagination?.total || 0,
          totalPages: responseData.pagination?.totalPages || 0,
          hasNext: responseData.pagination?.hasNext || false,
          hasPrev: responseData.pagination?.hasPrev || false
        }))
      } else {
        const errorMessage = responseData.message || `Failed to fetch tasks: ${response.status}`
        setFetchError(errorMessage)
        await toastService.handleApiError(response, 'Failed to fetch tasks')
        console.error('API Error fetching tasks:', responseData)
      }
    } catch (error) {
      const errorMessage = 'Network error or unexpected issue fetching tasks. Please try again.'
      setFetchError(errorMessage)
      await toastService.handleApiError(error, errorMessage)
      console.error('Fetch error tasks:', error)
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
      fetchTasks(
        page,
        currentGlobalFilter.current,
        'createdAt',
        'desc',
        currentPagination.current.limit,
        statusFilter,
        assignedEmployeeFilter,
        branchFilter
      )
    },
    [pagination.page, statusFilter, assignedEmployeeFilter, branchFilter]
  )

  const handleRowsPerPageChange = useCallback(
    event => {
      console.log('🔄 handleRowsPerPageChange called with:', event.target.value)
      const newLimit = parseInt(event.target.value, 10)
      currentPagination.current = { page: 1, limit: newLimit }
      setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }))
      fetchTasks(
        1,
        currentGlobalFilter.current,
        'createdAt',
        'desc',
        newLimit,
        statusFilter,
        assignedEmployeeFilter,
        branchFilter
      )
    },
    [statusFilter, assignedEmployeeFilter, branchFilter]
  )

  const handleSearch = useCallback(
    value => {
      console.log('🔄 handleSearch called with:', value)
      currentGlobalFilter.current = value
      currentPagination.current = { ...currentPagination.current, page: 1 }
      setGlobalFilter(value)
      setPagination(prev => ({ ...prev, page: 1 }))
      fetchTasks(
        1,
        value,
        'createdAt',
        'desc',
        currentPagination.current.limit,
        statusFilter,
        assignedEmployeeFilter,
        branchFilter
      )
    },
    [statusFilter, assignedEmployeeFilter, branchFilter]
  )

  const handleSort = useCallback(
    (columnId, direction) => {
      console.log('🔄 handleSort called with:', { columnId, direction })
      const sortBy = columnId || 'createdAt'
      const sortType = direction || 'desc'
      fetchTasks(
        currentPagination.current.page,
        currentGlobalFilter.current,
        sortBy,
        sortType,
        currentPagination.current.limit,
        statusFilter,
        assignedEmployeeFilter,
        branchFilter
      )
    },
    [statusFilter, assignedEmployeeFilter, branchFilter]
  )

  // Effect to fetch data on component mount or when session/token changes
  useEffect(() => {
    if (externalTasks) {
      // Use external tasks, no need to fetch
      setFetchLoading(false)
      setFetchError(null)
      return
    }

    console.log('🔄 useEffect triggered with:', { sessionStatus, hasInitiallyFetched: hasInitiallyFetched.current, isUsingExternalData: isUsingExternalData.current })

    // Only fetch if we don't have external data AND haven't fetched yet
    if (!isUsingExternalData.current && sessionStatus === 'authenticated' && !hasInitiallyFetched.current) {
      console.log('🔄 Making initial fetch...')
      hasInitiallyFetched.current = true
      fetchTasks(1, '', 'createdAt', 'desc', 10, '', '', '')
      fetchBranches()
      fetchAllEmployees()
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

  // Effect to handle status filter changes
  useEffect(() => {
    // Only run if we have fetched data at least once
    if (!hasInitiallyFetched.current) {
      return
    }

    console.log('🔄 Status filter changed to:', statusFilter)
    currentPagination.current = { ...currentPagination.current, page: 1 }
    setPagination(prev => ({ ...prev, page: 1 }))
    fetchTasks(
      1,
      currentGlobalFilter.current,
      'createdAt',
      'desc',
      currentPagination.current.limit,
      statusFilter || '',
      assignedEmployeeFilter || '',
      branchFilter || ''
    )
  }, [statusFilter])

  // Effect to handle assigned employee filter changes
  useEffect(() => {
    // Only run if we have fetched data at least once
    if (!hasInitiallyFetched.current) {
      return
    }

    console.log('🔄 Assigned employee filter changed to:', assignedEmployeeFilter)
    currentPagination.current = { ...currentPagination.current, page: 1 }
    setPagination(prev => ({ ...prev, page: 1 }))
    fetchTasks(
      1,
      currentGlobalFilter.current,
      'createdAt',
      'desc',
      currentPagination.current.limit,
      statusFilter || '',
      assignedEmployeeFilter || '',
      branchFilter || ''
    )
  }, [assignedEmployeeFilter])

  // Effect to handle branch filter changes
  useEffect(() => {
    // Only run if we have fetched data at least once
    if (!hasInitiallyFetched.current) {
      return
    }

    console.log('🔄 Branch filter changed to:', branchFilter)
    currentPagination.current = { ...currentPagination.current, page: 1 }
    setPagination(prev => ({ ...prev, page: 1 }))
    fetchTasks(
      1,
      currentGlobalFilter.current,
      'createdAt',
      'desc',
      currentPagination.current.limit,
      statusFilter || '',
      assignedEmployeeFilter || '',
      branchFilter || ''
    )
  }, [branchFilter])

  // Function to handle task deletion
  const handleDeleteClick = useCallback(
    taskId => {
      const task = tasks.find(t => t.id === taskId)
      setTaskToDelete(task)
      setDeleteDialogOpen(true)
    },
    [tasks]
  )

  // Function to confirm task deletion
  const handleDeleteTask = useCallback(async () => {
    if (!taskToDelete) return

    if (!session?.accessToken) {
      toastService.showError('Authentication token not found. Cannot delete task.')
      setDeleteDialogOpen(false)
      return
    }

    setDeleteLoading(true)

    try {
      const response = await apiClient.delete(`/tasks/${taskToDelete.id}`)

      if (response.status === 200 || response.status === 204) {
        // Show success toast
        toastService.handleApiSuccess('deleted', 'Task')
        console.log(`Task ${taskToDelete.id} deleted successfully.`)
        // Re-fetch data after deletion
        fetchTasks(
          currentPagination.current.page,
          currentGlobalFilter.current,
          'createdAt',
          'desc',
          currentPagination.current.limit,
          statusFilter,
          assignedEmployeeFilter,
          branchFilter
        )
        setDeleteDialogOpen(false)
        setTaskToDelete(null)
      } else {
        const errorData = response.data || {}
        console.error('API Error deleting task:', errorData)
        await toastService.handleApiError(response, 'Failed to delete task')
      }
    } catch (error) {
      // Show error toast
      await toastService.handleApiError(error, 'Network error or unexpected issue during deletion. Please try again.')
      console.error('Fetch error deleting task:', error)
    } finally {
      setDeleteLoading(false)
    }
  }, [session?.accessToken, fetchTasks, taskToDelete])

  // Function to handle generate invoice - redirect to invoice add page with pre-filled data
  const handleGenerateInvoiceClick = useCallback(
    task => {
      // Prepare pre-filled data for invoice creation - only use data that exists in task
      const preFilledData = {
        selectedClient: task.client,
        selectedSalesperson: task.assignedEmployee,
        serviceItems: [
          {
            categoryId: task.service?.category,
            serviceId: task.service?.id,
            description: task.description,
            rate: task.service?.price,
            discount: 0
          }
        ]
      }

      // Only add notes if task has description
      if (task.description) {
        preFilledData.notes = task.description
      }

      // Add dates if they exist in task
      if (task.startDate) {
        preFilledData.issuedDate = task.startDate
      }
      if (task.dueDate) {
        preFilledData.dueDate = task.dueDate
      }

      // Store pre-filled data in sessionStorage
      sessionStorage.setItem('invoicePrefillData', JSON.stringify(preFilledData))

      // Navigate to invoice add page using SPA routing
      router.push(getLocalizedUrl('/apps/invoice/add', locale))
    },
    [locale, router]
  )

  // Export handler
  const handleExportReport = useCallback(async () => {
    try {
      setExportLoading(true)
      
      const params = {}
      if (statusFilter) params.status = statusFilter
      if (branchFilter) params.branchId = branchFilter
      if (assignedEmployeeFilter) params.employeeId = assignedEmployeeFilter
      if (globalFilter) params.search = globalFilter
      params.format = 'excel'

      const response = await apiClient.get('/tasks/export-report', {
        params,
        responseType: 'blob'
      })

      if (response.status !== 200) {
        throw new Error(`Export failed: ${response.status}`)
      }

      // Get the blob from response
      const blob = response.data
      
      // Create download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      
      // Get filename from response headers or use default
      const contentDisposition = response.headers.get('Content-Disposition')
      let filename = 'task-report.xlsx'
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/)
        if (filenameMatch) {
          filename = filenameMatch[1]
        }
      }
      
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
      toastService.handleApiSuccess('exported', 'Task Report')
    } catch (error) {
      console.error('Error exporting report:', error)
      toastService.handleApiError(error, 'Failed to export task report')
    } finally {
      setExportLoading(false)
    }
  }, [session?.accessToken, statusFilter, branchFilter, assignedEmployeeFilter, globalFilter])

  // Static filter options for better server-side filtering
  const statuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'ON_HOLD']

  // Function to format date
  const formatDate = dateString => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString()
  }

  // Column definitions
  const columns = useMemo(
    () => [
      // Only show title column if not in minimal mode
      ...(showTitle
        ? [
            columnHelper.accessor('title', {
              header: t('tasks.fields.title'),
              cell: ({ row }) => (
                <Typography color='text.primary' className='font-medium'>
                  {row.original.title}
                </Typography>
              ),
              enableSorting: true
            })
          ]
        : []),
      columnHelper.accessor('client', {
        header: t('tasks.fields.client'),
        cell: ({ row }) => <Typography color='text.primary'>{row.original.client?.name || '-'}</Typography>,
        enableSorting: true
      }),
      columnHelper.accessor('service', {
        header: t('tasks.fields.service'),
        cell: ({ row }) => <Typography color='text.primary'>{row.original.service?.name || '-'}</Typography>,
        enableSorting: true
      }),
      columnHelper.accessor('assignedEmployee', {
        header: t('tasks.fields.assignedTo'),
        cell: ({ row }) => <Typography color='text.primary'>{row.original.assignedEmployee?.name || '-'}</Typography>,
        enableSorting: true
      }),
      columnHelper.accessor('status', {
        header: t('tasks.fields.status'),
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Chip
              variant='tonal'
              label={(() => {
                const statusKey = row.original.status?.toLowerCase()
                let translatedStatus = row.original.status

                // Map status values to translations
                const statusTranslations = {
                  pending: t('tasks.status.pending'),
                  in_progress: t('tasks.status.inProgress'),
                  completed: t('tasks.status.completed'),
                  cancelled: t('tasks.status.cancelled'),
                  on_hold: t('tasks.status.onHold')
                }

                if (statusTranslations[statusKey]) {
                  translatedStatus = statusTranslations[statusKey]
                }

                return translatedStatus
              })()}
              size='small'
              color={taskStatusObj[row.original.status]}
              className='capitalize'
            />
          </div>
        ),
        enableSorting: true
      }),
      columnHelper.accessor('dueDate', {
        header: t('tasks.fields.dueDate'),
        cell: ({ row }) => {
          const timeRemaining = getTaskTimeRemaining(row.original.dueDate, row.original.status)
          return (
            <div className='flex flex-col'>
              <Typography color={getTaskDueDateColor(row.original.dueDate, row.original.status)}>
                {formatDate(row.original.dueDate)}
              </Typography>
              {timeRemaining && (
                <Typography variant='caption' color={getTaskDueDateColor(row.original.dueDate, row.original.status)}>
                  {timeRemaining}
                </Typography>
              )}
            </div>
          )
        },
        enableSorting: true
      }),
      columnHelper.accessor('action', {
        header: t('tasks.fields.action'),
        cell: ({ row }) => (
          <div className='flex items-center'>
            {limitActions ? (
              // Direct button for minimal mode
              <IconButton
                size='medium'
                component={Link}
                href={getLocalizedUrl(`/apps/task/view/${row.original.id}`, locale)}
                className='text-textSecondary'
              >
                <i className='tabler-eye' />
              </IconButton>
            ) : (
              // Full dropdown for normal mode
              <OptionMenu
                iconButtonProps={{ size: 'medium' }}
                iconClassName='text-textSecondary'
                options={[
                  // Full actions in normal mode
                  {
                    text: t('tasks.view'),
                    icon: 'tabler-eye',
                    menuItemProps: {
                      component: Link,
                      href: getLocalizedUrl(`/apps/task/view/${row.original.id}`, locale),
                      className: 'flex items-center gap-2 text-textSecondary'
                    }
                  },
                  {
                    text: t('tasks.edit'),
                    icon: 'tabler-edit',
                    menuItemProps: {
                      component: Link,
                      href: getLocalizedUrl(`/apps/task/edit/${row.original.id}`, locale),
                      className: 'flex items-center gap-2 text-textSecondary'
                    }
                  },
                  ...(!row.original.invoices || row.original.invoices.length === 0
                    ? [
                        {
                          text: t('tasks.generateInvoice'),
                          icon: 'tabler-file-invoice',
                          menuItemProps: {
                            className: 'flex items-center gap-2 text-textSecondary',
                            onClick: () => handleGenerateInvoiceClick(row.original)
                          }
                        }
                      ]
                    : []),
                  // Only show delete option if user has DELETE permission (employees cannot delete)
                  ...(canDelete('TASK', userRole, userPermissions)
                    ? [
                  {
                    text: t('tasks.delete'),
                    icon: 'tabler-trash',
                    menuItemProps: {
                      className: 'flex items-center gap-2 text-textSecondary',
                      onClick: () => handleDeleteClick(row.original.id)
                    }
                  }
                      ]
                    : [])
                ]}
              />
            )}
          </div>
        ),
        enableSorting: false
      })
    ],
    [handleDeleteClick, handleGenerateInvoiceClick, locale, userRole, userPermissions]
  )

  // Memoize table config to prevent recreation
  const tableConfig = useMemo(() => ({
    data: tasks || [], // Ensure always an array
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { globalFilter },
    initialState: { pagination: { pageSize: 10 } },
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // For dashboard (external data), use client-side pagination. For management page, keep manual pagination.
    manualPagination: !isExternalData,
    manualSorting: !isExternalData,
    pageCount: isExternalData 
      ? Math.ceil((tasks?.length || 0) / 10) 
      : (pagination.totalPages || 0),
  }), [tasks, columns, globalFilter, isExternalData, pagination.totalPages])

  const table = useReactTable({
    ...tableConfig,
    onSortingChange: updater => {
      if (typeof updater === 'function' && !isExternalData) {
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
        <CardHeader title={t('tasks.taskManagement')} className='pbe-4' />
        <div className='flex flex-wrap items-end gap-4 p-6 border-bs'>
          {/* Status Filter */}
          <CustomTextField
            select
            label={t('tasks.fields.status')}
            value={statusFilter}
            onChange={e => {
              console.log('🔄 Status filter changed to:', e.target.value)
              setStatusFilter(e.target.value)
            }}
            className='min-w-[180px]'
          >
            <MenuItem value=''>{t('tasks.all')}</MenuItem>
            {statuses.map(status => {
              const statusKey = typeof status === 'string' ? status.toLowerCase() : status
              let translatedStatus = status

              // Map status values to translations
              const statusTranslations = {
                pending: t('tasks.status.pending'),
                in_progress: t('tasks.status.inProgress'),
                completed: t('tasks.status.completed'),
                cancelled: t('tasks.status.cancelled'),
                on_hold: t('tasks.status.onHold')
              }

              if (statusTranslations[statusKey]) {
                translatedStatus = statusTranslations[statusKey]
              }

              return (
                <MenuItem key={status} value={status}>
                  {translatedStatus}
                </MenuItem>
              )
            })}
          </CustomTextField>

          {/* Assigned Employee Filter */}
          <CustomAutocomplete
            size='small'
            options={allEmployees}
            loading={employeesLoading}
            value={allEmployees.find(employee => employee.id === assignedEmployeeFilter) || null}
            onChange={(event, newValue) => {
              console.log('🔄 Assigned employee filter changed to:', newValue?.id || '')
              setAssignedEmployeeFilter(newValue ? newValue.id : '')
            }}
            getOptionLabel={option => {
              if (typeof option === 'string') return option
              return `${option.name || ''} - ${option.email || ''}`
            }}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            renderInput={params => (
              <CustomTextField
                {...params}
                label={t('tasks.fields.assignedTo')}
                className='min-w-[180px]'
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.name} - {option.email}
              </li>
            )}
            noOptionsText={t('tasks.all')}
          />

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
            noOptionsText={t('tasks.all')}
          />

          <CustomTextField
            value={globalFilter ?? ''}
            onChange={e => {
              const value = e.target.value
              console.log('🔄 Search input changed to:', value)
              setGlobalFilter(value)
              // Debounce the search manually
              clearTimeout(window.searchTimeout)
              window.searchTimeout = setTimeout(() => {
                console.log('🔄 Debounced search triggered with:', value)
                handleSearch(value)
              }, 500)
            }}
            placeholder={t('tasks.searchTask')}
            className='min-w-[200px]'
          />

          <div className='flex gap-2 ml-auto'>
            <Button
              variant='outlined'
              startIcon={<i className='tabler-file-export' />}
              onClick={handleExportReport}
              disabled={exportLoading}
              className='h-[40px]'
            >
              {exportLoading ? t('tasks.exporting') : t('tasks.exportReport')}
            </Button>
          {showAddButton && (
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              component={Link}
              href={getLocalizedUrl('/apps/task/add', locale)}
                className='h-[40px]'
            >
              {t('tasks.addNewTask')}
            </Button>
          )}
          </div>
        </div>

        {fetchLoading ? (
          <div className='flex justify-center items-center p-6'>
            <CircularProgress />
            <Typography className='ml-4'>{t('tasks.loadingTasks')}</Typography>
          </div>
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
                      {t('tasks.noTasksAvailable')}
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
            isExternalData ? (
              <TablePaginationComponent table={table} />
            ) : (
              <TablePaginationComponent
                table={table}
                totalCount={pagination.total}
                currentPage={pagination.page - 1}
                pageSize={pagination.limit}
                onPageChange={handlePageChange}
              />
            )
          )}
          count={isExternalData ? (tasks?.length || 0) : (pagination.total || 0)}
          rowsPerPage={isExternalData ? (table.getState().pagination?.pageSize || 10) : (pagination.limit || 10)}
          page={isExternalData ? (table.getState().pagination?.pageIndex || 0) : ((pagination.page - 1) || 0)}
          onPageChange={isExternalData ? (_, page) => {
            try {
              table.setPageIndex(page)
            } catch (err) {
              console.error('Error setting page index:', err)
            }
          } : handlePageChange}
          onRowsPerPageChange={isExternalData ? e => {
            try {
              table.setPageSize(parseInt(e.target.value, 10))
            } catch (err) {
              console.error('Error setting page size:', err)
            }
          } : handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Card>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        onConfirm={handleDeleteTask}
        title={t('tasks.deleteConfirmation.title')}
        message={t('tasks.deleteConfirmation.message')}
        itemName={taskToDelete?.title || taskToDelete?.description}
        loading={deleteLoading}
      />
    </>
  )
}

export default TaskListTable
