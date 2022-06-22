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
  product_name: "Cat Dancer Rainbow Charmer",
  category: "cat",
  price: 500,
  image: "https://buddysapetsstore.com/wp-content/uploads/2019/06/s-l640.jpg",
  description: "An interactive cat toy designed to charm and not harm. With a polycarbonate wand and a very colorful fabric, the cat charmer provides excellent aerobic excercise and is a safe interactive toy for all kittens, cats, and kids."
}, {
  product_name: "Bacon Flavored Wishbone For Chewing",
  category: "dog",
  price: 1000,
  image: "https://img.chewy.com/is/image/catalog/91865_MAIN._AC_SL600_V1612396016_.jpg",
  description: "Since dogs don’t have thumbs, why give them a chew that you can pick up and they can’t? With real bacon, peanut and chicken infused all the way through, your dog’s wish is coming true."
}, {
  product_name: "Expandable Tunnel Fort",
  category: "cat",
  price: 1500,
  image: "https://cdn-fastly.petguide.com/media/2022/02/28/8292605/media.jpg?size=414x575&nocrop=1",
  description: "Watch your feline friend enjoy hours of hide, pounce and play with this Cat Tunnel Fort. Ideal for multiple cat households, where your cute kitties can pop into one and run out the other. Also comes with built-in flexible stainless steel frames that pop open when your pets are at play and fold flat for compact storage when not in use."
}, {
  product_name: "Plush Dragon Toy",
  category: "dog",
  price: 1500,
  image: "https://i5.walmartimages.com/asr/e02f3c23-9794-43b3-8ad8-e1ea757d5d90_1.5cf9061d7cef48211cb75b0a1e8ebb3f.jpeg",
  description: "This plush dog toy with squeakers has been made specifically to provide your dog with hours of solo playtime and interactive fun. Each toy is cute, soft and sturdy and has been reinforced and double stitched, making sure that this product will last through many games of fetch."
}, {
  product_name: "Knotted Rope",
  category: "dog",
  price: 1000,
  image: "https://i5.walmartimages.com/asr/5fff9be7-1c16-4ab1-89dc-e7d3f96b193e.68ce65d3b0389086f1767415b5875e38.jpeg",
  description: "Keep your furry friend distracted and entertained with this rope toy. This item is intended to redirect your pet's attention so he or she does not engage in potentially destructive chewing behavior. Such interactive dog toys are specially engineered for playful and aggressive pets and help convert high energy into positive playtime. This one is a fun choice for playing tug, catch or fetch."

}, {
  product_name: "Catnip Filled Plush Mouse - 5 Pack",
  category: "cat",
  price: 1600,
  image: "https://img.chewy.com/is/image/catalog/245899_MAIN._AC_SL600_V1607371641_.jpg",
  description: "This mousy crew packs triple the fun for cats everywhere—a fuzzy texture to grab and bite, string tails to chase, and an infusion of Canadian catnip to go wild over! Toss these around to get cats chasing and batting after them, or carrying them around as their playtime prey. By stimulating their natural hunting instincts, it’s the perfect way to provide cats with the daily exercise they need."

}, {
  product_name: "Rubber Balls - Set of 10",
  category: "dog",
  price: 2500,
  image: "https://m.media-amazon.com/images/I/51LlAlb5qvL.jpg",
  description: "This doggy rubber toy ball is the ultimate fetch ball, designed to bounce higher, float better, last longer, and stand out from the rest. Made from natural, high-bounce rubber, these doggy rubber balls encourages dogs to leap and jump for more stimulating games of fetch. These amazing rubber balls encourage nondestructive chewing habits while satisfying the natural urge to chew."
}, {
  product_name: "Edible Pizza Pie Cookie Gift Set",
  category: "dog",
  price: 2900,
  image: "https://m.media-amazon.com/images/I/81wRLaUseAL._AC_SL1500_.jpg",
  description: "Treat your pup to a tiny treat with big taste! This wholesome dog treat box is locally baked and contains an adorable variety of hand decorated and wholesome dog cookies, all baked into fun shapes with a great taste dogs go crazy over."

}, {
  product_name: "Cat Castle Tower",
  category: "cat",
  price: 8000,
  image: "https://www.cozycatfurniture.com/image/cache/catalog/cat-tree-house-climbing-green-brown-500x500.jpg",
  description: "Don’t settle for an average cat tree when your cat is anything but average! This super plush cat tower is designed for larger cats making it it ideal for big breeds and multi-cat homes. With plenty of scratching areas, this cat tower was truly designed with your cat in mind."
}, {
  product_name: "Creamy Lickable Cat Treat - 20 pack",
  category: "cat",
  price: 2500,
  image: "https://usa.catit.com/wp-content/uploads/2019/10/Creamy-5-packs.jpg",
  description: "Lickable cat treats your cat will love you for! Hydrating cat treats in 4 delicious flavors: Chicken & Liver, Salmon, Tuna and Seafood. Delicious by itself or as dry food topping."}]



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
