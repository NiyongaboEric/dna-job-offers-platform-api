import request from 'supertest'

import app from '../app'

describe('app default routes', () => {
  describe('Get /', () => {
    const homepageText = 'Welcome to DNA job affair site'
    it(`Should respond with ${homepageText}`, async () => {
      await request(app)
        .get('/')
        .expect(200, homepageText)
    })
  })

  describe('404 *', () => {
    const fekeRoute = '/FEKE_ROUTE'
    it('Should respond route not found', async () => {
      await request(app)
        .get(`${fekeRoute}`)
        .expect(404, `Route "${fekeRoute}" not found`)
    })
  })
})
