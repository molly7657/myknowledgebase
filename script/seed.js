'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
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

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

// const Papa = require('papaparse')
// const fs = require('fs')
// const file = fs.createReadStream('locations.csv')
// const db = require('../server/db')
// const {Restaurant, User} = require('../server/db/models')
// const restaurants = require('./alltherestaurants')

// async function cbforparsing(data) {
//   const newData = data.slice(850, 925)
//   console.log(newData)
// }

// function parseData(url, callback) {
//   Papa.parse(url, {
//     header: true,
//     complete: function(results) {
//       callback(results.data)
//     }
//   })
// }

// let restaurantlist = restaurants

// parseData(file, cbforparsing)

// const users = [
//   {email: 'cody@email.com', password: '123', isAdmin: true},
//   {email: 'murphy@email.com', password: '123', isAdmin: false}
// ]

// async function seed() {
//   await db.sync({force: true})
//   console.log('db synced!')

//   await Promise.all(
//     restaurantlist.map(restaurant => Restaurant.create(restaurant))
//   )
//   console.log('seeded the restaurants!')

//   await Promise.all(users.map(user => User.create(user)))
//   console.log(`seeded ${users.length} users`)

//   console.log(`seeded successfully`)
// }

// async function runSeed() {
//   console.log('seeding...')
//   try {
//     await seed()
//   } catch (err) {
//     console.error(err)
//     process.exitCode = 1
//   } finally {
//     console.log('closing db connection')
//     await db.close()
//     console.log('db connection closed')
//   }
// }

// // Execute the `seed` function, IF we ran this module directly (`node seed`).
// // `Async` functions always return a promise, so we can use `catch` to handle
// // any errors that might occur inside of `seed`.
// if (module === require.main) {
//   runSeed()
// }

// // we export the seed function for testing purposes (see `./seed.spec.js`)
// module.exports = seed
