
var express = require('express');
var router = express.Router()
var productService = require('../controllers/ProductStockController')

router.all("/:apiName",(req, res,next) => {
    console.log("Called: ", req.path)
      next()   
})
router.use(productService)
module.exports = router