var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload  = multer({dest: './uploads'});
var productsController = require('../controllers/productsController')

/*Get list of all products*/
router.post('/create_new_categories', productsController.create_new_category);
router.get('/get_categories', productsController.get_all_categories);
router.post('/create_new_product',upload.single('thumbnail'), productsController.create_new_product);
router.get('/image/:id', productsController.get_image);
router.get('/', productsController.get_all_products);
router.get('/filters/maxminprice', productsController.get_max_min_price);
router.post('/', productsController.get_filtered_products);
module.exports = router;
