var express = require('express');
var router = express.Router();
var fs= require('fs');
var url = require('url');
console.log("*******************")
console.log("url is "+url);




/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile("mainpage.html", function(err, data){
    // console.log("data is"+data);
    var q = url.parse(url, true);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

module.exports = router;
