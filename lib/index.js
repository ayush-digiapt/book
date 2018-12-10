var Validator = require('./Validator');
var crypto = require('crypto');
var randtoken = require('rand-token');
var moment = require('moment');

var fail_obj = {
    status: 401,
    'error': 'you are not authenticated to perform this action'
};

function removeDups(array) {
    return array.filter(function(item, pos, self) {
        return self.indexOf(item) == pos;
    });
}

function make_rules(str) {
    var chunks = str.split(',');
    var result = {};

    chunks.map(function(chunk) {
        chunk = chunk.split(':');
        var rule_data = {};
        rule_data.type = chunk[1];
        if (chunk[1] == 'string' || chunk[1] == 'number') {
            rule_data.minlength = 1; // default value

        }
        result[chunk[0]] = rule_data;
    });
    return result;
}

function getSaltedPassword(password) {
    return crypto.createHmac('sha1', 'simplesalt3112').update(password).digest('hex');
}


function pagination(pageNo, itemsPerPage, arr) {
    console.log('checking pagination');
    var offset = itemsPerPage * (pageNo - 1);
    var lastItem = offset + itemsPerPage;
    var paginatedData = [];
    for (var i = 0; i < arr.length; i++) {
        if (i >= offset && i < lastItem) {
            paginatedData.push(arr[i]);
        }
    }
    return ({
        data: paginatedData,
        count: arr.length
    });
}

function getToken() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();
    var day = currentDate.getDate();
    var nextYear = new Date(year + 1, month, day);
    var token = randtoken.generate(16);
    var now = moment();
    var issued_on = currentDate;
    var expires_on = nextYear;

    return {
        token: token,
        issued_on: issued_on,
        expires_on: expires_on
    };
}

function pad(num, size) {
    if (num > 9999) {
        num = num - 9999;
    }
    console.log(num);
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

const asyncMiddleware = fn =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };


module.exports = {
    getSaltedPassword: getSaltedPassword,
    Validator: Validator,
    removeDups: removeDups,
    make_rules: make_rules,
    getToken: getToken,
    pagination: pagination,
    pad: pad,
    asyncMiddleware:asyncMiddleware
};