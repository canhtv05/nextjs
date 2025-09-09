export const VerticalItems = [
  {
    title: 'Dashboard',
    icon: 'lucide:layout-dashboard',
    path: '/dashboard'
  },
  {
    title: 'Users',
    icon: 'lucide:users',
    path: '/users',
    children: [
      {
        title: 'User List',
        icon: 'lucide:list',
        path: '/users/list'
      },
      {
        title: 'User Profile',
        icon: 'lucide:user',
        path: '/users/profile'
      }
    ]
  },
  {
    title: 'Settings',
    icon: 'lucide:settings',
    path: '/settings',
    children: [
      {
        title: 'General',
        icon: 'lucide:sliders',
        path: '/settings/general'
      },
      {
        title: 'Security',
        icon: 'lucide:shield',
        path: '/settings/security',
        children: [
          {
            title: 'Roles & Permissions',
            icon: 'lucide:key',
            path: '/settings/security/roles'
          }
        ]
      }
    ]
  }
]
