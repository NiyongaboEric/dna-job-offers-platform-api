import app from './app'
import config from './config/index'
import sequelizeConnection from './services/db/models/'

const { APP_URL, APP_API_NAME_VERSION_ROUTE, APP_PORT } = config

sequelizeConnection
  .authenticate()
  .then(() => { console.log('Connection has been established successfully.') })
  .catch((error: Error) => { console.error('Unable to connect to the database:', error) }
  )

app.listen(config.APP_PORT, () => {
  console.log(`
    ⚡️[Server]: Server is running at ${APP_URL}:${APP_PORT}
    +[Documentation]: Docs is running at ${APP_URL}:${APP_PORT}/${APP_API_NAME_VERSION_ROUTE}/api-docs
  `)
})

export default app
