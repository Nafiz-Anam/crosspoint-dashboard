/**
 * ! Server actions for cPanel deployment - returning empty data
 */
'use server'

export const getEcommerceData = async () => {
  return { products: [], categories: [], orders: [] }
}

export const getAcademyData = async () => {
  return { courses: [], categories: [] }
}

export const getLogisticsData = async () => {
  return { vehicles: [], routes: [] }
}

export const getInvoiceData = async () => {
  return { invoices: [], clients: [] }
}

export const getUserData = async () => {
  return { users: [], roles: [] }
}

export const getPermissionsData = async () => {
  return { permissions: [], roles: [] }
}

export const getProfileData = async () => {
  return { profile: null, activities: [] }
}

export const getFaqData = async () => {
  return { faqs: [] }
}

export const getPricingData = async () => {
  return { plans: [] }
}

export const getStatisticsData = async () => {
  return { statistics: [] }
}

export const getBranchData = async () => {
  return { branches: [] }
}
