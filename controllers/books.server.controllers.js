/*Beans Copyright info*/

var config = require('config');
var moment = require('moment');
var cloudinary = require('cloudinary');
var Sequelize = require('sequelize');
var request = require('request');
var waterfall = require('async-waterfall');
var messages = require('../config/messages');
var db = require('../db/db');
var BookHelper=require("../service/bookhelper");
var imdb = require('imdb-api');

// var Book = db.import('../models/books');




exports.getmovie = lib.asyncMiddleware(async(req, res, next) => {
    var search=req.body.search;
    imdb.search({
        name: search
      }, {
        apiKey: 'foo'
      }).then(function(data){
        return res.status(200).send({
            movies:data
        })    
      }).catch(function(err){
          return res.status(500).send({
              message:err
          })
      });
});

exports.getBook = lib.asyncMiddleware(async(req, res, next) => {
    console.log("Inside demo API\n",req.body);
    var book= req.body.Book;
    try {
        /*Async await*/
        var url =  "https://www.googleapis.com/books/v1/volumes?q="+book+""
        var data=await BookHelper.callGoogleBookApi(url);
        var bookdata=[];
        for(let i=0;i<10;i++){
            bookdata.push(data.items[i]);
        }   
        var response=await BookHelper.populateData(bookdata);
        res.render("mainpage",{response:response})
    } catch (err) {
        console.log("Error\t", err);
        return res.status(500).send("Server Error");
    }
});

exports.getBookDetails = lib.asyncMiddleware(async(req, res, next) => {
    console.log("Inside getBookDetails API\n");
    var bid= req.params.bid;
    try {
        let bookdata=await BookHelper.getResponse(bid);
      res.render("imagedetail",{bookdata:bookdata})
    } catch (err) {
        console.log("Error\t", err);
        return res.status(500).send("Server Error");
    }
});
