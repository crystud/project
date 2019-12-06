import router from './router'

export default (app, database) => {
  app.use('/auth', router)
}
