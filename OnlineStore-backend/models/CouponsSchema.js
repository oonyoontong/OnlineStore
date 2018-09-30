var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CouponsSchema = new Schema({
    description: String,
    code: {type: String, required: true},
    isActive: {type: Boolean, default: true},
    discountAmount: {Type: Number, default: 0},
    discountRate: {Type: Number, default: 0},
    expirationDate: Date
});

module.exports = mongoose.model('Coupons', CouponsSchema);

