var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RatingsSchema = new Schema({
    product_id: {type: Schema.ObjectId, ref: 'Products', required},
    user_id: {type: Schema.ObjectId, ref: 'Users', required},
    rating: {type: Number, min: 0, max: 5},
    comment: String
});

module.exports = mongoose.model('Ratings', RatingsSchema);
