'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import TablePagination from '@mui/material/TablePagination'

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
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import { getLocalizedUrl } from '@/utils/i18n'

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

// Vars
const invoiceStatusObj = {
  UNPAID: { color: 'warning', icon: 'tabler-clock' },
  PAID: { color: 'success', icon: 'tabler-check' },
  OVERDUE: { color: 'error', icon: 'tabler-alert-circle' },
  CANCELLED: { color: 'secondary', icon: 'tabler-x' }
}

// Column Definitions
const columnHelper = createColumnHelper()

const InvoiceListTable = ({ invoiceData, onFilterChange, onInvoiceAction, filters }) => {
  // States
  const [status, setStatus] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(invoiceData || [])
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')

  // Hooks
  const { lang: locale } = useParams()

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
      columnHelper.accessor('invoiceNumber', {
        header: 'Invoice #',
        cell: ({ row }) => (
          <Typography
            component={Link}
            href={getLocalizedUrl(`/apps/invoice/preview/${row.original.id}`, locale)}
            color='primary.main'
          >
            {row.original.invoiceNumber}
          </Typography>
        )
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            label={row.original.status}
            color={invoiceStatusObj[row.original.status]?.color || 'default'}
            variant='tonal'
            size='small'
            sx={{
              fontWeight: 600,
              textTransform: 'capitalize'
            }}
          />
        )
      }),
      columnHelper.accessor('client', {
        header: 'Client',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            {getAvatar({ avatar: null, name: row.original.client?.name || 'N/A' })}
            <div className='flex flex-col'>
              <Typography className='font-medium' color='text.primary'>
                {row.original.client?.name || 'N/A'}
              </Typography>
              <Typography variant='body2'>{row.original.client?.email || ''}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('items', {
        header: 'Service Name',
        cell: ({ row }) => {
          const services = row.original.items?.map(item => item.service?.name).filter(Boolean) || []
          return <Typography variant='body2'>{services.length > 0 ? services.join(', ') : 'N/A'}</Typography>
        }
      }),
      columnHelper.accessor('totalAmount', {
        header: 'Total',
        cell: ({ row }) => <Typography>{`$${row.original.totalAmount?.toLocaleString() || '0'}`}</Typography>
      }),
      columnHelper.accessor('issuedDate', {
        header: 'Issued Date',
        cell: ({ row }) => <Typography>{new Date(row.original.issuedDate).toLocaleDateString()}</Typography>
      }),
      columnHelper.accessor('dueDate', {
        header: 'Due Date',
        cell: ({ row }) => {
          const dueDate = new Date(row.original.dueDate)
          const isOverdue = dueDate < new Date() && row.original.status === 'UNPAID'
          return (
            <Typography color={isOverdue ? 'error.main' : 'text.primary'}>{dueDate.toLocaleDateString()}</Typography>
          )
        }
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton>
              <Link href={getLocalizedUrl(`/apps/invoice/preview/${row.original.id}`, locale)} className='flex'>
                <i className='tabler-eye text-textSecondary' />
              </Link>
            </IconButton>
            <IconButton>
              <Link href={getLocalizedUrl(`/apps/invoice/edit/${row.original.id}`, locale)} className='flex'>
                <i className='tabler-pencil text-textSecondary' />
              </Link>
            </IconButton>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Mark as Paid',
                  icon: 'tabler-check',
                  onClick: () => onInvoiceAction('updateStatus', row.original.id, { status: 'PAID' }),
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                },
                {
                  text: 'Mark as Unpaid',
                  icon: 'tabler-clock',
                  onClick: () => onInvoiceAction('updateStatus', row.original.id, { status: 'UNPAID' }),
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                },
                {
                  text: 'Delete',
                  icon: 'tabler-trash',
                  onClick: () => onInvoiceAction('delete', row.original.id),
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, filteredData]
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
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

  const getAvatar = params => {
    const { avatar, name } = params

    if (avatar) {
      return <CustomAvatar src={avatar} skin='light' size={34} />
    } else {
      return (
        <CustomAvatar skin='light' size={34}>
          {getInitials(name)}
        </CustomAvatar>
      )
    }
  }

  // Update data when invoiceData prop changes
  useEffect(() => {
    setData(invoiceData || [])
    setFilteredData(invoiceData || [])
  }, [invoiceData])

  useEffect(() => {
    const filteredData = data?.filter(invoice => {
      if (status && invoice.status !== status) return false
      return true
    })

    setFilteredData(filteredData)
  }, [status, data])

  // Handle status filter change
  const handleStatusChange = newStatus => {
    setStatus(newStatus)
    onFilterChange({ status: newStatus || undefined })
  }

  return (
    <Card>
      <CardHeader title='Invoice Management' className='pbe-4' />

      <div className='flex flex-wrap items-end gap-4 p-6 border-bs'>
        <CustomTextField
          select
          label='Status'
          value={status}
          onChange={e => handleStatusChange(e.target.value)}
          className='min-w-[180px]'
        >
          <MenuItem value=''>All</MenuItem>
          <MenuItem value='UNPAID'>Unpaid</MenuItem>
          <MenuItem value='PAID'>Paid</MenuItem>
          <MenuItem value='OVERDUE'>Overdue</MenuItem>
          <MenuItem value='CANCELLED'>Cancelled</MenuItem>
        </CustomTextField>

        <CustomTextField
          select
          label='Client'
          value={filters.client || ''}
          onChange={e => onFilterChange({ ...filters, client: e.target.value })}
          className='min-w-[180px]'
        >
          <MenuItem value=''>All</MenuItem>
          {/* Add client options here if needed */}
        </CustomTextField>

        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          placeholder='Search invoice...'
          className='min-w-[200px]'
        />

        <Button
          variant='contained'
          component={Link}
          startIcon={<i className='tabler-plus' />}
          href={getLocalizedUrl('apps/invoice/add', locale)}
          className='ml-auto h-[40px]'
        >
          Create Invoice
        </Button>
      </div>
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
      <TablePagination
        component={() => <TablePaginationComponent table={table} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
        onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
      />
    </Card>
  )
}

export default InvoiceListTable
