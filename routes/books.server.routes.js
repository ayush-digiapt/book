/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var Book = require('../controllers/books.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


/* BEANS code generated for CRR*UD. */

// /*Create books record*/
// router.post('/', upload.array(), /*auth.isAuthenticated,*/ Book.createBook);

/*Get single books*/
router.get('/:books_id' , Book.getBook);

// /*Get all Books.*/
// router.get('/' , Book.getAllBooks);

// /*Update an books record*/
// router.post('/:books_id', upload.array(), /*auth.isAuthenticated,*/ Book.updateBook);

// /*Delete books */
// router.delete('/:books_id', /*auth.isAuthenticated,*/ Book.deleteBook);

// /*For pagination*/
// router.get('/:itemsPerPage/:pageNo' , Book.getAllBooksForPagination);

// /*For sorting*/
// router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , Book.getAllBooksSortedByColumn);

// /*For filtering*/
// router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , Book.getAllBooksFilteredByColumn);

// /*For Searching*/
// router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , Book.getAllBooksBySearchText);



module.exports = router;
