import express from 'express'

import schemaValidation from './schemaValidation'
import Customize from '../helpers/customize'

/**
 * Handle all incoming ['POST', 'PUT', 'PATCH'] HTTP method validation
 * Handle all incoming ['params'] URL route validation
 */

const handleValidation = (req: express.Request, res: express.Response, next: express.NextFunction): any => {
  const reqMethods = ['post', 'put', 'patch', 'get']
  const route = req.route.path
  const method = req.method.toLowerCase()

  if (reqMethods.includes(method) && schemaValidation[route] !== undefined) {
    const schema = schemaValidation[route]
    const sizeBody = Object.keys(req.body)

    if (schema != null && sizeBody.length > 0) {
      const { error, value } = schema.validate(req.body)

      if (error != null) {
        // Joi Error
        const joiError = {
          status: 'failed',
          error
        }
        // Send back the JSON error response
        return Customize.commonResponse(req, res, 'failed', joiError, 422)
      }
      req.body = value
      next(); return
    }

    const sizeParams = Object.keys(req.params)
    if (schema != null && sizeParams.length > 0) {
      console.log('\n\n\n', req.params)
      const { error, value } = schema.validate(req.params)
      if (error != null) {
        const joiError = {
          status: 'failed',
          error
        }
        // Send back the JSON error response
        return Customize.commonResponse(req, res, 'failed', joiError, 400)
      }
      req.body = value
      next(); return
    }
  }
  return Customize.commonMessage(req, res, 'Invalid request data. Please review request and try again.', 400)
}

export default handleValidation
