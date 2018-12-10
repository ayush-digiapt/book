/*Beans Copyright info*/

var config = require('config');
var moment = require('moment');
var cloudinary = require('cloudinary');
var Sequelize = require('sequelize');
var request = require('request');
var waterfall = require('async-waterfall');
var messages = require('../config/messages');
var db = require('../db/db');

var RetailPrice = db.import('../models/retailPrice');

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create retailPrice record.*/
exports.createRetailPrice = function(req, res) {
    // Log entry.
    console.log('RetailPrice Controller: entering createRetailPrice ');

    var v = new lib.Validator ("ammount:number,currency_code:string,bid:number");

    if (!v.run(req.body)) {
        return res.status(400).send({
            error: v.errors
        });
    }

    RetailPrice.create({
        id : req.body.id,
				ammount : req.body.ammount,
				currency_code : req.body.currency_code,
				bid : req.body.bid
    }).then(function(result) {
        console.log('created retailPrice', result);
        res.jsonp(result);
    }).catch(function(err) {
        console.log('Could not create retailPrice record');
        console.log('err: %j', err);
    });

} /*End of createRetailPrice*/


/*Get a single retailPrice */
exports.getRetailPrice = function(req, res) {
    var retailPrice_id = req.params.retailPrice_id;
    console.log('RetailPrice Controller: entering getRetailPrice ');
    /*Validate for a null id*/
    if (!retailPrice_id) {
        res.status(400).send("retailPrice ID is null");
        return;
    }
    /* Query DB using sequelize api for a single retailPrice*/
    RetailPrice.findOne({
        where: {
            id: retailPrice_id
        }
    }).then(function(retailPrice) {
        console.log(retailPrice);
        res.jsonp(retailPrice);
    }).catch(function(err) {
        console.log('could not fetch retailPrice');
        console.log('err: %j', err);
    });
} /*End of getRetailPrice*/

/*Get all RetailPrices */
exports.getAllRetailPrices = function(req, res) {
    console.log('RetailPrice Controller: entering getAllRetailPrices');
    /* Query DB using sequelize api for all RetailPrices*/
    RetailPrice.findAll().then(function(retailPrices) {
        /*Return an array of RetailPrices */
        res.jsonp(retailPrices);
    }).catch(function(err) {
        console.log('could not fetch all retailPrices');
        console.log('err: %j', err);
    });
}; /*End of getAllRetailPrices*/


/*Update retailPrice record.*/
exports.updateRetailPrice = function(req, res) {
    // Log entry.
    console.log('RetailPrice Controller: entering updateRetailPrice ');

    var retailPrice_id = req.params.retailPrice_id;
    RetailPrice.update({
        id : req.body.id,
				ammount : req.body.ammount,
				currency_code : req.body.currency_code,
				bid : req.body.bid
    }, {
        where: {
            /* retailPrice table primary key */
            id: retailPrice_id
        }
    }).then(function(result) {
        console.log('updated retailPrice', result);
        res.send("retailPrice updated successfully");
    }).catch(function(err) {
        console.log('Could not update retailPrice record');
        console.log('err: %j', err);
    });

} /*End of updateRetailPrice*/

/*Delete a single retailPrice */
exports.deleteRetailPrice = function(req, res) {
    console.log('RetailPrice Controller: entering deleteRetailPrice ');

    var retailPrice_id = req.params.retailPrice_id;
    /*Validate for a null retailPrice_id*/
    if (!retailPrice_id) {
        res.status(400).send("retailPrice ID is null");
        return;
    }
    /* Delete retailPrice record*/
    RetailPrice.destroy({
        where: {
            id: retailPrice_id
        }
    }).then(function(retailPrice) {
        console.log(retailPrice);
        res.jsonp(retailPrice);
    }).catch(function(err) {
        console.log('could not delete retailPrice');
        console.log('err: %j', err);

    });
} /*End of deleteRetailPrice*/


/*Get all RetailPrices for pagination */
exports.getAllRetailPricesForPagination = function(req, res) {
    console.log('RetailPrice Controller: entering getAllRetailPricesForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all RetailPrices*/
    RetailPrice.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function(retailPrices) {
        /*Return an array of retailPrices */
        res.jsonp(retailPrices);
    }).catch(function(err) {
        console.log('could not fetch all retailPrices for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllRetailPricesForPagination*/

/*Get all sorted RetailPrices  */
exports.getAllRetailPricesSortedByColumn = function(req, res) {
    console.log('Page Controller: entering getAllRetailPricesSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all RetailPrices*/
    RetailPrice.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function(retailPrices) {
        /*Return an array of RetailPrices */
        res.jsonp(retailPrices);
    }).catch(function(err) {
        console.log('could not fetch all RetailPrices for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllRetailPricesSortedByColumn*/

/*Get all filtered RetailPrices */
exports.getAllRetailPricesFilteredByColumn = function(req, res) {
    console.log('Page Controller: entering getAllRetailPricesFilteredByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var filterText = req.params.filterText;
    var offset = itemsPerPage * (pageNo - 1);
    var criteria = {};
    var whereCl = {};
    whereCl[colname] = filterText;

    criteria['where'] = whereCl;

    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    console.log("offset is " + offset);
    /* Query DB using sequelize api for all Pages offset : offset , limit : itemsPerPage ,order : order ,*/
    RetailPrice.findAll(criteria).then(function(retailPrices) {
        /*Return an array of pages */
        res.jsonp(retailPrices);
    }).catch(function(err) {
        console.log('could not fetch all RetailPrices for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllRetailPricesFilteredByColumn*/


/*Get all RetailPrices by search text */
exports.getAllRetailPricesBySearchText = function(req, res) {
    console.log('RetailPrice Controller: entering getAllRetailPricesBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'),Sequelize.col('ammount'),Sequelize.col('currency_code'),Sequelize.col('bid')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all retailPrices*/
    RetailPrice.findAll(criteria).then(function(retailPrices) {
        /*Return an array of pages */
        res.jsonp(retailPrices);
    }).catch(function(err) {
        console.log('could not fetch all retailPrices for search');
        console.log('err: %j', err);
    });
}; /*End of getAllRetailPricesBySearchText*/