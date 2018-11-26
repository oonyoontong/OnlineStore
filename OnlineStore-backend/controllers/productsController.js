var Product = require('../models/ProductsSchema')
var OptionGroup = require('../models/OptionGroupsSchema')
var Categories = require('../models/CategoriesSchema')

exports.create_new_product = function(req, res){




}

exports.create_new_category = function(req, res){
    var new_cat = new Categories(req.body)
    new_cat.save(function(err, cat){
        if (err)
            res.send(err)
        res.json(cat)
    })
};

exports.get_all_categories = function(req, res){
    Categories.find({},'-_id -__v', function(err, cats){
        if (err)
            res.send(err)
        var payload = {cats: []}
        cats.forEach(function(cat){
            payload["cats"].push(cat.name)
        })
        res.json(payload)
    })
}

