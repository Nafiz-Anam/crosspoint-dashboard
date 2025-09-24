import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { dashboardService } from '../services/dashboardService'

export const useEarningsData = (params = {}) => {
  const { data: session, status: sessionStatus } = useSession()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [period, setPeriod] = useState(params.period || 'week')

  const fetchData = useCallback(
    async (selectedPeriod = period) => {
      try {
        setLoading(true)
        setError(null)

        const response = await dashboardService.getEarningsData(
          { ...params, period: selectedPeriod },
          session.accessToken
        )

        setData(response.data)
      } catch (err) {
        console.error('Error fetching earnings data:', err)
        // Handle different types of errors
        if (err.response?.status === 401) {
          setError('Authentication required. Please log in again.')
        } else if (err.response?.status === 403) {
          setError('You do not have permission to view earnings data.')
        } else if (err.response?.status >= 500) {
          setError('Server error. Please try again later.')
        } else {
          setError(err.message || 'Failed to fetch earnings data')
        }
      } finally {
        setLoading(false)
      }
    },
    [params, session?.accessToken, period]
  )

  useEffect(() => {
    // Only fetch data if we have a valid session
    if (sessionStatus === 'loading') return
    if (sessionStatus === 'unauthenticated' || !session?.accessToken) {
      setError('Authentication required. Please log in.')
      setLoading(false)
      return
    }

    fetchData()
  }, [JSON.stringify(params), sessionStatus, session?.accessToken, period])

  const changePeriod = newPeriod => {
    setPeriod(newPeriod)
    fetchData(newPeriod)
  }

  const refetch = () => {
    fetchData()
  }

  return {
    data,
    loading,
    error,
    period,
    changePeriod,
    refetch
  }
}

export default useEarningsData
