'use client'

import { useParams } from 'next/navigation'
import { Card, CardContent, Typography, List, ListItem, ListItemText, Chip, Box, Alert } from '@mui/material'
import { useItalianHolidays } from '@/hooks/useItalianHolidays'

const HolidayWidget = ({ maxHolidays = 3, showTitle = true }) => {
  // Get current language from URL params
  const { lang } = useParams()
  const currentLang = lang || 'en'

  const {
    holidays: upcomingHolidays,
    loading,
    error
  } = useItalianHolidays({
    timeRange: 'upcoming',
    maxHolidays
  })

  // Language-specific text
  const getText = key => {
    const texts = {
      en: {
        title: 'Upcoming Holidays',
        loading: 'Loading...',
        noHolidays: 'No holidays in the next 30 days',
        today: 'Today',
        holidaysCount: 'holidays in the next 30 days',
        error: 'Unable to load holidays'
      },
      fr: {
        title: 'Prochaines Fêtes',
        loading: 'Chargement...',
        noHolidays: 'Aucune fête dans les 30 prochains jours',
        today: "Aujourd'hui",
        holidaysCount: 'fêtes dans les 30 prochains jours',
        error: 'Impossible de charger les fêtes'
      },
      ar: {
        title: 'العطل القادمة',
        loading: 'جاري التحميل...',
        noHolidays: 'لا توجد عطل في الـ 30 يوم القادمة',
        today: 'اليوم',
        holidaysCount: 'عطلة في الـ 30 يوم القادمة',
        error: 'تعذر تحميل العطل'
      },
      it: {
        title: 'Prossime Festività',
        loading: 'Caricamento...',
        noHolidays: 'Nessuna festività nei prossimi 30 giorni',
        today: 'Oggi',
        holidaysCount: 'festività nei prossimi 30 giorni',
        error: 'Impossibile caricare le festività'
      }
    }
    return texts[currentLang]?.[key] || texts.en[key]
  }

  // Get language-specific locale for date formatting
  const langConfig =
    {
      en: 'en-US',
      fr: 'fr-FR',
      ar: 'ar-SA',
      it: 'it-IT'
    }[currentLang] || 'en-US'

  const formatDate = dateString => {
    const date = new Date(dateString)
    return date.toLocaleDateString(langConfig, {
      day: 'numeric',
      month: 'short'
    })
  }

  const isToday = dateString => {
    const today = new Date()
    const holidayDate = new Date(dateString)
    return today.toDateString() === holidayDate.toDateString()
  }

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            {getText('title')}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {getText('loading')}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <Alert severity='warning' size='small'>
            {getText('error')}
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent>
        {showTitle && (
          <Typography variant='h6' gutterBottom>
            {getText('title')}
          </Typography>
        )}

        {upcomingHolidays.length === 0 ? (
          <Typography variant='body2' color='text.secondary'>
            {getText('noHolidays')}
          </Typography>
        ) : (
          <List dense>
            {upcomingHolidays.map((holiday, index) => (
              <ListItem key={holiday.id} sx={{ px: 0 }}>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant='body2' sx={{ fontWeight: 500 }}>
                        {holiday.title}
                      </Typography>
                      {isToday(holiday.start) && (
                        <Chip label={getText('today')} size='small' color='error' variant='outlined' />
                      )}
                    </Box>
                  }
                  secondary={
                    <Typography variant='caption' color='text.secondary'>
                      {formatDate(holiday.start)}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}

        {upcomingHolidays.length > 0 && (
          <Typography variant='caption' color='text.secondary' sx={{ mt: 1, display: 'block' }}>
            {upcomingHolidays.length} {getText('holidaysCount')}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default HolidayWidget
