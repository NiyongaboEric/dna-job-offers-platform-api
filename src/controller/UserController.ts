import express from 'express'
import { config } from 'dotenv'
import { customRequest } from '../middleware/verifyToken'
import UserModel from '../services/db/models/user'
import Customize from '../helpers/customize'

config()

class UserController {
  /**
   *
   * @param {req} req
   * @param {res} res
  */
  async viewAllUsers (req: customRequest, res: express.Response): Promise<any> {
    try {
      const getAllUsers = await UserModel.findAll({ attributes: { exclude: ['password', 'token'] } })
      if (getAllUsers.length === 0) {
        return Customize.commonResponse(req, res, 'Non users are available', [], 200)
      }
      return Customize.commonResponse(req, res, 'All users available', getAllUsers, 200)
    } catch (error) {
      return Customize.commonResponse(req, res, 'Viewing all users error', error, 500)
    }
  }

  /**
   *
   * @param {req} req
   * @param {res} res
  */
  async singleUsers (req: customRequest, res: express.Response): Promise<any> {
    try {
      const getSingleUsers = await UserModel.findOne({
        where: {
          id: req.params.user_id
        },
        attributes: {
          exclude: ['password', 'token']
        }
      })

      if (getSingleUsers == null) return Customize.commonMessage(req, res, 'user is not found', 404)

      return Customize.commonResponse(req, res, 'User available', getSingleUsers.dataValues, 200)
    } catch (error) {
      return Customize.commonResponse(req, res, 'Viewing single user error', error, 500)
    }
  }
}

export default UserController
