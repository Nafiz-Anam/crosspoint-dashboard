import { calendarConfig } from '@/configs/calendarConfig'

// Transform Google Calendar events to FullCalendar format
const transformEvents = events => {
  const currentYear = new Date().getFullYear()

  return events
    .filter(event => {
      // Filter out events from previous years
      const eventDate = event.start.date || event.start.dateTime
      const eventYear = new Date(eventDate).getFullYear()
      return eventYear === currentYear
    })
    .map(event => ({
      id: event.id,
      title: event.summary,
      start: event.start.date || event.start.dateTime,
      end: event.end.date || event.end.dateTime,
      allDay: !event.start.dateTime,
      backgroundColor: calendarConfig.holidayEventStyle.backgroundColor,
      borderColor: calendarConfig.holidayEventStyle.borderColor,
      textColor: calendarConfig.holidayEventStyle.textColor,
      classNames: calendarConfig.holidayEventStyle.classNames,
      extendedProps: {
        description: event.description || '',
        location: event.location || '',
        source: 'italian-holidays'
      }
    }))
}

// Get Italian holidays for a specific date range
export const getItalianHolidays = async (timeMin, timeMax) => {
  try {
    if (!calendarConfig.apiKey) {
      console.warn('Google Calendar API key not configured')
      return []
    }

    const url = `${calendarConfig.apiBaseUrl}/calendars/${encodeURIComponent(calendarConfig.italianHolidaysCalendarId)}/events`
    const params = new URLSearchParams({
      key: calendarConfig.apiKey,
      timeMin: timeMin,
      timeMax: timeMax,
      singleEvents: true
    })

    const response = await fetch(`${url}?${params}`)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API Error:', response.status, errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Raw API response items count:', data.items?.length || 0)
    console.log('Raw API response items:', data.items)

    const events = transformEvents(data.items || [])
    console.log('Transformed events count:', events.length)
    console.log('Transformed events:', events)

    return events
  } catch (error) {
    console.error('Error fetching Italian holidays:', error)
    throw error
  }
}

// Get current month's holidays
export const getCurrentMonthHolidays = async () => {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  return getItalianHolidays(startOfMonth.toISOString(), endOfMonth.toISOString())
}

// Get holidays for a specific year
export const getYearHolidays = async year => {
  const startOfYear = new Date(year, 0, 1) // January 1st
  const endOfYear = new Date(year, 11, 31) // December 31st

  try {
    const holidays = await getItalianHolidays(startOfYear.toISOString(), endOfYear.toISOString())
    return holidays
  } catch (error) {
    console.error('Error fetching year holidays:', error)
    throw error
  }
}

// Check if a specific date is a holiday
export const isHoliday = async date => {
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999)

  const holidays = await getItalianHolidays(startOfDay.toISOString(), endOfDay.toISOString())

  return holidays.length > 0 ? holidays[0] : null
}

// Get upcoming holidays (next 30 days)
export const getUpcomingHolidays = async () => {
  const now = new Date()
  const future = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

  return getItalianHolidays(now.toISOString(), future.toISOString())
}

// Default export for backward compatibility
const calendarService = {
  getItalianHolidays,
  getCurrentMonthHolidays,
  getYearHolidays,
  isHoliday,
  getUpcomingHolidays
}

export default calendarService
