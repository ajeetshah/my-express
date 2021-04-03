import { Sequelize, DataTypes } from 'sequelize'

export default function userModel(sequelize: Sequelize) {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  })

  return User
}

export interface IUser {
  email: string
  password: string
  firstname: string
  lastname: string
}
