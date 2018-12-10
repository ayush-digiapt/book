/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var ListPrice = require('../controllers/listPrice.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


/* BEANS code generated for CRR*UD. */

/*Create listPrice record*/
router.post('/', upload.array(), /*auth.isAuthenticated,*/ ListPrice.createListPrice);

/*Get single listPrice*/
router.get('/:listPrice_id' , ListPrice.getListPrice);

/*Get all ListPrices.*/
router.get('/' , ListPrice.getAllListPrices);

/*Update an listPrice record*/
router.post('/:listPrice_id', upload.array(), /*auth.isAuthenticated,*/ ListPrice.updateListPrice);

/*Delete listPrice */
router.delete('/:listPrice_id', /*auth.isAuthenticated,*/ ListPrice.deleteListPrice);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , ListPrice.getAllListPricesForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , ListPrice.getAllListPricesSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , ListPrice.getAllListPricesFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , ListPrice.getAllListPricesBySearchText);



module.exports = router;
