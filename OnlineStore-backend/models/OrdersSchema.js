var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Status codes
 * 0: Delivered
 * 1: Out for delivery
 * 2: Shipped
 * 3: Shipping soon
 * 4: Transaction successful
 */

//TODO shipping comments from vendor, supplier

var OrdersSchema = new Schema({
    user_id: {type: Schema.ObjectId, ref: 'Users'},
    billingDetails_id: {type: Schema.ObjectId, ref: 'BillingDetails', required:true},
    dateCreated: {type: Date, default: Date.now()},
    trackingNumber: String,
    status: {type: Number, min:0, max: 4},
    orderDetails:[{type:Schema.ObjectId, ref: 'OrderDetails'}],
    totalAmount: {type: Number, required: true}, //Is this really required? Can be calculated from the aggregated details
    coupon_id: {type: Schema.ObjectId, ref: 'Coupons'}
});

module.exports = mongoose.model('Orders', OrdersSchema);


