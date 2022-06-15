const router = require('express').Router()
const { models: { Product }} = require('../db')
module.exports = router

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await Product.findByPk(req.params.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})
