'use strict'

const {db, models: {User, Product, Order} } = require('../server/db')

const users = [{
  username: "rsaywell0",
  password: "qoTNMscWG",
  email:  "rsaywell0@infoseek.co.jp",
  first_name:  "Riley",
  last_name:  "Saywell",
  street_address:  "10680 Elka Alley",
  city:  "San Antonio",
  state:  "TX",
  zipcode:  "78245",
  phone:  "8306531237",
  isAdmin: true
}, {
  username: "gsigfrid1",
  password: "bKwXocG",
  email: "gsigfrid1@scribd.com",
  first_name: "Gus",
  last_name: "Sigfrid",
  street_address: "62 Maywood Circle",
  city: "Syracuse",
  state: "NY",
  zipcode: "13205",
  phone: "3151028276",
  isAdmin: false
}, {
  username: "mrichens2",
  password: "0SLeNff6kDQm",
  email: "mrichens2@google.ru",
  first_name: "Maynord",
  last_name: "Richens",
  street_address: "3259 Commercial Place",
  city: "Tallahassee",
  state: "FL",
  zipcode: "32399",
  phone: "8501565111",
  isAdmin: false
}, {
  username: "tcheley3",
  password: "kOGVvN",
  email: "tcheley3@seesaa.net",
  first_name: "Talya",
  last_name: "Cheley",
  street_address: "0810 Mayfield Alley",
  city: "Norfolk",
  state: "VA",
  zipcode: "23504",
  phone: "7572648004",
  isAdmin: false
}, {
  username: "ddumelow4",
  password: "KMUz08UjBg72",
  email: "ddumelow4@instagram.com",
  first_name: "Dody",
  last_name: "Dumelow",
  street_address: "0275 Troy Street",
  city: "Tampa",
  state: "FL",
  zipcode: "33620",
  phone: "8132641057",
  isAdmin: false
}, {
  username: "ssussex5",
  password: "JducKficr5",
  email: "ssussex5@tripadvisor.com",
  first_name: "Skelly",
  last_name: "Sussex",
  street_address: "5 Coleman Street",
  city: "Omaha",
  state: "NE",
  zipcode: "68117",
  phone: "4024334605",
  isAdmin: false
}, {
  username: "galcoran6",
  password: "9WaIVbvpia",
  email: "galcoran6@reuters.com",
  first_name: "Ginelle",
  last_name: "Alcoran",
  street_address: "74 Vahlen Center",
  city: "Kansas City",
  state: "MO",
  zipcode: "64199",
  phone: "8164541146",
  isAdmin: false
}, {
  username: "apendall7",
  password: "xW6DMnqBC",
  email: "apendall7@mit.edu",
  first_name: "Alika",
  last_name: "Pendall",
  street_address: "7 Garrison Point",
  city: "Harrisburg",
  state: "PA",zipcode: "17121",
  phone: "7171126947",
  isAdmin: false
}, {
  username: "hdossett8",
  password: "2FkO1zO7D13",
  email: "hdossett8@wsj.com",
  first_name: "Hermie",
  last_name: "Dossett",
  street_address: "267 Darwin Pass",
  city: "Washington",
  state: "DC",
  zipcode: "20268",
  phone: "2021910253",
  isAdmin: false
}, {
  username: "mberkely9",
  password: "WLT0Pn",
  email: "mberkely9@linkedin.com",
  first_name: "Minna",
  last_name: "Berkely",
  street_address: "46 Oxford Crossing",
  city: "Pittsburgh",
  state: "PA",
  zipcode: "15215",
  phone: "4126820328",
  isAdmin: false
}]

const products = [{
  product_name: "Cat Dancer",
  category: "cat",
  price: 500,
  image: "http://dummyimage.com/203x100.png/5fa2dd/ffffff",
  description: 'Puppy kitty ipsum dolor sit good dog foot stick canary. Teeth Mittens grooming vaccine walk swimming nest good boy furry tongue heel furry treats fish. Cage run fast kitten dinnertime ball run foot park fleas throw house train licks stick dinnertime window.'
}, {
  product_name: "Bacon Flavored Wishbone For Chewing",
  category: "dog",
  price: 1000,
  image: "http://dummyimage.com/143x100.png/cc0000/ffffff",
  description: 'Puppy kitty ipsum dolor sit good dog foot stick canary. Teeth Mittens grooming vaccine walk swimming nest good boy furry tongue heel furry treats fish. Cage run fast kitten dinnertime ball run foot park fleas throw house train licks stick dinnertime window.'
}, {
  product_name: "Expandable Tunnel Fort",
  category: "cat",
  price: 1500,
  image: "http://dummyimage.com/224x100.png/dddddd/000000",
  description: 'Puppy kitty ipsum dolor sit good dog foot stick canary. Teeth Mittens grooming vaccine walk swimming nest good boy furry tongue heel furry treats fish. Cage run fast kitten dinnertime ball run foot park fleas throw house train licks stick dinnertime window.'
}, {
  product_name: "Plush Dragon Toy",
  category: "dog",
  price: 1500,
  image: "http://dummyimage.com/135x100.png/dddddd/000000",
  description: 'Puppy kitty ipsum dolor sit good dog foot stick canary. Teeth Mittens grooming vaccine walk swimming nest good boy furry tongue heel furry treats fish. Cage run fast kitten dinnertime ball run foot park fleas throw house train licks stick dinnertime window.'
}, {
  product_name: "Knotted Rope",
  category: "dog",
  price: 1000,
  image: "http://dummyimage.com/197x100.png/ff4444/ffffff",
  description: 'Puppy kitty ipsum dolor sit good dog foot stick canary. Teeth Mittens grooming vaccine walk swimming nest good boy furry tongue heel furry treats fish. Cage run fast kitten dinnertime ball run foot park fleas throw house train licks stick dinnertime window.'
}, {
  product_name: "Catnip Filled Plush Mouse",
  category: "cat",
  price: 1600,
  image: "http://dummyimage.com/231x100.png/dddddd/000000",
  description: 'Puppy kitty ipsum dolor sit good dog foot stick canary. Teeth Mittens grooming vaccine walk swimming nest good boy furry tongue heel furry treats fish. Cage run fast kitten dinnertime ball run foot park fleas throw house train licks stick dinnertime window.'
}, {
  product_name: "Rubber Balls - Set of 5",
  category: "dog",
  price: 2500,
  image: "http://dummyimage.com/127x100.png/cc0000/ffffff",
  description: 'Puppy kitty ipsum dolor sit good dog foot stick canary. Teeth Mittens grooming vaccine walk swimming nest good boy furry tongue heel furry treats fish. Cage run fast kitten dinnertime ball run foot park fleas throw house train licks stick dinnertime window.'
}, {
  product_name: "Edible Pizza Pie Cookie Gift Set",
  category: "dog",
  price: 2800,
  image: "http://dummyimage.com/151x100.png/cc0000/ffffff",
  description: 'Puppy kitty ipsum dolor sit good dog foot stick canary. Teeth Mittens grooming vaccine walk swimming nest good boy furry tongue heel furry treats fish. Cage run fast kitten dinnertime ball run foot park fleas throw house train licks stick dinnertime window.'
}, {
  product_name: "Cat Castle",
  category: "cat",
  price: 7800,
  image: "http://dummyimage.com/223x100.png/cc0000/ffffff",
  description: 'Puppy kitty ipsum dolor sit good dog foot stick canary. Teeth Mittens grooming vaccine walk swimming nest good boy furry tongue heel furry treats fish. Cage run fast kitten dinnertime ball run foot park fleas throw house train licks stick dinnertime window.'
}, {
  product_name: "Creamy Lickable Cat Treat - 20 pack",
  category: "cat",
  price: 2500,
  image: "http://dummyimage.com/174x100.png/cc0000/ffffff",
  description: 'Puppy kitty ipsum dolor sit good dog foot stick canary. Teeth Mittens grooming vaccine walk swimming nest good boy furry tongue heel furry treats fish. Cage run fast kitten dinnertime ball run foot park fleas throw house train licks stick dinnertime window.'}]



/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  await Promise.all(users.map(user => {
    return User.create(user);
  }))

  //Creating Products
  await Promise.all(products.map(product => {
    return Product.create(product);
  }))

  // Creating Orders
  const user1 = await User.findByPk(1);
  const user2 = await User.findByPk(2);

  await user1.createOrder({isOpen: true});
  await user2.createOrder({isOpen: true});
  await user1.createOrder({isOpen: false});
  await user2.createOrder({isOpen: false});

  // Adding Products to Orders
  const order1 = await Order.findByPk(1);
  const order2 = await Order.findByPk(2);
  const order3 = await Order.findByPk(3);
  const order4 = await Order.findByPk(4);

  const product1 = await Product.findByPk(1);
  const product2 = await Product.findByPk(3);
  const product3 = await Product.findByPk(5);
  const product4 = await Product.findByPk(7);

  await order1.setProducts([product1, product2, product3, product4]);
  await order2.setProducts([product2, product3, product4]);
  await order3.setProducts([product1]);
  await order4.setProducts([product1, product4]);

  console.log(`seeded successfully`)
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
