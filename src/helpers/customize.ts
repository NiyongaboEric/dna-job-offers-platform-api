/* eslint-disable @typescript-eslint/explicit-function-return-type */
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

/** Class represent the customization methods */
class Customize {
  /**
   *
   * @param {request} _req
   * @param {response} res
   * @param {data} message
   * @param {status} status
  */

  commonResponse (_req: express.Request, res: express.Response, message: string, data: any, status: number): any {
    res.status(status).json({ status, message, data })
  }

  /**
   *
   * @param {request} _req
   * @param {response} res
   * @param {message} message
   * @param {status} status
  */

  commonMessage (_req: express.Request, res: express.Response, message: string, status: number): any {
    res.status(status).json({ status, message })
  }
}

export default new Customize()
