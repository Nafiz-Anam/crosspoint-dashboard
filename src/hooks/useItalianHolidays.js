import { useState, useEffect } from 'react'
import {
  getCurrentMonthHolidays,
  getUpcomingHolidays,
  getYearHolidays,
  getItalianHolidays,
  isHoliday as checkIsHoliday
} from '@/services/calendarService'

export const useItalianHolidays = (options = {}) => {
  const {
    timeRange = 'currentMonth', // 'currentMonth', 'upcoming', 'year', 'custom'
    customStart = null,
    customEnd = null,
    year = new Date().getFullYear(),
    maxHolidays = 10
  } = options

  const [holidays, setHolidays] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadHolidays = async () => {
    try {
      setLoading(true)
      setError(null)

      let holidaysData = []

      switch (timeRange) {
        case 'currentMonth':
          holidaysData = await getCurrentMonthHolidays()
          break
        case 'upcoming':
          holidaysData = await getUpcomingHolidays()
          break
        case 'year':
          holidaysData = await getYearHolidays(year)
          break
        case 'custom':
          if (customStart && customEnd) {
            holidaysData = await getItalianHolidays(customStart, customEnd)
          }
          break
        default:
          holidaysData = await getCurrentMonthHolidays()
      }

      // Limit holidays if maxHolidays is specified and not null
      if (maxHolidays !== null && maxHolidays && holidaysData.length > maxHolidays) {
        holidaysData = holidaysData.slice(0, maxHolidays)
      }

      setHolidays(holidaysData)
    } catch (err) {
      console.error('Error loading Italian holidays:', err)
      setError(err.message || 'Impossibile caricare le festività italiane')
    } finally {
      setLoading(false)
    }
  }

  const refreshHolidays = () => {
    loadHolidays()
  }

  const isHoliday = async date => {
    try {
      return await checkIsHoliday(date)
    } catch (err) {
      console.error('Error checking if date is holiday:', err)
      return null
    }
  }

  useEffect(() => {
    loadHolidays()
  }, [timeRange, customStart, customEnd, year, maxHolidays])

  return {
    holidays,
    loading,
    error,
    refreshHolidays,
    isHoliday
  }
}

export default useItalianHolidays
