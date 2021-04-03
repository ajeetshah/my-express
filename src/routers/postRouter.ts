import { Router } from 'express'
import {
  create,
  findAll,
  findOne,
  update,
  deleteOne,
  deleteAll,
} from '../controllers/postController'

const postRouter = Router()

postRouter.post('/', create)
postRouter.get('/', findAll)
postRouter.get('/:id', findOne)
postRouter.put('/:id', update)
postRouter.delete('/:id', deleteOne)
postRouter.delete('/', deleteAll)

export default postRouter
