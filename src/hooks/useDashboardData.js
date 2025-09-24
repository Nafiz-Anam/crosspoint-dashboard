import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { dashboardService } from '../services/dashboardService'

export const useDashboardData = (params = {}) => {
  const { data: session, status: sessionStatus } = useSession()
  const [data, setData] = useState({
    stats: null,
    weeklyEarnings: null,
    earningsData: null,
    invoiceStats: null,
    projectsOverview: null
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const [statsResponse, weeklyEarningsResponse, earningsDataResponse, invoiceStatsResponse, invoicesResponse] =
        await Promise.all([
          dashboardService.getDashboardStats(params, session.accessToken),
          dashboardService.getWeeklyEarnings(params, session.accessToken),
          dashboardService.getEarningsData({ ...params, period: params.period || 'week' }, session.accessToken),
          dashboardService.getInvoiceStats(params, session.accessToken),
          dashboardService.getInvoices(params, session.accessToken)
        ])

      setData({
        stats: statsResponse.data.stats,
        weeklyEarnings: weeklyEarningsResponse.data,
        earningsData: earningsDataResponse.data,
        invoiceStats: invoiceStatsResponse.data,
        invoices: invoicesResponse.data.invoices
      })
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      // Handle different types of errors
      if (err.response?.status === 401) {
        setError('Authentication required. Please log in again.')
      } else if (err.response?.status === 403) {
        setError('You do not have permission to view dashboard data.')
      } else if (err.response?.status >= 500) {
        setError('Server error. Please try again later.')
      } else {
        setError(err.message || 'Failed to fetch dashboard data')
      }
    } finally {
      setLoading(false)
    }
  }, [params, session?.accessToken])

  useEffect(() => {
    // Only fetch data if we have a valid session
    if (sessionStatus === 'loading') return
    if (sessionStatus === 'unauthenticated' || !session?.accessToken) {
      setError('Authentication required. Please log in.')
      setLoading(false)
      return
    }

    fetchData()
  }, [JSON.stringify(params), sessionStatus, session?.accessToken])

  const refetch = () => {
    fetchData()
  }

  return {
    data,
    loading,
    error,
    refetch
  }
}

export default useDashboardData
