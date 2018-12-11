const lib = require('../lib');
const db = require('../db/db').sequelize;
var config = require('config');


/*Importing the Sequelize models*/
var Book = db.import("../models/books");

var ImageLink = db.import('../models/imageLinks');


var ListPrice = db.import('../models/listPrice');


var RetailPrice = db.import('../models/retailPrice');


var SaleInfo = db.import('../models/saleInfo');


var User = db.import('../models/users');

//var AdminSession = db.import("../models/admin_sessions");

exports.getBookdetails = async function(book_id) {

    return new Promise((resolve,reject) => {
        Book.findOne({
                    where: {
                       book_id:book_id
                       
                    }
                })
                
        .then(function(getBookdetails) {
           
            console.log("data is****");
           
            resolve(getBookdetails);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })

}

exports.getimageLinkdetails = async function(bid) {

    return new Promise((resolve,reject) => {
        ImageLink.findOne({
                    where: {
                       bid:bid
                       
                    }
                })
                
        .then(function(getimageLinkdetails) {
           
            console.log("data is****");
           
            resolve(getimageLinkdetails);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })

}

exports.getlistPricedetails = async function(bid) {

    return new Promise((resolve,reject) => {
        ListPrice.findOne({
                    where: {
                       bid:bid
                       
                    }
                })
                
        .then(function(getlistPricedetails) {
           
            console.log("data is****");
           
            resolve(getlistPricedetails);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })

}



exports.getretailPriceData = async function(bid) {

    return new Promise((resolve,reject) => {
        RetailPrice.findOne({
                    where: {
                       bid:bid
                       
                    }
                })
                
        .then(function(getretailPriceData) {
           
            console.log("data is****");
           
            resolve(getretailPriceData);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })

}


exports.getsaleInfo = async function(bid,lid,rid) {

    return new Promise((resolve,reject) => {
        SaleInfo.findOne({
                    where: {
                       bid:bid,
                       lid:lid,
                       rid:rid
                       
                    }
                })
                
        .then(function(retailPriceData) {
           
            console.log("data is****");
           
            resolve(retailPriceData);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })

}



exports.getusersData = async function(bid,lid,rid) {

    return new Promise((resolve,reject) => {
        User.findOne({
                    where: {
                       bid:bid
                    }
                })
                
        .then(function(getusersData) {
           
            console.log("data is****");
           
            resolve(getusersData);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })

}




exports.addBookDetails = async function(book_id,title,description) {

    return new Promise((resolve,reject) => {
        Book.create({
                    
            				book_id : book_id,
            				title : title,
            				description : description
                })
                
        .then(function(addBookDetails) {
           
            console.log("data is****");
           
            resolve(addBookDetails);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })

}


exports.addImageLinkdetails = async function(smallThumbnail,thumbnail,bid) {

    return new Promise((resolve,reject) => {
        ImageLink.create({
           
                    smallThumbnail : smallThumbnail,
                    thumbnail : thumbnail,
                    bid : bid
        })
                
        .then(function(addImageLinkdetails) {
           
            console.log("data is****");
           
            resolve(addImageLinkdetails);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })

}



exports.addListPricedetails = async function(list_ammount,list_currency_code,bid) {

    return new Promise((resolve,reject) => {
        ListPrice.create({
                    ammount : list_ammount,
                    currency_code : list_currency_code,
                    bid : bid
        })
                
        .then(function(addListPricedetails) {
           
            console.log("data is****");
           
            resolve(addListPricedetails);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })

}


exports.addRetailPricedetails = async function(retail_ammount,retail_currency_code,bid) {

    return new Promise((resolve,reject) => {
        RetailPrice.create({
           
                    ammount : retail_ammount,
                    currency_code : retail_currency_code,
                    bid : bid
        })
                
        .then(function(addRetailPricedetails) {
           
            console.log("data is****");
           
            resolve(addRetailPricedetails);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })

}


exports.addSaleInfodetails = async function(country,saleability,isEbook,lid,rid,bid) {

    return new Promise((resolve,reject) => {
        SaleInfo.create({
            
                    country : country,
                    saleability : saleability,
                    isEbook : isEbook,
                    lid : lid,
                    rid : rid,
                    bid : bid
        })
                
        .then(function(addSaleInfodetails) {
           
            console.log("data is****");
           
            resolve(addSaleInfodetails);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })

}



exports.addUsersdetails = async function(authors,publisher,bid) {

    return new Promise((resolve,reject) => {
        User.create({
          
                    authors : authors,
                    publisher: publisher,
                    bid : bid
        })
                
        .then(function(addUsersdetails) {
           
            console.log("data is****");
           
            resolve(addUsersdetails);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })

}













