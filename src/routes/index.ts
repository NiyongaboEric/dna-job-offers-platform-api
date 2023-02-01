import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerOptions from '../docs/swaggerOptions'
import swaggerJsdoc from 'swagger-jsdoc'

import job from './job/index'
import user from './user/index'
import config from '../config'

const app: express.Application = express()

/**
 * Documentation for API v1
 */

const url: string = `${config.APP_URL}:${config.APP_PORT}`
const specs = swaggerJsdoc(swaggerOptions(url))

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true
    // customCssUrl:
    //   'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css'
  })
)

// User
app.use('/user', user)

// Job
app.use('/job-offer', job)

export default app
