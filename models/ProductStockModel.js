
var { productData } = require('../mongooseModel/ProductStock.js');
require('dotenv').config();
var _ = require('lodash');
var jwt = require("jsonwebtoken")
var jwtDecode = require("jwt-decode")
var sha256 = require("js-sha256").sha256
var axios = require("axios")
var jwtKey = process.env.JWT_KEY
exports.getAll = async function (accesstoken) {
    var arry = [];
   var metaObj=[]
    var checkProduct= await productData.find({
    })
    if (_.isEmpty(checkProduct)) {
        return {
            data: "error",
            value: false
        }
    }
    var getPriceData = await axios.get('http://localhost:3001/getAll',{
          headers: {
              'Content-Type': 'application/json',
              'accessToken': accesstoken
          },      
      })      
      .then((response) => {
        console.log('response',response.data)
       return response.data
      })
      .catch((error) => {
        alert('error',error.response)
     
      })
    arry = arry.concat(checkProduct).concat(getPriceData)
    console.log("arry",arry)
    var grounByPhase = _.groupBy(arry, "productSku");
    console.log(grounByPhase,"grounByPhase") 
    _.each(grounByPhase, (value, key) => {
    //     _.each(value,(item)=>{
    //    var grounBy = _.groupBy(value, "productSku");
    //   console.log("grounBy",grounBy)
     
    //         })
     metaObj.push({
           name: key,
          value: value,
        })
      });
       return {
           data: metaObj,
           value: true
        
       }
   
},
exports.save = async function (data) {
    let saveProduct
       let newProductObj = {
        productSku: data.productSku,
        stock: data.stock,
        totalAvailableStock:data.totalAvailableStock,
        totalPurchased:data.totalPurchased
       }
       let productObj = new productData(newProductObj)
       saveProduct = await productObj.save()
      
    if (saveProduct && !saveProduct._id) {
        return {
            data: "Something Went Wrong While Saving Product",
            value: false
        }
    }
    return {
        data: saveProduct,
        value: true
    }
       
}


