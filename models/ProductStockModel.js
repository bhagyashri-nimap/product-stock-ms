
var { productData } = require('../mongooseModel/ProductStock.js');
require('dotenv').config();
var _ = require('lodash');

exports.getAll = async function (data) {
    var checkProduct= await productData.find({
    })
    if (_.isEmpty(checkProduct)) {
        return {
            data: "error",
            value: false
        }
    }
       return {
           data: checkProduct,
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
       
},
exports.purchaseProduct = async function (data) {
    var checkProduct= await productData.findOne({
        productSku:data.productSku
    })
    if (_.isEmpty(checkProduct)) {
        return {
            data: "error",
            value: false
        }
    }
   if(checkProduct.totalAvailableStock==0){
   return {
           data: "Out of Stock",
           value: true  
       } 
   }else if(data.country=="india"){
       var indiaPurchased=0,indiaAvailable=0,totalAvailableStock=0,totalPurchased=0;
       indiaPurchased= checkProduct.stock.india.indiaPurchased+1
       indiaAvailable= checkProduct.stock.india.indiaAvailable-1
       totalAvailableStock=checkProduct.totalAvailableStock-1
       totalPurchased=checkProduct.totalPurchased+1
       var updatedata = {
        $set: {
            stock: {
                india:{indiaAvailable: indiaAvailable,
                    indiaPurchased: indiaPurchased},
                usa:{usaAvailable:checkProduct.stock.usa.usaAvailable,
                        usaPurchased:checkProduct.stock.usa.usaPurchased}
              },
              totalAvailableStock:totalAvailableStock,
              totalPurchased:totalPurchased
        }
    }

const updateUser = await productData.findOneAndUpdate(
    {
        productSku:data.productSku
    },
    updatedata,
    {
        new: true
    },
  )
if (updateUser) {
    return {
        data: " Successfully",
        value: true
    }
}
   }else if(data.country=="usa"){
    var usaAvailable=0,usaPurchased=0,totalAvailableStock=0,totalPurchased=0;
    usaAvailable= checkProduct.stock.usa.usaAvailable-1
    usaPurchased= checkProduct.stock.usa.usaPurchased+1
    totalAvailableStock=checkProduct.totalAvailableStock-1
    totalPurchased=checkProduct.totalPurchased+1
    var updatedata = {
     $set: {
         stock: {
             india:{indiaAvailable: checkProduct.stock.india.indiaAvailable,
                 indiaPurchased: checkProduct.stock.india.indiaPurchased},
             usa:{usaAvailable:usaAvailable,
                     usaPurchased:usaPurchased}
           },
           totalAvailableStock:totalAvailableStock,
           totalPurchased:totalPurchased
     }
 }

const updateUser = await productData.findOneAndUpdate(
 {
     productSku:data.productSku
 },
 updatedata,
 {
     new: true
 },
)
if (updateUser) {
 return {
     data: "Successfully",
     value: true
 }
}
}
    
}



