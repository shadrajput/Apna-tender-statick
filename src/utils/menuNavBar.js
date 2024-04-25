import {
  mdiAccount,
  mdiAccountLock,
  mdiLogout,
} from '@mdi/js'

const menuNavBar = [
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: 'My Profile',
        href: '/admin/my-profile',
      },
      {
        icon: mdiAccountLock,
        label: 'Admins',
        href: '/admin/all-admins',
      },
      {
        isDivider: true,
      },
      {
        icon: mdiLogout,
        label: 'Logout',
        isLogout: true,
      },
    ],
  },
]

export default menuNavBar
