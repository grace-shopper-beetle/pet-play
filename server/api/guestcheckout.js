const { default: GuestCheckout } = require('../../client/components/GuestCheckout')
const router = require('express').Router()
const { models: { Order_Product }} = require('../db')
module.exports = router

// GET /api/checkout
router.get('/checkout', async (req, res, next) => {
  try {

    res.json(
        <GuestCheckout />
    )
  } catch (err) {
    next(err)
  }
})