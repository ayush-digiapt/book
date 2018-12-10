/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var User = require('../controllers/users.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


/* BEANS code generated for CRR*UD. */

/*Create users record*/
router.post('/', upload.array(), /*auth.isAuthenticated,*/ User.createUser);

/*Get single users*/
router.get('/:users_id' , User.getUser);

/*Get all Users.*/
router.get('/' , User.getAllUsers);

/*Update an users record*/
router.post('/:users_id', upload.array(), /*auth.isAuthenticated,*/ User.updateUser);

/*Delete users */
router.delete('/:users_id', /*auth.isAuthenticated,*/ User.deleteUser);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , User.getAllUsersForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , User.getAllUsersSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , User.getAllUsersFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , User.getAllUsersBySearchText);



module.exports = router;
