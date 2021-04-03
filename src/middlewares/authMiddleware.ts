import { Request, Response, NextFunction } from 'express'

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  // return next()
  if (req.isAuthenticated()) {
    return next()
  }
  res.sendStatus(401)
}
