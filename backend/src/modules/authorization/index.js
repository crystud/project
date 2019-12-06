import router from './router'

// eslint-disable-next-line no-unused-vars
export default (app) => {
  app.use('/auth', router)
}
