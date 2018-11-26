var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsSchema = new Schema({
    SKU: String,
    categories: [{type: Schema.ObjectId, ref: 'Categories'}],
    name: String,
    description: String,
    MSRP: Number,
    price: Number,
    quantity: Number,
    dimensionX: Number,
    dimensionY: Number,
    dimensionZ: Number,
    thumbnail: String,
    images: [String],
    lastUpdated: {type: Date, default: Date.now()}
});

ProductsSchema.pre('save', function(next){
    this.lastUpdated = Date.now();
    next();
});

module.exports = mongoose.model('Products', ProductsSchema);
