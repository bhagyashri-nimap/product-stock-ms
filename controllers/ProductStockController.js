
var express = require('express');
var router = express.Router()
var ProductModel = require('../models/ProductStockModel')
var {authenticateUser} = require("../config/middleware");
router.use(express.json());
router.post("/save", async (req, res) => {
    try {
        var data = await ProductModel.save(req.body)
        if (data.value) {
            res.status(200).json(data.data)
        } else {
            res.status(500).json(data)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}),
router.get("/getAll", authenticateUser,async (req, res) => {
    console.log("req.body",req.headers.accesstoken)
    try {
        var data = await ProductModel.getAll(req.headers.accesstoken)
        if (data.value) {
        
            res.status(200).json(data.data)
        } else {
            console.log("data2",data)
            res.status(500).json(data)
        }
    } catch (error) {
        console.log("data3",error)
        res.status(500).send(error)
    }
})
module.exports = router