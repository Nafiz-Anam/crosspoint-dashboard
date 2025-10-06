'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// Next Imports
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
import TablePaginationComponent from '@components/TablePaginationComponent'
import OptionMenu from '@core/components/option-menu'
import CustomTextField from '@core/components/mui/TextField'
import DeleteConfirmationDialog from '@components/dialogs/DeleteConfirmationDialog'
import toastService from '@/services/toastService'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

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

const BankAccountListTable = ({ bankAccountData, onFilterChange, onBankAccountAction, filters, onAddBankAccount }) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(bankAccountData || [])
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const [isActiveFilter, setIsActiveFilter] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [bankAccountToDelete, setBankAccountToDelete] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // Hooks
  const { lang: locale } = useParams()
  const { t } = useTranslation()

  // Handle delete click
  const handleDeleteClick = bankAccount => {
    setBankAccountToDelete(bankAccount)
    setDeleteDialogOpen(true)
  }

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (!bankAccountToDelete) return

    setDeleteLoading(true)
    try {
      await onBankAccountAction('delete', bankAccountToDelete.id)
      toastService.handleApiSuccess('deleted', 'Bank Account')
      setDeleteDialogOpen(false)
      setBankAccountToDelete(null)
    } catch (error) {
      await toastService.handleApiError(error, 'Failed to delete bank account')
    } finally {
      setDeleteLoading(false)
    }
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
      columnHelper.accessor('bankName', {
        header: t('paymentMethods.fields.bankName'),
        cell: ({ row }) => (
          <Typography className='font-medium' color='text.primary'>
            {row.original.bankName}
          </Typography>
        )
      }),
      columnHelper.accessor('bankCountry', {
        header: t('common.country'),
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
        header: t('common.swiftCode'),
        cell: ({ row }) => (
          <Typography variant='body2' fontFamily='monospace'>
            {row.original.bankSwiftCode || 'N/A'}
          </Typography>
        )
      }),
      columnHelper.accessor('accountName', {
        header: t('paymentMethods.fields.name'),
        cell: ({ row }) => <Typography variant='body2'>{row.original.accountName || 'N/A'}</Typography>
      }),
      columnHelper.accessor('isActive', {
        header: t('paymentMethods.fields.status'),
        cell: ({ row }) => (
          <Chip
            label={row.original.isActive ? t('paymentMethods.status.active') : t('paymentMethods.status.inactive')}
            color={row.original.isActive ? 'success' : 'default'}
            size='small'
            variant='tonal'
          />
        )
      }),
      columnHelper.accessor('createdAt', {
        header: t('common.created'),
        cell: ({ row }) => (
          <Typography variant='body2'>{new Date(row.original.createdAt).toLocaleDateString()}</Typography>
        )
      }),
      columnHelper.accessor('action', {
        header: t('paymentMethods.fields.action'),
        cell: ({ row }) => (
          <div className='flex items-center'>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: t('paymentMethods.edit'),
                  icon: 'tabler-pencil',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => onBankAccountAction('edit', row.original.id, row.original)
                  }
                },
                {
                  text: row.original.isActive ? t('paymentMethods.deactivate') : t('paymentMethods.activate'),
                  icon: row.original.isActive ? 'tabler-eye-off' : 'tabler-eye',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () =>
                      onBankAccountAction('update', row.original.id, {
                        isActive: !row.original.isActive
                      })
                  }
                },
                {
                  text: t('paymentMethods.delete'),
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
    [onBankAccountAction, t]
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
      <CardHeader title={t('paymentMethods.paymentMethodManagement')} className='pbe-4' />

      <div className='flex flex-wrap items-end gap-4 p-6 border-bs'>
        <CustomTextField
          select
          label={t('common.country')}
          value={filters.country || ''}
          onChange={e => onFilterChange({ ...filters, country: e.target.value })}
          className='min-w-[180px]'
        >
          <MenuItem value=''>{t('paymentMethods.all')}</MenuItem>
          <MenuItem value='bangladesh'>Bangladesh</MenuItem>
          <MenuItem value='usa'>USA</MenuItem>
          <MenuItem value='uk'>UK</MenuItem>
        </CustomTextField>

        <CustomTextField
          select
          label={t('common.status')}
          value={isActiveFilter}
          onChange={e => handleStatusChange(e.target.value)}
          className='min-w-[180px]'
        >
          <MenuItem value=''>{t('paymentMethods.all')}</MenuItem>
          <MenuItem value='true'>{t('paymentMethods.status.active')}</MenuItem>
          <MenuItem value='false'>{t('paymentMethods.status.inactive')}</MenuItem>
        </CustomTextField>

        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          placeholder={t('paymentMethods.searchPaymentMethod')}
          className='min-w-[200px]'
        />

        <Button
          variant='contained'
          startIcon={<i className='tabler-plus' />}
          onClick={onAddBankAccount}
          className='ml-auto h-[40px]'
        >
          {t('paymentMethods.addNewPaymentMethod')}
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
                  {t('paymentMethods.noPaymentMethodsAvailable')}
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

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title={t('paymentMethods.deleteConfirmation.title')}
        message={t('paymentMethods.deleteConfirmation.message')}
        itemName={bankAccountToDelete?.bankName}
        loading={deleteLoading}
      />
    </Card>
  )
}

export default BankAccountListTable
