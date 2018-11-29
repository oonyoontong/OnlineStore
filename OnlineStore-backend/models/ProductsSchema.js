var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsSchema = new Schema({
    SKU: String,
    categories: [{type: Schema.ObjectId, ref: 'Categories'}],
    optionGroups: [{type: Schema.ObjectId, ref: 'OptionGroups'}],
    name: String,
    description: String,
    MSRP: Number,
    price: Number,
    dimensionX: Number,
    dimensionY: Number,
    dimensionZ: Number,
    thumbnail: {
        originalname: String,
        destination: String,
        filename: String,
        path: String
    },
    images: [String],
    lastUpdated: {type: Date, default: Date.now()},
    dateAdded: {type: Date, default: Date.now()}
});

ProductsSchema.pre('save', function(next){
    this.lastUpdated = Date.now();
    next();
});

module.exports = mongoose.model('Products', ProductsSchema);
