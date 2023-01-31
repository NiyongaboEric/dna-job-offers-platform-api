import express from 'express'
import { config } from 'dotenv'
import { customRequest } from '../middleware/verifyToken'
import UserModel from '../services/db/models/user'
import Customize from '../helpers/customize'

config()

class UserController {
  /**
   *
   * @param {user id} req
   * @param {admin id} res
  */
  async viewAllUsers (req: customRequest, res: express.Response): Promise<any> {
    try {
      const getAllUsers = await UserModel.findAll({ attributes: { exclude: ['password', 'id', 'token'] } })
      if (getAllUsers.length === 0) {
        return Customize.commonResponse(req, res, 'Non users are available', [], 200)
      }
      return Customize.commonResponse(req, res, 'All users available', getAllUsers, 200)
    } catch (error) {
      return Customize.commonResponse(req, res, 'Viewing all users error', error, 400)
    }
  }
}

export default UserController
