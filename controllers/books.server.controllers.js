/*Beans Copyright info*/

var config = require('config');
var moment = require('moment');
var cloudinary = require('cloudinary');
var Sequelize = require('sequelize');
var request = require('request');
var waterfall = require('async-waterfall');
var messages = require('../config/messages');
var db = require('../db/db');

// var Book = db.import('../models/books');

var BookHelper=require("../service/bookhelper");



exports.getBook = lib.asyncMiddleware(async(req, res, next) => {
    console.log("Inside demo API\n");
    var book_id= req.params.book_id;
    try {
        /*Async await*/
       
        bookData = await BookHelper.getBookdetails(book_id);
       
        console.log("data is"+bookData);
        if(bookData!=null)
        {
            bid=bookData.id;
            console.log(bid);
            imageLinkData = await BookHelper.getimageLinkdetails(bid);
           // return res.status(200).send({status:200, message:"data"});

           if(imageLinkData!=null){
             var smallThumbnail= imageLinkData.smallThumbnail;
             var thumbnail= imageLinkData.thumbnail;
             console.log(smallThumbnail);
             console.log(thumbnail);

           listPriceData= await BookHelper.getlistPricedetails(bid);

            if(listPriceData!=null){
                lid=listPriceData.id;
                listPrice=listPriceData.ammount;
                listCurrency_code=listPriceData.currency_code;

                console.log(lid);
                console.log(listPrice);
                console.log(listCurrency_code);

                retailPriceData= await BookHelper.getretailPriceData(bid);
                if(retailPriceData!=null){
                    rid=retailPriceData.id;
                    retailPrice=retailPriceData.ammount;
                    retailCurrency_code=retailPriceData.currency_code;

                    console.log(rid);
                    console.log(retailPrice);
                    console.log(retailCurrency_code);
                    saleInfoData= await BookHelper.getsaleInfo(bid,lid,rid);

                    if(saleInfoData!=null){
                         var saleability = saleInfoData.saleability;
                         console.log(saleability);
                         usersData= await BookHelper.getusersData(bid);
                         
                         if(usersData!=null){
                             var authors =usersData.authors;
                             var publisher= usersData.publisher;

                             console.log(authors);
                             console.log(publisher);

                             return res.status(200).send({status:200, authors:authors, publisher:publisher,listPrice:listPrice+listCurrency_code, retailPrice:retailPrice+retailCurrency_code, saleability:saleability , smallThumbnail:smallThumbnail, thumbnail:thumbnail});                      
                         }
                         else{
                            return res.status(204).send({status:204, message:"no data"});
                         }
                    }
                    else{
                        return res.status(204).send({status:204, message:"no data"});
                    }
                }
                else{
                    return res.status(204).send({status:204, message:"no data"});
                }
                
            }
            else{
                return res.status(204).send({status:204, message:"no data"});
            }
           }
           else{
            return res.status(204).send({status:204, message:"no data"});
           }
           
        }
        else{
           return res.status(204).send({status:204, message:"no data"});
        }
    } catch (err) {
        console.log("Error\t", err);
        return res.status(400).send("Server Error");
    }
});





exports.addBook = lib.asyncMiddleware(async(req, res, next) => {
    console.log("Inside demo API\n");
    //var book_id= req.params.book_id;
    try {
        /*Async await*/
        var book_id=req.body.book_id;
        var title=req.body.title;
        var description=req.body.description;
        var smallThumbnail= req.body.smallThumbnail;
        var thumbnail= req.body.thumbnail;
        var smallThumbnail= req.body.smallThumbnail;
        var thumbnail= req.body.thumbnail;
        var list_ammount= req.body.list_ammount;
        var list_currency_code= req.body.list_currency_code;
        var retail_ammount= req.body.retail_ammount;
        var retail_currency_code= req.body.retail_currency_code;
        var country = req.body.country;
        var saleability = req.body.saleability;
        var isEbook = req.body.isEbook;
        var authors =  req.body.authors;
        var publisher  = req.body.publisher;


       
        addBookData = await BookHelper.addBookDetails(book_id,title,description);
        if(addBookData!=0)
        {
            bid=addBookData.id;
            console.log(bid);
           addImageLinkData = await BookHelper.addImageLinkdetails(smallThumbnail,thumbnail,bid);
          if(addImageLinkData!=0){
            console.log("inside addImageLinkData ");
           
            addListPriceData = await BookHelper.addListPricedetails(list_ammount,list_currency_code,bid);
           
            if(addListPriceData!=0){
                lid= addListPriceData.id;
                console.log(lid);
                console.log("inside addListPricedetails ");

                addRetailPriceData = await BookHelper.addRetailPricedetails(retail_ammount,retail_currency_code,bid);
                
                if(addRetailPriceData!=0){
                    rid= addRetailPriceData.id;
                    console.log(rid);
                    console.log("inside addRetailPriceData ");

                    addSaleInfoData = await BookHelper.addSaleInfodetails(country,saleability,isEbook,lid,rid,bid);

                    if(addSaleInfoData!=0){
                        console.log("inside addRetailPriceData ");

                        addUsersData = await BookHelper.addUsersdetails(authors,publisher,bid);
                        if(addUsersData!=0){
                            console.log("inside addUsersData ");
                            return res.status(200).send({status:200, message:"data added"});
                        }
                        else{
                            return res.status(204).send({status:204, message:"data not added"});
                        }
                    }
                    else{
                        return res.status(204).send({status:204, message:"data not added"});
                     }
                
                }
                else{
                    return res.status(204).send({status:204, message:"data not added"});
                 }
            }
            else{
                return res.status(204).send({status:204, message:"data not added"});
             }

          }
          else{
            return res.status(204).send({status:204, message:"data not added"});
         }

        }
           else{
            return res.status(204).send({status:204, message:"data not added"});
         }
     } catch (err) {
         console.log("Error\t", err);
         return res.status(400).send("book_id already inserted" );
     }
 });

/*
 ** Beans generated CRR*UD controller methods.
 */

// /*Create books record.*/
// exports.createBook = function(req, res) {
//     // Log entry.
//     console.log('Book Controller: entering createBook ');

//     var v = new lib.Validator ("book_id:string,title:string");

//     if (!v.run(req.body)) {
//         return res.status(400).send({
//             error: v.errors
//         });
//     }

//     Book.create({
//         id : req.body.id,
// 				book_id : req.body.book_id,
// 				title : req.body.title,
// 				description : req.body.description
//     }).then(function(result) {
//         console.log('created books', result);
//         res.jsonp(result);
//     }).catch(function(err) {
//         console.log('Could not create books record');
//         console.log('err: %j', err);
//     });

// } /*End of createBook*/


// /*Get a single books */
// exports.getBook = function(req, res) {
//     var books_id = req.params.books_id;
//     console.log('Book Controller: entering getBook ');
//     /*Validate for a null id*/
//     if (!books_id) {
//         res.status(400).send("books ID is null");
//         return;
//     }
//     /* Query DB using sequelize api for a single books*/
//     Book.findOne({
//         where: {
//             id: books_id
//         }
//     }).then(function(books) {
//         console.log(books);
//         res.jsonp(books);
//     }).catch(function(err) {
//         console.log('could not fetch books');
//         console.log('err: %j', err);
//     });
// } /*End of getBook*/

// /*Get all Books */
// exports.getAllBooks = function(req, res) {
//     console.log('Book Controller: entering getAllBooks');
//     /* Query DB using sequelize api for all Books*/
//     Book.findAll().then(function(books) {
//         /*Return an array of Books */
//         res.jsonp(books);
//     }).catch(function(err) {
//         console.log('could not fetch all books');
//         console.log('err: %j', err);
//     });
// }; /*End of getAllBooks*/


// /*Update books record.*/
// exports.updateBook = function(req, res) {
//     // Log entry.
//     console.log('Book Controller: entering updateBook ');

//     var books_id = req.params.books_id;
//     Book.update({
//         id : req.body.id,
// 				book_id : req.body.book_id,
// 				title : req.body.title,
// 				description : req.body.description
//     }, {
//         where: {
//             /* books table primary key */
//             id: books_id
//         }
//     }).then(function(result) {
//         console.log('updated books', result);
//         res.send("books updated successfully");
//     }).catch(function(err) {
//         console.log('Could not update books record');
//         console.log('err: %j', err);
//     });

// } /*End of updateBook*/

// /*Delete a single book */
// exports.deleteBook = function(req, res) {
//     console.log('Book Controller: entering deleteBook ');

//     var books_id = req.params.books_id;
//     /*Validate for a null books_id*/
//     if (!books_id) {
//         res.status(400).send("books ID is null");
//         return;
//     }
//     /* Delete books record*/
//     Book.destroy({
//         where: {
//             id: books_id
//         }
//     }).then(function(book) {
//         console.log(book);
//         res.jsonp(book);
//     }).catch(function(err) {
//         console.log('could not delete book');
//         console.log('err: %j', err);

//     });
// } /*End of deleteBook*/


// /*Get all Books for pagination */
// exports.getAllBooksForPagination = function(req, res) {
//     console.log('Book Controller: entering getAllBooksForPagination');
//     var itemsPerPage = parseInt(req.params.itemsPerPage);
//     var pageNo = parseInt(req.params.pageNo);
//     var offset = itemsPerPage * (pageNo - 1);
//     console.log("offset is " + offset);
//     /* Query DB using sequelize api for all Books*/
//     Book.findAll({
//         offset: offset,
//         limit: itemsPerPage
//     }).then(function(books) {
//         /*Return an array of books */
//         res.jsonp(books);
//     }).catch(function(err) {
//         console.log('could not fetch all books for pagination');
//         console.log('err: %j', err);
//     });
// }; /*End of getAllBooksForPagination*/

// /*Get all sorted Books  */
// exports.getAllBooksSortedByColumn = function(req, res) {
//     console.log('Page Controller: entering getAllBooksSortedByColumn');
//     var itemsPerPage = parseInt(req.params.itemsPerPage);
//     var pageNo = parseInt(req.params.pageNo);
//     var colname = req.params.colname;
//     var orderBy = req.params.orderBy;
//     var offset = itemsPerPage * (pageNo - 1);

//     var order = colname + " " + orderBy;
//     console.log("offset is " + offset);
//     /* Query DB using sequelize api for all Books*/
//     Book.findAll({
//         offset: offset,
//         limit: itemsPerPage,
//         order: order
//     }).then(function(books) {
//         /*Return an array of Books */
//         res.jsonp(books);
//     }).catch(function(err) {
//         console.log('could not fetch all Books for sorting');
//         console.log('err: %j', err);
//     });
// }; /*End of getAllBooksSortedByColumn*/

// /*Get all filtered Books */
// exports.getAllBooksFilteredByColumn = function(req, res) {
//     console.log('Page Controller: entering getAllBooksFilteredByColumn');
//     var itemsPerPage = parseInt(req.params.itemsPerPage);
//     var pageNo = parseInt(req.params.pageNo);
//     var colname = req.params.colname;
//     var filterText = req.params.filterText;
//     var offset = itemsPerPage * (pageNo - 1);
//     var criteria = {};
//     var whereCl = {};
//     whereCl[colname] = filterText;

//     criteria['where'] = whereCl;

//     criteria['offset'] = offset;
//     criteria['limit'] = itemsPerPage;

//     console.log("offset is " + offset);
//     /* Query DB using sequelize api for all Pages offset : offset , limit : itemsPerPage ,order : order ,*/
//     Book.findAll(criteria).then(function(books) {
//         /*Return an array of pages */
//         res.jsonp(books);
//     }).catch(function(err) {
//         console.log('could not fetch all Books for filtering');
//         console.log('err: %j', err);
//     });
// }; /*End of getAllBooksFilteredByColumn*/


// /*Get all Books by search text */
// exports.getAllBooksBySearchText = function(req, res) {
//     console.log('Book Controller: entering getAllBooksBySearchText');
//     var itemsPerPage = parseInt(req.params.itemsPerPage);
//     var pageNo = parseInt(req.params.pageNo);
//     var offset = itemsPerPage * (pageNo - 1);
//     console.log("offset is " + offset);
//     var searchText = req.params.searchText;
//     var like = "%" + searchText + "%";
//     var criteria = {
//         where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'),Sequelize.col('book_id'),Sequelize.col('title'),Sequelize.col('description')), {
//             like: like
//         })
//     };
//     criteria['offset'] = offset;
//     criteria['limit'] = itemsPerPage;

//     /* Query DB using sequelize api for all books*/
//     Book.findAll(criteria).then(function(books) {
//         /*Return an array of pages */
//         res.jsonp(books);
//     }).catch(function(err) {
//         console.log('could not fetch all books for search');
//         console.log('err: %j', err);
//     });
// }; /*End of getAllBooksBySearchText*/