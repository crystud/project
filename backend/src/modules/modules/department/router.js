import { Router } from 'express'
import { checkSchema, validationResult } from 'express-validator'

import Controller from './controller'

const router = Router();

router.post('/create', checkSchema({
  name:{
    in: 'body',
    notEmpty:{
      errorMessage: 'Name souldn`t be empty'
    }
  },
  description:{
    in: 'body'
  },
  leaderID: {
    in: 'body',
    isNumeric:{
      errorMessage: "Incorrect input"
    },
    notEmpty:{
      errorMessage: 'Leader sould be chosen'
    }
  }
}), async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() })
  }
  
  const result = await Controller.create(req.body)
  
  return res.json(result)
})

router.post('/edit', checkSchema({
  id:{
    in: 'body',
    notEmpty:{
      errorMessage: 'id souldn`t be empty'
    },
    isNumeric:{
      errorMessage: 'id must be numeric'
    }
  },
  name:{
    in: 'body'
  },
  description:{
    in: 'body'
  },
  leaderID: {
    in: 'body'
  }
}), async (req, res) => {
  const errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    return res.json({errors : errors.array()})
  }
  
  const result = await Controller.edit(req.body)
  
  return res.json(result)
})

export default router
