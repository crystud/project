import router from './router'

export default (app) => {
  app.use('/hours', router)
}
