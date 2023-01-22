import express, { Response } from 'express'

const routes = express.Router()

routes.get('/new', (_, res: Response) => {
  res.send('We will add new job')
})

export default routes
