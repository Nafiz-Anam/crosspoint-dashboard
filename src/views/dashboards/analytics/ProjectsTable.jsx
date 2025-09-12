'use client'

// React Imports
import { useEffect, useMemo, useState } from 'react'

// MUI Imports
import AvatarGroup from '@mui/material/AvatarGroup'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TablePagination from '@mui/material/TablePagination'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
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
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@/components/TablePaginationComponent'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Function to get status configuration based on percentage
const getStatusConfig = percentage => {
  if (percentage === 100) {
    return {
      label: 'Completed',
      color: 'success',
      variant: 'filled'
    }
  } else if (percentage >= 75) {
    return {
      label: 'In Progress',
      color: 'primary',
      variant: 'filled'
    }
  } else if (percentage >= 50) {
    return {
      label: 'On Track',
      color: 'info',
      variant: 'outlined'
    }
  } else if (percentage >= 25) {
    return {
      label: 'Behind Schedule',
      color: 'warning',
      variant: 'filled'
    }
  } else if (percentage > 0) {
    return {
      label: 'Just Started',
      color: 'secondary',
      variant: 'outlined'
    }
  } else {
    return {
      label: 'Not Started',
      color: 'default',
      variant: 'outlined'
    }
  }
}

// Column Definitions
const columnHelper = createColumnHelper()

const ProjectTables = ({ data, loading, error }) => {
  // States
  const [projectData, setProjectData] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')

  // Update project data when props change
  useEffect(() => {
    if (data?.projectsOverview?.projects) {
      setProjectData(data.projectsOverview.projects)
    }
  }, [data])

  // Handle details action
  const handleViewDetails = row => {
    console.log('View details for:', row.original)
    // Add your navigation logic here
    // Example: router.push(`/projects/${row.original.id}`)
  }

  // Hooks
  const columns = useMemo(
    () => [
      columnHelper.accessor('title', {
        header: 'Project',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <CustomAvatar src={row.original.avatar} size={34} />
            <div className='flex flex-col'>
              <Typography className='font-medium' color='text.primary'>
                {row.original.title}
              </Typography>
              <Typography variant='body2'>{row.original.subtitle}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('leader', {
        header: 'Assigned To',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.leader}</Typography>
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => {
          const statusConfig = getStatusConfig(row.original.status)
          return (
            <Chip
              label={statusConfig.label}
              color={statusConfig.color}
              variant={statusConfig.variant}
              size='small'
              sx={{
                fontWeight: 500,
                minWidth: '100px'
              }}
            />
          )
        }
      }),
      columnHelper.accessor('actions', {
        header: 'Actions',
        cell: ({ row }) => (
          <Tooltip title='View Details' placement='top'>
            <IconButton
              size='small'
              onClick={() => handleViewDetails(row)}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'action.hover'
                }
              }}
            >
              <i className='tabler-eye text-[22px]' />
            </IconButton>
          </Tooltip>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // Handle loading and error states
  if (loading) {
    return (
      <Card>
        <CardHeader title='Project List' />
        <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <CircularProgress />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader title='Project List' />
        <CardContent>
          <Alert severity='error'>{error}</Alert>
        </CardContent>
      </Card>
    )
  }

  const table = useReactTable({
    data: projectData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 5
      }
    },
    globalFilterFn: fuzzyFilter,
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
    <Card>
      <CardHeader
        className='flex-wrap gap-x-4 gap-y-2'
        title='Project List'
        action={
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search Project'
          />
        }
      />

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
            {table
              .getRowModel()
              .rows.slice(0, table.getState().pagination.pageSize)
              .map(row => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 7, 10]}
        component={() => <TablePaginationComponent table={table} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
      />
    </Card>
  )
}

export default ProjectTables
