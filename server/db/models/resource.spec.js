const {expect} = require('chai')
const db = require('../index')
const Resource = db.model('resource')

describe('Resource model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('classMethods', () => {
    describe('searchItems', () => {
      let cody

      beforeEach(async () => {
        const article = await Resource.create({
          name: 'A Very Important Javascript Article',
          type: 'link',
          Url:
            'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
