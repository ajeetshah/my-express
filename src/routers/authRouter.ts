import { Router } from 'express'
import passport from 'passport'
import { login, logout, register } from '../controllers/authController'

const authRouter = Router()

authRouter.post(
  '/login',
  passport.authenticate('local', { failureMessage: 'Login failed' }),
  login
)
authRouter.get('/logout', logout)
authRouter.post('/register', register)

export default authRouter
