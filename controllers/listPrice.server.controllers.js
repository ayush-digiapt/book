/*Beans Copyright info*/

var config = require('config');
var moment = require('moment');
var cloudinary = require('cloudinary');
var Sequelize = require('sequelize');
var request = require('request');
var waterfall = require('async-waterfall');
var messages = require('../config/messages');
var db = require('../db/db');

var ListPrice = db.import('../models/listPrice');

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create listPrice record.*/
exports.createListPrice = function(req, res) {
    // Log entry.
    console.log('ListPrice Controller: entering createListPrice ');

    var v = new lib.Validator ("ammount:number,currency_code:string,bid:number");

    if (!v.run(req.body)) {
        return res.status(400).send({
            error: v.errors
        });
    }

    ListPrice.create({
        id : req.body.id,
				ammount : req.body.ammount,
				currency_code : req.body.currency_code,
				bid : req.body.bid
    }).then(function(result) {
        console.log('created listPrice', result);
        res.jsonp(result);
    }).catch(function(err) {
        console.log('Could not create listPrice record');
        console.log('err: %j', err);
    });

} /*End of createListPrice*/


/*Get a single listPrice */
exports.getListPrice = function(req, res) {
    var listPrice_id = req.params.listPrice_id;
    console.log('ListPrice Controller: entering getListPrice ');
    /*Validate for a null id*/
    if (!listPrice_id) {
        res.status(400).send("listPrice ID is null");
        return;
    }
    /* Query DB using sequelize api for a single listPrice*/
    ListPrice.findOne({
        where: {
            id: listPrice_id
        }
    }).then(function(listPrice) {
        console.log(listPrice);
        res.jsonp(listPrice);
    }).catch(function(err) {
        console.log('could not fetch listPrice');
        console.log('err: %j', err);
    });
} /*End of getListPrice*/

/*Get all ListPrices */
exports.getAllListPrices = function(req, res) {
    console.log('ListPrice Controller: entering getAllListPrices');
    /* Query DB using sequelize api for all ListPrices*/
    ListPrice.findAll().then(function(listPrices) {
        /*Return an array of ListPrices */
        res.jsonp(listPrices);
    }).catch(function(err) {
        console.log('could not fetch all listPrices');
        console.log('err: %j', err);
    });
}; /*End of getAllListPrices*/


/*Update listPrice record.*/
exports.updateListPrice = function(req, res) {
    // Log entry.
    console.log('ListPrice Controller: entering updateListPrice ');

    var listPrice_id = req.params.listPrice_id;
    ListPrice.update({
        id : req.body.id,
				ammount : req.body.ammount,
				currency_code : req.body.currency_code,
				bid : req.body.bid
    }, {
        where: {
            /* listPrice table primary key */
            id: listPrice_id
        }
    }).then(function(result) {
        console.log('updated listPrice', result);
        res.send("listPrice updated successfully");
    }).catch(function(err) {
        console.log('Could not update listPrice record');
        console.log('err: %j', err);
    });

} /*End of updateListPrice*/

/*Delete a single listPrice */
exports.deleteListPrice = function(req, res) {
    console.log('ListPrice Controller: entering deleteListPrice ');

    var listPrice_id = req.params.listPrice_id;
    /*Validate for a null listPrice_id*/
    if (!listPrice_id) {
        res.status(400).send("listPrice ID is null");
        return;
    }
    /* Delete listPrice record*/
    ListPrice.destroy({
        where: {
            id: listPrice_id
        }
    }).then(function(listPrice) {
        console.log(listPrice);
        res.jsonp(listPrice);
    }).catch(function(err) {
        console.log('could not delete listPrice');
        console.log('err: %j', err);

    });
} /*End of deleteListPrice*/


/*Get all ListPrices for pagination */
exports.getAllListPricesForPagination = function(req, res) {
    console.log('ListPrice Controller: entering getAllListPricesForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all ListPrices*/
    ListPrice.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function(listPrices) {
        /*Return an array of listPrices */
        res.jsonp(listPrices);
    }).catch(function(err) {
        console.log('could not fetch all listPrices for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllListPricesForPagination*/

/*Get all sorted ListPrices  */
exports.getAllListPricesSortedByColumn = function(req, res) {
    console.log('Page Controller: entering getAllListPricesSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all ListPrices*/
    ListPrice.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function(listPrices) {
        /*Return an array of ListPrices */
        res.jsonp(listPrices);
    }).catch(function(err) {
        console.log('could not fetch all ListPrices for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllListPricesSortedByColumn*/

/*Get all filtered ListPrices */
exports.getAllListPricesFilteredByColumn = function(req, res) {
    console.log('Page Controller: entering getAllListPricesFilteredByColumn');
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
    ListPrice.findAll(criteria).then(function(listPrices) {
        /*Return an array of pages */
        res.jsonp(listPrices);
    }).catch(function(err) {
        console.log('could not fetch all ListPrices for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllListPricesFilteredByColumn*/


/*Get all ListPrices by search text */
exports.getAllListPricesBySearchText = function(req, res) {
    console.log('ListPrice Controller: entering getAllListPricesBySearchText');
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

    /* Query DB using sequelize api for all listPrices*/
    ListPrice.findAll(criteria).then(function(listPrices) {
        /*Return an array of pages */
        res.jsonp(listPrices);
    }).catch(function(err) {
        console.log('could not fetch all listPrices for search');
        console.log('err: %j', err);
    });
}; /*End of getAllListPricesBySearchText*/