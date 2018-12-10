/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var SaleInfo = require('../controllers/saleInfo.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


/* BEANS code generated for CRR*UD. */

/*Create saleInfo record*/
router.post('/', upload.array(), /*auth.isAuthenticated,*/ SaleInfo.createSaleInfo);

/*Get single saleInfo*/
router.get('/:saleInfo_id' , SaleInfo.getSaleInfo);

/*Get all SaleInfos.*/
router.get('/' , SaleInfo.getAllSaleInfos);

/*Update an saleInfo record*/
router.post('/:saleInfo_id', upload.array(), /*auth.isAuthenticated,*/ SaleInfo.updateSaleInfo);

/*Delete saleInfo */
router.delete('/:saleInfo_id', /*auth.isAuthenticated,*/ SaleInfo.deleteSaleInfo);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , SaleInfo.getAllSaleInfosForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , SaleInfo.getAllSaleInfosSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , SaleInfo.getAllSaleInfosFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , SaleInfo.getAllSaleInfosBySearchText);



module.exports = router;
