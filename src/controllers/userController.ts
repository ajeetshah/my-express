import { Request, Response } from 'express'
import { Op } from 'sequelize'
import bcrypt from 'bcrypt'
import dbModel from '../models/dbModel'
import { IUser } from '../models/userModel'

const User = dbModel.User

export function create(req: Request, res: Response) {
  if (!req.body.email || !req.body.firstname || !req.body.lastname || !req.body.password) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  bcrypt.hash(req.body.password, 10, function (err, hashed) {
    const user: IUser = {
      email: req.body.email,
      password: hashed,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    }
    User.create(user)
      .then((data) => {
        res.send(data)
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the user.',
        })
      })
  })
}

export function findAll(req: Request, res: Response) {
  const email = req.query.email
  const condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      })
    })
}

export function findOne(req: Request, res: Response) {
  const id = req.params.id

  User.findByPk(id)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving user with id=' + id,
      })
    })
}

export function update(req: Request, res: Response) {
  const id = req.params.id

  User.update(req.body, {
    where: { id: id },
  })
    .then(([num]) => {
      if (num === 1) {
        res.send({
          message: 'User was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating user with id=${id}`,
      })
    })
}

export function deleteOne(req: Request, res: Response) {
  const id = req.params.id

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: 'User was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete user with id=${id}`,
      })
    })
}

export function deleteAll(req: Request, res: Response) {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} users were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all users.',
      })
    })
}
