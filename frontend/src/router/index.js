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
      {
        path: '/teachers',
        name: 'teachers',
        component: () => import('../views/teachers/Teachers'),
      },
      {
        path: '/teacher/:id',
        name: 'teacher',
        component: () => import('@/views/Teacher'),
      },
      {
        path: '/group/:id',
        name: 'group',
        component: () => import('@/views/Group'),
      },
      {
        path: '/shortenedDays',
        name: 'shortenedDays',
        component: () => import('../views/ShortenedDays'),
      },
      {
        path: '/schedule',
        name: 'schedule',
        component: () => import('../views/Schedule'),
      },
      {
        path: '/semesters',
        name: 'semesters',
        component: () => import('../views/Semesters'),
      },
      {
        path: '/subjectsManaging',
        name: 'subjectsManaging',
        component: () => import('@/views/SubjectsManaging'),
      },
      {
        path: '/classes',
        name: 'classes',
        component: () => import('@/views/Classes'),
      },
      {
        path: '/class/:classID',
        name: 'class',
        component: () => import('@/views/Class'),
      },
      {
        path: '/subgroups',
        name: 'subgroups',
        component: () => import('@/views/Subgroups'),
      },
      {
        path: '/bells',
        name: 'bells',
        component: () => import('@/views/Bells'),
      },
      {
        path: '/rooms',
        name: 'rooms',
        component: () => import('@/views/Rooms'),
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
