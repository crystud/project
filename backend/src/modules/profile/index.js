import router from './router'
import verifyUser from '../../middlewares/verifyUser'

export default (app) => {
  verifyUser(app)

  app.use('/profile', router)
}
