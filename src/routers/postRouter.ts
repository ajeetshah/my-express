import { Router } from 'express'
import multer from 'multer'
import {
  create,
  findAll,
  findOne,
  update,
  deleteOne,
  deleteAll,
} from '../controllers/postController'

const upload = multer({ dest: './uploads/' })

const postRouter = Router()

postRouter.post('/', upload.single('image'), create)
postRouter.get('/', findAll)
postRouter.get('/:id', findOne)
postRouter.put('/:id', update)
postRouter.delete('/:id', deleteOne)
postRouter.delete('/', deleteAll)

export default postRouter
