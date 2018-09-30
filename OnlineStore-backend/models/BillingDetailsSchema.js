var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//TODO
function validateCC(cc){
    return true;
}

function validateSN(sn){
    return true;
}

function obfuscate (cc) {
    return '****-****-****-' + cc.slice(cc.length-4, cc.length);
}


var BillingDetailsSchema = new Schema({
    user_id: {type: Schema.ObjectId, ref: 'Users'},
    name: {type: String, validate: [/[a-zA-Z ]/, 'No digits or special characters allowed']},
    ccNumber: {type: String, validate: validateCC, get: obfuscate},
    securityNumber: {type: String, validate: validateSN},
    expMonth: Number,
    expYear: Number,
    billingAddress1: String,
    billingAddress2: String,
    billingCity: String,
    billingState: String,
    billingPostalCode: String
});

module.exports = mongoose.model('BillingDetails', BillingDetailsSchema);

