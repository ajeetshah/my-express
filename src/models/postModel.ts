import { Sequelize, DataTypes } from 'sequelize'

export default function postModel(sequelize: Sequelize) {
  const Post = sequelize.define('post', {
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  })

  return Post
}

export interface IPost {
  title: string
  description: string
  image: string
}
