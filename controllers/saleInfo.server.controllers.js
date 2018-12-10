/*Beans Copyright info*/

var config = require('config');
var moment = require('moment');
var cloudinary = require('cloudinary');
var Sequelize = require('sequelize');
var request = require('request');
var waterfall = require('async-waterfall');
var messages = require('../config/messages');
var db = require('../db/db');

var SaleInfo = db.import('../models/saleInfo');

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create saleInfo record.*/
exports.createSaleInfo = function(req, res) {
    // Log entry.
    console.log('SaleInfo Controller: entering createSaleInfo ');

    var v = new lib.Validator ("country:string,saleability:string,isEbook:number,lid:number,rid:number,bid:number");

    if (!v.run(req.body)) {
        return res.status(400).send({
            error: v.errors
        });
    }

    SaleInfo.create({
        id : req.body.id,
				country : req.body.country,
				saleability : req.body.saleability,
				isEbook : req.body.isEbook,
				lid : req.body.lid,
				rid : req.body.rid,
				bid : req.body.bid
    }).then(function(result) {
        console.log('created saleInfo', result);
        res.jsonp(result);
    }).catch(function(err) {
        console.log('Could not create saleInfo record');
        console.log('err: %j', err);
    });

} /*End of createSaleInfo*/


/*Get a single saleInfo */
exports.getSaleInfo = function(req, res) {
    var saleInfo_id = req.params.saleInfo_id;
    console.log('SaleInfo Controller: entering getSaleInfo ');
    /*Validate for a null id*/
    if (!saleInfo_id) {
        res.status(400).send("saleInfo ID is null");
        return;
    }
    /* Query DB using sequelize api for a single saleInfo*/
    SaleInfo.findOne({
        where: {
            id: saleInfo_id
        }
    }).then(function(saleInfo) {
        console.log(saleInfo);
        res.jsonp(saleInfo);
    }).catch(function(err) {
        console.log('could not fetch saleInfo');
        console.log('err: %j', err);
    });
} /*End of getSaleInfo*/

/*Get all SaleInfos */
exports.getAllSaleInfos = function(req, res) {
    console.log('SaleInfo Controller: entering getAllSaleInfos');
    /* Query DB using sequelize api for all SaleInfos*/
    SaleInfo.findAll().then(function(saleInfos) {
        /*Return an array of SaleInfos */
        res.jsonp(saleInfos);
    }).catch(function(err) {
        console.log('could not fetch all saleInfos');
        console.log('err: %j', err);
    });
}; /*End of getAllSaleInfos*/


/*Update saleInfo record.*/
exports.updateSaleInfo = function(req, res) {
    // Log entry.
    console.log('SaleInfo Controller: entering updateSaleInfo ');

    var saleInfo_id = req.params.saleInfo_id;
    SaleInfo.update({
        id : req.body.id,
				country : req.body.country,
				saleability : req.body.saleability,
				isEbook : req.body.isEbook,
				lid : req.body.lid,
				rid : req.body.rid,
				bid : req.body.bid
    }, {
        where: {
            /* saleInfo table primary key */
            id: saleInfo_id
        }
    }).then(function(result) {
        console.log('updated saleInfo', result);
        res.send("saleInfo updated successfully");
    }).catch(function(err) {
        console.log('Could not update saleInfo record');
        console.log('err: %j', err);
    });

} /*End of updateSaleInfo*/

/*Delete a single saleInfo */
exports.deleteSaleInfo = function(req, res) {
    console.log('SaleInfo Controller: entering deleteSaleInfo ');

    var saleInfo_id = req.params.saleInfo_id;
    /*Validate for a null saleInfo_id*/
    if (!saleInfo_id) {
        res.status(400).send("saleInfo ID is null");
        return;
    }
    /* Delete saleInfo record*/
    SaleInfo.destroy({
        where: {
            id: saleInfo_id
        }
    }).then(function(saleInfo) {
        console.log(saleInfo);
        res.jsonp(saleInfo);
    }).catch(function(err) {
        console.log('could not delete saleInfo');
        console.log('err: %j', err);

    });
} /*End of deleteSaleInfo*/


/*Get all SaleInfos for pagination */
exports.getAllSaleInfosForPagination = function(req, res) {
    console.log('SaleInfo Controller: entering getAllSaleInfosForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all SaleInfos*/
    SaleInfo.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function(saleInfos) {
        /*Return an array of saleInfos */
        res.jsonp(saleInfos);
    }).catch(function(err) {
        console.log('could not fetch all saleInfos for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllSaleInfosForPagination*/

/*Get all sorted SaleInfos  */
exports.getAllSaleInfosSortedByColumn = function(req, res) {
    console.log('Page Controller: entering getAllSaleInfosSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all SaleInfos*/
    SaleInfo.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function(saleInfos) {
        /*Return an array of SaleInfos */
        res.jsonp(saleInfos);
    }).catch(function(err) {
        console.log('could not fetch all SaleInfos for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllSaleInfosSortedByColumn*/

/*Get all filtered SaleInfos */
exports.getAllSaleInfosFilteredByColumn = function(req, res) {
    console.log('Page Controller: entering getAllSaleInfosFilteredByColumn');
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
    SaleInfo.findAll(criteria).then(function(saleInfos) {
        /*Return an array of pages */
        res.jsonp(saleInfos);
    }).catch(function(err) {
        console.log('could not fetch all SaleInfos for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllSaleInfosFilteredByColumn*/


/*Get all SaleInfos by search text */
exports.getAllSaleInfosBySearchText = function(req, res) {
    console.log('SaleInfo Controller: entering getAllSaleInfosBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'),Sequelize.col('country'),Sequelize.col('saleability'),Sequelize.col('isEbook'),Sequelize.col('lid'),Sequelize.col('rid'),Sequelize.col('bid')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all saleInfos*/
    SaleInfo.findAll(criteria).then(function(saleInfos) {
        /*Return an array of pages */
        res.jsonp(saleInfos);
    }).catch(function(err) {
        console.log('could not fetch all saleInfos for search');
        console.log('err: %j', err);
    });
}; /*End of getAllSaleInfosBySearchText*/