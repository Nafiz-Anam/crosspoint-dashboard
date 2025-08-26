// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import ClientListTable from './UserListTable'
import ClientListCards from './UserListCards'

const ClientList = ({ userData }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <ClientListCards />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <ClientListTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default ClientList
