const router = require('express').Router()
const { models: { Cart }} = require('../db')
module.exports = router

// GET /api/cart
router.get('/:id', async (req, res, next) => {
    try {
      const cartItems = await Cart.findAll({
        where: {
            userId: req.params.id
        }
      })
      res.json(cartItems)
    } catch (err) {
      next(err)
    }
  })
  