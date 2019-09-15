const {expect} = require('chai')
const db = require('../index')
const Resource = db.model('resource')
const User = db.model('user')

describe('Resource model', () => {
  beforeEach(() => db.sync({force: true}))

  describe('column definitions and validations', () => {
    it('has a `name` and `Url`', async () => {
      const reactArticle = await Resource.create({
        name: 'React Hooks 101',
        type: 'link',
        Url: 'www.reacthooks.com'
      })
      expect(reactArticle.name).to.equal('React Hooks 101')
      expect(reactArticle.type).to.equal('link')
      expect(reactArticle.Url).to.deep.equal('www.reacthooks.com')
    })

    it('`name` is required', async () => {
      const article = Resource.build()
      return article.validate().then(
        () => {
          throw new Error('Validation should have failed!')
        },
        err => {
          expect(err).to.be.an('error')
        }
      )
    })
  })

  describe('class method: sortByDate', () => {
    it('returns all instances from a user sorted by date', async () => {
      const molly = await User.create({email: 'molly.lupton@gmail.com'})
      const kirsten = await User.create({email: 'ilovemolly@gmail.com'})
      await Promise.all([
        Resource.create({
          name: 'Important Coding Article',
          Url:
            'https://personalknowledgebase.s3.us-east-2.amazonaws.com/test/1_oOYoJk8jvDGhGUETH7wlKQ.gif',
          type: 'file',
          createdAt: '2019-09-13 15:08:51.359-04',
          userId: molly.id
        }),
        Resource.create({
          name: 'How to do front-end things',
          Url:
            'https://medium.com/@_erikaybar/one-developers-condensed-intro-to-react-68cbf078f992',
          type: 'link',
          createdAt: '2019-09-09 15:08:51.359-04',
          userId: kirsten.id
        }),
        Resource.create({
          name: 'HOW DO I CODE BETTER?!',
          Url:
            'https://blog.newrelic.com/engineering/8-ways-become-a-better-coder/',
          type: 'link',
          createdAt: '2019-09-11 15:08:51.359-04',
          userId: molly.id
        }),
        Resource.create({
          name: 'Buffy the Vampire Slayer',
          Url:
            'https://personalknowledgebase.s3.us-east-2.amazonaws.com/test/Buffy-The-Vampire-Slayer-20th-Anniversary-1.jpg',
          type: 'file',
          createdAt: '2019-08-08 15:08:51.359-04',
          userId: kirsten.id
        }),
        Resource.create({
          name: '4015.jpg',
          Url:
            'https://personalknowledgebase.s3.us-east-2.amazonaws.com/test/4015.jpg',
          type: 'file',
          createdAt: '2019-09-14 15:08:51.359-04',
          userId: molly.id
        })
      ])

      const mySortedStuff = await Resource.sortByDate(molly.id)
      const kirstenStuff = await Resource.sortByDate(kirsten.id)
      expect(mySortedStuff.length).to.equal(3)
      expect(kirstenStuff.length).to.equal(2)
      expect(mySortedStuff[0].name).to.equal('HOW DO I CODE BETTER?!')
      expect(mySortedStuff[2].name).to.equal('4015.jpg')
      expect(kirstenStuff[0].name).to.equal('Buffy the Vampire Slayer')
    })
  })
  describe('class method: searchItems', () => {
    it('returns all search results that match name of article or PDF sorted in ascending or descending order', async () => {
      const molly = await User.create({email: 'molly.lupton@gmail.com'})
      const kirsten = await User.create({email: 'ilovemolly@gmail.com'})
      await Promise.all([
        Resource.create({
          name: 'Important Javascript Article',
          Url:
            'https://personalknowledgebase.s3.us-east-2.amazonaws.com/test/1_oOYoJk8jvDGhGUETH7wlKQ.gif',
          type: 'file',
          createdAt: '2019-09-13 15:08:51.359-04',
          userId: molly.id
        }),
        Resource.create({
          name: 'How To Do Front-End Things In React',
          Url:
            'https://medium.com/@_erikaybar/one-developers-condensed-intro-to-react-68cbf078f992',
          type: 'link',
          createdAt: '2019-09-09 15:08:51.359-04',
          userId: kirsten.id
        }),
        Resource.create({
          name: 'Learning Multer Middleware in Javascript',
          Url:
            'https://blog.newrelic.com/engineering/8-ways-become-a-better-coder/',
          type: 'link',
          createdAt: '2019-09-11 15:08:51.359-04',
          userId: molly.id
        }),
        Resource.create({
          name: 'Why Javascript is Cool',
          Url:
            'https://blog.newrelic.com/engineering/8-ways-become-a-better-coder/',
          type: 'link',
          createdAt: '2019-09-15 15:08:51.359-04',
          userId: molly.id
        }),
        Resource.create({
          name: 'reacthooks.pdf',
          Url:
            'https://personalknowledgebase.s3.us-east-2.amazonaws.com/test/Buffy-The-Vampire-Slayer-20th-Anniversary-1.jpg',
          type: 'file',
          createdAt: '2019-08-08 15:08:51.359-04',
          userId: kirsten.id
        }),
        Resource.create({
          name: 'WhY I aM gOoD cOdEr',
          Url:
            'https://personalknowledgebase.s3.us-east-2.amazonaws.com/test/4015.jpg',
          type: 'file',
          createdAt: '2019-09-14 15:08:51.359-04',
          userId: molly.id
        })
      ])

      const mySortedStuff = await Resource.searchItems(
        molly.id,
        'javascript',
        'Descending'
      )
      const kirstenStuff = await Resource.searchItems(
        kirsten.id,
        'rea',
        'Ascending'
      )
      expect(mySortedStuff.length).to.equal(3)
      expect(kirstenStuff.length).to.equal(2)
      expect(mySortedStuff[0].name).to.equal('Why Javascript is Cool')
      expect(mySortedStuff[1].name).to.equal('Important Javascript Article')
      expect(kirstenStuff[0].name).to.equal('reacthooks.pdf')
    })
  })
})
