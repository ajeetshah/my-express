import { Request, Response } from 'express'
import { create as createUser } from './userController'

export function login(req: Request, res: Response) {
  res.send('Logged in')
}

export function logout(req: Request, res: Response) {
  req.logOut()
  res.send('Logged out')
}

export function register(req: Request, res: Response) {
  createUser(req, res)
}
