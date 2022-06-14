'use strict'

const {db, models: {User} } = require('../server/db')

const users = 

const products = [{
  product_name: "Cat Dancer", 
  category: "cat",
  price: "$4.57",
  image: "http://dummyimage.com/203x100.png/5fa2dd/ffffff"
}, {
  product_name: "Bacon Flavored Wishbone For Chewing",
  category: "dog",
  price: "$10.04",
  image: "http://dummyimage.com/143x100.png/cc0000/ffffff"
}, {
  product_name: "Expandable Tunnel Fort",
  category: "cat",
  price: "$14.70",
  image: "http://dummyimage.com/224x100.png/dddddd/000000"
}, {
  product_name: "Plush Dragon Toy",
  category: "dog",
  price: "$14.87",
  image: "http://dummyimage.com/135x100.png/dddddd/000000"
}, {
  product_name: "Knotted Rope",
  category: "dog",
  price: "$9.90",
  image: "http://dummyimage.com/197x100.png/ff4444/ffffff"
}, {
  product_name: "Catnip Filled Plush Mouse",
  category: "cat",
  price: "$15.51",
  image: "http://dummyimage.com/231x100.png/dddddd/000000"
}, {
  product_name: "Rubber Balls - Set of 5",
  category: "dog",
  price: "$24.70",
  image: "http://dummyimage.com/127x100.png/cc0000/ffffff"
}, {
  product_name: "Edible Pizza Pie Cookie Gift Set",
  category: "dog",
  price: "$28.36",
  image: "http://dummyimage.com/151x100.png/cc0000/ffffff"
}, {
  product_name: "Cat Castle",
  category: "cat",
  price: "$78.34",
  image: "http://dummyimage.com/223x100.png/cc0000/ffffff"
}, {
  product_name: "Creamy Lickable Cat Treat - 20 pack",
  category: "cat", 
  price: "$24.74",
  image: "http://dummyimage.com/174x100.png/cc0000/ffffff"}]


/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
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

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
