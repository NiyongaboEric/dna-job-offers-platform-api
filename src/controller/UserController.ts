import express from 'express'
import { config } from 'dotenv'
import { customRequest } from '../middleware/verifyToken'
import UserModel from '../services/db/models/user'
import Customize from '../helpers/customize'
import { JwtPayload } from '../middleware/checkAdmin'

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
  async viewSingleUser (req: customRequest, res: express.Response): Promise<any> {
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

  async editSingleUser (req: customRequest, res: express.Response): Promise<any> {
    try {
      const currentAuthUserPayload = req.currentUser as JwtPayload
      const findCurrentAuthUser = await UserModel.findOne({ where: { email: currentAuthUserPayload.email } })

      if (findCurrentAuthUser == null) return Customize.commonMessage(req, res, 'User authentication failure', 401)

      const findUserToEdit = await UserModel.findOne({ where: { id: req.params.user_id } })
      if (findUserToEdit == null) return Customize.commonMessage(req, res, 'User to edit not found', 401)

      delete req.body.user_id

      // super admin can change anything
      if (findCurrentAuthUser.dataValues.is_admin) {
        await findUserToEdit.update(req.body)
        await findUserToEdit.save()
        return Customize.commonResponse(req, res, 'User updated', findUserToEdit.dataValues, 200)
      }

      // user can change own profile
      if (findCurrentAuthUser.dataValues.id === findUserToEdit.dataValues.id) {
        await findUserToEdit.update(req.body)
        await findUserToEdit.save()
        return Customize.commonResponse(req, res, 'User updated', findUserToEdit.dataValues, 200)
      }

      return Customize.commonMessage(req, res, 'You are not allowed to edit the user profile', 400)
    } catch (error) {
      return Customize.commonResponse(req, res, 'Update user data error', error, 500)
    }
  }

  async deleteSingleUser (req: customRequest, res: express.Response): Promise<any> {
    try {
      const currentAuthUserPayload = req.currentUser as JwtPayload
      const findCurrentAuthUser = await UserModel.findOne({ where: { email: currentAuthUserPayload.email } })

      if (findCurrentAuthUser == null) return Customize.commonMessage(req, res, 'User authentication failure', 401)

      const findUserToDelete = await UserModel.findOne({ where: { id: req.params.user_id } })
      if (findUserToDelete == null) return Customize.commonMessage(req, res, 'User to delete not found', 404)

      // super admin can delete anything
      if (findCurrentAuthUser.dataValues.is_admin) {
        await findUserToDelete.destroy()
        return Customize.commonMessage(req, res, 'User deleted succesfully', 200)
      }

      // user can delete own profile
      if (findCurrentAuthUser.dataValues.id === findUserToDelete.dataValues.id) {
        await findUserToDelete.destroy()
        return Customize.commonMessage(req, res, 'User deleted succesfully', 200)
      }

      return Customize.commonMessage(req, res, 'You are not allowed to delete the user profile', 400)
    } catch (error) {
      return Customize.commonResponse(req, res, 'Edit user data error', error, 500)
    }
  }
}

export default UserController
