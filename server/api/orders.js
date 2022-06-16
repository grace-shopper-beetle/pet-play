const router = require('express').Router()
const { models: { Order, User }} = require('../db')
module.exports = router

// GET /api/orders/cart
router.get('/cart/:id', async(req, res, next) => {
  try {
    const user = User.findByPk(req.params.id);
    const cart = user.getOrders({ where: { isOpen: true }});
    res.json(cart);
  }
  catch(err) {
    next(err);
  }
})
