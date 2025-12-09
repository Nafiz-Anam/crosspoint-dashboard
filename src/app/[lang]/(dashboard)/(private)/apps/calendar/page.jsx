// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import ItalianCalendar from '@views/dashboards/main/ItalianCalendar'
import HolidayWidget from '@views/dashboards/main/HolidayWidget'

const CalendarPage = () => {
  return (
    <Grid container spacing={6}>
      {/* Full Calendar View */}
      <Grid size={{ xs: 12, lg: 8 }}>
        <ItalianCalendar height='700px' showTitle={true} />
      </Grid>

      {/* Holiday Widget Sidebar */}
      <Grid size={{ xs: 12, lg: 4 }}>
        <HolidayWidget maxHolidays={10} showTitle={true} />
      </Grid>
    </Grid>
  )
}

export default CalendarPage
