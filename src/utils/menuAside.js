import {
  mdiAccountGroup,
  mdiFormatListGroup,
  mdiFormSelect,
  mdiMonitor,
  mdiListBoxOutline,
  mdiFinance,
  mdiAccountPlus,
  mdiAccountLock,
  mdiTooltipQuestion,
  mdiBellRing,
} from '@mdi/js'

const menuAside= [
  {
    href: '/admin/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    href: '/admin/inquiries',
    label: 'Inquiries', 
    icon: mdiTooltipQuestion,
  },
  {
    href: '/admin/interested-users',
    label: 'Interested Users',
    icon: mdiFormatListGroup,
  },
  {
    href: '/admin/all-tenders',
    label: 'All Tenders', 
    icon: mdiFormSelect,
  },
  {
    href: '/admin/all-users',
    label: 'All Users', 
    icon: mdiAccountGroup,
  },
  {
    href: '/admin/add-user',
    label: 'Add Users',
    icon: mdiAccountPlus,
  },
  {
    href: '/admin/report',
    label: 'Report',
    icon: mdiFinance,
  },
  {
    href: '/admin/notifications',
    label: 'Notifications',
    icon: mdiBellRing,
  },
]

export default menuAside
