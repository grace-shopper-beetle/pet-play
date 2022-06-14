const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  product_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: Sequelize.ENUM("cat", "dog"),
  description: Sequelize.TEXT,
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  image: {
    type: Sequelize.STRING,
    default: 'https://media.istockphoto.com/vectors/cartoon-dog-cat-animal-frame-border-vector-id659973608?k=20&m=659973608&s=612x612&w=0&h=-pERm6rxOOXIxW6WzZUjaPWggPDseV7I649Q0-ZnA54=',
    validate: {
      isUrl: true
    }
  }
})

module.exports = Product;
