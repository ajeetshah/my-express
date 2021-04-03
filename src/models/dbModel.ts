import { Sequelize } from 'sequelize'
import postModel from './postModel'
import userModel from './userModel'

const sequelize = new Sequelize(
  process.env.EXPRESS_DB_NAME,
  process.env.EXPRESS_DB_USER,
  process.env.EXPRESS_DB_PASS,
  {
    host: process.env.EXPRESS_DB_HOST,
    port: +process.env.EXPRESS_DB_PORT,
    dialect: 'postgres' as 'postgres',
    pool: {
      max: +process.env.EXPRESS_DB_POOL_MAX,
      min: +process.env.EXPRESS_DB_POOL_MIN,
      acquire: +process.env.EXPRESS_DB_POOL_ACQUIRE,
      idle: +process.env.EXPRESS_DB_POOL_IDLE,
    },
    logging: process.env.EXPRESS_DB_LOG === 'true' ? console.log : false,
  }
)

const dbModel = {
  sequelize: sequelize,
  User: userModel(sequelize),
  Post: postModel(sequelize),
}

export default dbModel
