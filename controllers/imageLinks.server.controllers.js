/*Beans Copyright info*/

var config = require('config');
var moment = require('moment');
var cloudinary = require('cloudinary');
var Sequelize = require('sequelize');
var request = require('request');
var waterfall = require('async-waterfall');
var messages = require('../config/messages');
var db = require('../db/db');

var ImageLink = db.import('../models/imageLinks');

/*
 ** Beans generated CRR*UD controller methods.
 */

/*Create imageLinks record.*/
exports.createImageLink = function(req, res) {
    // Log entry.
    console.log('ImageLink Controller: entering createImageLink ');

    var v = new lib.Validator ("smallThumbnail:string,thumbnail:string,bid:number");

    if (!v.run(req.body)) {
        return res.status(400).send({
            error: v.errors
        });
    }

    ImageLink.create({
        id : req.body.id,
				smallThumbnail : req.body.smallThumbnail,
				thumbnail : req.body.thumbnail,
				bid : req.body.bid
    }).then(function(result) {
        console.log('created imageLinks', result);
        res.jsonp(result);
    }).catch(function(err) {
        console.log('Could not create imageLinks record');
        console.log('err: %j', err);
    });

} /*End of createImageLink*/


/*Get a single imageLinks */
exports.getImageLink = function(req, res) {
    var imageLinks_id = req.params.imageLinks_id;
    console.log('ImageLink Controller: entering getImageLink ');
    /*Validate for a null id*/
    if (!imageLinks_id) {
        res.status(400).send("imageLinks ID is null");
        return;
    }
    /* Query DB using sequelize api for a single imageLinks*/
    ImageLink.findOne({
        where: {
            id: imageLinks_id
        }
    }).then(function(imageLinks) {
        console.log(imageLinks);
        res.jsonp(imageLinks);
    }).catch(function(err) {
        console.log('could not fetch imageLinks');
        console.log('err: %j', err);
    });
} /*End of getImageLink*/

/*Get all ImageLinks */
exports.getAllImageLinks = function(req, res) {
    console.log('ImageLink Controller: entering getAllImageLinks');
    /* Query DB using sequelize api for all ImageLinks*/
    ImageLink.findAll().then(function(imageLinks) {
        /*Return an array of ImageLinks */
        res.jsonp(imageLinks);
    }).catch(function(err) {
        console.log('could not fetch all imageLinks');
        console.log('err: %j', err);
    });
}; /*End of getAllImageLinks*/


/*Update imageLinks record.*/
exports.updateImageLink = function(req, res) {
    // Log entry.
    console.log('ImageLink Controller: entering updateImageLink ');

    var imageLinks_id = req.params.imageLinks_id;
    ImageLink.update({
        id : req.body.id,
				smallThumbnail : req.body.smallThumbnail,
				thumbnail : req.body.thumbnail,
				bid : req.body.bid
    }, {
        where: {
            /* imageLinks table primary key */
            id: imageLinks_id
        }
    }).then(function(result) {
        console.log('updated imageLinks', result);
        res.send("imageLinks updated successfully");
    }).catch(function(err) {
        console.log('Could not update imageLinks record');
        console.log('err: %j', err);
    });

} /*End of updateImageLink*/

/*Delete a single imageLink */
exports.deleteImageLink = function(req, res) {
    console.log('ImageLink Controller: entering deleteImageLink ');

    var imageLinks_id = req.params.imageLinks_id;
    /*Validate for a null imageLinks_id*/
    if (!imageLinks_id) {
        res.status(400).send("imageLinks ID is null");
        return;
    }
    /* Delete imageLinks record*/
    ImageLink.destroy({
        where: {
            id: imageLinks_id
        }
    }).then(function(imageLink) {
        console.log(imageLink);
        res.jsonp(imageLink);
    }).catch(function(err) {
        console.log('could not delete imageLink');
        console.log('err: %j', err);

    });
} /*End of deleteImageLink*/


/*Get all ImageLinks for pagination */
exports.getAllImageLinksForPagination = function(req, res) {
    console.log('ImageLink Controller: entering getAllImageLinksForPagination');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all ImageLinks*/
    ImageLink.findAll({
        offset: offset,
        limit: itemsPerPage
    }).then(function(imageLinks) {
        /*Return an array of imageLinks */
        res.jsonp(imageLinks);
    }).catch(function(err) {
        console.log('could not fetch all imageLinks for pagination');
        console.log('err: %j', err);
    });
}; /*End of getAllImageLinksForPagination*/

/*Get all sorted ImageLinks  */
exports.getAllImageLinksSortedByColumn = function(req, res) {
    console.log('Page Controller: entering getAllImageLinksSortedByColumn');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var colname = req.params.colname;
    var orderBy = req.params.orderBy;
    var offset = itemsPerPage * (pageNo - 1);

    var order = colname + " " + orderBy;
    console.log("offset is " + offset);
    /* Query DB using sequelize api for all ImageLinks*/
    ImageLink.findAll({
        offset: offset,
        limit: itemsPerPage,
        order: order
    }).then(function(imageLinks) {
        /*Return an array of ImageLinks */
        res.jsonp(imageLinks);
    }).catch(function(err) {
        console.log('could not fetch all ImageLinks for sorting');
        console.log('err: %j', err);
    });
}; /*End of getAllImageLinksSortedByColumn*/

/*Get all filtered ImageLinks */
exports.getAllImageLinksFilteredByColumn = function(req, res) {
    console.log('Page Controller: entering getAllImageLinksFilteredByColumn');
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
    ImageLink.findAll(criteria).then(function(imageLinks) {
        /*Return an array of pages */
        res.jsonp(imageLinks);
    }).catch(function(err) {
        console.log('could not fetch all ImageLinks for filtering');
        console.log('err: %j', err);
    });
}; /*End of getAllImageLinksFilteredByColumn*/


/*Get all ImageLinks by search text */
exports.getAllImageLinksBySearchText = function(req, res) {
    console.log('ImageLink Controller: entering getAllImageLinksBySearchText');
    var itemsPerPage = parseInt(req.params.itemsPerPage);
    var pageNo = parseInt(req.params.pageNo);
    var offset = itemsPerPage * (pageNo - 1);
    console.log("offset is " + offset);
    var searchText = req.params.searchText;
    var like = "%" + searchText + "%";
    var criteria = {
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col('id'),Sequelize.col('smallThumbnail'),Sequelize.col('thumbnail'),Sequelize.col('bid')), {
            like: like
        })
    };
    criteria['offset'] = offset;
    criteria['limit'] = itemsPerPage;

    /* Query DB using sequelize api for all imageLinks*/
    ImageLink.findAll(criteria).then(function(imageLinks) {
        /*Return an array of pages */
        res.jsonp(imageLinks);
    }).catch(function(err) {
        console.log('could not fetch all imageLinks for search');
        console.log('err: %j', err);
    });
}; /*End of getAllImageLinksBySearchText*/