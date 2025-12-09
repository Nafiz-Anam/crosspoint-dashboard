// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import ServiceListTable from './ServiceListTable'

const ServiceList = ({ userData }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <ServiceListTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default ServiceList
