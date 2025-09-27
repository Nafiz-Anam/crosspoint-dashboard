'use client'

import { useEffect, useState, useMemo, useCallback } from 'react'
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
import AddTaskDrawer from './AddTaskDrawer'
import TablePaginationComponent from '@components/TablePaginationComponent'
import { getLocalizedUrl } from '@/utils/i18n'
import tableStyles from '@core/styles/table.module.css'

// Services
import toastService from '@/services/toastService'
import enhancedTaskService from '@/services/enhancedTaskService'

// Component Imports
import DeleteConfirmationDialog from '@components/dialogs/DeleteConfirmationDialog'

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

const TaskListTable = () => {
  // States for Drawer
  const [addTaskOpen, setAddTaskOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  // States for Table Data and API Operations
  const [tasks, setTasks] = useState([])
  const [branches, setBranches] = useState([])
  const [fetchLoading, setFetchLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  // States for Filtering and Search
  const [filteredData, setFilteredData] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [filters, setFilters] = useState({ status: '', assignedEmployee: '', branch: '' })

  // States for Delete Dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // Hooks
  const { lang: locale } = useParams()
  const { data: session, status: sessionStatus } = useSession()

  // Function to fetch branches
  const fetchBranches = useCallback(async () => {
    if (!session?.accessToken) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/branches`, {
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
    }
  }, [session?.accessToken])

  // Function to fetch task data from API
  const fetchTasks = useCallback(async () => {
    setFetchLoading(true)
    setFetchError(null)

    if (sessionStatus === 'loading') return
    if (sessionStatus === 'unauthenticated' || !session?.accessToken) {
      setFetchError('Authentication required to fetch tasks. Please log in.')
      setFetchLoading(false)
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      const responseData = await response.json()

      if (response.ok) {
        setTasks(responseData.data?.results || responseData.data || [])
      } else {
        const errorMessage = responseData.message || `Failed to fetch tasks: ${response.status}`
        setFetchError(errorMessage)
        await toastService.handleApiError(response, errorMessage)
      }
    } catch (error) {
      const errorMessage = 'Network error or unexpected issue fetching tasks. Please try again.'
      setFetchError(errorMessage)
      await toastService.handleApiError(error, errorMessage)
    } finally {
      setFetchLoading(false)
    }
  }, [sessionStatus, session?.accessToken])

  // Effect to fetch data on component mount or when session/token changes
  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      fetchTasks()
      fetchBranches()
    } else if (sessionStatus === 'unauthenticated') {
      setFetchError('Not authenticated. Please log in to view tasks.')
      setFetchLoading(false)
    }
  }, [sessionStatus, session?.accessToken, fetchTasks, fetchBranches])

  // Effect for client-side filtering
  useEffect(() => {
    let tempData = [...tasks]

    if (filters.status) {
      tempData = tempData.filter(row => row.status === filters.status)
    }

    if (filters.assignedEmployee) {
      tempData = tempData.filter(row => row.assignedEmployee?.name === filters.assignedEmployee)
    }

    if (filters.branch) {
      tempData = tempData.filter(row => row.client?.branch?.name === filters.branch)
    }

    setFilteredData(tempData)
  }, [filters, tasks])

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'x-client-type': 'web',
          Authorization: `Bearer ${session.accessToken}`
        }
      })

      if (response.ok) {
        // Show success toast
        toastService.handleApiSuccess('deleted', 'Task')
        console.log(`Task ${taskToDelete.id} deleted successfully.`)
        fetchTasks() // Re-fetch data to update the table
        setDeleteDialogOpen(false)
        setTaskToDelete(null)
      } else {
        // Show error toast
        await toastService.handleApiError(response, 'Failed to delete task')
        console.error('API Error deleting task:', await response.json())
      }
    } catch (error) {
      // Show error toast
      await toastService.handleApiError(error, 'Network error or unexpected issue during deletion. Please try again.')
      console.error('Fetch error deleting task:', error)
    } finally {
      setDeleteLoading(false)
    }
  }, [session?.accessToken, fetchTasks, taskToDelete])

  // Function to open drawer for editing
  const handleEditClick = useCallback(task => {
    setEditingTask(task)
    setAddTaskOpen(true)
  }, [])

  // Function to close drawer and clear editing state
  const handleDrawerClose = () => {
    setAddTaskOpen(false)
    setEditingTask(null)
  }

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

      // Redirect to invoice add page
      window.location.href = getLocalizedUrl('/apps/invoice/add', locale)
    },
    [locale]
  )

  // Derive unique values for filter dropdowns from the fetched data
  const assignedEmployees = useMemo(
    () => Array.from(new Set(tasks.map(item => item.assignedEmployee?.name).filter(Boolean))),
    [tasks]
  )
  const statuses = useMemo(() => Array.from(new Set(tasks.map(item => item.status))), [tasks])
  const branchNames = useMemo(
    () => Array.from(new Set(tasks.map(item => item.client?.branch?.name).filter(Boolean))),
    [tasks]
  )

  // Function to format date
  const formatDate = dateString => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString()
  }

  // Column definitions
  const columns = useMemo(
    () => [
      columnHelper.accessor('title', {
        header: 'Title',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.title}
          </Typography>
        )
      }),
      columnHelper.accessor('client', {
        header: 'Client',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.client?.name || '-'}</Typography>
      }),
      columnHelper.accessor('service', {
        header: 'Service',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.service?.name || '-'}</Typography>
      }),
      columnHelper.accessor('assignedEmployee', {
        header: 'Assigned To',
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
              color={taskStatusObj[row.original.status]}
              className='capitalize'
            />
          </div>
        )
      }),
      columnHelper.accessor('dueDate', {
        header: 'Due Date',
        cell: ({ row }) => <Typography color='text.primary'>{formatDate(row.original.dueDate)}</Typography>
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
                    href: getLocalizedUrl(`/apps/task/view/${row.original.id}`, locale),
                    className: 'flex items-center gap-2 text-textSecondary'
                  }
                },
                {
                  text: 'Edit',
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
                        text: 'Generate Invoice',
                        icon: 'tabler-file-invoice',
                        menuItemProps: {
                          className: 'flex items-center gap-2 text-textSecondary',
                          onClick: () => handleGenerateInvoiceClick(row.original)
                        }
                      }
                    ]
                  : []),
                {
                  text: 'Delete',
                  icon: 'tabler-trash',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => handleDeleteClick(row.original.id)
                  }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    [handleDeleteClick, handleGenerateInvoiceClick, locale]
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
        <CardHeader title='Task Management' className='pbe-4' />
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

          {/* Assigned Employee Filter */}
          <CustomTextField
            select
            label='Assigned To'
            value={filters.assignedEmployee}
            onChange={e => setFilters({ ...filters, assignedEmployee: e.target.value })}
            className='min-w-[180px]'
          >
            <MenuItem value=''>All</MenuItem>
            {assignedEmployees.map(employee => (
              <MenuItem key={employee} value={employee}>
                {employee}
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
            {branchNames.map(branch => (
              <MenuItem key={branch} value={branch}>
                {branch}
              </MenuItem>
            ))}
          </CustomTextField>

          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search Task...'
            className='min-w-[200px]'
          />

          <Button
            variant='contained'
            startIcon={<i className='tabler-plus' />}
            component={Link}
            href={getLocalizedUrl('/apps/task/add', locale)}
            className='ml-auto h-[40px]'
          >
            Add New Task
          </Button>
        </div>

        {fetchLoading ? (
          <div className='flex justify-center items-center p-6'>
            <CircularProgress />
            <Typography className='ml-4'>Loading Tasks...</Typography>
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
                      No tasks available
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
      <AddTaskDrawer
        open={addTaskOpen}
        handleClose={handleDrawerClose}
        currentTask={editingTask}
        onTaskAdded={fetchTasks}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        onConfirm={handleDeleteTask}
        title='Delete Task'
        message={`Are you sure you want to delete "${taskToDelete?.title || taskToDelete?.description}"? This action cannot be undone.`}
        itemName={taskToDelete?.title || taskToDelete?.description}
        loading={deleteLoading}
      />
    </>
  )
}

export default TaskListTable
