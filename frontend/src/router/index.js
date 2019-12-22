import Vue from 'vue'
import VueRouter from 'vue-router'

import authorization from './hooks/authorization'

Vue.use(VueRouter)

const routes = [
  {
    path: '/authorization',
    component: () => import('../views/Authorization'),
    children: [
      {
        path: '/',
        name: 'Authorization',
        meta: {
          onlyWithoutAuth: true,
          requiredAuth: false,
        },
        component: () => import('../components/AppAuthorizationSignIn'),
      },
      {
        path: '/signUp',
        meta: {
          onlyWithoutAuth: true,
          requiredAuth: false,
        },
        component: () => import('../components/AppAuthorizationSignUp'),
      },
      {
        path: '/signUp',
        name: 'signUp',
        meta: {
          onlyWithoutAuth: true,
          requiredAuth: false,
        },
        component: () => import('../components/AppAuthorizationSignUp'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('../views/Home'),
    meta: {
      requiredAuth: true,
    },
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/home/HomeUser'),
      },
      {
        path: '/student',
        name: 'homeStudent',
        component: () => import('../views/home/HomeStudent'),
      },
      {
        path: '/teacher',
        name: 'homeTeacher',
        component: () => import('../views/home/HomeTeacher'),
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('../views/users/Users'),
      },
      {
        path: '/departments',
        name: 'departments',
        component: () => import('../views/departments/Departments'),
      },
      {
        path: '/departments/:id',
        name: 'department',
        component: () => import('../views/departments/Department'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(authorization)

export default router
