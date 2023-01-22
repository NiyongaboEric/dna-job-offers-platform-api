import { Sequelize } from 'sequelize'
import config from '../../../config/index'

const sequelizeConnection = new Sequelize(`${config.DATABASE_URL}`)

export default sequelizeConnection
