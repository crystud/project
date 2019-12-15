import store from '../../store'

export default (to, from, next) => {
  if (to.matched.some(route => route.meta && route.meta.requiredAuth)) {
    if (store.getters['authorization/authorized']) {
      next()
    } else {
      next({ name: 'Authorization' })
    }
  } else if (to.matched.some(route => route.meta.onlyWithoutAuth)) {
    if (!store.getters['authorization/authorized']) {
      next()
    } else {
      next({ name: 'Home' })
    }
  } else {
    next({ name: 'Authorization' })
  }
}
