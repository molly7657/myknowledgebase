/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Resource = db.model('resource')

describe('Resource routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/resources/', () => {
    beforeEach(() => {
      return Resource.create({
        name: 'Javascript 101',
        type: 'link',
        Url: 'www.javascript.com'
      })
    })

    it('GET /api/resources', async () => {
      const res = await request(app)
        .get('/api/resources')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Javascript 101')
      expect(res.body[0].Url).to.be.equal('www.javascript.com')
    })
  }) // end describe('/api/users')
})
