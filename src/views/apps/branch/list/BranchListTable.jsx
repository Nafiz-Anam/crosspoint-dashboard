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
import AddBranchDrawer from './AddBranchDrawer'
import CustomTextField from '@core/components/mui/TextField'

// Util Imports
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

const columnHelper = createColumnHelper()

const BranchListTable = ({ tableData }) => {
  const [addBranchOpen, setAddBranchOpen] = useState(false)
  const [data, setData] = useState([...tableData])
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const [filters, setFilters] = useState({ city: '', province: '', isActive: '' })

  const { lang: locale } = useParams()

  useEffect(() => {
    let tempData = [...data]

    if (filters.city) {
      tempData = tempData.filter(row => row.city === filters.city)
    }

    if (filters.province) {
      tempData = tempData.filter(row => row.province === filters.province)
    }

    if (filters.isActive !== '') {
      const activeFlag = filters.isActive === 'true'

      tempData = tempData.filter(row => row.isActive === activeFlag)
    }

    setFilteredData(tempData)
  }, [filters, data])

  const cities = Array.from(new Set(data.map(item => item.city)))
  const provinces = Array.from(new Set(data.map(item => item.province)))

  const columns = useMemo(
    () => [
      columnHelper.accessor('branchId', {
        header: 'Branch ID',
        cell: info => <Typography color='text.primary'>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('name', {
        header: 'Branch Name',
        cell: info => <Typography color='text.primary'>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('city', {
        header: 'City',
        cell: info => <Typography color='text.primary'>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('province', {
        header: 'Province',
        cell: info => <Typography color='text.primary'>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('phone', {
        header: 'Phone',
        cell: info => <Typography color='text.primary'>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: info => <Typography color='text.primary'>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('isActive', {
        header: 'Status',
        cell: info => (
          <Chip
            label={info.getValue() ? 'Active' : 'Inactive'}
            color={info.getValue() ? 'success' : 'default'}
            variant='tonal'
            size='small'
          />
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <IconButton onClick={() => setData(data.filter(b => b.id !== row.original.id))}>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
            <IconButton>
              <Link href={getLocalizedUrl(`/branches/view/${row.original.id}`, locale)} className='flex'>
                <i className='tabler-eye text-textSecondary' />
              </Link>
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    [data]
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
        <CardHeader title='Branch Filters' className='pbe-4' />

        <div className='flex flex-wrap items-end gap-4 p-6 border-bs'>
          <CustomTextField
            select
            label='City'
            value={filters.city}
            onChange={e => setFilters({ ...filters, city: e.target.value })}
            className='min-w-[180px]'
          >
            <MenuItem value=''>All</MenuItem>
            {cities.map(city => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </CustomTextField>

          <CustomTextField
            select
            label='Province'
            value={filters.province}
            onChange={e => setFilters({ ...filters, province: e.target.value })}
            className='min-w-[180px]'
          >
            <MenuItem value=''>All</MenuItem>
            {provinces.map(province => (
              <MenuItem key={province} value={province}>
                {province}
              </MenuItem>
            ))}
          </CustomTextField>

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
            placeholder='Search branch...'
            className='min-w-[200px]'
          />

          <Button
            variant='contained'
            startIcon={<i className='tabler-plus' />}
            onClick={() => setAddBranchOpen(true)}
            className='ml-auto h-[40px]'
          >
            Add New Branch
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
              {table.getFilteredRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
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
        />
      </Card>

      <AddBranchDrawer
        open={addBranchOpen}
        handleClose={() => setAddBranchOpen(false)}
        branchData={data}
        setData={setData}
      />
    </>
  )
}

export default BranchListTable
