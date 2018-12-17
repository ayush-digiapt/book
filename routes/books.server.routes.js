/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var Book = require('../controllers/books.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


router.post('/' , Book.getBook);
router.get('/getdetail/:bid', Book.getBookDetails)
router.post('/movie', Book.getmovie)

module.exports = router;
