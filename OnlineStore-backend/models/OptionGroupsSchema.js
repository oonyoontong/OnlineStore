var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//TODO autopopulate
var OptionGroupsSchema = new Schema({
    name: String,
    product_options: [{
        name: String,
        priceDifference: Number,
    }],
});

module.exports = mongoose.model('OptionGroups', OptionGroupsSchema);
