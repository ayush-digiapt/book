const lib = require('../lib');
const db = require('../db/db').sequelize;
var rp = require('request-promise');
var config = require('config');


/*Importing the Sequelize models*/
var Book = db.import("../models/books");
var ImageLink = db.import('../models/imageLinks');
var ListPrice = db.import('../models/listPrice');
var RetailPrice = db.import('../models/retailPrice');
var SaleInfo = db.import('../models/saleInfo');
var User = db.import('../models/users');

exports.callGoogleBookApi=async function(url){
    return new Promise((resolve, reject) => {
        var options = {
            method: 'GET',
            uri: url,
            headers: {
                "Content-Type": "application/json",
            },
            json: true 
        };
        rp(options)
            .then(function(response) {
            resolve(response);           
            })
            .catch(function(err) {
                reject(err);
            });
    })
}

exports.populateData=async function(bookdata){
    var books=[],imageLinks=[],listPrice=[], retailPrice=[], saleInfo=[], users=[];
    let dbbookids=await getBookIds();
    let temp;
    bookdata.map(function(u){
        if(!(dbbookids.includes(u.id))){
            /*Getting data for book table START*/
            temp={};
            temp.book_id=u.id;
            temp.title=u.volumeInfo.title?u.volumeInfo.title:"NA";
            temp.description=u.volumeInfo.description?u.volumeInfo.description.substring(0,100):"NA";  
            books.push(temp);
            /*Getting data for book table END*/
            temp={};
            /*Getting data for imageLinks table START*/
            if(u.volumeInfo.imageLinks){
                temp.smallThumbnail=u.volumeInfo.imageLinks.smallThumbnail?u.volumeInfo.imageLinks.smallThumbnail:"";
                temp.thumbnail=u.volumeInfo.imageLinks.thumbnail?u.volumeInfo.imageLinks.thumbnail:"";
            }else{
                temp.smallThumbnail=" ";
                temp.thumbnail=" ";
            }
            temp.bid=u.id;
            imageLinks.push(temp);
           /*Getting data for imageLinks table END*/
         temp={};

         /*Getting data for listPrice table START*/
         if(u.saleInfo.listPrice){
            temp.ammount=u.saleInfo.listPrice.amount?u.saleInfo.listPrice.amount:250;
            temp.currency_code=u.saleInfo.listPrice.currencyCode?u.saleInfo.listPrice.currencyCode:"INR";
        }else{
            temp.ammount= 200;
            temp.currency_code="INR ";
        }
        temp.bid=u.id;
        listPrice.push(temp);
       /*Getting data for listPrice table END*/
       temp={};

    

       /*Getting data for retailPrice table START*/
       if(u.saleInfo.retailPrice){
          temp.ammount=u.saleInfo.retailPrice.amount?u.saleInfo.listPrice.amount:200;
          temp.currency_code=u.saleInfo.retailPrice.currencyCode?u.saleInfo.listPrice.currencyCode:"INR";
      }else{
          temp.ammount= 1500;
          temp.currency_code="INR ";
      }
      temp.bid=u.id;
      retailPrice.push(temp);
     /*Getting data for retailPrice table END*/
       /*Getting data for users table START*/
       if(u.volumeInfo){
           if(u.volumeInfo.authors){
             for(let i=0;i<u.volumeInfo.authors.length;i++){
                temp={};
                temp.bid=u.id;
                temp.type="author";
                temp.name=u.volumeInfo.authors[i];
                users.push(temp);
            }
           }else{
                temp.bid=u.id;
                temp.type="author";
                temp.name="NA";
                users.push(temp);   
           }
        temp={};
        temp.bid=u.id;
        temp.type="publisher";
        temp.name=u.volumeInfo.publisher?u.volumeInfo.publisher:"NA";
        users.push(temp);   
    }else{
                temp={}; 
                temp.bid=u.id;
                temp.type="author";
                temp.name="NA";
                users.push(temp);
                temp={}; 
                temp.bid=u.id;
                temp.type="publisher";
                temp.name="NA";
                users.push(temp); 
    }
   /*Getting data for users table END*/
   temp={};


       /*Getting data for saleInfo table START*/
       if(u.saleInfo){
        temp.country=u.saleInfo.country?u.saleInfo.country:"IN";
        temp.saleability=u.saleInfo.saleability?u.saleInfo.saleability:"NOT_FOR_SALE";
        temp.isEbook=u.saleInfo.isEbook?u.saleInfo.isEbook:false;


    }else{
        temp.country= "IN";
        temp.saleability="NOT_FOR_SALE ";
        temp.isEbook=false
    }
    temp.bid=u.id;
    saleInfo.push(temp);

    
   /*Getting data for saleInfo table END*/
   temp={};

        }
    })
    try{
         if(books.length>0){
            var book_ids=await createBook(books);
            imageLinks=updateBookId(book_ids,imageLinks);
            var listPrice=updateBookId(book_ids,listPrice);
            var retailPrice=updateBookId(book_ids,retailPrice);
            users=updateBookId(book_ids,users);
            var saleInfo=updateBookId(book_ids,saleInfo);
            
            await createImageLink(imageLinks);

            listPrice=await CreateListPrice(listPrice);
            saleInfo=updatelId(listPrice,saleInfo);
            retailPrice=await CreateRetailPrice(retailPrice);
            saleInfo=updateRid(retailPrice,saleInfo);
            await CreateUsers(users);
           await CreateSaleInfo(saleInfo,listPrice,retailPrice);

           
         }else{
             console.log("No new Bookdata Found!!")
         }
    }catch(err){
        throw err;
    }
}
var getBookIds = async function(){
    return new Promise((resolve,reject)=>{
        Book.findAll().then(function(data){
            if(data.length>0){
             let book_id=[];
             data.map(function(u){
                 book_id.push(u.dataValues.book_id);
             })   
             resolve(book_id);
            }else
               resolve([]);
        }).catch(function(err){
            reject(err);
        })
    })
}
var createBook= async function(books){
    return new Promise((resolve,reject) => {
        Book.bulkCreate(books).then(function(data){
           console.log("Books created successfully");
           let bids=[],temp;
           data.map(function(u){
               temp={
                   id:u.dataValues.id,
                   book_id:u.dataValues.book_id
               }
              bids.push(temp)   
           })
           resolve(bids);
        }).catch(function(err){
            reject(err);
        })
    })
}

var createImageLink= async function(imageLinks){
    return new Promise((resolve,reject) => {
        ImageLink.bulkCreate(imageLinks).then(function(data){
           console.log("imageLinks created successfully");
           resolve(data);
        }).catch(function(err){
            reject(err);
        })
    })
}


var CreateListPrice= async function(listPrice){
    return new Promise((resolve,reject) => {
        ListPrice.bulkCreate(listPrice).then(function(data){
           console.log("ListPrice created successfully");
           let lids=[],temp;
           data.map(function(u){
               temp={
                   id:u.dataValues.id,
                  book_id:u.dataValues.bid
               }
              lids.push(temp)   
           })
           resolve(lids);
               // resolve(data);

         
        }).catch(function(err){
            reject(err);
        })
    })
}


var CreateRetailPrice= async function(retailPrice){
    return new Promise((resolve,reject) => {
        RetailPrice.bulkCreate(retailPrice).then(function(data){
           console.log("retailPrice created successfully");
           let rids=[],temp;
           data.map(function(u){
               temp={
                   id:u.dataValues.id,
                  book_id:u.dataValues.bid
               }
              rids.push(temp)   
           })
           resolve(rids);
         //  resolve(data);
        }).catch(function(err){
            reject(err);
        })
    })
}


var CreateUsers= async function(users){
    return new Promise((resolve,reject) => {
        User.bulkCreate(users).then(function(data){
           console.log("users created successfully");
          
           resolve(data);
        }).catch(function(err){
            reject(err);
        })
    })
}


var CreateSaleInfo= async function(saleInfo,listPrice,retailPrice){
    return new Promise((resolve,reject) => {
        SaleInfo.bulkCreate(saleInfo).then(function(data){
           console.log("SaleInfo created successfully");
           resolve(data);
        }).catch(function(err){
            reject(err);
        })
    })
}

var updateBookId=function(book_ids,temparray){
    temparray.map(function(u){
           book_ids.map(function(v){
               if(u.bid==v.book_id){
                   u.bid=v.id
               }
           })
         })
       return temparray;
   }
   var updatelId=function(book_ids,temparray){
    temparray.map(function(u){
           book_ids.map(function(v){
               if(u.bid==v.book_id){
                   u.lid=v.id
               }
           })
         })
       return temparray;
   }

   var updateRid=function(book_ids,temparray){
    temparray.map(function(u){
           book_ids.map(function(v){
               if(u.bid==v.book_id){
                   u.rid=v.id
               }
           })
         })
       return temparray;
   }



