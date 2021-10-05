const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.ObjectId;
    var Float = require('mongoose-float').loadType(mongoose);
var productSchema = Schema({
    productSku: {
        type: String
    },
    stock: {
        type: mongoose.Schema.Types.Mixed
    },
   
    totalAvailableStock: {
        type: Number
    },
    totalPurchased: {
        type: Number
    }
});
var productData = mongoose.model('ProductStock', productSchema);
module.exports = {
    productData
}