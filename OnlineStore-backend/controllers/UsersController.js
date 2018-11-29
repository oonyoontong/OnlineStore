var User = require('../models/UsersSchema');
var sha256 = require('sha256');

var authenticate = async function(username,password){
    var user = await User.findOne({email: username})
    if (user){
        var entered_hash = sha256("" + user.passwordSalt + password);
        if (entered_hash === user.passwordHash){
            return {
                _id: user._id
            }
        } else {
            return false
        }
    } else {
        return false
    }
}

exports.create_new_user = function(req,res){

    req.body.passwordSalt = String(sha256(Date.now().toString()))
    req.body.passwordHash = sha256('' + req.body.passwordHash + req.body.password)
    var new_user = new User(req.body);
    new_user.save(function(err, new_user){
        if (err)
            res.send(err)
        res.send(true)
    })

};

exports.authenticate_user = function(req,res){
    var result = authenticate(req.body.username, req.body.password);
    if (result){
        res.json(result)
    } else {
        res.send(result)
    }
}

