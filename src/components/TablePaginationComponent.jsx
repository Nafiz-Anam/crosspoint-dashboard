// MUI Imports
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

const TablePaginationComponent = ({ table, totalCount, currentPage, pageSize, onPageChange }) => {
  // Hooks
  const { t } = useTranslation()

  // Calculate display values
  const startItem = currentPage * pageSize + 1
  const endItem = Math.min((currentPage + 1) * pageSize, totalCount)

  return (
    <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
      <Typography color='text.disabled'>
        {`${t('common.pagination.showing')} ${startItem} ${t('common.pagination.to')} ${endItem} ${t('common.pagination.of')} ${totalCount} ${t('common.pagination.entries')}`}
      </Typography>
      <Pagination
        shape='rounded'
        color='primary'
        variant='tonal'
        count={Math.ceil(totalCount / pageSize)}
        page={currentPage + 1}
        onChange={(_, page) => {
          // Call the server-side pagination handler instead of client-side
          if (onPageChange) {
            onPageChange(null, page - 1) // Convert to 0-based index
          }
        }}
        showFirstButton
        showLastButton
      />
    </div>
  )
}

export default TablePaginationComponent
