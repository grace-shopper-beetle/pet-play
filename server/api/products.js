const router = require('express').Router()
const { models: { Product }} = require('../db')
module.exports = router

// GET single product
router.get('/:id', async (req, res, next) => {
  try {
    const user = await Product.findByPk(req.params.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

