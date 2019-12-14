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
    name: 'Home',
    component: () => import('../views/Home'),
    meta: {
      requiredAuth: true,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(authorization)

export default router
