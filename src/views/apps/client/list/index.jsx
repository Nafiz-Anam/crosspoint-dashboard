// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import ClientListTable from './UserListTable'

const ClientList = ({ userData }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <ClientListTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default ClientList
