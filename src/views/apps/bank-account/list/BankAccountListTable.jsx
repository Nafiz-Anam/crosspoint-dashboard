'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
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
import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@components/TablePaginationComponent'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

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
  }, [value, onChange, debounce])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Column Definitions
const columnHelper = createColumnHelper()

const BankAccountListTable = ({ bankAccountData, onFilterChange, onBankAccountAction, filters }) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(bankAccountData || [])
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const [isActiveFilter, setIsActiveFilter] = useState('')

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
      columnHelper.accessor('bankName', {
        header: 'Bank Name',
        cell: ({ row }) => (
          <Typography className='font-medium' color='text.primary'>
            {row.original.bankName}
          </Typography>
        )
      }),
      columnHelper.accessor('bankCountry', {
        header: 'Country',
        cell: ({ row }) => <Typography variant='body2'>{row.original.bankCountry}</Typography>
      }),
      columnHelper.accessor('bankIban', {
        header: 'IBAN',
        cell: ({ row }) => (
          <Typography variant='body2' fontFamily='monospace'>
            {row.original.bankIban}
          </Typography>
        )
      }),
      columnHelper.accessor('bankSwiftCode', {
        header: 'SWIFT Code',
        cell: ({ row }) => (
          <Typography variant='body2' fontFamily='monospace'>
            {row.original.bankSwiftCode || 'N/A'}
          </Typography>
        )
      }),
      columnHelper.accessor('accountName', {
        header: 'Account Name',
        cell: ({ row }) => <Typography variant='body2'>{row.original.accountName || 'N/A'}</Typography>
      }),
      columnHelper.accessor('isActive', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            label={row.original.isActive ? 'Active' : 'Inactive'}
            color={row.original.isActive ? 'success' : 'default'}
            size='small'
            variant='tonal'
          />
        )
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created',
        cell: ({ row }) => (
          <Typography variant='body2'>{new Date(row.original.createdAt).toLocaleDateString()}</Typography>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton onClick={() => onBankAccountAction('delete', row.original.id)}>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Edit',
                  icon: 'tabler-pencil',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => onBankAccountAction('edit', row.original.id, row.original)
                  }
                },
                {
                  text: row.original.isActive ? 'Deactivate' : 'Activate',
                  icon: row.original.isActive ? 'tabler-eye-off' : 'tabler-eye',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () =>
                      onBankAccountAction('update', row.original.id, {
                        isActive: !row.original.isActive
                      })
                  }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    [onBankAccountAction]
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

  // Update data when bankAccountData prop changes
  useEffect(() => {
    setData(bankAccountData || [])
    setFilteredData(bankAccountData || [])
  }, [bankAccountData])

  useEffect(() => {
    const filteredData = data?.filter(account => {
      if (isActiveFilter !== '' && account.isActive.toString() !== isActiveFilter) return false
      return true
    })

    setFilteredData(filteredData)
  }, [isActiveFilter, data])

  // Handle status filter change
  const handleStatusChange = newStatus => {
    setIsActiveFilter(newStatus)
    onFilterChange({ isActive: newStatus !== '' ? newStatus === 'true' : undefined })
  }

  return (
    <Card>
      <CardContent className='flex justify-between flex-col items-start md:items-center md:flex-row gap-4'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 is-full sm:is-auto'>
          <div className='flex items-center gap-2 is-full sm:is-auto'>
            <Typography className='hidden sm:block'>Show</Typography>
            <CustomTextField
              select
              value={table.getState().pagination.pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
              className='is-[70px] max-sm:is-full'
            >
              <MenuItem value='10'>10</MenuItem>
              <MenuItem value='25'>25</MenuItem>
              <MenuItem value='50'>50</MenuItem>
            </CustomTextField>
          </div>
        </div>
        <div className='flex max-sm:flex-col max-sm:is-full sm:items-center gap-4'>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search Bank Account'
            className='max-sm:is-full sm:is-[250px]'
          />
          <CustomTextField
            select
            id='select-status'
            value={isActiveFilter}
            onChange={e => handleStatusChange(e.target.value)}
            className='max-sm:is-full sm:is-[160px]'
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>All Status</MenuItem>
            <MenuItem value='true'>Active</MenuItem>
            <MenuItem value='false'>Inactive</MenuItem>
          </CustomTextField>
        </div>
      </CardContent>
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
                  No bank accounts found
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

export default BankAccountListTable
