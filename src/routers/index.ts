import { Router, Request, Response, NextFunction } from 'express'

const router = Router()

router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.send({
    id: 1,
    message: 'i am index',
  })
})

export default router
