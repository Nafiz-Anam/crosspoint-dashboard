'use client'

const verticalMenuItems = t => [
  {
    title: t('navigation.dashboard'),
    icon: 'tabler-smart-home',
    path: '/dashboards/analytics'
  },
  {
    title: t('navigation.branch'),
    icon: 'tabler-building-bank',
    path: '/apps/branch/list'
  },
  {
    title: t('navigation.paymentMethods'),
    icon: 'tabler-credit-card',
    path: '/apps/bank-account/list'
  },
  {
    title: t('navigation.service'),
    icon: 'tabler-tools',
    path: '/apps/service/list'
  },
  {
    title: t('navigation.employee'),
    icon: 'tabler-user',
    path: '/apps/user/list'
  },
  {
    title: t('navigation.client'),
    icon: 'tabler-user-star',
    path: '/apps/client/list'
  },
  {
    title: t('navigation.task'),
    icon: 'tabler-checklist',
    path: '/apps/task/list'
  },
  {
    title: t('navigation.invoice'),
    icon: 'tabler-file-description',
    path: '/apps/invoice/list'
  }
]

export default verticalMenuItems
