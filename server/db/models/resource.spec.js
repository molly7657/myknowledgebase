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

  xdescribe('class method: findByIngredient', () => {
    it('finds coffee by ingredient', async () => {
      await Promise.all([
        Coffee.create({
          name: 'Cafe au Lait',
          ingredients: ['french press', 'scalded milk']
        }),
        Coffee.create({
          name: 'Galao',
          ingredients: ['espresso', 'foam']
        }),
        Coffee.create({
          name: 'Mocha',
          ingredients: ['espresso', 'hot cocoa', 'whipped cream']
        })
      ])
      const drinksWithEspresso = await Coffee.findByIngredient('espresso')
      const drinksWithWhippedCream = await Coffee.findByIngredient(
        'whipped cream'
      )

      expect(drinksWithEspresso.length).to.equal(2)
      expect(drinksWithEspresso.some(drink => drink.name === 'Mocha')).to.equal(
        true
      )
      expect(drinksWithEspresso.some(drink => drink.name === 'Galao')).to.equal(
        true
      )

      expect(drinksWithWhippedCream.length).to.equal(1)
      expect(
        drinksWithWhippedCream.some(drink => drink.name === 'Mocha')
      ).to.equal(true)
    })
  })

  xdescribe('hooks', () => {
    // because EVERYTHING in Cody's Cafe is made with love ♥
    it('adds "love" to ingredients if not included', async () => {
      const coffee = await Coffee.create({
        name: 'Cafe con Leche',
        ingredients: ['coffee', 'warm milk']
      })

      expect(coffee.ingredients.indexOf('love') > -1).to.equal(true)

      await coffee.update({
        ingredients: ['coffee', 'hot milk']
      })

      expect(coffee.ingredients.indexOf('love') > -1).to.equal(true)
    })
  })
})
