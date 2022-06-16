const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  isOpen: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Order;
