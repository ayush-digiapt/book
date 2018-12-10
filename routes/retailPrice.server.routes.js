/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var RetailPrice = require('../controllers/retailPrice.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


/* BEANS code generated for CRR*UD. */

/*Create retailPrice record*/
router.post('/', upload.array(), /*auth.isAuthenticated,*/ RetailPrice.createRetailPrice);

/*Get single retailPrice*/
router.get('/:retailPrice_id' , RetailPrice.getRetailPrice);

/*Get all RetailPrices.*/
router.get('/' , RetailPrice.getAllRetailPrices);

/*Update an retailPrice record*/
router.post('/:retailPrice_id', upload.array(), /*auth.isAuthenticated,*/ RetailPrice.updateRetailPrice);

/*Delete retailPrice */
router.delete('/:retailPrice_id', /*auth.isAuthenticated,*/ RetailPrice.deleteRetailPrice);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , RetailPrice.getAllRetailPricesForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , RetailPrice.getAllRetailPricesSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , RetailPrice.getAllRetailPricesFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , RetailPrice.getAllRetailPricesBySearchText);



module.exports = router;
