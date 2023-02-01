import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import UserModel from '../services/db/models/user'
import configEnv from '../config/index'
import Customize from '../helpers/customize'

dotenv.config()

export interface JwtPayload {
  email: string
  is_admin: boolean
  is_verified: boolean
}

const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
  try {
    const bearerToken = req.headers.token as string

    const authUser = jwt.verify(bearerToken.split(':')[0].trim(), configEnv.SECRET_KEY_JWT) as JwtPayload

    if (authUser.email == null) return Customize.commonMessage(req, res, 'user email not provided', 401)

    const getUser = await UserModel.findOne({ where: { email: authUser.email } })

    if (getUser == null) return Customize.commonMessage(req, res, 'user email not found', 404)

    if (getUser.dataValues.is_admin) {
      next(); return
    } else return Customize.commonMessage(req, res, 'Not allowed to view users', 403)
  } catch (error) {
    return Customize.commonResponse(req, res, 'Authentication checking failed', error, 401)
  }
}

export default isAdmin
