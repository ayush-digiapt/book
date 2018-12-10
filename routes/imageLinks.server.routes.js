/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var ImageLink = require('../controllers/imageLinks.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


/* BEANS code generated for CRR*UD. */

/*Create imageLinks record*/
router.post('/', upload.array(), /*auth.isAuthenticated,*/ ImageLink.createImageLink);

/*Get single imageLinks*/
router.get('/:imageLinks_id' , ImageLink.getImageLink);

/*Get all ImageLinks.*/
router.get('/' , ImageLink.getAllImageLinks);

/*Update an imageLinks record*/
router.post('/:imageLinks_id', upload.array(), /*auth.isAuthenticated,*/ ImageLink.updateImageLink);

/*Delete imageLinks */
router.delete('/:imageLinks_id', /*auth.isAuthenticated,*/ ImageLink.deleteImageLink);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , ImageLink.getAllImageLinksForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , ImageLink.getAllImageLinksSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , ImageLink.getAllImageLinksFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , ImageLink.getAllImageLinksBySearchText);



module.exports = router;
