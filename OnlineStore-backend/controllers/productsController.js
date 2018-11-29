var Product = require('../models/ProductsSchema')
var OptionGroup = require('../models/OptionGroupsSchema')
var Categories = require('../models/CategoriesSchema')
var fs = require('fs')

exports.create_new_product =  async function(req, res){

    //Check if categories exist
    var reqCats = req.body.categories.split(',');
    var cats = await Categories.find( {
        name: {
            $in: reqCats
        }
    }).exec();
    if (reqCats.length != cats.length){
        res.send(false);
        return;
    }

    //Create new Option Groups in DB
    var optionGroups = JSON.parse(req.body.optionGroups)
    var new_optionGroups = await OptionGroup.create(optionGroups);

    // Create new product in DB
    req.body.categories = cats;
    req.body.thumbnail = req.file;
    req.body.optionGroups = new_optionGroups;
    var new_product = new Product(req.body);
    new_product.save(function (err, product) {
        if (err){
            console.log(err)
            res.send(false)
            return
        }
        res.send(true)
        console.log(product)
    })
    console.log(new_product);

    /*var new_optionGroups = []
    for (var i = 0; i < optionGroups.length;i++){
        var temp_OG = new OptionGroup(optionGroups[i]);
        new_optionGroups.push(temp_OG);
    }*/
    // Create product
    // Save product
    // Check valid categories
    // Create OptionGroups, save
    // Add to OptionGroup to product
    // Add categories to product
    // Add File
}

exports.create_new_category = function(req, res){
    var new_cat = new Categories(req.body)
    new_cat.save(function(err, cat){
        if (err)
            res.send(err)
        res.json(cat)
    })
};

exports.get_all_categories = async function(req, res) {
    try{
        var cats = await Categories.distinct("name")
        res.json({
            cats: cats
        })
    } catch (err) {
        res.send(err)
    }
}

exports.get_image = function(req, res){
    const filename = req.params.id

    res.download('./uploads/'+ filename, filename, function(err){
        if (err)
            console.log(err)
    })
}

exports.get_max_min_price = async function(req, res){
    try{
        var maxmin = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    max: {$max: "$price"},
                    min: {$min: "$price"}
                }
            }
        ])
        res.json({
            min: maxmin[0].min,
            max: maxmin[0].max
        })
    } catch (err) {
        res.send(err)
    }

}

exports.get_filtered_products = async function(req, res){

    var sortCondition = {}

    switch(req.body.sortBy){
        case "popular":
            // TODO
            sortCondition = {rating_count: -1}
            break;
        case "new":
            // TODO
            sortCondition = {lastUpdated: -1}
            break;
        case "rating":
            sortCondition = {rating: 1}
            break;
        case "priceHigh":
            sortCondition = {price: -1}
            break;
        case "priceLow":
            sortCondition = {price: 1}
            break;
    }
    var saleFilter = {
        // Filter for Sales objects only price < MSRP
        $redact: {
            "$cond": [
                { "$lt": [ "$price", "$MSRP" ] },
                "$$KEEP",
                "$$PRUNE"
            ]
        }
    }
    var catFilter =   {
            $match: {
                "categories.name": {
                    $in: req.body.cats_selected
                }
            }
        }

    console.log(req.body.cats_selected)

    var pipeline = [
        {
            $match: {
                price: {
                    $lte: req.body.priceFilter[1],
                    $gte: req.body.priceFilter[0]
                }
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "categories",
                foreignField: "_id",
                as: "categories"
            }
        },
        {
            $lookup: {
                from: "optiongroups",
                localField: "optionGroups",
                foreignField: "_id",
                as: "optionGroups"
            }
        },
        {
            $addFields:{
                "categories": "$categories.name",
                "thumbnail": "$thumbnail.filename",
                // TODO LOOKUP RATINGS
                "rating": 4,
                "rating_count": 10
            }
        },
        {
            $sort: sortCondition
        },
        {
            $project:{
                "_id": 0,
                "id": "$_id",
                "SKU": 1,
                "name": 1,
                "description": 1,
                "thumbnail": 1,
                "categories": 1,
                "optionGroups": 1,
                "MSRP": 1,
                "price": 1,
                "dimentionX": 1,
                "dimentionY": 1,
                "dimentionZ": 1,
                "rating": 1,
                "rating_count": 1
            }
        }
    ]

    if (req.body.sale){
        pipeline.splice(1, 0, saleFilter)
    }
    if (req.body.cats_selected && req.body.cats_selected.length) {
        console.log('adding CatFilter')
        if (req.body.sale) {
            pipeline.splice(3,0,catFilter)
        } else {
            pipeline.splice(2,0,catFilter)
        }
    }

    try{
        var product_list = await Product.aggregate(pipeline)
        // console.log(product_list)
        res.json(product_list)
    } catch (err) {
        res.send(err)
    }
}

exports.get_all_products = async function(req, res){
    try{
        var product_list = await Product.aggregate([
            {
                $lookup: {
                    from: "optiongroups",
                    localField: "optionGroups",
                    foreignField: "_id",
                    as: "optionGroups"
                }

            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categories",
                    foreignField: "_id",
                    as: "categories"
                }
            },
            {
                $addFields:{
                    "categories": "$categories.name",
                    "thumbnail": "$thumbnail.filename",
                    // TODO LOOKUP RATINGS
                    "rating": Math.ceil(Math.random() * 5),
                    "rating_count": Math.ceil(Math.random() * 100)
                }
            },
            {
                $project:{
                    "_id": 0,
                    "id": "$_id",
                    "SKU": 1,
                    "name": 1,
                    "description": 1,
                    "thumbnail": 1,
                    "categories": 1,
                    "optionGroups": 1,
                    "MSRP": 1,
                    "price": 1,
                    "dimentionX": 1,
                    "dimentionY": 1,
                    "dimentionZ": 1,
                    "rating": 1,
                    "rating_count": 1
                }
            }
        ])
        res.json(product_list)
    } catch (err) {
        res.send(err)
    }
}
