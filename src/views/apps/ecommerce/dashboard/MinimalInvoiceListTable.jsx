'use client'

// React Imports
import { useState, useMemo, useEffect } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import TablePagination from '@mui/material/TablePagination'
import Chip from '@mui/material/Chip'

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
import TablePaginationComponent from '@components/TablePaginationComponent'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

import { getInitials } from '@/utils/getInitials'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'
import { getInvoiceDueDateColor, getInvoiceTimeRemaining } from '@/utils/dateColorUtils'

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
  Paid: { color: 'success', icon: 'tabler-check' },
  Unpaid: { color: 'warning', icon: 'tabler-clock' },
  'Past Due': { color: 'error', icon: 'tabler-alert-circle' },
  Cancelled: { color: 'error', icon: 'tabler-x' },
  Sent: { color: 'info', icon: 'tabler-send-2' },
  Draft: { color: 'primary', icon: 'tabler-mail' },
  'Partial Payment': { color: 'warning', icon: 'tabler-chart-pie-2' },
  Downloaded: { color: 'info', icon: 'tabler-arrow-down' }
}

// Column Definitions
const columnHelper = createColumnHelper()

const MinimalInvoiceListTable = ({ invoiceData }) => {
  // States
  const [data, setData] = useState(...[invoiceData])
  const [globalFilter, setGlobalFilter] = useState('')

  // Hooks
  const { lang: locale } = useParams()
  const { t } = useTranslation()

  const columns = useMemo(
    () => [
      columnHelper.accessor('invoiceId', {
        header: t('invoices.fields.invoiceId'),
        cell: ({ row }) => (
          <Typography
            component={Link}
            href={getLocalizedUrl(`apps/invoice/preview/${row.original.id}`, locale)}
            color='primary.default'
            className='font-medium'
          >
            {row.original.invoiceId || `#${row.original.id.slice(-8)}`}
          </Typography>
        )
      }),
      columnHelper.accessor('name', {
        header: t('invoices.fields.client'),
        cell: ({ row }) => (
          <div className='flex flex-col'>
            <Typography className='font-medium' color='text.primary'>
              {row.original.name}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {row.original.companyEmail}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('serviceName', {
        header: t('invoices.fields.service'),
        cell: ({ row }) => (
          <div className='flex flex-col'>
            <Typography variant='body2'>{row.original.serviceName || 'N/A'}</Typography>
            <Typography className='font-medium' color='text.primary'>
              ${row.original.total?.toLocaleString() || '0'}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('invoiceStatus', {
        header: t('invoices.fields.status'),
        cell: ({ row }) => (
          <Chip
            label={row.original.invoiceStatus}
            color={invoiceStatusObj[row.original.invoiceStatus]?.color || 'default'}
            variant='tonal'
            size='small'
          />
        )
      }),
      columnHelper.accessor('dueDate', {
        header: t('invoices.fields.dueDate'),
        cell: ({ row }) => {
          const dueDate = row.original.dueDate
          if (!dueDate) return <Typography variant='body2'>-</Typography>

          try {
            const dateObj = new Date(dueDate)
            return (
              <div className='flex flex-col'>
                <Typography variant='body2' color={getInvoiceDueDateColor(dueDate, row.original.invoiceStatus)}>
                  {dateObj.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </Typography>
                {getInvoiceTimeRemaining(dueDate, row.original.invoiceStatus) && (
                  <Typography variant='caption' color={getInvoiceDueDateColor(dueDate, row.original.invoiceStatus)}>
                    {getInvoiceTimeRemaining(dueDate, row.original.invoiceStatus)}
                  </Typography>
                )}
              </div>
            )
          } catch (error) {
            return (
              <div className='flex flex-col'>
                <Typography variant='body2' color={getInvoiceDueDateColor(dueDate, row.original.invoiceStatus)}>
                  {dueDate}
                </Typography>
                {getInvoiceTimeRemaining(dueDate, row.original.invoiceStatus) && (
                  <Typography variant='caption' color={getInvoiceDueDateColor(dueDate, row.original.invoiceStatus)}>
                    {getInvoiceTimeRemaining(dueDate, row.original.invoiceStatus)}
                  </Typography>
                )}
              </div>
            )
          }
        }
      }),
      columnHelper.accessor('action', {
        header: t('invoices.fields.action'),
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Tooltip title={t('invoices.view')}>
              <IconButton size='small'>
                <Link href={getLocalizedUrl(`apps/invoice/preview/${row.original.id}`, locale)} className='flex'>
                  <i className='tabler-eye text-textSecondary' />
                </Link>
              </IconButton>
            </Tooltip>
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data: data,
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
    <Card sx={{ height: '100%' }}>
      <CardHeader
        className='flex-wrap gap-x-4 gap-y-2'
        title={t('invoices.title')}
        action={
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder={t('invoices.searchInvoice')}
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
          {data.length === 0 ? (
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
                    <tr key={row.id} className='h-[3.67rem]'>
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

export default MinimalInvoiceListTable
