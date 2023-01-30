import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import config from './config/index'
import routes from './routes/index'

const app: express.Application = express()

// configuration
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/**
 * API is specific and gives you
 * Access to routes
 * Access to documentation
 */
app.use(`/${config.APP_API_NAME_VERSION_ROUTE}`, routes)

app.get('/', (_, res: express.Response) => {
  res.status(200).send('Welcome to DNA job affair site')
})

// Routes not found
app.use('*', (req: express.Request, res: express.Response) => {
  res.status(404).send(`Route "${req.originalUrl}" not found`)
})

// Error handlers
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    const { message } = err
    res.status(500).send((message.length > 0) ? message : err)
  }
)

export default app
