import fs from 'fs'
import { Request, Response } from 'express'
import { Op } from 'sequelize'
import dbModel from '../models/dbModel'
import { IPost } from '../models/postModel'

const Post = dbModel.Post

export function create(req: Request<any, any, IPost>, res: Response) {
  if (!req.body.title || !req.body.description) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  const fileNameWithExtension = `${req.file.filename}-${req.file.originalname}`
  const newPath = `./uploads/${fileNameWithExtension}`

  fs.rename(req.file.path, newPath, function (err) {
    if (err) {
      console.log(err)
      res.send(500)
    } else {
      const post: IPost = {
        title: req.body.title,
        description: req.body.description,
        image: fileNameWithExtension,
      }
      Post.create(post)
        .then((data) => {
          res.send(data)
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'Some error occurred while creating the post.',
          })
        })
    }
  })
}

export function findAll(req: Request, res: Response) {
  const title = req.query.title
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null

  Post.findAll({ where: condition })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving posts.',
      })
    })
}

export function findOne(req: Request, res: Response) {
  const id = req.params.id

  Post.findByPk(id)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving post with id=' + id,
      })
    })
}

export function update(req: Request, res: Response) {
  const id = req.params.id

  Post.update(req.body, {
    where: { id: id },
  })
    .then(([num]) => {
      if (num === 1) {
        res.send({
          message: 'Post was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update post with id=${id}. Maybe post was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating post with id=${id}`,
      })
    })
}

export function deleteOne(req: Request, res: Response) {
  const id = req.params.id

  Post.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: ':Post was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete post with id=${id}. Maybe post was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete post with id=${id}`,
      })
    })
}

export function deleteAll(req: Request, res: Response) {
  Post.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} posts were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all posts.',
      })
    })
}
