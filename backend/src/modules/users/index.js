import router from './router'

export default (app) => {
  app.use('/users', router)
}
