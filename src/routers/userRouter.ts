import { Router } from 'express'
import {
  create,
  findAll,
  findOne,
  update,
  deleteOne,
  deleteAll,
} from '../controllers/userController'

const userRouter = Router()

userRouter.post('/', create)
userRouter.get('/', findAll)
userRouter.get('/:id', findOne)
userRouter.put('/:id', update)
userRouter.delete('/:id', deleteOne)
userRouter.delete('/', deleteAll)

export default userRouter
