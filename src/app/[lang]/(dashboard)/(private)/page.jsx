// MUI Imports
import Grid from '@mui/material/Grid2'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

// Component Imports
import ClockInOutCard from '@views/dashboards/main/ClockInOutCard'
import TaskStatisticsCard from '@views/dashboards/main/TaskStatisticsCard'
import TimesheetChart from '@views/dashboards/main/TimesheetChart'
import ProjectsOverview from '@views/dashboards/main/ProjectsOverview'
import AllTasksOverview from '@views/dashboards/main/AllTasksOverview'
import TicketStatus from '@views/dashboards/main/TicketStatus'
import CardStatVertical from '@/components/card-statistics/Vertical'

const MainDashboard = async () => {
  const { t } = useTranslation()

  return (
    <Grid container spacing={6}>
      {/* Top Row - Clock In/Out and Task Statistics */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <ClockInOutCard />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <TaskStatisticsCard />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <CardStatVertical
          title={t('dashboard.calendar.eventsToday')}
          subtitle={t('dashboard.calendar.title')}
          stats='0'
          avatarColor='info'
          avatarIcon='tabler-calendar'
          avatarSkin='light'
          avatarSize={44}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <CardStatVertical
          title={t('dashboard.clients.totalClients')}
          subtitle={t('dashboard.clients.allTime')}
          stats='0'
          avatarColor='success'
          avatarIcon='tabler-briefcase'
          avatarSkin='light'
          avatarSize={44}
        />
      </Grid>

      {/* Middle Row - Projects, Tasks, and Tickets Overview */}
      <Grid size={{ xs: 12, md: 4 }}>
        <ProjectsOverview />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <AllTasksOverview />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TicketStatus />
      </Grid>

      {/* Bottom Row - Timesheet Chart */}
      <Grid size={{ xs: 12 }}>
        <TimesheetChart />
      </Grid>
    </Grid>
  )
}

export default MainDashboard
