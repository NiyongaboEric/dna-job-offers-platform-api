import { Options } from 'swagger-jsdoc'

const options = (url: string): Options => {
  return {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'DNA Job offer Express API with Swagger',
        version: '1.0.0',
        description:
          'This is a simple CRUD API application made with Express and documented with Swagger',
        license: {
          name: 'MIT',
          url: 'https://spdx.org/licenses/MIT.html'
        },
        contact: {
          name: 'Eric Niyongabo',
          url: 'https://github.com/NiyongaboEric',
          email: 'niyongaboeric69@gmail.com'
        }
      },
      servers: [
        {
          url
        }
      ]
    },
    apis: ['./routes/*.ts']
  }
}

export default options
