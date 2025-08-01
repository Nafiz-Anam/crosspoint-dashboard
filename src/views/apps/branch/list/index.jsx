// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import BranchListTable from './BranchListTable'

const BranchList = ({ userData }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <BranchListTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default BranchList
