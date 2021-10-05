const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.ObjectId;
    var Float = require('mongoose-float').loadType(mongoose);
var productSchema = Schema({
    productSku: {
        // type: Schema.Types.ObjectId,
        // ref: "product",
        // required: true
        type: String
    },
    priceInr: {
        type: Number
    },
    priceUsd: {
        type: Float
    }
});
var productData = mongoose.model('ProductStock', productSchema);
module.exports = {
    productData
}