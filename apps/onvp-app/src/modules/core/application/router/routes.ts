export const ROUTES = {
  home: {
    path: '/',
    name: 'home',
  },
  live: {
    name: 'live',
    path: '/live',
  },
  auth: {
    login: {
      path: '/login',
      name: 'auth.login',
    },
    register: {
      path: '/register',
      name: 'auth.register',
    },
  },
} as const
