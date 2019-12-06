import router from './router'

export default (app) => {
  app.use('/specialty', router)
}
