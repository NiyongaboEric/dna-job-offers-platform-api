import express, { Response } from 'express'

const routes = express.Router()

routes.get('/signup', (_, res: Response) => {
  res.send('User will signup')
})

export default routes
