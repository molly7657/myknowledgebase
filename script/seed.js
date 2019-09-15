'use strict'

const db = require('../server/db')
const {User, Resource} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const resources = await Promise.all([
    Resource.create({
      name: 'A very cool app',
      type: 'link',
      Url: 'www.google.com',
      userId: 1
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded 1 resource lol`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
