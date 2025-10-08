'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'

// Hooks
import { useTranslation } from '@/hooks/useTranslation'

const AccountSettings = ({ tabContentList }) => {
  // Hooks
  const { t } = useTranslation()

  // States
  const [activeTab, setActiveTab] = useState('account')

  const handleChange = (event, value) => {
    setActiveTab(value)
  }

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
            <Tab
              label={t('accountSettings.tabs.account')}
              icon={<i className='tabler-users' />}
              iconPosition='start'
              value='account'
            />
            <Tab
              label={t('accountSettings.tabs.security')}
              icon={<i className='tabler-lock' />}
              iconPosition='start'
              value='security'
            />
          </CustomTabList>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TabPanel value={activeTab} className='p-0'>
            {tabContentList[activeTab]}
          </TabPanel>
        </Grid>
      </Grid>
    </TabContext>
  )
}

export default AccountSettings
