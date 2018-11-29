var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function toLower(v){
    return v.toLowerCase();
}

var UsersSchema = new Schema({
    email: {type: String,
            unique: true,
            set: toLower,
            get: toLower,
            required: true,
            //Regex for validating email
            //Source: emailregex.com
            validate: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'email in wrong format'],
    },
    passwordHash: {type: String, required: true},
    passwordSalt: {type: String, required: true},
    //Regex allows for alphabets + whitespace
    firstName: {type: String, validate: [/[a-zA-Z ]/, 'No digits or special characters allowed']},
    lastName: {type: String, validate: [/[a-zA-Z ]/, 'No digits or special characters allowed']},
    emailVerified: {type:Boolean, default: false},
    PreferredBilling: {type: Schema.ObjectId, ref: 'BillingDetails'},
    PreferredShipping: {type: Schema.ObjectId, ref: 'ShippingAddress'},
});

module.exports = mongoose.model('Users', UsersSchema);

