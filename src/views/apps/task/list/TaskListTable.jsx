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
import GenerateInvoiceDrawer from './GenerateInvoiceDrawer'
import TablePaginationComponent from '@components/TablePaginationComponent'
import { getLocalizedUrl } from '@/utils/i18n'
import tableStyles from '@core/styles/table.module.css'

const columnHelper = createColumnHelper()

const taskStatusObj = {
  PENDING: 'warning',
  IN_PROGRESS: 'info',
  COMPLETED: 'success',
  CANCELLED: 'error',
  ON_HOLD: 'secondary'
}

const taskPriorityObj = {
  LOW: 'success',
  MEDIUM: 'warning',
  HIGH: 'error',
  URGENT: 'error'
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
  const [generateInvoiceOpen, setGenerateInvoiceOpen] = useState(false)
  const [selectedTaskForInvoice, setSelectedTaskForInvoice] = useState(null)

  // States for Table Data and API Operations
  const [tasks, setTasks] = useState([])
  const [fetchLoading, setFetchLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  // States for Filtering and Search
  const [filteredData, setFilteredData] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [filters, setFilters] = useState({ status: '', priority: '', assignedEmployee: '' })

  // States for row selection
  const [rowSelection, setRowSelection] = useState({})

  // Hooks
  const { lang: locale } = useParams()
  const { data: session, status: sessionStatus } = useSession()

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
        console.error('API Error fetching tasks:', responseData)
      }
    } catch (error) {
      setFetchError('Network error or unexpected issue fetching tasks. Please try again.')
      console.error('Fetch error tasks:', error)
    } finally {
      setFetchLoading(false)
    }
  }, [sessionStatus, session?.accessToken])

  // Effect to fetch data on component mount or when session/token changes
  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      fetchTasks()
    } else if (sessionStatus === 'unauthenticated') {
      setFetchError('Not authenticated. Please log in to view tasks.')
      setFetchLoading(false)
    }
  }, [sessionStatus, session?.accessToken])

  // Effect for client-side filtering
  useEffect(() => {
    let tempData = [...tasks]

    if (filters.status) {
      tempData = tempData.filter(row => row.status === filters.status)
    }

    if (filters.priority) {
      tempData = tempData.filter(row => row.priority === filters.priority)
    }

    if (filters.assignedEmployee) {
      tempData = tempData.filter(row => row.assignedEmployee?.name === filters.assignedEmployee)
    }

    setFilteredData(tempData)
  }, [filters, tasks])

  // Function to handle task deletion
  const handleDeleteTask = useCallback(
    async taskId => {
      if (!confirm('Are you sure you want to delete this task?')) {
        return
      }

      if (!session?.accessToken) {
        setFetchError('Authentication token not found. Cannot delete task.')
        return
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
          method: 'DELETE',
          headers: {
            'x-client-type': 'web',
            Authorization: `Bearer ${session.accessToken}`
          }
        })

        if (response.ok) {
          console.log(`Task ${taskId} deleted successfully.`)
          fetchTasks()
        } else {
          const errorData = await response.json()
          const errorMessage = errorData.message || `Failed to delete task: ${response.status}`
          setFetchError(errorMessage)
          console.error('API Error deleting task:', errorData)
        }
      } catch (error) {
        setFetchError('Network error or unexpected issue during deletion. Please try again.')
        console.error('Fetch error deleting task:', error)
      }
    },
    [session?.accessToken, fetchTasks]
  )

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

  // Function to handle generate invoice
  const handleGenerateInvoiceClick = useCallback(task => {
    setSelectedTaskForInvoice(task)
    setGenerateInvoiceOpen(true)
  }, [])

  // Function to close generate invoice drawer
  const handleGenerateInvoiceClose = () => {
    setGenerateInvoiceOpen(false)
    setSelectedTaskForInvoice(null)
  }

  // Derive unique values for filter dropdowns from the fetched data
  const assignedEmployees = useMemo(
    () => Array.from(new Set(tasks.map(item => item.assignedEmployee?.name).filter(Boolean))),
    [tasks]
  )
  const statuses = useMemo(() => Array.from(new Set(tasks.map(item => item.status))), [tasks])
  const priorities = useMemo(() => Array.from(new Set(tasks.map(item => item.priority))), [tasks])

  // Function to format date
  const formatDate = dateString => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString()
  }

  // Column definitions
  const columns = useMemo(
    () => [
      columnHelper.accessor('taskId', {
        header: 'Task ID',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.taskId || '-'}
          </Typography>
        )
      }),
      columnHelper.accessor('title', {
        header: 'Title',
        cell: ({ row }) => (
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
              {row.original.title}
            </Typography>
            {row.original.description && (
              <Typography variant='body2' color='text.secondary' className='truncate max-w-xs'>
                {row.original.description}
              </Typography>
            )}
          </div>
        )
      }),
      columnHelper.accessor('client', {
        header: 'Client',
        cell: ({ row }) => (
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
              {row.original.client?.name || '-'}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {row.original.client?.email || ''}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('service', {
        header: 'Service',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.service?.name || '-'}</Typography>
      }),
      columnHelper.accessor('assignedEmployee', {
        header: 'Assigned To',
        cell: ({ row }) => (
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
              {row.original.assignedEmployee?.name || '-'}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {row.original.assignedEmployee?.role || ''}
            </Typography>
          </div>
        )
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
      columnHelper.accessor('priority', {
        header: 'Priority',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Chip
              variant='tonal'
              label={row.original.priority}
              size='small'
              color={taskPriorityObj[row.original.priority]}
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
                  text: 'Edit',
                  icon: 'tabler-edit',
                  menuItemProps: {
                    component: Link,
                    href: getLocalizedUrl(`/apps/task/edit/${row.original.id}`, locale),
                    className: 'flex items-center gap-2 text-textSecondary'
                  }
                },
                ...(row.original.status === 'COMPLETED' &&
                (!row.original.invoices || row.original.invoices.length === 0)
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
                    onClick: () => handleDeleteTask(row.original.id)
                  }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    [handleDeleteTask, handleGenerateInvoiceClick, locale]
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

          {/* Priority Filter */}
          <CustomTextField
            select
            label='Priority'
            value={filters.priority}
            onChange={e => setFilters({ ...filters, priority: e.target.value })}
            className='min-w-[180px]'
          >
            <MenuItem value=''>All</MenuItem>
            {priorities.map(priority => (
              <MenuItem key={priority} value={priority}>
                {priority}
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
      <GenerateInvoiceDrawer
        open={generateInvoiceOpen}
        handleClose={handleGenerateInvoiceClose}
        task={selectedTaskForInvoice}
        onInvoiceGenerated={fetchTasks}
      />
    </>
  )
}

export default TaskListTable
