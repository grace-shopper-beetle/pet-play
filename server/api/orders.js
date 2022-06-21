const router = require('express').Router()
const { models: { Order }} = require('../db');
const Order_Product = require('../db/models/Order_Product');
const Product = require('../db/models/Product');
module.exports = router

// GET /api/orders/cart/:id
router.get('/cart/:id', async (req, res, next) => {
  try {
    const order = await Order.findOne({ where: {
      isOpen: true,
      userId: req.params.id
    }});
    const cart = await order.getProducts();
    res.json(cart);
  }
  catch(err) {
    next(err);
  }
})

// PUT /api/orders/cart/quantity
router.put('/cart/quantity', async (req, res, next) => {
  try {
    const orderProduct = await Order_Product.findOne({ where: {
      orderId: req.body.orderId,
      productId: req.body.productId
    }});
    await orderProduct.update({quantity: req.body.quantity});
    const order = await Order.findByPk(req.body.orderId);
    const cart = await order.getProducts();
    res.json(cart);
  }
  catch(err) {
    next(err);
  }
})

// PUT /api/orders/cart/:orderId/:productId
router.put('/cart/:orderId/:productId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    const product = await Product.findByPk(req.params.productId);
    await order.removeProduct(product);
    const cart = await order.getProducts();
    res.json(cart);
  }
  catch(err) {
    next(err);
  }
})

