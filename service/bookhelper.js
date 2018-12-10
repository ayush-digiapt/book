const lib = require('../lib');
const db = require('../db/db').sequelize;
var config = require('config');


/*Importing the Sequelize models*/
var book = db.import("../models/books");

//var AdminSession = db.import("../models/admin_sessions");

exports.getBook = async function(id) {

    return new Promise((resolve,reject) => {
        book.findOne({
                    where: {
                       id:id
                       
                    }
                })
                
        .then(function(getBook) {
           
            console.log("data is****");
           
            resolve(getBook);
        
        }).catch(function(err) {
            console.log("data is######");
            
            reject(err);
        })
    })

}


