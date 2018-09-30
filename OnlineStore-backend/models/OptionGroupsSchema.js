var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//TODO autopopulate
var OptionGroupsSchema = new Schema({
    name: String,
    product_options: [{type: Schema.ObjectId, ref: 'ProductOptions'}],
});

module.exports = mongoose.model('OptionGroups', OptionGroupsSchema);
