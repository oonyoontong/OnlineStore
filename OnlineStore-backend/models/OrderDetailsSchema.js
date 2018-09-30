var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderDetailsSchema = new Schema({
    product_id: {type: Schema.ObjectId, ref: 'Products'},
    product_options: [{type: Schema.ObjectId, ref: 'ProductOptions'}],
    name: String,
    quantity: Number,
    price: Number,
});

module.exports = mongoose.model('OrderDetails', OrderDetailsSchema);
