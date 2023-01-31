import express from 'express'
import dotenv from 'dotenv'
import jwt, { JwtPayload } from 'jsonwebtoken'

import configEnv from '../config/index'
import Customize from '../helpers/customize'

dotenv.config()

const { SECRET_KEY_JWT } = configEnv

type typeCurrentAuthenticatetUser = {
  email: string
  is_verified: boolean
  is_admin: boolean
} | string | JwtPayload | undefined

export type customRequest = express.Request & { currentUser?: typeCurrentAuthenticatetUser }

const verifyToken = (req: customRequest, res: express.Response, next: express.NextFunction): any => {
  const bearerToken = req.headers.token as string

  if (bearerToken == null) {
    return Customize.commonMessage(req, res, 'Authorization header failured', 401)
  }

  jwt.verify(bearerToken.split(':')[0].trim(), SECRET_KEY_JWT, (err, result) => {
    if (err != null) {
      return Customize.commonResponse(req, res, 'Wrong token failed', err, 403)
    }

    req.currentUser = result
    next()
  })
}

export default verifyToken
