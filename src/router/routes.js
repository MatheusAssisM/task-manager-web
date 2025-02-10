const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        component: () => import('pages/IndexPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/LoginPage.vue'),
        meta: { requiresAuth: false }
      },
      {
<<<<<<< HEAD
        path: 'register',
        name: 'register',
        component: () => import('pages/RegisterPage.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('pages/ResetPasswordPage.vue'),
        meta: { requiresAuth: false },
        props: route => ({ token: route.query.token })
=======
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('pages/ResetPasswordPage.vue'),
        meta: { requiresAuth: false }
>>>>>>> 725c696 (Enhance authentication flow with password reset functionality and route updates)
      }
    ]
  },
<<<<<<< HEAD
=======
  {
<<<<<<< HEAD
    path: '/login',
    component: () => import('pages/LoginPage.vue')
  },
>>>>>>> e8d7a34 (Implement authentication flow with login page and API integration)
  {
=======
>>>>>>> 725c696 (Enhance authentication flow with password reset functionality and route updates)
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
