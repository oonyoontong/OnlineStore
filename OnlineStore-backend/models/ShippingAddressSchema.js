var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShippingAddressSchema = new Schema({
    user_id: {type: Schema.ObjectId, ref: 'Users'},
    firstName: {type: String, validate: [/[a-zA-Z ]/, 'No digits or special characters allowed']},
    lastName: {type: String, validate: [/[a-zA-Z ]/, 'No digits or special characters allowed']},
    address1: String,
    address2: String,
    city: String,
    state: String,
    postalCode: String
});

module.exports = mongoose.model('ShippingAddress', ShippingAddressSchema);

