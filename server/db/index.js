//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')
const Order = require('./models/Order')

//associations could go here!

User.hasMany(Order);
Order.belongsTo(User);

User.belongsToMany(Product, { through: 'Order_Product' });
Product.belongsToMany(User, { through: 'Order_Product' });

module.exports = {
  db,
  models: {
    User,
    Product,
    Order
  },
}
