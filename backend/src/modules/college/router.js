import { Router } from 'express'

import Controller from './controller'

import verifyUser from '../../middlewares/verifyUser'
import checkRoles from '../../middlewares/checkRoles'

const router = Router()

router.use(verifyUser)
router.use(checkRoles(['admin']))

router.post('/stats', async (req, res) => {
  const stats = await Controller.getStats()

  return res.json(stats)
})

export default router
