'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, Alert, CircularProgress, Box, Typography } from '@mui/material'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { calendarConfig } from '@/configs/calendarConfig'
import { useItalianHolidays } from '@/hooks/useItalianHolidays'

const ItalianCalendar = ({ height = '600px', showTitle = true }) => {
  const [events, setEvents] = useState([])
  const calendarRef = useRef(null)

  // Get current language from URL params
  const { lang } = useParams()
  const currentLang = lang || 'en'

  // Use the hook for loading holidays - load all holidays for the current year
  const currentYear = new Date().getFullYear()
  const { holidays, loading, error, refreshHolidays } = useItalianHolidays({
    timeRange: 'year',
    year: currentYear,
    maxHolidays: null // Remove the limit to show all holidays
  })

  // Update events when holidays change
  useEffect(() => {
    console.log('ItalianCalendar: Received holidays:', holidays.length, holidays)
    setEvents(holidays)
  }, [holidays])

  // Handle date range change
  const handleDatesSet = dateInfo => {
    // Calendar view changed
  }

  // Handle event click
  const handleEventClick = clickInfo => {
    const event = clickInfo.event
    alert(`${event.title}\n${event.extendedProps.description || 'Festa nazionale italiana'}`)
  }

  // Get language-specific configuration
  const langConfig = calendarConfig.languages[currentLang] || calendarConfig.languages.en

  // Language-specific text
  const getText = key => {
    const texts = {
      en: {
        title: 'Italian Calendar',
        subtitle: 'Italian national holidays',
        apiWarning: 'Google Calendar API key not configured. Holidays will not be displayed.',
        error: 'Unable to load Italian holidays. Please check API configuration.'
      },
      fr: {
        title: 'Calendrier Italien',
        subtitle: 'Fêtes nationales italiennes',
        apiWarning: 'Clé API Google Calendar non configurée. Les fêtes ne seront pas affichées.',
        error: "Impossible de charger les fêtes italiennes. Vérifiez la configuration de l'API."
      },
      ar: {
        title: 'التقويم الإيطالي',
        subtitle: 'العطل الوطنية الإيطالية',
        apiWarning: 'مفتاح API لتقويم Google غير مُكوَّن. لن تظهر العطل.',
        error: 'تعذر تحميل العطل الإيطالية. تحقق من إعدادات API.'
      },
      it: {
        title: 'Calendario Italiano',
        subtitle: 'Festività nazionali italiane',
        apiWarning: 'Chiave API Google Calendar non configurata. Le festività non verranno mostrate.',
        error: "Impossibile caricare le festività italiane. Verifica la configurazione dell'API."
      }
    }
    return texts[currentLang]?.[key] || texts.en[key]
  }

  // Use the API events directly
  const calendarEvents = events

  // Calendar configuration
  const calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: '' // Remove view options
    },
    height: height,
    locale: langConfig.locale,
    timeZone: 'Europe/Rome',
    events: calendarEvents,
    eventClick: handleEventClick,
    datesSet: handleDatesSet,
    // Event styling
    eventTextColor: '#ffffff',
    eventBackgroundColor: '#dc3545',
    eventBorderColor: '#dc3545',
    // Dynamic language settings
    buttonText: langConfig.buttonText,
    dayHeaderFormat: langConfig.dayHeaderFormat,
    titleFormat: langConfig.titleFormat,
    // Restrict to current year only
    validRange: {
      start: `${currentYear}-01-01`,
      end: `${currentYear + 1}-01-01`
    },
    // Ensure calendar starts at current month
    initialDate: new Date(),
    nowIndicator: true,
    // Allow proper navigation within the year
    navLinks: true,
    dayMaxEventRows: 3,
    // Additional options
    selectable: false,
    selectMirror: false,
    weekends: true,
    // Ensure all events are visible
    eventDisplay: 'block',
    dayMaxEvents: false,
    moreLinkClick: 'popover'
  }

  if (loading) {
    return (
      <Card>
        {showTitle && <CardHeader title={getText('title')} subheader={getText('subtitle')} />}
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      {showTitle && <CardHeader title={getText('title')} subheader={getText('subtitle')} />}
      <CardContent>
        {error && (
          <Alert severity='warning' sx={{ mb: 2 }}>
            {getText('error')}
          </Alert>
        )}

        {!calendarConfig.apiKey && (
          <Alert severity='info' sx={{ mb: 2 }}>
            {getText('apiWarning')}
          </Alert>
        )}

        <FullCalendar ref={calendarRef} {...calendarOptions} />
      </CardContent>
    </Card>
  )
}

export default ItalianCalendar
