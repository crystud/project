import store from '../../store'

export default async (to, from, next) => {
  if (to.matched.some(route => route.meta && route.meta.requiredAuth)) {
    if (store.getters['authorization/authorized']) {
      if (!store.getters['profile/userID']) {
        await store.dispatch('profile/load')
      }

      next()
    } else {
      next({ name: 'Authorization' })
    }
  } else if (to.matched.some(route => route.meta.onlyWithoutAuth)) {
    if (!store.getters['authorization/authorized']) {
      next()
    } else {
      next({ name: 'home' })
    }
  } else {
    next({ name: 'Authorization' })
  }
}
