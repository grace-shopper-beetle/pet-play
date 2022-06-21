const router = require('express').Router()
const { models: { Order_Product }} = require('../db')
module.exports = router

// GET /api/checkout
router.get('/checkout', async (req, res, next) => {
  try {
    const checkout = await Order_Product.findAll()
    res.json(checkout)
  } catch (err) {
    next(err)
  }
})