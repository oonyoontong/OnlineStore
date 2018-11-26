var express = require('express');
var router = express.Router();
var productsController = require('../controllers/productsController')

/*Get list of all products*/
router.post('/create_new_categories', productsController.create_new_category);
router.get('/get_categories', productsController.get_all_categories);
module.exports = router;
