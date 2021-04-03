import express, { Request, Response, NextFunction } from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import cors from 'cors'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import passport from 'passport'
import passportLocal from 'passport-local'
import bcrypt from 'bcrypt'
import indexRouter from './routers/index'
import userRouter from './routers/userRouter'
import authRouter from './routers/authRouter'
import dbModel from './models/dbModel'
import { isLoggedIn } from './middlewares/authMiddleware'
import postRouter from './routers/postRouter'

const User = dbModel.User
const LocalStrategy = passportLocal.Strategy

passport.use(
  new LocalStrategy(function (username, plainTextPassword, done) {
    const condition = { email: username }
    User.findOne({ where: condition })
      .then((data) => {
        const hashed = `${data.get('password')}`
        bcrypt.compare(plainTextPassword, hashed, function (err, result) {
          if (result) {
            done(null, data)
          } else {
            done(null, false, { message: 'Username or password is wrong' })
          }
        })
      })
      .catch((err) => {
        done(null, false, { message: 'User not found' })
      })
  })
)

passport.serializeUser(function (user: any, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findByPk(`${id}`)
    .then((data) => {
      done(null, data)
    })
    .catch((err) => {
      done(err, null)
    })
})

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
)
app.use(passport.initialize())
app.use(passport.session())

const v = '/v1'
app.use(`${v}/`, indexRouter)
app.use(`${v}/auth`, authRouter)
app.use(`${v}/users`, isLoggedIn, userRouter)
app.use(`${v}/posts`, postRouter)

app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404))
})

app.use(function (err, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.send('error')
})

dbModel.sequelize.sync()
export default app
