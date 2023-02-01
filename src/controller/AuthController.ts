import express from 'express'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import { config } from 'dotenv'
import UserModel from '../services/db/models/user'
import Customize from '../helpers/customize'
import configEnv from '../config/index'

config()

interface ITokenPayload {
  user_id: number
  email: string
  is_verified: boolean
  is_admin: boolean
  token?: string
}

class AuthController {
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
      const displayData: ITokenPayload = {
        user_id: addNewUser.dataValues.id,
        email: addNewUser.dataValues.email,
        is_verified: addNewUser.dataValues.is_verified,
        is_admin: addNewUser.dataValues.is_admin
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

  /**
    * @param{input} req
    * @param(email and names) res
  */
  async signin (req: express.Request, res: express.Response): Promise<any> {
    try {
      const { email, password } = req.body
      const userInfo = await UserModel.findOne({ where: { email } })

      if (userInfo == null) {
        return Customize.commonMessage(req, res, 'Email do not found', 401)
      }

      const userPassword = bcrypt.compareSync(password, userInfo.dataValues.password)
      if (!userPassword) {
        return Customize.commonMessage(req, res, 'Email and password do not match', 401)
      }

      const displayData: ITokenPayload = {
        user_id: userInfo.dataValues.id,
        email: userInfo.dataValues.email,
        is_verified: userInfo.dataValues.is_verified,
        is_admin: userInfo.dataValues.is_admin
      }

      const token = JWT.sign(displayData, configEnv.SECRET_KEY_JWT)
      displayData.token = token

      await userInfo.update({ token })
      await userInfo.save()

      return Customize.commonResponse(req, res, 'User signin Successfully', displayData, 201)
    } catch (error) {
      return Customize.commonResponse(req, res, 'Signin error', error, 400)
    }
  }

  /**
   *
   * @param {user id} req
   * @param {admin id} res
  */
}

export default AuthController
