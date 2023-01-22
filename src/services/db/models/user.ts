import { DataTypes, Optional, UUIDV4, Model } from 'sequelize'
import sequelizeConnection from './index'

interface UserAttrbutes {
  id: number
  fullName: string
  password: string
  email: string
  token: string
  is_verified: boolean
  is_admin: boolean
  readonly createdAt?: Date
  readonly updatedAt?: Date
  readonly deleteAt?: Date
}

interface UserInput extends Optional<UserAttrbutes, 'id' | 'token' | 'is_verified' | 'is_admin' > {}

class User extends Model<UserAttrbutes, UserInput> implements UserAttrbutes {
  public id!: number
  public fullName!: string
  public password!: string
  public email!: string
  public token!: string
  public is_verified!: boolean
  public is_admin!: boolean

  // timestamps
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

User.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    modelName: 'User'
  }
)

export default User
