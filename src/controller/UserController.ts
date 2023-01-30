import express from 'express'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import { config } from 'dotenv'
import UserModel from '../services/db/models/user'
import Customize from '../helpers/customize'
import configEnv from '../config/index'

config()
class UserController {
  /**
    * @param{input} req
    * @param(status, data) res
  */
  async signup (req: express.Request, res: express.Response): Promise<any> {
    try {
      const { body } = req
      const result = await UserModel.findOne({ where: { email: body.email } })

      if ((result?.dataValues) != null) {
        return Customize.commonMessage(req, res, 'The email is taken', 400)
      }

      const newUserData = {
        email: body.email.toLowerCase(),
        password: bcrypt.hashSync(body.password, 10),
        fullName: body.fullName,
        token: '',
        is_verified: false,
        is_admin: false
      }

      const addNewUser = await UserModel.create(newUserData)
      const displayData = {
        email: addNewUser.dataValues.email,
        is_verified: addNewUser.dataValues.is_verified,
        is_admin: addNewUser.dataValues.is_admin,
        token: ''
      }

      const token = JWT.sign(displayData, configEnv.SECRET_KEY_JWT)
      displayData.token = token
      await addNewUser.update({ token })
      await addNewUser.save()

      return Customize.commonResponse(req, res, 'User created Successfully', displayData, 201)
    } catch (error) {
      return Customize.commonResponse(req, res, 'Signup error', error, 400)
    }
  }
}

export default UserController
