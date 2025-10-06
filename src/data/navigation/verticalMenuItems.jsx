'use client'

const verticalMenuItems = t => [
  {
    title: t('navigation.dashboard'),
    icon: 'tabler-smart-home',
    path: '/dashboards/analytics',
    module: null // Dashboard is accessible to all authenticated users
  },
  {
    title: t('navigation.branch'),
    icon: 'tabler-building-bank',
    path: '/apps/branch/list',
    module: 'BRANCH' // Only ADMIN has access
  },
  {
    title: t('navigation.paymentMethods'),
    icon: 'tabler-credit-card',
    path: '/apps/bank-account/list',
    module: 'PAYMENT_METHODS' // Only ADMIN and HR have access
  },
  {
    title: t('navigation.service'),
    icon: 'tabler-tools',
    path: '/apps/service/list',
    module: 'SERVICE' // Only ADMIN and HR have access
  },
  {
    title: t('navigation.employee'),
    icon: 'tabler-user',
    path: '/apps/user/list',
    module: 'EMPLOYEE' // ADMIN, HR, and MANAGER have access
  },
  {
    title: t('navigation.client'),
    icon: 'tabler-user-star',
    path: '/apps/client/list',
    module: 'CLIENT' // ADMIN, MANAGER, and EMPLOYEE have access
  },
  {
    title: t('navigation.task'),
    icon: 'tabler-checklist',
    path: '/apps/task/list',
    module: 'TASK' // ADMIN, MANAGER, and EMPLOYEE have access
  },
  {
    title: t('navigation.invoice'),
    icon: 'tabler-file-description',
    path: '/apps/invoice/list',
    module: 'INVOICE' // All roles have access
  }
]

export default verticalMenuItems
